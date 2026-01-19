import { useTranslation } from 'react-i18next';
import { Filter, Download, ArrowUpDown } from 'lucide-react';
import { BUDGET_CATEGORIES } from './budgetCategories';

interface BudgetFiltersProps {
  categoryFilter: string;
  statusFilter: string;
  sortBy: string;
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
  onSortChange: (sort: string) => void;
  onExportCSV: () => void;
  onExportPDF: () => void;
}

export default function BudgetFilters({
  categoryFilter,
  statusFilter,
  sortBy,
  onCategoryChange,
  onStatusChange,
  onSortChange,
  onExportCSV,
  onExportPDF
}: BudgetFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="flex items-center gap-2 mb-2 text-sm font-medium" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
            <Filter size={16} />
            {t('budget.filterByCategory')}
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 transition-all text-sm"
            style={{ fontFamily: 'Open Sans, sans-serif', borderColor: '#d6b15b' }}
          >
            <option value="">{t('budget.allCategories')}</option>
            {BUDGET_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.emoji} {cat.value}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 mb-2 text-sm font-medium" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
            <Filter size={16} />
            {t('budget.filterByStatus')}
          </label>
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 transition-all text-sm"
            style={{ fontFamily: 'Open Sans, sans-serif', borderColor: '#d6b15b' }}
          >
            <option value="">{t('budget.allStatuses')}</option>
            <option value="open">{t('budget.status_open')}</option>
            <option value="partial">{t('budget.status_partial')}</option>
            <option value="paid">{t('budget.status_paid')}</option>
            <option value="overdue">{t('budget.overdueOnly')}</option>
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 mb-2 text-sm font-medium" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
            <ArrowUpDown size={16} />
            {t('budget.sortBy')}
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 transition-all text-sm"
            style={{ fontFamily: 'Open Sans, sans-serif', borderColor: '#d6b15b' }}
          >
            <option value="category">{t('budget.sortByCategory')}</option>
            <option value="amount_asc">{t('budget.sortByAmountAsc')}</option>
            <option value="amount_desc">{t('budget.sortByAmountDesc')}</option>
            <option value="due_date">{t('budget.sortByDueDate')}</option>
            <option value="status">{t('budget.sortByStatus')}</option>
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 mb-2 text-sm font-medium" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
            <Download size={16} />
            {t('budget.export')}
          </label>
          <div className="flex gap-2">
            <button
              onClick={onExportCSV}
              className="flex-1 px-3 py-2 rounded-md text-sm transition-all hover:opacity-90"
              style={{
                backgroundColor: '#d6b15b',
                color: 'white',
                fontFamily: 'Open Sans, sans-serif',
                fontWeight: 600
              }}
            >
              CSV
            </button>
            <button
              onClick={onExportPDF}
              className="flex-1 px-3 py-2 rounded-md text-sm transition-all hover:opacity-90"
              style={{
                backgroundColor: '#d6b15b',
                color: 'white',
                fontFamily: 'Open Sans, sans-serif',
                fontWeight: 600
              }}
            >
              PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
