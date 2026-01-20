import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { BudgetItem } from './BudgetModule';
import { storage, Vendor } from '../lib/storage-adapter';
import { BUDGET_CATEGORIES } from './budgetCategories';

interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<BudgetItem, 'id' | 'created_at' | 'updated_at'>) => void;
  item: BudgetItem | null;
}

export default function BudgetModal({ isOpen, onClose, onSave, item }: BudgetModalProps) {
  const { t } = useTranslation();
  const [category, setCategory] = useState('');
  const [itemName, setItemName] = useState('');
  const [plannedAmount, setPlannedAmount] = useState('');
  const [actualAmount, setActualAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'open' | 'paid' | 'partial'>('open');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [vendorId, setVendorId] = useState<string>('');
  const [vendors, setVendors] = useState<Vendor[]>([]);

  useEffect(() => {
    if (isOpen) {
      loadVendors();
      if (item) {
        setCategory(item.category);
        setItemName(item.item_name || '');
        setPlannedAmount(item.planned_amount.toString());
        setActualAmount(item.actual_amount.toString());
        setPaymentStatus(item.payment_status);
        setDueDate(item.due_date || '');
        setNotes(item.notes || '');
        setVendorId(item.vendor_id || '');
      } else {
        setCategory('');
        setItemName('');
        setPlannedAmount('');
        setActualAmount('0');
        setPaymentStatus('open');
        setDueDate('');
        setNotes('');
        setVendorId('');
      }
    }
  }, [isOpen, item]);

  const loadVendors = () => {
    const data = storage.vendors.getAll()
      .filter((v) => !v.archived)
      .sort((a, b) => a.name.localeCompare(b.name));
    setVendors(data);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!category || !plannedAmount) return;

    onSave({
      category,
      item_name: itemName,
      planned_amount: parseFloat(plannedAmount),
      actual_amount: parseFloat(actualAmount) || 0,
      payment_status: paymentStatus,
      due_date: dueDate,
      notes,
      vendor_id: vendorId || null,
      is_auto_synced: false,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
            {item ? t('budget.editItem') : t('budget.addItem')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X size={20} style={{ color: '#666' }} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
                {t('budget.category')} *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 transition-all"
                style={{ fontFamily: 'Open Sans, sans-serif', borderColor: '#d6b15b' }}
                required
              >
                <option value="">{t('budget.selectCategory')}</option>
                {BUDGET_CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.emoji} {cat.value}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
                {t('budget.itemName')}
              </label>
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder={t('budget.itemNamePlaceholder')}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 transition-all"
                style={{ fontFamily: 'Open Sans, sans-serif', borderColor: '#d6b15b' }}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
                {t('budget.plannedAmount')} *
              </label>
              <input
                type="number"
                step="0.01"
                value={plannedAmount}
                onChange={(e) => setPlannedAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 transition-all"
                style={{ fontFamily: 'Open Sans, sans-serif', borderColor: '#d6b15b' }}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
                {t('budget.actualAmount')}
              </label>
              <input
                type="number"
                step="0.01"
                value={actualAmount}
                onChange={(e) => setActualAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 transition-all"
                style={{ fontFamily: 'Open Sans, sans-serif', borderColor: '#d6b15b' }}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
                {t('budget.paymentStatus')}
              </label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value as 'open' | 'paid' | 'partial')}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 transition-all"
                style={{ fontFamily: 'Open Sans, sans-serif', borderColor: '#d6b15b' }}
              >
                <option value="open">{t('budget.status_open')}</option>
                <option value="partial">{t('budget.status_partial')}</option>
                <option value="paid">{t('budget.status_paid')}</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
                {t('budget.dueDate')}
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 transition-all"
                style={{ fontFamily: 'Open Sans, sans-serif', borderColor: '#d6b15b' }}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
                {t('budget.vendor')}
              </label>
              <select
                value={vendorId}
                onChange={(e) => setVendorId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 transition-all"
                style={{ fontFamily: 'Open Sans, sans-serif', borderColor: '#d6b15b' }}
              >
                <option value="">{t('budget.noVendor')}</option>
                {vendors.map((vendor) => (
                  <option key={vendor.id} value={vendor.id}>
                    {vendor.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
                {t('budget.notes')}
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t('budget.notesPlaceholder')}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 transition-all resize-none"
                style={{ fontFamily: 'Open Sans, sans-serif', borderColor: '#d6b15b' }}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-md transition-all hover:bg-gray-100"
              style={{ fontFamily: 'Open Sans, sans-serif', color: '#666' }}
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-md transition-all hover:opacity-90"
              style={{
                backgroundColor: '#d6b15b',
                color: 'white',
                fontFamily: 'Open Sans, sans-serif',
                fontWeight: 600
              }}
            >
              {t('common.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
