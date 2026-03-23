import { X, Calendar, Clock, MapPin, Users, FileText, ExternalLink, CheckCircle2 } from 'lucide-react';
import { CalendarEvent } from '../types/calendar';
import { useTranslation } from 'react-i18next';

interface CalendarEventDetailModalProps {
  event: CalendarEvent;
  onClose: () => void;
  onOpenSource?: () => void;
}

export default function CalendarEventDetailModal({
  event,
  onClose,
  onOpenSource,
}: CalendarEventDetailModalProps) {
  const { t, i18n } = useTranslation();

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(i18n.language === 'de' ? 'de-DE' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (time: string) => {
    return time.substring(0, 5);
  };

  const getTypeLabel = (type: CalendarEvent['type']) => {
    const labels = {
      wedding_day_event: t('calendar.types.wedding_day_event'),
      todo: t('calendar.types.todo'),
      budget_deadline: t('calendar.types.budget_deadline'),
      guest_deadline: t('calendar.types.guest_deadline'),
      vendor_appointment: t('calendar.types.vendor_appointment'),
      other_event: t('calendar.types.other_event'),
    };
    return labels[type];
  };

  const getCategoryLabel = (category: string) => {
    const categoryKey = `master_tasks.categories.${category}`;
    const translated = t(categoryKey);
    return translated !== categoryKey ? translated : category;
  };

  const getTypeColor = (type: CalendarEvent['type']) => {
    const colors = {
      wedding_day_event: 'bg-pink-50 text-pink-700 border border-pink-200',
      todo: 'bg-blue-50 text-blue-700 border border-blue-200',
      budget_deadline: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
      guest_deadline: 'bg-violet-50 text-violet-700 border border-violet-200',
      vendor_appointment: 'bg-orange-50 text-orange-700 border border-orange-200',
      other_event: 'bg-slate-50 text-slate-700 border border-slate-200',
    };
    return colors[type];
  };

  const getPriorityLabel = (priority: string | undefined) => {
    if (!priority) return null;
    const labels: Record<string, string> = {
      high: t('todos.taskDetails.priorityHigh'),
      medium: t('todos.addDialog.priorityMedium'),
      low: t('todos.addDialog.priorityLow'),
    };
    return labels[priority] || priority;
  };

  const getPriorityColor = (priority: string | undefined) => {
    if (!priority) return '';
    const colors: Record<string, string> = {
      high: 'bg-red-50 text-red-700 border border-red-200',
      medium: 'bg-amber-50 text-amber-700 border border-amber-200',
      low: 'bg-slate-50 text-slate-600 border border-slate-200',
    };
    return colors[priority] || 'bg-slate-50 text-slate-600 border border-slate-200';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl text-gray-900">
            {t('calendar.eventDetails')}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <h3 className="text-2xl text-gray-900 mb-3">
              {event.title}
            </h3>

            <div className="flex flex-wrap gap-2">
              {event.metadata?.completed && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {t('supportTeam.completed')}
                </span>
              )}

              {event.metadata?.is_milestone ? (
                <span className="px-3 py-1 rounded-full text-sm bg-pink-50 text-pink-700 border border-pink-200">
                  {t('calendar.types.milestone')}
                </span>
              ) : (
                <span className={`px-3 py-1 rounded-full text-sm ${getTypeColor(event.type)}`}>
                  {getTypeLabel(event.type)}
                </span>
              )}

              {event.metadata?.category && (
                <span className="px-3 py-1 rounded-full text-sm bg-slate-50 text-slate-700 border border-slate-200">
                  {getCategoryLabel(event.metadata.category)}
                </span>
              )}

              {event.metadata?.priority && (
                <span className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(event.metadata.priority)}`}>
                  {getPriorityLabel(event.metadata.priority)}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-sm text-gray-500">
                  {t('calendar.date')}
                </div>
                <div className="text-gray-900">
                  {formatDate(event.date)}
                </div>
              </div>
            </div>

            {event.time && (
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-sm text-gray-500">
                    {t('calendar.time')}
                  </div>
                  <div className="text-gray-900">
                    {formatTime(event.time)}
                    {event.endTime && ` - ${formatTime(event.endTime)}`}
                  </div>
                </div>
              </div>
            )}

            {event.location && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-sm text-gray-500">
                    {t('calendar.location')}
                  </div>
                  <div className="text-gray-900">
                    {event.location}
                  </div>
                </div>
              </div>
            )}

            {event.participants && event.participants.length > 0 && (
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-sm text-gray-500">
                    {t('calendar.participants')}
                  </div>
                  <div className="text-gray-900">
                    {event.participants.join(', ')}
                  </div>
                </div>
              </div>
            )}

            {event.notes && (
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-sm text-gray-500">
                    {t('calendar.notes')}
                  </div>
                  <div className="text-gray-900 whitespace-pre-wrap">
                    {event.notes}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t">
          {onOpenSource && (
            <button
              onClick={onOpenSource}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              {t('calendar.openSourceModule')}
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-white bg-gray-800 rounded-lg hover:bg-gray-900 transition-colors"
          >
            {t('common.close')}
          </button>
        </div>
      </div>
    </div>
  );
}
