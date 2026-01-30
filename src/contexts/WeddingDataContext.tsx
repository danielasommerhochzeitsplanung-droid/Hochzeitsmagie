import React, { createContext, useContext, useState, ReactNode, useCallback, useRef, useEffect } from 'react';
import { storage, Guest, Event, Vendor, Location, SupportTeam, BudgetItem, Table, ProgramItem, WeddingData, DietaryRestriction, Task, StorageError } from '../lib/storage-adapter';
import { SaveStatusIndicator } from '../components/SaveStatusIndicator';
import { handleDateChange, generateTasksFromTemplates } from '../utils/taskAutomation';
import { loadTaskTemplates } from '../lib/taskTemplates';
import { generateId } from '../lib/uuid';
import { useImportFeedback } from '../hooks/useImportFeedback';
import { migrateCategoriesIfNeeded } from '../utils/categoryMigration';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

const getDefaultWeddingData = (): WeddingData => ({
  id: generateId(),
  created_at: new Date().toISOString()
});

interface SaveState {
  status: SaveStatus;
  errorMessage?: string;
}

export type { Guest, Event, Vendor, Location, SupportTeam, BudgetItem, Table, ProgramItem, WeddingData, DietaryRestriction, Task };

interface WeddingDataContextType {
  weddingData: WeddingData;
  guests: Guest[];
  events: Event[];
  vendors: Vendor[];
  locations: Location[];
  supportTeam: SupportTeam[];
  budgetItems: BudgetItem[];
  tables: Table[];
  programItems: ProgramItem[];
  tasks: Task[];
  storageChangeCounter: number;

  updateWeddingData: (data: Partial<WeddingData>) => Promise<void>;

  addGuest: (guest: Omit<Guest, 'id'>) => Guest;
  updateGuest: (id: string, guest: Partial<Guest>) => void;
  deleteGuest: (id: string) => void;

  addEvent: (event: Omit<Event, 'id'>) => Event;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;

  addVendor: (vendor: Omit<Vendor, 'id'>) => Vendor;
  updateVendor: (id: string, vendor: Partial<Vendor>) => void;
  deleteVendor: (id: string) => void;

  addLocation: (location: Omit<Location, 'id'>) => Location;
  updateLocation: (id: string, location: Partial<Location>) => void;
  deleteLocation: (id: string) => void;

  addSupportTeamMember: (member: Omit<SupportTeam, 'id'>) => SupportTeam;
  updateSupportTeamMember: (id: string, member: Partial<SupportTeam>) => void;
  deleteSupportTeamMember: (id: string) => void;

  addBudgetItem: (item: Omit<BudgetItem, 'id'>) => BudgetItem;
  updateBudgetItem: (id: string, item: Partial<BudgetItem>) => void;
  deleteBudgetItem: (id: string) => void;

  addTable: (table: Omit<Table, 'id'>) => Table;
  updateTable: (id: string, table: Partial<Table>) => void;
  deleteTable: (id: string) => void;

  addProgramItem: (item: Omit<ProgramItem, 'id'>) => ProgramItem;
  updateProgramItem: (id: string, item: Partial<ProgramItem>) => void;
  deleteProgramItem: (id: string) => void;

  addTask: (task: Omit<Task, 'id' | 'created_at'>) => Task;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  initializeAutoTasks: () => Promise<void>;
  dismissTaskWarning: (id: string) => void;

  exportData: () => void;
  importData: (jsonData: string) => void;
  clearAllData: () => void;
  manualSave: () => void;
}

const WeddingDataContext = createContext<WeddingDataContextType | undefined>(undefined);

export function WeddingDataProvider({ children }: { children: ReactNode }) {
  const [saveState, setSaveState] = useState<SaveState>({ status: 'idle' });
  const [storageChangeCounter, setStorageChangeCounter] = useState(0);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();
  const idleTimeoutRef = useRef<NodeJS.Timeout>();
  const { showFeedback, FeedbackComponent } = useImportFeedback();

  const [weddingData, setWeddingData] = useState<WeddingData>(() => {
    migrateCategoriesIfNeeded();
    const data = storage.weddingData.getAll();
    return data.length > 0 ? data[0] : getDefaultWeddingData();
  });
  const [guests, setGuests] = useState<Guest[]>(() => storage.guests.getAll());
  const [events, setEvents] = useState<Event[]>(() => storage.events.getAll());
  const [vendors, setVendors] = useState<Vendor[]>(() => storage.vendors.getAll());
  const [locations, setLocations] = useState<Location[]>(() => storage.locations.getAll());
  const [supportTeam, setSupportTeam] = useState<SupportTeam[]>(() => storage.supportTeam.getAll());
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(() => storage.budgetItems.getAll());
  const [tables, setTables] = useState<Table[]>(() => storage.tables.getAll());
  const [programItems, setProgramItems] = useState<ProgramItem[]>(() => storage.programItems.getAll());
  const [tasks, setTasks] = useState<Task[]>(() => storage.tasks.getAll());

  const incrementStorageCounter = useCallback(() => {
    setStorageChangeCounter(prev => prev + 1);
  }, []);

  const showSaveIndicator = useCallback(() => {
    setSaveState({ status: 'saving' });

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      setSaveState({ status: 'saved' });
      idleTimeoutRef.current = setTimeout(() => setSaveState({ status: 'idle' }), 2000);
    }, 300);
  }, []);

  const handleStorageError = useCallback((error: unknown) => {
    if (error instanceof StorageError) {
      setSaveState({ status: 'error', errorMessage: error.message });
      setTimeout(() => setSaveState({ status: 'idle' }), 5000);
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
    };
  }, []);

  const updateWeddingData = async (data: Partial<WeddingData>) => {
    try {
      const allData = storage.weddingData.getAll();
      let updatedData: WeddingData;
      const oldData = allData.length > 0 ? allData[0] : null;

      if (allData.length > 0) {
        updatedData = storage.weddingData.update(allData[0].id, data) || allData[0];
      } else {
        updatedData = storage.weddingData.create(data);
      }

      if (updatedData.wedding_date && updatedData.planning_start_date && !updatedData.auto_tasks_initialized) {
        const planningStartDate = updatedData.planning_start_date;
        const weddingDate = updatedData.wedding_date;

        const templates = await loadTaskTemplates();

        if (templates.length > 0) {
          const generatedTasks = generateTasksFromTemplates(
            planningStartDate,
            weddingDate,
            templates
          );

          generatedTasks.forEach(task => {
            const newTask = storage.tasks.create({
              title: task.title,
              description: task.description || '',
              category: task.category,
              due_date: task.dueDate,
              completed: false,
              priority: task.priority as 'high' | 'medium' | 'low',
              is_system_task: true,
              is_system_generated: true,
              template_id: task.template_id,
              offset_weeks: task.offset_weeks,
              offset_type: task.offset_type
            });
          });

          updatedData = storage.weddingData.update(updatedData.id, {
            auto_tasks_enabled: true,
            auto_tasks_initialized: true,
            last_planning_start_date: planningStartDate,
            last_wedding_date: weddingDate
          }) || updatedData;

          const refreshedTasks = storage.tasks.getAll();
          setTasks(refreshedTasks);
        }
      }

      if (oldData && updatedData.id && updatedData.auto_tasks_enabled && updatedData.auto_tasks_initialized) {
        const oldPlanningStartDate = oldData.last_planning_start_date || oldData.planning_start_date;
        const oldWeddingDate = oldData.last_wedding_date || oldData.wedding_date;
        const newPlanningStartDate = updatedData.planning_start_date;
        const newWeddingDate = updatedData.wedding_date;

        if (newWeddingDate && (oldPlanningStartDate !== newPlanningStartDate || oldWeddingDate !== newWeddingDate)) {
          handleDateChange(
            updatedData.id,
            newPlanningStartDate || null,
            newWeddingDate,
            oldPlanningStartDate || null,
            oldWeddingDate || null
          );

          const refreshedTasks = storage.tasks.getAll();
          setTasks(refreshedTasks);
        }
      }

      setWeddingData(updatedData);
      incrementStorageCounter();
      showSaveIndicator();
    } catch (error) {
      handleStorageError(error);
      throw error;
    }
  };

  const addGuest = (guest: Omit<Guest, 'id'>) => {
    try {
      const newGuest = storage.guests.create(guest);
      setGuests(prev => [...prev, newGuest]);
      incrementStorageCounter();
      showSaveIndicator();
      return newGuest;
    } catch (error) {
      handleStorageError(error);
      throw error;
    }
  };

  const updateGuest = (id: string, guest: Partial<Guest>) => {
    try {
      storage.guests.update(id, guest);
      setGuests(prev => prev.map(g => g.id === id ? { ...g, ...guest } : g));
      incrementStorageCounter();
      showSaveIndicator();
    } catch (error) {
      handleStorageError(error);
      throw error;
    }
  };

  const deleteGuest = (id: string) => {
    try {
      storage.guests.delete(id);
      setGuests(prev => prev.filter(g => g.id !== id));
      incrementStorageCounter();
      showSaveIndicator();
    } catch (error) {
      handleStorageError(error);
      throw error;
    }
  };

  const addEvent = (event: Omit<Event, 'id'>) => {
    try {
      const newEvent = storage.events.create(event);
      setEvents(prev => [...prev, newEvent]);
      incrementStorageCounter();
      showSaveIndicator();
      return newEvent;
    } catch (error) {
      handleStorageError(error);
      throw error;
    }
  };

  const updateEvent = (id: string, event: Partial<Event>) => {
    try {
      storage.events.update(id, event);
      setEvents(prev => prev.map(e => e.id === id ? { ...e, ...event } : e));
      incrementStorageCounter();
      showSaveIndicator();
    } catch (error) {
      handleStorageError(error);
      throw error;
    }
  };

  const deleteEvent = (id: string) => {
    try {
      storage.events.delete(id);
      setEvents(prev => prev.filter(e => e.id !== id));
      incrementStorageCounter();
      showSaveIndicator();
    } catch (error) {
      handleStorageError(error);
      throw error;
    }
  };

  const addVendor = (vendor: Omit<Vendor, 'id'>) => {
    try {
      const newVendor = storage.vendors.create(vendor);
      setVendors(prev => [...prev, newVendor]);
      incrementStorageCounter();
      showSaveIndicator();
      return newVendor;
    } catch (error) {
      handleStorageError(error);
      throw error;
    }
  };

  const updateVendor = (id: string, vendor: Partial<Vendor>) => {
    try {
      storage.vendors.update(id, vendor);
      setVendors(prev => prev.map(v => v.id === id ? { ...v, ...vendor } : v));
      incrementStorageCounter();
      showSaveIndicator();
    } catch (error) {
      handleStorageError(error);
      throw error;
    }
  };

  const deleteVendor = (id: string) => {
    try {
      storage.vendors.delete(id);
      setVendors(prev => prev.filter(v => v.id !== id));
      incrementStorageCounter();
      showSaveIndicator();
    } catch (error) {
      handleStorageError(error);
      throw error;
    }
  };

  const addLocation = (location: Omit<Location, 'id'>) => {
    try {
      const newLocation = storage.locations.create(location);
      setLocations(prev => [...prev, newLocation]);
      incrementStorageCounter();
      showSaveIndicator();
      return newLocation;
    } catch (error) {
      handleStorageError(error);
      throw error;
    }
  };

  const updateLocation = (id: string, location: Partial<Location>) => {
    try {
      storage.locations.update(id, location);
      setLocations(prev => prev.map(l => l.id === id ? { ...l, ...location } : l));
      incrementStorageCounter();
      showSaveIndicator();
    } catch (error) {
      handleStorageError(error);
      throw error;
    }
  };

  const deleteLocation = (id: string) => {
    try {
      storage.locations.delete(id);
      setLocations(prev => prev.filter(l => l.id !== id));
      incrementStorageCounter();
      showSaveIndicator();
    } catch (error) {
      handleStorageError(error);
      throw error;
    }
  };

  const addSupportTeamMember = (member: Omit<SupportTeam, 'id'>) => {
    try {
      const newMember = storage.supportTeam.create(member);
      setSupportTeam(prev => [...prev, newMember]);
      incrementStorageCounter();
      showSaveIndicator();
      return newMember;
    } catch (error) {
      handleStorageError(error);
      throw error;
    }
  };

  const updateSupportTeamMember = (id: string, member: Partial<SupportTeam>) => {
    try {
      storage.supportTeam.update(id, member);
      setSupportTeam(prev => prev.map(m => m.id === id ? { ...m, ...member } : m));
      incrementStorageCounter();
      showSaveIndicator();
    } catch (error) {
      handleStorageError(error);
      throw error;
    }
  };

  const deleteSupportTeamMember = (id: string) => {
    try {
      storage.supportTeam.delete(id);
      setSupportTeam(prev => prev.filter(m => m.id !== id));
      incrementStorageCounter();
      showSaveIndicator();
    } catch (error) {
      handleStorageError(error);
      throw error;
    }
  };

  const addBudgetItem = (item: Omit<BudgetItem, 'id'>) => {
    try {
      const newItem = storage.budgetItems.create(item);
      setBudgetItems(prev => [...prev, newItem]);
      incrementStorageCounter();
      showSaveIndicator();
      return newItem;
    } catch (error) {
      handleStorageError(error);
      throw error;
    }
  };

  const updateBudgetItem = (id: string, item: Partial<BudgetItem>) => {
    try {
      storage.budgetItems.update(id, item);
      setBudgetItems(prev => prev.map(i => i.id === id ? { ...i, ...item } : i));
      incrementStorageCounter();
      showSaveIndicator();
    } catch (error) {
      handleStorageError(error);
      throw error;
    }
  };

  const deleteBudgetItem = (id: string) => {
    try {
      storage.budgetItems.delete(id);
      setBudgetItems(prev => prev.filter(i => i.id !== id));
      incrementStorageCounter();
      showSaveIndicator();
    } catch (error) {
      handleStorageError(error);
      throw error;
    }
  };

  const addTable = (table: Omit<Table, 'id'>) => {
    try {
      const newTable = storage.tables.create(table);
      setTables(prev => [...prev, newTable]);
      incrementStorageCounter();
      showSaveIndicator();
      return newTable;
    } catch (error) {
      handleStorageError(error);
      throw error;
    }
  };

  const updateTable = (id: string, table: Partial<Table>) => {
    try {
      storage.tables.update(id, table);
      setTables(prev => prev.map(t => t.id === id ? { ...t, ...table } : t));
      incrementStorageCounter();
      showSaveIndicator();
    } catch (error) {
      handleStorageError(error);
      throw error;
    }
  };

  const deleteTable = (id: string) => {
    try {
      storage.tables.delete(id);
      setTables(prev => prev.filter(t => t.id !== id));
      incrementStorageCounter();
      showSaveIndicator();
    } catch (error) {
      handleStorageError(error);
      throw error;
    }
  };

  const addProgramItem = (item: Omit<ProgramItem, 'id'>) => {
    try {
      const newItem = storage.programItems.create(item);
      setProgramItems(prev => [...prev, newItem]);
      incrementStorageCounter();
      showSaveIndicator();
      return newItem;
    } catch (error) {
      handleStorageError(error);
      throw error;
    }
  };

  const updateProgramItem = (id: string, item: Partial<ProgramItem>) => {
    try {
      storage.programItems.update(id, item);
      setProgramItems(prev => prev.map(i => i.id === id ? { ...i, ...item } : i));
      incrementStorageCounter();
      showSaveIndicator();
    } catch (error) {
      handleStorageError(error);
      throw error;
    }
  };

  const deleteProgramItem = (id: string) => {
    try {
      storage.programItems.delete(id);
      setProgramItems(prev => prev.filter(i => i.id !== id));
      incrementStorageCounter();
      showSaveIndicator();
    } catch (error) {
      handleStorageError(error);
      throw error;
    }
  };

  const addTask = (task: Omit<Task, 'id' | 'created_at'>) => {
    try {
      const taskWithDefaults = {
        ...task,
        is_system_generated: task.is_system_generated ?? false
      };
      const newTask = storage.tasks.create(taskWithDefaults);
      setTasks(prev => [...prev, newTask]);
      incrementStorageCounter();
      showSaveIndicator();
      return newTask;
    } catch (error) {
      handleStorageError(error);
      throw error;
    }
  };

  const updateTask = (id: string, task: Partial<Task>) => {
    try {
      storage.tasks.update(id, task);
      setTasks(prev => prev.map(t => t.id === id ? { ...t, ...task } : t));
      incrementStorageCounter();
      showSaveIndicator();
    } catch (error) {
      handleStorageError(error);
      throw error;
    }
  };

  const deleteTask = (id: string) => {
    try {
      storage.tasks.delete(id);
      setTasks(prev => prev.filter(t => t.id !== id));
      incrementStorageCounter();
      showSaveIndicator();
    } catch (error) {
      handleStorageError(error);
      throw error;
    }
  };

  const initializeAutoTasks = async () => {
    if (!weddingData.wedding_date) {
      console.error('Wedding date is required to initialize auto tasks');
      return;
    }

    const planningStartDate = weddingData.planning_start_date || new Date().toISOString().split('T')[0];

    const templates = await loadTaskTemplates();

    if (templates.length === 0) {
      console.error('No task templates found in database');
      return;
    }

    const generatedTasks = generateTasksFromTemplates(
      planningStartDate,
      weddingData.wedding_date,
      templates
    );

    generatedTasks.forEach(task => {
      addTask({
        title: task.title,
        description: task.description || '',
        category: task.category,
        due_date: task.dueDate,
        completed: false,
        priority: task.priority as 'high' | 'medium' | 'low',
        is_system_task: true,
        is_system_generated: true,
        template_id: task.template_id,
        offset_weeks: task.offset_weeks,
        offset_type: task.offset_type
      });
    });

    await updateWeddingData({
      auto_tasks_enabled: true,
      auto_tasks_initialized: true,
      last_planning_start_date: planningStartDate,
      last_wedding_date: weddingData.wedding_date
    });
  };

  const dismissTaskWarning = (id: string) => {
    updateTask(id, { warning_dismissed: true });
  };

  const exportData = () => {
    const data = storage.exportAll();
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hochzeitsmagie-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (jsonData: string) => {
    const MAX_JSON_SIZE = 2 * 1024 * 1024;

    if (jsonData.length > MAX_JSON_SIZE) {
      showFeedback({
        ok: false,
        message: 'Import fehlgeschlagen: Datei ist zu groß (maximal 2 MB erlaubt).',
        imported: 0,
        errors: []
      });
      return;
    }

    try {
      const result = storage.importAll(jsonData);
      showFeedback(result);

      if (result.ok) {
        const allWeddingData = storage.weddingData.getAll();
        setWeddingData(allWeddingData.length > 0 ? allWeddingData[0] : getDefaultWeddingData());
        setGuests(storage.guests.getAll());
        setEvents(storage.events.getAll());
        setVendors(storage.vendors.getAll());
        setLocations(storage.locations.getAll());
        setSupportTeam(storage.supportTeam.getAll());
        setBudgetItems(storage.budgetItems.getAll());
        setTables(storage.tables.getAll());
        setProgramItems(storage.programItems.getAll());
        setTasks(storage.tasks.getAll());
        showSaveIndicator();
      }
    } catch (error) {
      console.error('Import error:', error);
      showFeedback({
        ok: false,
        message: 'Import fehlgeschlagen: Ungültiges Dateiformat oder beschädigte Daten.',
        imported: 0,
        errors: []
      });
    }
  };

  const clearAllData = () => {
    storage.clearAll();
    setWeddingData(getDefaultWeddingData());
    setGuests([]);
    setEvents([]);
    setVendors([]);
    setLocations([]);
    setSupportTeam([]);
    setBudgetItems([]);
    setTables([]);
    setProgramItems([]);
    setTasks([]);
  };

  const manualSave = useCallback(() => {
    showSaveIndicator();
  }, [showSaveIndicator]);

  const value: WeddingDataContextType = {
    weddingData,
    guests,
    events,
    vendors,
    locations,
    supportTeam,
    budgetItems,
    tables,
    programItems,
    tasks,
    storageChangeCounter,
    updateWeddingData,
    addGuest,
    updateGuest,
    deleteGuest,
    addEvent,
    updateEvent,
    deleteEvent,
    addVendor,
    updateVendor,
    deleteVendor,
    addLocation,
    updateLocation,
    deleteLocation,
    addSupportTeamMember,
    updateSupportTeamMember,
    deleteSupportTeamMember,
    addBudgetItem,
    updateBudgetItem,
    deleteBudgetItem,
    addTable,
    updateTable,
    deleteTable,
    addProgramItem,
    updateProgramItem,
    deleteProgramItem,
    addTask,
    updateTask,
    deleteTask,
    initializeAutoTasks,
    dismissTaskWarning,
    exportData,
    importData,
    clearAllData,
    manualSave,
  };

  return (
    <WeddingDataContext.Provider value={value}>
      {children}
      <SaveStatusIndicator
        status={saveState.status}
        errorMessage={saveState.errorMessage}
      />
      <FeedbackComponent />
    </WeddingDataContext.Provider>
  );
}

export function useWeddingData() {
  const context = useContext(WeddingDataContext);
  if (context === undefined) {
    throw new Error('useWeddingData must be used within a WeddingDataProvider');
  }
  return context;
}
