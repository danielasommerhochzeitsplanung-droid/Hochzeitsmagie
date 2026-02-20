import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ZoomIn, ZoomOut, Move, Baby, Star, Award, AlertTriangle, AlertCircle } from 'lucide-react';

interface Table {
  id: string;
  name: string;
  table_type: string;
  capacity: number;
  position_x: number;
  position_y: number;
  notes: string;
  event_id: string | null;
}

interface SeatingAssignment {
  id: string;
  table_id: string;
  guest_id: string;
  assigned_at: string;
  notes: string;
}

interface Guest {
  id: string;
  name: string;
  partner_name: string;
  number_of_adults: number;
  is_child: boolean;
  parent_guest_id: string | null;
  seating_preference: string;
  custom_table_id: string | null;
  age: number | null;
  seating_category?: 'standard' | 'child' | 'head_table' | 'vip' | 'special_needs' | 'conflict';
}

interface Props {
  tables: Table[];
  assignments: SeatingAssignment[];
  guests: Guest[];
  onUpdatePosition: (tableId: string, x: number, y: number) => void;
  onEditTable: (table: Table) => void;
}

export default function SeatingDesigner({ tables, assignments, guests, onUpdatePosition, onEditTable }: Props) {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [draggingTable, setDraggingTable] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  const gridSize = 20;
  const canvasWidth = 1200;
  const canvasHeight = 800;

  const getTableColor = (tableType: string) => {
    switch (tableType) {
      case 'round':
        return '#d6b15b';
      case 'rectangular':
        return '#8b7355';
      case 'head_table':
        return '#c9a959';
      case 'couple_table':
        return '#e8c674';
      default:
        return '#d6b15b';
    }
  };

  const getTableSize = (tableType: string, capacity: number) => {
    if (tableType === 'round') {
      const radius = Math.max(40, Math.min(80, capacity * 8));
      return { width: radius * 2, height: radius * 2, isRound: true };
    }
    if (tableType === 'head_table') {
      return { width: Math.max(200, capacity * 20), height: 60, isRound: false };
    }
    if (tableType === 'couple_table') {
      return { width: 80, height: 80, isRound: false };
    }
    return { width: Math.max(120, capacity * 15), height: 80, isRound: false };
  };

  const getTableAssignmentCount = (tableId: string) => {
    return assignments.filter(a => a.table_id === tableId).length;
  };

  const getGuestCategoryIcon = (category?: string) => {
    switch (category) {
      case 'child':
        return <Baby className="w-3 h-3" />;
      case 'head_table':
        return <Star className="w-3 h-3" />;
      case 'vip':
        return <Award className="w-3 h-3" />;
      case 'special_needs':
        return <AlertTriangle className="w-3 h-3" />;
      case 'conflict':
        return <AlertCircle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getGuestCategoryColor = (category?: string) => {
    switch (category) {
      case 'child':
        return '#374151';
      case 'head_table':
        return '#000000';
      case 'vip':
        return '#9CA3AF';
      case 'special_needs':
        return '#4B5563';
      case 'conflict':
        return '#DC2626';
      default:
        return '#6B7280';
    }
  };

  const handleMouseDown = (e: React.MouseEvent, tableId: string) => {
    if (e.button === 0) {
      const table = tables.find(t => t.id === tableId);
      if (table) {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
          const x = (e.clientX - rect.left - pan.x) / zoom;
          const y = (e.clientY - rect.top - pan.y) / zoom;
          setDragOffset({
            x: x - table.position_x,
            y: y - table.position_y
          });
          setDraggingTable(tableId);
        }
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggingTable) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const x = Math.max(0, Math.min(canvasWidth, (e.clientX - rect.left - pan.x) / zoom - dragOffset.x));
        const y = Math.max(0, Math.min(canvasHeight, (e.clientY - rect.top - pan.y) / zoom - dragOffset.y));

        const snappedX = Math.round(x / gridSize) * gridSize;
        const snappedY = Math.round(y / gridSize) * gridSize;

        onUpdatePosition(draggingTable, snappedX, snappedY);
      }
    } else if (isPanning) {
      const dx = e.clientX - panStart.x;
      const dy = e.clientY - panStart.y;
      setPan({ x: pan.x + dx, y: pan.y + dy });
      setPanStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setDraggingTable(null);
    setIsPanning(false);
  };

  const handlePanStart = (e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.altKey)) {
      setIsPanning(true);
      setPanStart({ x: e.clientX, y: e.clientY });
      e.preventDefault();
    }
  };

  const handleZoomIn = () => {
    setZoom(Math.min(2, zoom + 0.1));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(0.5, zoom - 0.1));
  };

  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setDraggingTable(null);
      setIsPanning(false);
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-white border rounded-lg p-4" style={{ borderColor: '#e5e5e5' }}>
        <div className="flex items-center gap-3">
          <button
            onClick={handleZoomOut}
            className="p-2 border rounded-lg hover:bg-gray-50 transition-all"
            style={{ borderColor: '#e5e5e5' }}
            title={t('seating.designer.zoomOut')}
          >
            <ZoomOut className="w-4 h-4" style={{ color: '#3b3b3d' }} />
          </button>
          <span className="text-sm px-3 py-1 bg-gray-50 rounded" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-2 border rounded-lg hover:bg-gray-50 transition-all"
            style={{ borderColor: '#e5e5e5' }}
            title={t('seating.designer.zoomIn')}
          >
            <ZoomIn className="w-4 h-4" style={{ color: '#3b3b3d' }} />
          </button>
          <button
            onClick={handleResetView}
            className="px-3 py-2 border rounded-lg hover:bg-gray-50 transition-all text-sm"
            style={{ borderColor: '#e5e5e5', fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}
          >
            {t('seating.designer.resetView')}
          </button>
        </div>
        <div className="flex items-center gap-2 text-sm" style={{ fontFamily: 'Open Sans, sans-serif', color: '#6b7280' }}>
          <Move className="w-4 h-4" />
          <span>{t('seating.designer.panHint')}</span>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-4 overflow-hidden" style={{ borderColor: '#e5e5e5' }}>
        <div
          ref={canvasRef}
          className="relative bg-gray-50 overflow-hidden"
          style={{
            width: '100%',
            height: '600px',
            cursor: isPanning ? 'grabbing' : draggingTable ? 'grabbing' : 'default',
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: `${gridSize * zoom}px ${gridSize * zoom}px`,
            backgroundPosition: `${pan.x}px ${pan.y}px`
          }}
          onMouseDown={handlePanStart}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: '0 0',
              width: `${canvasWidth}px`,
              height: `${canvasHeight}px`,
              position: 'relative'
            }}
          >
            {tables.map(table => {
              const size = getTableSize(table.table_type, table.capacity);
              const assignmentCount = getTableAssignmentCount(table.id);
              const isOverCapacity = assignmentCount > table.capacity;
              const color = getTableColor(table.table_type);

              return (
                <div
                  key={table.id}
                  style={{
                    position: 'absolute',
                    left: `${table.position_x}px`,
                    top: `${table.position_y}px`,
                    width: `${size.width}px`,
                    height: `${size.height}px`,
                    backgroundColor: color,
                    border: isOverCapacity ? '3px solid #ef4444' : '2px solid rgba(0, 0, 0, 0.2)',
                    borderRadius: size.isRound ? '50%' : '8px',
                    cursor: draggingTable === table.id ? 'grabbing' : 'grab',
                    boxShadow: draggingTable === table.id ? '0 8px 16px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.15)',
                    transition: draggingTable === table.id ? 'none' : 'box-shadow 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px',
                    userSelect: 'none'
                  }}
                  onMouseDown={(e) => handleMouseDown(e, table.id)}
                  onDoubleClick={() => onEditTable(table)}
                  title={`${table.name} - ${assignmentCount}/${table.capacity}`}
                >
                  <div
                    className="text-white font-semibold text-center"
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: size.width > 100 ? '14px' : '12px',
                      textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                      lineHeight: '1.2',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '100%'
                    }}
                  >
                    {table.name}
                  </div>
                  <div
                    className="text-white text-center mt-1"
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: size.width > 100 ? '11px' : '10px',
                      opacity: 0.9
                    }}
                  >
                    {assignmentCount}/{table.capacity}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-sm" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
          <strong>{t('seating.designer.instructions.title')}:</strong>
        </p>
        <ul className="text-sm mt-2 space-y-1" style={{ fontFamily: 'Open Sans, sans-serif', color: '#6b7280' }}>
          <li>• {t('seating.designer.instructions.drag')}</li>
          <li>• {t('seating.designer.instructions.doubleClick')}</li>
          <li>• {t('seating.designer.instructions.pan')}</li>
          <li>• {t('seating.designer.instructions.overCapacity')}</li>
        </ul>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['round', 'rectangular', 'head_table', 'couple_table'].map(type => (
            <div key={type} className="flex items-center gap-2">
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: getTableColor(type),
                  borderRadius: type === 'round' ? '50%' : '4px',
                  border: '1px solid rgba(0, 0, 0, 0.2)'
                }}
              />
              <span className="text-sm" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
                {t(`seating.tableType_${type}`)}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white border rounded-lg p-4" style={{ borderColor: '#e5e5e5' }}>
          <h4 className="text-sm font-semibold mb-3" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
            {t('seating.categoryLegend')}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {['standard', 'child', 'head_table', 'vip', 'special_needs', 'conflict'].map(category => (
              <div key={category} className="flex items-center gap-2">
                <div style={{ color: getGuestCategoryColor(category) }}>
                  {getGuestCategoryIcon(category) || <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: getGuestCategoryColor(category) }} />}
                </div>
                <span className="text-sm" style={{ fontFamily: 'Open Sans, sans-serif', color: '#3b3b3d' }}>
                  {t(`seating.categories.${category}`)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
