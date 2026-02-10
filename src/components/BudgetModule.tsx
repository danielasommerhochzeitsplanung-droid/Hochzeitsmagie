import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Archive } from 'lucide-react';
import { storage } from '../lib/storage-adapter';
import BudgetModal from './BudgetModal';
import BudgetTable from './BudgetTable';
import BudgetStatistics from './BudgetStatistics';
import BudgetFilters from './BudgetFilters';

export interface BudgetItem {
  id: string;
  category: string;
  item_name: string;
  planned_amount: number;
  actual_amount: number;
  payment_status: 'open' | 'paid' | 'partial';
  due_date: string;
  notes: string;
  vendor_id: string | null;
  is_auto_synced: boolean;
  created_at?: string;
  updated_at?: string;
  archived?: boolean;
}

export default function BudgetModule() {
  const { t } = useTranslation();
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [totalBudget, setTotalBudget] = useState<number | null>(null);
  const [weddingDataId, setWeddingDataId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BudgetItem | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('category');
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    loadBudgetItems();
    loadTotalBudget();
  }, [showArchived]);

  const loadBudgetItems = () => {
    const allItems = storage.budgetItems.getAll();
    const filtered = allItems.filter(item => (item.archived || false) === showArchived);
    const sorted = filtered.sort((a, b) => a.category.localeCompare(b.category));
    setBudgetItems(sorted);
  };

  const loadTotalBudget = () => {
    const allWeddingData = storage.weddingData.getAll();
    if (allWeddingData.length > 0) {
      const data = allWeddingData[allWeddingData.length - 1];
      setWeddingDataId(data.id);
      setTotalBudget(data.total_budget || null);
    }
  };

  const saveTotalBudget = (amount: number | null) => {
    if (!weddingDataId) {
      console.error('Wedding data ID not loaded');
      alert('Fehler: Daten noch nicht geladen. Bitte versuche es erneut.');
      return;
    }

    storage.weddingData.update(weddingDataId, { total_budget: amount });
    setTotalBudget(amount);
  };

  const handleAddItem = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (item: BudgetItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSaveItem = (itemData: Omit<BudgetItem, 'id' | 'created_at' | 'updated_at'>) => {
    const dataToSave = {
      ...itemData,
      due_date: itemData.due_date || null,
      vendor_id: itemData.vendor_id || null,
    };

    if (editingItem) {
      storage.budgetItems.update(editingItem.id, dataToSave);
      loadBudgetItems();
      setIsModalOpen(false);
      setEditingItem(null);
    } else {
      storage.budgetItems.create(dataToSave);
      loadBudgetItems();
      setIsModalOpen(false);
    }
  };

  const handleDeleteItem = (id: string) => {
    storage.budgetItems.update(id, { archived: true });
    loadBudgetItems();
  };

  const handleArchiveItem = (id: string) => {
    storage.budgetItems.update(id, { archived: true });
    loadBudgetItems();
  };

  const handleRestoreItem = (id: string) => {
    storage.budgetItems.update(id, { archived: false });
    loadBudgetItems();
  };

  const handleDeletePermanently = (id: string) => {
    if (window.confirm(t('budget.confirmDeletePermanently'))) {
      storage.budgetItems.delete(id);
      loadBudgetItems();
    }
  };

  const getFilteredAndSortedItems = () => {
    let filtered = [...budgetItems];

    if (categoryFilter) {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    if (statusFilter) {
      if (statusFilter === 'overdue') {
        filtered = filtered.filter(item => {
          if (!item.due_date) return false;
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const due = new Date(item.due_date);
          due.setHours(0, 0, 0, 0);
          return due < today && item.payment_status !== 'paid';
        });
      } else {
        filtered = filtered.filter(item => item.payment_status === statusFilter);
      }
    }

    switch (sortBy) {
      case 'amount_asc':
        filtered.sort((a, b) => a.actual_amount - b.actual_amount);
        break;
      case 'amount_desc':
        filtered.sort((a, b) => b.actual_amount - a.actual_amount);
        break;
      case 'due_date':
        filtered.sort((a, b) => {
          if (!a.due_date && !b.due_date) return 0;
          if (!a.due_date) return 1;
          if (!b.due_date) return -1;
          return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
        });
        break;
      case 'status':
        filtered.sort((a, b) => a.payment_status.localeCompare(b.payment_status));
        break;
      case 'category':
      default:
        filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
    }

    return filtered;
  };

  const handleExportCSV = () => {
    const items = getFilteredAndSortedItems();
    const headers = ['Kategorie', 'Bezeichnung', 'Geplantes Budget', 'Tatsächliche Kosten', 'Status', 'Fälligkeitsdatum', 'Notizen'];
    const rows = items.map(item => [
      item.category,
      item.item_name || '',
      item.planned_amount.toString(),
      item.actual_amount.toString(),
      t(`budget.status_${item.payment_status}`),
      item.due_date || '',
      item.notes || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `budget_export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const handleExportPDF = () => {
    alert(t('budget.pdfExportInfo'));
  };

  const filteredItems = getFilteredAndSortedItems();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-6">
          <div className="flex gap-2">
            <button
              onClick={() => setShowArchived(false)}
              className={`px-6 py-3 transition-all ${
                !showArchived
                  ? 'border-b-2'
                  : 'hover:opacity-70'
              }`}
              style={!showArchived ? { borderColor: '#d6b15b', color: '#d6b15b', fontFamily: 'Open Sans, sans-serif' } : { color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}
            >
              💰 {t('budget.activeItems')}
            </button>
            <button
              onClick={() => setShowArchived(true)}
              className={`px-6 py-3 transition-all flex items-center gap-2 ${
                showArchived
                  ? 'border-b-2'
                  : 'hover:opacity-70'
              }`}
              style={showArchived ? { borderColor: '#d6b15b', color: '#d6b15b', fontFamily: 'Open Sans, sans-serif' } : { color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}
            >
              <Archive className="w-4 h-4" />
              {t('budget.archivedItems')}
            </button>
          </div>

          <span className="text-sm" style={{ color: '#666', fontFamily: 'Open Sans, sans-serif' }}>
            {filteredItems.length} {t('budget.of')} {budgetItems.length} {t('budget.items')}
          </span>
        </div>

        <button
          onClick={handleAddItem}
          className="px-6 py-2 rounded-md transition-all hover:opacity-90"
          style={{
            backgroundColor: '#d6b15b',
            color: 'white',
            fontFamily: 'Open Sans, sans-serif',
            fontWeight: 600
          }}
        >
          {t('budget.addItem')}
        </button>
      </div>

      <div className="border-b border-gray-200 mb-4"></div>

      <BudgetStatistics
        items={budgetItems}
        totalBudget={totalBudget}
        onSaveTotalBudget={saveTotalBudget}
      />

      <BudgetFilters
        categoryFilter={categoryFilter}
        statusFilter={statusFilter}
        sortBy={sortBy}
        onCategoryChange={setCategoryFilter}
        onStatusChange={setStatusFilter}
        onSortChange={setSortBy}
        onExportCSV={handleExportCSV}
        onExportPDF={handleExportPDF}
      />

      <BudgetTable
        items={filteredItems}
        onEdit={handleEditItem}
        onDelete={showArchived ? handleDeletePermanently : handleArchiveItem}
        onRestore={showArchived ? handleRestoreItem : undefined}
        showArchived={showArchived}
      />

      <BudgetModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveItem}
        item={editingItem}
      />
    </div>
  );
}
