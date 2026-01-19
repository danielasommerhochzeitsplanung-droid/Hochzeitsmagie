import React, { createContext, useContext, useState, ReactNode, useCallback, useRef, useEffect } from 'react';
import { storage, Guest, Event, Vendor, Location, SupportTeam, BudgetItem, Table, ProgramItem, WeddingData, DietaryRestriction, Task } from '../lib/storage-adapter';
import { SaveStatusIndicator } from '../components/SaveStatusIndicator';
import { handleDateChange, generateTasksFromTemplates } from '../utils/taskAutomation';
import { taskTemplateData } from '../data/taskTemplateData';
import { generateId } from '../lib/uuid';
import { useImportFeedback } from '../hooks/useImportFeedback';

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

  updateWeddingData: (data: Partial<WeddingData>) => void;

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
  initializeAutoTasks: () => void;
  dismissTaskWarning: (id: string) => void;

  exportData: () => void;
  importData: (jsonData: string) => void;
  clearAllData: () => void;
  manualSave: () => void;
}

const WeddingDataContext = createContext<WeddingDataContextType | undefined>(undefined);

export function WeddingDataProvider({ children }: { children: ReactNode }) {
  const [saveState, setSaveState] = useState<SaveState>({ status: 'idle' });
  const saveTimeoutRef = useRef<NodeJS.Timeout>();
  const { showFeedback, FeedbackComponent } = useImportFeedback();

  const [weddingData, setWeddingData] = useState<WeddingData>(() => {
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

  const showSaveIndicator = useCallback(() => {
    setSaveState({ status: 'saving' });

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      setSaveState({ status: 'saved' });
      setTimeout(() => setSaveState({ status: 'idle' }), 2000);
    }, 300);
  }, []);

  const updateWeddingData = (data: Partial<WeddingData>) => {
    const allData = storage.weddingData.getAll();
    let updatedData: WeddingData;
    const oldData = allData.length > 0 ? allData[0] : null;

    if (allData.length > 0) {
      updatedData = storage.weddingData.update(allData[0].id, data) || allData[0];
    } else {
      updatedData = storage.weddingData.create(data);
    }

    if (oldData && updatedData.id && updatedData.auto_tasks_enabled) {
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
    showSaveIndicator();
  };

  const addGuest = (guest: Omit<Guest, 'id'>) => {
    const newGuest = storage.guests.create(guest);
    setGuests(prev => [...prev, newGuest]);
    showSaveIndicator();
    return newGuest;
  };

  const updateGuest = (id: string, guest: Partial<Guest>) => {
    storage.guests.update(id, guest);
    setGuests(prev => prev.map(g => g.id === id ? { ...g, ...guest } : g));
    showSaveIndicator();
  };

  const deleteGuest = (id: string) => {
    storage.guests.delete(id);
    setGuests(prev => prev.filter(g => g.id !== id));
    showSaveIndicator();
  };

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = storage.events.create(event);
    setEvents(prev => [...prev, newEvent]);
    showSaveIndicator();
    return newEvent;
  };

  const updateEvent = (id: string, event: Partial<Event>) => {
    storage.events.update(id, event);
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...event } : e));
    showSaveIndicator();
  };

  const deleteEvent = (id: string) => {
    storage.events.delete(id);
    setEvents(prev => prev.filter(e => e.id !== id));
    showSaveIndicator();
  };

  const addVendor = (vendor: Omit<Vendor, 'id'>) => {
    const newVendor = storage.vendors.create(vendor);
    setVendors(prev => [...prev, newVendor]);
    showSaveIndicator();
    return newVendor;
  };

  const updateVendor = (id: string, vendor: Partial<Vendor>) => {
    storage.vendors.update(id, vendor);
    setVendors(prev => prev.map(v => v.id === id ? { ...v, ...vendor } : v));
    showSaveIndicator();
  };

  const deleteVendor = (id: string) => {
    storage.vendors.delete(id);
    setVendors(prev => prev.filter(v => v.id !== id));
    showSaveIndicator();
  };

  const addLocation = (location: Omit<Location, 'id'>) => {
    const newLocation = storage.locations.create(location);
    setLocations(prev => [...prev, newLocation]);
    showSaveIndicator();
    return newLocation;
  };

  const updateLocation = (id: string, location: Partial<Location>) => {
    storage.locations.update(id, location);
    setLocations(prev => prev.map(l => l.id === id ? { ...l, ...location } : l));
    showSaveIndicator();
  };

  const deleteLocation = (id: string) => {
    storage.locations.delete(id);
    setLocations(prev => prev.filter(l => l.id !== id));
    showSaveIndicator();
  };

  const addSupportTeamMember = (member: Omit<SupportTeam, 'id'>) => {
    const newMember = storage.supportTeam.create(member);
    setSupportTeam(prev => [...prev, newMember]);
    showSaveIndicator();
    return newMember;
  };

  const updateSupportTeamMember = (id: string, member: Partial<SupportTeam>) => {
    storage.supportTeam.update(id, member);
    setSupportTeam(prev => prev.map(m => m.id === id ? { ...m, ...member } : m));
    showSaveIndicator();
  };

  const deleteSupportTeamMember = (id: string) => {
    storage.supportTeam.delete(id);
    setSupportTeam(prev => prev.filter(m => m.id !== id));
    showSaveIndicator();
  };

  const addBudgetItem = (item: Omit<BudgetItem, 'id'>) => {
    const newItem = storage.budgetItems.create(item);
    setBudgetItems(prev => [...prev, newItem]);
    showSaveIndicator();
    return newItem;
  };

  const updateBudgetItem = (id: string, item: Partial<BudgetItem>) => {
    storage.budgetItems.update(id, item);
    setBudgetItems(prev => prev.map(i => i.id === id ? { ...i, ...item } : i));
    showSaveIndicator();
  };

  const deleteBudgetItem = (id: string) => {
    storage.budgetItems.delete(id);
    setBudgetItems(prev => prev.filter(i => i.id !== id));
    showSaveIndicator();
  };

  const addTable = (table: Omit<Table, 'id'>) => {
    const newTable = storage.tables.create(table);
    setTables(prev => [...prev, newTable]);
    showSaveIndicator();
    return newTable;
  };

  const updateTable = (id: string, table: Partial<Table>) => {
    storage.tables.update(id, table);
    setTables(prev => prev.map(t => t.id === id ? { ...t, ...table } : t));
    showSaveIndicator();
  };

  const deleteTable = (id: string) => {
    storage.tables.delete(id);
    setTables(prev => prev.filter(t => t.id !== id));
    showSaveIndicator();
  };

  const addProgramItem = (item: Omit<ProgramItem, 'id'>) => {
    const newItem = storage.programItems.create(item);
    setProgramItems(prev => [...prev, newItem]);
    showSaveIndicator();
    return newItem;
  };

  const updateProgramItem = (id: string, item: Partial<ProgramItem>) => {
    storage.programItems.update(id, item);
    setProgramItems(prev => prev.map(i => i.id === id ? { ...i, ...item } : i));
    showSaveIndicator();
  };

  const deleteProgramItem = (id: string) => {
    storage.programItems.delete(id);
    setProgramItems(prev => prev.filter(i => i.id !== id));
    showSaveIndicator();
  };

  const addTask = (task: Omit<Task, 'id' | 'created_at'>) => {
    const taskWithDefaults = {
      ...task,
      is_system_generated: task.is_system_generated ?? false
    };
    const newTask = storage.tasks.create(taskWithDefaults);
    setTasks(prev => [...prev, newTask]);
    showSaveIndicator();
    return newTask;
  };

  const updateTask = (id: string, task: Partial<Task>) => {
    storage.tasks.update(id, task);
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...task } : t));
    showSaveIndicator();
  };

  const deleteTask = (id: string) => {
    storage.tasks.delete(id);
    setTasks(prev => prev.filter(t => t.id !== id));
    showSaveIndicator();
  };

  const initializeAutoTasks = () => {
    if (!weddingData.wedding_date) {
      console.error('Wedding date is required to initialize auto tasks');
      return;
    }

    const planningStartDate = weddingData.planning_start_date || new Date().toISOString().split('T')[0];

    const generatedTasks = generateTasksFromTemplates(
      planningStartDate,
      weddingData.wedding_date,
      taskTemplateData
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

    updateWeddingData({
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
