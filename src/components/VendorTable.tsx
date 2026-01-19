import { useTranslation } from 'react-i18next';
import { Edit2, Trash2, Phone, Mail, Globe, Star, Calendar, Archive, RotateCcw } from 'lucide-react';
import { Vendor } from './VendorsModule';
import { getCategoryEmoji } from './vendorCategories';

interface VendorTableProps {
  vendors: Vendor[];
  onEdit: (vendor: Vendor) => void;
  onArchive: (id: string) => void;
  onRestore: (id: string) => void;
  onDelete: (id: string) => void;
  showArchived: boolean;
}

export default function VendorTable({ vendors, onEdit, onArchive, onRestore, onDelete, showArchived }: VendorTableProps) {
  const { t } = useTranslation();

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return '-';
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Gebucht':
      case 'Bezahlt':
        return 'bg-green-100 text-green-800';
      case 'Zugesagt':
        return 'bg-blue-100 text-blue-800';
      case 'Angebot erhalten':
        return 'bg-yellow-100 text-yellow-800';
      case 'Abgesagt':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (vendors.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500" style={{ fontFamily: 'Open Sans, sans-serif' }}>
          {showArchived ? t('vendors.noArchivedVendors') : t('vendors.noVendors')}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #d6b15b' }}>
            <th className="text-left p-3" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontWeight: 600 }}>
              {t('vendors.category')}
            </th>
            <th className="text-left p-3" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontWeight: 600 }}>
              {t('vendors.companyName')}
            </th>
            <th className="text-left p-3" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontWeight: 600 }}>
              {t('vendors.contact')}
            </th>
            <th className="text-left p-3" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontWeight: 600 }}>
              {t('vendors.status')}
            </th>
            <th className="text-left p-3" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontWeight: 600 }}>
              {t('vendors.pricing')}
            </th>
            <th className="text-left p-3" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontWeight: 600 }}>
              {t('vendors.nextAppointment')}
            </th>
            <th className="text-center p-3" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontWeight: 600 }}>
              {t('vendors.rating')}
            </th>
            <th className="text-center p-3" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d', fontWeight: 600 }}>
              {t('common.actions')}
            </th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr
              key={vendor.id}
              className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              style={{ opacity: showArchived ? 0.7 : 1 }}
            >
              <td className="p-3" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
                <div className="font-medium">
                  <span className="mr-2">{getCategoryEmoji(vendor.category)}</span>
                  {vendor.category}
                </div>
              </td>
              <td className="p-3" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
                <div className="font-semibold">{vendor.company_name}</div>
                {vendor.contact_person && (
                  <div className="text-sm text-gray-600">{vendor.contact_person}</div>
                )}
              </td>
              <td className="p-3" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                <div className="space-y-1">
                  {vendor.phone && (
                    <div className="flex items-center gap-1 text-sm">
                      <Phone className="w-3 h-3" style={{ color: '#d6b15b' }} />
                      <a href={`tel:${vendor.phone}`} className="hover:underline" style={{ color: '#3b3b3d' }}>
                        {vendor.phone}
                      </a>
                    </div>
                  )}
                  {vendor.email && (
                    <div className="flex items-center gap-1 text-sm">
                      <Mail className="w-3 h-3" style={{ color: '#d6b15b' }} />
                      <a href={`mailto:${vendor.email}`} className="hover:underline" style={{ color: '#3b3b3d' }}>
                        {vendor.email}
                      </a>
                    </div>
                  )}
                  {vendor.website && (
                    <div className="flex items-center gap-1 text-sm">
                      <Globe className="w-3 h-3" style={{ color: '#d6b15b' }} />
                      <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#3b3b3d' }}>
                        Website
                      </a>
                    </div>
                  )}
                </div>
              </td>
              <td className="p-3">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vendor.status)}`}>
                  {vendor.status}
                </span>
                {vendor.payment_status && (
                  <div className="text-xs text-gray-600 mt-1" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    {vendor.payment_status}
                  </div>
                )}
              </td>
              <td className="p-3" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
                {vendor.price_estimate && (
                  <div className="text-sm">
                    <span className="text-gray-600">{t('vendors.estimate')}: </span>
                    <span className="font-medium">{formatCurrency(vendor.price_estimate)}</span>
                  </div>
                )}
                {vendor.final_price && (
                  <div className="text-sm">
                    <span className="text-gray-600">{t('vendors.final')}: </span>
                    <span className="font-semibold" style={{ color: '#d6b15b' }}>
                      {formatCurrency(vendor.final_price)}
                    </span>
                  </div>
                )}
                {!vendor.price_estimate && !vendor.final_price && '-'}
              </td>
              <td className="p-3" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
                {vendor.next_appointment ? (
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="w-4 h-4" style={{ color: '#d6b15b' }} />
                    <span>{formatDateTime(vendor.next_appointment)}</span>
                  </div>
                ) : (
                  '-'
                )}
              </td>
              <td className="p-3">
                <div className="flex justify-center">
                  {vendor.rating ? (
                    <div className="flex items-center gap-1">
                      {[...Array(vendor.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4" fill="#d6b15b" stroke="#d6b15b" />
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </div>
              </td>
              <td className="p-3">
                <div className="flex justify-center gap-2">
                  {!showArchived && (
                    <>
                      <button
                        onClick={() => onEdit(vendor)}
                        className="p-2 hover:bg-gray-100 rounded transition-colors"
                        style={{ color: '#d6b15b' }}
                        title={t('common.edit')}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onArchive(vendor.id)}
                        className="p-2 hover:bg-gray-100 rounded transition-colors"
                        style={{ color: '#d6b15b' }}
                        title={t('common.archive')}
                      >
                        <Archive className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  {showArchived && (
                    <>
                      <button
                        onClick={() => onRestore(vendor.id)}
                        className="p-2 hover:bg-gray-100 rounded transition-colors"
                        style={{ color: '#d6b15b' }}
                        title={t('common.restore')}
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(vendor.id)}
                        className="p-2 hover:bg-red-50 rounded transition-colors text-red-600"
                        title={t('common.deletePermanently')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
