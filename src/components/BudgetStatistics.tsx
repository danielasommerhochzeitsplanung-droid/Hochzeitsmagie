import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, TrendingDown, Wallet, Edit2, Check, X } from 'lucide-react';
import { BudgetItem } from './BudgetModule';

interface BudgetStatisticsProps {
  items: BudgetItem[];
  totalBudget: number | null;
  onSaveTotalBudget: (amount: number | null) => void;
}

export default function BudgetStatistics({ items, totalBudget, onSaveTotalBudget }: BudgetStatisticsProps) {
  const { t } = useTranslation();
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [budgetInput, setBudgetInput] = useState('');

  const totalPlanned = items.reduce((sum, item) => sum + item.planned_amount, 0);
  const totalActual = items.reduce((sum, item) => sum + item.actual_amount, 0);

  const budgetBase = totalBudget || totalPlanned;
  const remaining = budgetBase - totalPlanned;
  const percentageUsed = budgetBase > 0 ? (totalActual / budgetBase) * 100 : 0;
  const percentagePlanned = budgetBase > 0 ? (totalPlanned / budgetBase) * 100 : 0;

  const handleStartEdit = () => {
    setBudgetInput(totalBudget?.toString() || '');
    setIsEditingBudget(true);
  };

  const handleSaveBudget = () => {
    const amount = parseFloat(budgetInput);
    if (!isNaN(amount) && amount >= 0) {
      onSaveTotalBudget(amount);
      setIsEditingBudget(false);
    } else if (budgetInput === '') {
      onSaveTotalBudget(null);
      setIsEditingBudget(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingBudget(false);
    setBudgetInput('');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const isOverBudget = totalBudget ? totalPlanned > totalBudget : totalActual > totalPlanned;
  const progressColor = isOverBudget ? '#ef4444' : percentageUsed > 80 ? '#f59e0b' : '#10b981';

  const paidCount = items.filter(item => item.payment_status === 'paid').length;
  const partialCount = items.filter(item => item.payment_status === 'partial').length;
  const openCount = items.filter(item => item.payment_status === 'open').length;

  const overdueCount = items.filter(item => {
    if (!item.due_date || item.payment_status === 'paid') return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(item.due_date);
    due.setHours(0, 0, 0, 0);
    return due < today;
  }).length;

  const overBudgetCount = items.filter(item => item.actual_amount > item.planned_amount).length;

  return (
    <div className="space-y-6">
      {totalBudget !== null ? (
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border-2 border-amber-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold" style={{ fontFamily: 'Open Sans, sans-serif', color: '#d6b15b' }}>
              {t('budget.stats.totalBudgetLimit')}
            </span>
            {!isEditingBudget && (
              <button
                onClick={handleStartEdit}
                className="p-1 hover:bg-amber-100 rounded transition-colors"
                title={t('common.edit')}
              >
                <Edit2 size={16} style={{ color: '#d6b15b' }} />
              </button>
            )}
          </div>

          {isEditingBudget ? (
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
                placeholder="Budget eingeben..."
                autoFocus
              />
              <button
                onClick={handleSaveBudget}
                className="p-2 hover:bg-green-100 rounded transition-colors"
                title="Speichern"
              >
                <Check size={20} style={{ color: '#10b981' }} />
              </button>
              <button
                onClick={handleCancelEdit}
                className="p-2 hover:bg-red-100 rounded transition-colors"
                title="Abbrechen"
              >
                <X size={20} style={{ color: '#ef4444' }} />
              </button>
            </div>
          ) : (
            <>
              <div className="text-3xl font-bold mb-3" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
                {formatCurrency(totalBudget)}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span style={{ fontFamily: 'Open Sans, sans-serif', color: '#666' }}>
                    {t('budget.stats.planned')}:
                  </span>
                  <span className="font-semibold ml-2" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
                    {formatCurrency(totalPlanned)}
                  </span>
                  <span className="ml-2" style={{ fontFamily: 'Open Sans, sans-serif', color: '#666' }}>
                    ({percentagePlanned.toFixed(1)}%)
                  </span>
                </div>
                <div>
                  <span style={{ fontFamily: 'Open Sans, sans-serif', color: '#666' }}>
                    {t('budget.stats.stillAvailable')}:
                  </span>
                  <span
                    className="font-semibold ml-2"
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      color: remaining >= 0 ? '#10b981' : '#ef4444'
                    }}
                  >
                    {formatCurrency(Math.abs(remaining))}
                  </span>
                </div>
              </div>
              {isOverBudget && (
                <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded" style={{ fontFamily: 'Open Sans, sans-serif', color: '#dc2626', fontSize: '0.875rem' }}>
                  ⚠️ {t('budget.stats.budgetExceeded')}
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border-2 border-amber-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Wallet size={32} style={{ color: '#d6b15b' }} />
            <div>
              <h3 className="text-lg font-semibold" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
                {t('budget.stats.noBudgetSet')}
              </h3>
              <p className="text-sm" style={{ fontFamily: 'Open Sans, sans-serif', color: '#666' }}>
                {t('budget.stats.setBudgetDescription')}
              </p>
            </div>
          </div>
          {!isEditingBudget ? (
            <button
              onClick={handleStartEdit}
              className="px-6 py-2 rounded-md transition-all hover:opacity-90"
              style={{
                backgroundColor: '#d6b15b',
                color: 'white',
                fontFamily: 'Open Sans, sans-serif',
                fontWeight: 600
              }}
            >
              {t('budget.stats.setBudget')}
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
                placeholder="Budget eingeben..."
                autoFocus
              />
              <button
                onClick={handleSaveBudget}
                className="p-2 hover:bg-green-100 rounded transition-colors"
                title="Speichern"
              >
                <Check size={20} style={{ color: '#10b981' }} />
              </button>
              <button
                onClick={handleCancelEdit}
                className="p-2 hover:bg-red-100 rounded transition-colors"
                title="Abbrechen"
              >
                <X size={20} style={{ color: '#ef4444' }} />
              </button>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium" style={{ fontFamily: 'Open Sans, sans-serif', color: '#666' }}>
              {t('budget.stats.totalBudget')}
            </span>
            <Wallet size={20} style={{ color: '#d6b15b' }} />
          </div>
          <div className="text-2xl font-bold" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
            {formatCurrency(totalPlanned)}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium" style={{ fontFamily: 'Open Sans, sans-serif', color: '#666' }}>
              {t('budget.stats.totalSpent')}
            </span>
            <TrendingUp size={20} style={{ color: isOverBudget ? '#ef4444' : '#10b981' }} />
          </div>
          <div className="text-2xl font-bold" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
            {formatCurrency(totalActual)}
          </div>
          <div className="text-xs mt-1" style={{ fontFamily: 'Open Sans, sans-serif', color: '#666' }}>
            {percentageUsed.toFixed(1)}% {t('budget.stats.ofBudget')}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium" style={{ fontFamily: 'Open Sans, sans-serif', color: '#666' }}>
              {t('budget.stats.remaining')}
            </span>
            <TrendingDown size={20} style={{ color: remaining >= 0 ? '#10b981' : '#ef4444' }} />
          </div>
          <div
            className="text-2xl font-bold"
            style={{
              fontFamily: 'Open Sans, sans-serif',
              color: remaining >= 0 ? '#10b981' : '#ef4444'
            }}
          >
            {formatCurrency(Math.abs(remaining))}
          </div>
          <div className="text-xs mt-1" style={{ fontFamily: 'Open Sans, sans-serif', color: '#666' }}>
            {remaining >= 0 ? t('budget.stats.underBudget') : t('budget.stats.overBudget')}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
            {t('budget.stats.budgetProgress')}
          </span>
          <span className="text-sm font-bold" style={{ fontFamily: 'Open Sans, sans-serif', color: progressColor }}>
            {percentageUsed.toFixed(1)}%
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${Math.min(percentageUsed, 100)}%`,
              backgroundColor: progressColor
            }}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 pt-4 border-t border-gray-100">
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ fontFamily: 'Open Sans, sans-serif', color: '#10b981' }}>
              {paidCount}
            </div>
            <div className="text-xs mt-1" style={{ fontFamily: 'Open Sans, sans-serif', color: '#666' }}>
              {t('budget.stats.paid')}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ fontFamily: 'Open Sans, sans-serif', color: '#f59e0b' }}>
              {partialCount}
            </div>
            <div className="text-xs mt-1" style={{ fontFamily: 'Open Sans, sans-serif', color: '#666' }}>
              {t('budget.stats.partial')}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ fontFamily: 'Open Sans, sans-serif', color: '#ef4444' }}>
              {openCount}
            </div>
            <div className="text-xs mt-1" style={{ fontFamily: 'Open Sans, sans-serif', color: '#666' }}>
              {t('budget.stats.open')}
            </div>
          </div>
          {overdueCount > 0 && (
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ fontFamily: 'Open Sans, sans-serif', color: '#dc2626' }}>
                {overdueCount}
              </div>
              <div className="text-xs mt-1" style={{ fontFamily: 'Open Sans, sans-serif', color: '#666' }}>
                {t('budget.overdue')}
              </div>
            </div>
          )}
          {overBudgetCount > 0 && (
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ fontFamily: 'Open Sans, sans-serif', color: '#dc2626' }}>
                {overBudgetCount}
              </div>
              <div className="text-xs mt-1" style={{ fontFamily: 'Open Sans, sans-serif', color: '#666' }}>
                {t('budget.stats.overBudgetItems')}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
