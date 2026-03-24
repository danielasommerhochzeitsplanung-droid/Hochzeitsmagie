import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Search, User, Users, Briefcase } from 'lucide-react';
import { useWeddingData } from '../contexts/WeddingDataContext';

interface AssigneeMultiSelectProps {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  placeholder?: string;
}

interface Assignee {
  id: string;
  name: string;
  group: 'couple' | 'support' | 'vendor';
  role?: string;
  icon: typeof User;
}

export default function AssigneeMultiSelect({
  selectedIds,
  onChange,
  placeholder = 'Zugewiesen an...'
}: AssigneeMultiSelectProps) {
  const { weddingData, supportTeam, vendors } = useWeddingData();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const assignees: Assignee[] = [
    ...(weddingData.partner1_name
      ? [{
          id: 'partner1',
          name: weddingData.partner1_name,
          group: 'couple' as const,
          icon: User,
        }]
      : []),
    ...(weddingData.partner2_name
      ? [{
          id: 'partner2',
          name: weddingData.partner2_name,
          group: 'couple' as const,
          icon: User,
        }]
      : []),
    ...supportTeam.map(member => ({
      id: `support_${member.id}`,
      name: member.name,
      group: 'support' as const,
      role: member.role,
      icon: Users,
    })),
    ...vendors.map(vendor => ({
      id: `vendor_${vendor.id}`,
      name: vendor.name,
      group: 'vendor' as const,
      role: vendor.category,
      icon: Briefcase,
    })),
  ];

  const filteredAssignees = searchTerm
    ? assignees.filter(a =>
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.role?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : assignees;

  const groupedAssignees = {
    couple: filteredAssignees.filter(a => a.group === 'couple'),
    support: filteredAssignees.filter(a => a.group === 'support'),
    vendor: filteredAssignees.filter(a => a.group === 'vendor'),
  };

  const selectedAssignees = assignees.filter(a => selectedIds.includes(a.id));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (id: string) => {
    const newIds = selectedIds.includes(id)
      ? selectedIds.filter(selectedId => selectedId !== id)
      : [...selectedIds, id];
    onChange(newIds);
  };

  const handleRemoveChip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selectedIds.filter(selectedId => selectedId !== id));
  };

  const getGroupLabel = (group: 'couple' | 'support' | 'vendor') => {
    switch (group) {
      case 'couple':
        return 'HOCHZEITSPAAR';
      case 'support':
        return 'SUPPORT TEAM';
      case 'vendor':
        return 'DIENSTLEISTER';
    }
  };

  const getGroupIcon = (group: 'couple' | 'support' | 'vendor') => {
    switch (group) {
      case 'couple':
        return '💑';
      case 'support':
        return '👥';
      case 'vendor':
        return '💼';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="min-h-[42px] px-3 py-2 border-2 rounded-md cursor-pointer hover:border-opacity-80 transition-colors"
        style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 flex flex-wrap gap-1.5 items-center">
            {selectedAssignees.length === 0 ? (
              <span className="text-gray-500 text-sm">{placeholder}</span>
            ) : (
              selectedAssignees.map(assignee => {
                const Icon = assignee.icon;
                return (
                  <div
                    key={assignee.id}
                    className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-sm font-medium"
                    style={{ backgroundColor: '#f3ebe0', color: '#3b3b3d' }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{assignee.name}</span>
                    <button
                      onClick={(e) => handleRemoveChip(assignee.id, e)}
                      className="hover:opacity-70 transition-opacity ml-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
          <ChevronDown
            className={`w-4 h-4 flex-shrink-0 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
            style={{ color: '#d6b15b' }}
          />
        </div>
      </div>

      {isOpen && (
        <div
          className="absolute z-50 mt-1 w-full bg-white border-2 rounded-md shadow-lg max-h-96 overflow-hidden flex flex-col"
          style={{ borderColor: '#d6b15b' }}
        >
          <div className="p-2 border-b" style={{ borderColor: '#f3ebe0' }}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Suchen..."
                className="w-full pl-9 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{
                  borderColor: '#d6b15b',
                  fontFamily: 'Open Sans, sans-serif',
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          <div className="overflow-y-auto flex-1">
            {(['couple', 'support', 'vendor'] as const).map((group) => {
              const items = groupedAssignees[group];
              if (items.length === 0) return null;

              return (
                <div key={group}>
                  <div
                    className="px-3 py-2 text-xs font-bold sticky top-0 bg-gray-50 border-b"
                    style={{ color: '#3b3b3d', borderColor: '#e5e5e5', fontFamily: 'Open Sans, sans-serif' }}
                  >
                    {getGroupIcon(group)} {getGroupLabel(group)}
                  </div>
                  {items.map((assignee) => {
                    const isSelected = selectedIds.includes(assignee.id);
                    const Icon = assignee.icon;
                    return (
                      <div
                        key={assignee.id}
                        onClick={() => handleToggle(assignee.id)}
                        className="px-3 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center gap-3 border-b last:border-b-0"
                        style={{ borderColor: '#f3f4f6', fontFamily: 'Open Sans, sans-serif' }}
                      >
                        <div
                          className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                            isSelected ? 'bg-white' : 'bg-white'
                          }`}
                          style={{
                            borderColor: isSelected ? '#d6b15b' : '#d1d5db',
                            backgroundColor: isSelected ? '#d6b15b' : 'white',
                          }}
                        >
                          {isSelected && (
                            <svg
                              className="w-3 h-3 text-white"
                              viewBox="0 0 12 12"
                              fill="none"
                              stroke="currentColor"
                            >
                              <polyline points="2,6 5,9 10,3" strokeWidth="2" />
                            </svg>
                          )}
                        </div>
                        <Icon className="w-4 h-4 flex-shrink-0" style={{ color: '#666' }} />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm" style={{ color: '#3b3b3d' }}>
                            {assignee.name}
                          </div>
                          {assignee.role && (
                            <div className="text-xs text-gray-500">{assignee.role}</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {filteredAssignees.length === 0 && (
              <div className="px-3 py-8 text-center text-sm text-gray-500">
                Keine Ergebnisse gefunden
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
