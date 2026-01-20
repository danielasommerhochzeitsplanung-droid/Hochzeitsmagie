import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Pencil, Trash2, AlertCircle, Building2 } from 'lucide-react';
import { BudgetItem } from './BudgetModule';
import { getCategoryEmoji } from './budgetCategories';
import { storage, Vendor } from '../lib/storage-adapter';

interface BudgetTableProps {
  items: BudgetItem[];
  onEdit: (item: BudgetItem) => void;
  onDelete: (id: string) => void;
}

export default function BudgetTable({ items, onEdit, onDelete }: BudgetTableProps) {
  const { t } = useTranslation();
  const [vendors, setVendors] = useState<Record<string, Vendor>>({});

  useEffect(() => {
    loadVendors();
  }, [items]);

  const loadVendors = () => {
    const vendorIds = items.filter(item => item.vendor_id).map(item => item.vendor_id);
    if (vendorIds.length === 0) return;

    const data = storage.vendors.getAll()
      .filter((v) => vendorIds.includes(v.id));

    const vendorMap = data.reduce((acc: Record<string, Vendor>, vendor) => {
      acc[vendor.id] = vendor;
      return acc;
    }, {} as Record<string, Vendor>);
    setVendors(vendorMap);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p style={{ fontFamily: 'Open Sans, sans-serif', color: '#666' }}>
          {t('budget.noItems')}
        </p>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('de-DE');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return '#10b981';
      case 'partial':
        return '#f59e0b';
      case 'open':
        return '#ef4444';
      default:
        return '#666';
    }
  };

  const isOverBudget = (item: BudgetItem) => {
    return item.actual_amount > item.planned_amount;
  };

  const getDaysUntilDue = (dueDate: string) => {
    if (!dueDate) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDueDateBadge = (dueDate: string) => {
    const daysUntil = getDaysUntilDue(dueDate);
    if (daysUntil === null) return null;

    if (daysUntil < 0) {
      return (
        <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>
          <AlertCircle size={12} />
          {t('budget.overdue')} ({Math.abs(daysUntil)}d)
        </div>
      );
    } else if (daysUntil <= 7) {
      return (
        <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>
          <AlertCircle size={12} />
          {t('budget.dueSoon')} ({daysUntil}d)
        </div>
      );
    }
    return null;
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
      <table className="w-full">
        <thead>
          <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
            <th className="px-4 py-3 text-left text-sm font-semibold" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
              {t('budget.category')}
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
              {t('budget.itemName')}
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
              {t('budget.vendor')}
            </th>
            <th className="px-4 py-3 text-right text-sm font-semibold" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
              {t('budget.plannedAmount')}
            </th>
            <th className="px-4 py-3 text-right text-sm font-semibold" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
              {t('budget.actualAmount')}
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
              {t('budget.paymentStatus')}
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
              {t('budget.dueDate')}
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
              {t('common.actions')}
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const overBudget = isOverBudget(item);
            const dueBadge = getDueDateBadge(item.due_date);

            return (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getCategoryEmoji(item.category)}</span>
                    <span>{item.category}</span>
                  </div>
                </td>
                <td className="px-4 py-3" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
                  {item.item_name || '-'}
                </td>
                <td className="px-4 py-3" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
                  {item.vendor_id && vendors[item.vendor_id] ? (
                    <div className="flex items-center gap-2">
                      <Building2 size={14} style={{ color: '#d6b15b' }} />
                      <span className="text-sm">{vendors[item.vendor_id].name}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">-</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right font-medium" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
                  {formatCurrency(item.planned_amount)}
                </td>
                <td className="px-4 py-3 text-right font-medium" style={{
                  fontFamily: 'Open Sans, sans-serif',
                  color: overBudget ? '#ef4444' : '#3b3b3d',
                  fontWeight: overBudget ? 'bold' : 'normal'
                }}>
                  <div className="flex items-center justify-end gap-2">
                    {overBudget && <AlertCircle size={16} style={{ color: '#ef4444' }} />}
                    {formatCurrency(item.actual_amount)}
                  </div>
                </td>
              <td className="px-4 py-3 text-center">
                <span
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: `${getStatusColor(item.payment_status)}20`,
                    color: getStatusColor(item.payment_status),
                    fontFamily: 'Open Sans, sans-serif'
                  }}
                >
                  {t(`budget.status_${item.payment_status}`)}
                </span>
              </td>
              <td className="px-4 py-3 text-center" style={{ fontFamily: 'Open Sans, sans-serif', color: '#666' }}>
                <div className="flex flex-col items-center gap-1">
                  <span>{formatDate(item.due_date)}</span>
                  {dueBadge}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                    title={t('common.edit')}
                  >
                    <Pencil size={16} style={{ color: '#d6b15b' }} />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                    title={t('common.delete')}
                  >
                    <Trash2 size={16} style={{ color: '#ef4444' }} />
                  </button>
                </div>
              </td>
            </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
