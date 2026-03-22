import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronRight, CheckCircle2, Circle } from 'lucide-react';

interface CategorySelection {
  [key: string]: {
    selected: boolean;
    subAreas: {
      [key: string]: boolean;
    };
  };
}

interface TaskSelectionDialogProps {
  isOpen: boolean;
  onComplete: (selectedCategories: string[]) => void;
  onCancel?: () => void;
}

const mainCategories = [
  {
    id: 'location_venue',
    icon: '🏛️',
    color: 'bg-emerald-500',
    subAreas: []
  },
  {
    id: 'ceremony_legal',
    icon: '💍',
    color: 'bg-blue-500',
    subAreas: []
  },
  {
    id: 'vendors_services',
    icon: '🤝',
    color: 'bg-purple-500',
    subAreas: [
      { id: 'catering_drinks', icon: '🍽️' },
      { id: 'music_entertainment', icon: '🎵' },
      { id: 'transport_logistics', icon: '🚗' },
    ]
  },
  {
    id: 'guests_communication',
    icon: '👥',
    color: 'bg-amber-500',
    subAreas: []
  },
  {
    id: 'styling_atmosphere',
    icon: '🎨',
    color: 'bg-cyan-500',
    subAreas: []
  },
  {
    id: 'styling_outfit',
    icon: '👗',
    color: 'bg-rose-500',
    subAreas: [
      { id: 'outfits_accessories', icon: '👗' },
    ]
  },
  {
    id: 'organization_closure',
    icon: '📋',
    color: 'bg-pink-500',
    subAreas: []
  },
];

export default function TaskSelectionDialog({ isOpen, onComplete, onCancel }: TaskSelectionDialogProps) {
  const { t } = useTranslation();

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [selections, setSelections] = useState<CategorySelection>(() => {
    const initial: CategorySelection = {};
    mainCategories.forEach(cat => {
      initial[cat.id] = {
        selected: true,
        subAreas: {}
      };
      cat.subAreas.forEach(sub => {
        initial[cat.id].subAreas[sub.id] = true;
      });
    });
    return initial;
  });

  if (!isOpen) return null;

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const toggleMainCategory = (categoryId: string) => {
    setSelections(prev => {
      const next = { ...prev };
      const newSelected = !next[categoryId].selected;
      next[categoryId] = {
        ...next[categoryId],
        selected: newSelected
      };

      const category = mainCategories.find(c => c.id === categoryId);
      if (category && category.subAreas.length > 0) {
        category.subAreas.forEach(sub => {
          next[categoryId].subAreas[sub.id] = newSelected;
        });
      }

      return next;
    });
  };

  const toggleSubArea = (categoryId: string, subAreaId: string) => {
    setSelections(prev => {
      const next = { ...prev };
      next[categoryId].subAreas[subAreaId] = !next[categoryId].subAreas[subAreaId];

      const category = mainCategories.find(c => c.id === categoryId);
      if (category && category.subAreas.length > 0) {
        const allSubAreasSelected = category.subAreas.every(
          sub => next[categoryId].subAreas[sub.id]
        );
        const someSubAreasSelected = category.subAreas.some(
          sub => next[categoryId].subAreas[sub.id]
        );

        next[categoryId].selected = allSubAreasSelected || someSubAreasSelected;
      }

      return next;
    });
  };

  const handleSubmit = () => {
    const selected: string[] = [];

    mainCategories.forEach(cat => {
      if (selections[cat.id].selected) {
        if (cat.subAreas.length === 0) {
          selected.push(cat.id);
        } else {
          cat.subAreas.forEach(sub => {
            if (selections[cat.id].subAreas[sub.id]) {
              selected.push(`${cat.id}:${sub.id}`);
            }
          });
        }
      }
    });

    onComplete(selected);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 overflow-y-auto py-4 sm:py-8">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 sm:p-8 my-auto">
        <div className="mb-6">
          <h2
            className="text-2xl mb-2"
            style={{ fontFamily: 'Cinzel, serif', color: '#3b3b3d', fontWeight: 'normal' }}
          >
            Aufgaben auswählen
          </h2>
          <p
            className="text-gray-600"
            style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '0.95rem' }}
          >
            Wähle die Bereiche aus, die für deine Hochzeit relevant sind
          </p>
        </div>

        <div className="space-y-2 mb-6 max-h-96 overflow-y-auto">
          {mainCategories.map(category => {
            const isExpanded = expandedCategories.has(category.id);
            const hasSubAreas = category.subAreas.length > 0;
            const categorySelected = selections[category.id].selected;

            return (
              <div key={category.id} className="border rounded-lg">
                <div
                  className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => hasSubAreas && toggleCategory(category.id)}
                >
                  {hasSubAreas && (
                    <button
                      type="button"
                      className="shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCategory(category.id);
                      }}
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMainCategory(category.id);
                    }}
                    className="shrink-0"
                  >
                    {categorySelected ? (
                      <CheckCircle2 className="w-5 h-5" style={{ color: '#d6b15b' }} />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300" />
                    )}
                  </button>

                  <span className="text-2xl">{category.icon}</span>

                  <span
                    className="font-medium flex-1"
                    style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}
                  >
                    {t(`master_tasks.categories.${category.id}`)}
                  </span>
                </div>

                {hasSubAreas && isExpanded && (
                  <div className="border-t bg-gray-50 p-2">
                    {category.subAreas.map(subArea => {
                      const subSelected = selections[category.id].subAreas[subArea.id];

                      return (
                        <div
                          key={subArea.id}
                          className="flex items-center gap-3 p-3 rounded hover:bg-white transition-colors cursor-pointer"
                          onClick={() => toggleSubArea(category.id, subArea.id)}
                        >
                          <div className="w-5 shrink-0" />

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSubArea(category.id, subArea.id);
                            }}
                            className="shrink-0"
                          >
                            {subSelected ? (
                              <CheckCircle2 className="w-5 h-5" style={{ color: '#d6b15b' }} />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-300" />
                            )}
                          </button>

                          <span className="text-xl">{subArea.icon}</span>

                          <span
                            className="text-sm"
                            style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}
                          >
                            {t(`master_tasks.sub_areas.${subArea.id}`)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex gap-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold transition-all hover:bg-gray-50"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              Abbrechen
            </button>
          )}
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 py-3 rounded-lg text-white font-semibold transition-all hover:opacity-90 shadow-md hover:shadow-lg"
            style={{
              fontFamily: 'Open Sans, sans-serif',
              backgroundColor: '#d6b15b',
            }}
          >
            Aufgaben hinzufügen
          </button>
        </div>
      </div>
    </div>
  );
}
