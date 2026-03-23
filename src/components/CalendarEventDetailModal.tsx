import { X, Calendar, Clock, MapPin, Users, FileText, ExternalLink } from 'lucide-react';
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
  const { t } = useTranslation();

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('de-DE', {
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

  const getSourceLabel = (source: CalendarEvent['source']) => {
    const labels = {
      events: t('calendar.sources.events'),
      todos: t('calendar.sources.todos'),
      budget: t('calendar.sources.budget'),
      guests: t('calendar.sources.guests'),
      vendors: t('calendar.sources.vendors'),
    };
    return labels[source];
  };

  const getTypeColor = (type: CalendarEvent['type']) => {
    const colors = {
      wedding_day_event: 'bg-pink-100 text-pink-800',
      todo: 'bg-blue-100 text-blue-800',
      budget_deadline: 'bg-green-100 text-green-800',
      guest_deadline: 'bg-purple-100 text-purple-800',
      vendor_appointment: 'bg-orange-100 text-orange-800',
      other_event: 'bg-gray-100 text-gray-800',
    };
    return colors[type];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {t('calendar.eventDetails')}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
              {event.metadata?.is_wedding_day && '💍 '}
              {event.metadata?.is_planning_start && '💍 '}
              {event.title}
              {event.metadata?.is_wedding_day && ' ✨'}
              {event.metadata?.is_planning_start && ' ✨'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {event.metadata?.is_milestone ? (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
                  {t('calendar.types.milestone')}
                </span>
              ) : (
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(
                    event.type
                  )}`}
                >
                  {getTypeLabel(event.type)}
                </span>
              )}
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                {getSourceLabel(event.source)}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <div className="text-sm text-gray-500">
                  {t('calendar.date')}
                </div>
                <div className="font-medium text-gray-900">
                  {formatDate(event.date)}
                </div>
              </div>
            </div>

            {event.time && (
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500">
                    {t('calendar.time')}
                  </div>
                  <div className="font-medium text-gray-900">
                    {formatTime(event.time)}
                    {event.endTime && ` - ${formatTime(event.endTime)}`}
                  </div>
                </div>
              </div>
            )}

            {event.location && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500">
                    {t('calendar.location')}
                  </div>
                  <div className="font-medium text-gray-900">
                    {event.location}
                  </div>
                </div>
              </div>
            )}

            {event.participants && event.participants.length > 0 && (
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500">
                    {t('calendar.participants')}
                  </div>
                  <div className="font-medium text-gray-900">
                    {event.participants.join(', ')}
                  </div>
                </div>
              </div>
            )}

            {event.notes && (
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500">
                    {t('calendar.notes')}
                  </div>
                  <div className="font-medium text-gray-900 whitespace-pre-wrap">
                    {event.notes}
                  </div>
                </div>
              </div>
            )}
          </div>

          {event.metadata &&
           !event.metadata.is_milestone &&
           Object.keys(event.metadata).length > 0 && (
            <div className="border-t pt-4">
              <div className="text-sm text-gray-500 mb-2">
                {t('calendar.additionalInfo')}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(event.metadata).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600 capitalize">{key}:</span>
                    <span className="font-medium text-gray-900">
                      {typeof value === 'boolean'
                        ? value
                          ? t('common.yes')
                          : t('common.no')
                        : String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t">
          {onOpenSource && (
            <button
              onClick={onOpenSource}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              {t('calendar.openSourceModule')}
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-900 transition-colors"
          >
            {t('common.close')}
          </button>
        </div>
      </div>
    </div>
  );
}
