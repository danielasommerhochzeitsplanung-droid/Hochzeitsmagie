import { useState } from 'react';
import { CheckCircle2, Circle, Calendar, Plus, Edit2, X } from 'lucide-react';
import { useWeddingData, Task } from '../contexts/WeddingDataContext';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id' | 'created_at'>) => void;
  task: Task | null;
}

function TaskModal({ isOpen, onClose, onSave, task }: TaskModalProps) {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    due_date: task?.due_date || '',
    priority: task?.priority || 'medium' as 'high' | 'medium' | 'low',
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!formData.title.trim()) return;

    onSave({
      title: formData.title,
      description: formData.description,
      category: 'location',
      due_date: formData.due_date || undefined,
      priority: formData.priority,
      completed: false,
      is_system_generated: false,
    });

    setFormData({
      title: '',
      description: '',
      due_date: '',
      priority: 'medium',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold" style={{ color: '#3b3b3d' }}>
            {task ? 'Task bearbeiten' : 'Neuer Location-Task'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d' }}>
              Titel
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border-2 rounded-md"
              style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
              placeholder="z.B. Location besichtigen"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d' }}>
              Beschreibung
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border-2 rounded-md"
              style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
              rows={3}
              placeholder="Optionale Details..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d' }}>
              Fälligkeitsdatum
            </label>
            <input
              type="date"
              value={formData.due_date}
              onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
              className="w-full px-3 py-2 border-2 rounded-md"
              style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#3b3b3d' }}>
              Priorität
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'high' | 'medium' | 'low' })}
              className="w-full px-3 py-2 border-2 rounded-md"
              style={{ borderColor: '#d6b15b', fontFamily: 'Open Sans, sans-serif' }}
            >
              <option value="low">Niedrig</option>
              <option value="medium">Mittel</option>
              <option value="high">Hoch</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 rounded-md transition-all hover:opacity-90 font-semibold"
            style={{
              backgroundColor: '#d6b15b',
              color: 'white',
              fontFamily: 'Open Sans, sans-serif',
            }}
          >
            {task ? 'Speichern' : 'Hinzufügen'}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-md border-2 transition-all hover:bg-gray-50 font-semibold"
            style={{
              borderColor: '#d6b15b',
              color: '#3b3b3d',
              fontFamily: 'Open Sans, sans-serif',
            }}
          >
            Abbrechen
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LocationTasksSection() {
  const { tasks, addTask, updateTask, deleteTask } = useWeddingData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const locationTasks = tasks.filter(task => task.category === 'location');

  const handleToggleTask = (task: Task) => {
    updateTask(task.id, {
      completed: !task.completed,
      completed_at: !task.completed ? new Date().toISOString() : undefined,
    });
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'created_at'>) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }
    setEditingTask(null);
  };

  const handleDeleteTask = (id: string) => {
    if (window.confirm('Diesen Task wirklich löschen?')) {
      deleteTask(id);
    }
  };

  const sortedTasks = [...locationTasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    if (!a.due_date || !b.due_date) return 0;
    return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
  });

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold" style={{ color: '#3b3b3d', fontFamily: 'Open Sans, sans-serif' }}>
          Tasks für Locations & Räumlichkeiten
        </h3>
        <button
          onClick={() => {
            setEditingTask(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 rounded-md transition-all hover:opacity-90 flex items-center gap-2"
          style={{
            backgroundColor: '#d6b15b',
            color: 'white',
            fontFamily: 'Open Sans, sans-serif',
            fontWeight: 600
          }}
        >
          <Plus className="w-4 h-4" />
          Task hinzufügen
        </button>
      </div>

      {sortedTasks.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2" style={{ borderColor: '#e5e5e5' }}>
          <Calendar className="w-10 h-10 mx-auto mb-3" style={{ color: '#d6b15b' }} />
          <p className="text-gray-600" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            Keine Tasks für Locations vorhanden
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border-2" style={{ borderColor: '#d6b15b' }}>
          {sortedTasks.map(task => {
            const isOverdue = task.due_date && new Date(task.due_date) < new Date() && !task.completed;

            return (
              <div
                key={task.id}
                className="flex items-start gap-3 px-4 py-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                style={{ borderColor: '#f3f4f6' }}
              >
                <button
                  onClick={() => handleToggleTask(task)}
                  className="flex-shrink-0 mt-0.5"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400 hover:text-emerald-500 transition-colors" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4
                      className={`font-medium ${
                        task.completed ? 'line-through text-gray-400' : 'text-gray-900'
                      }`}
                      style={{ fontFamily: 'Open Sans, sans-serif' }}
                    >
                      {task.title}
                    </h4>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {task.priority === 'high' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-rose-100 text-rose-700 font-medium">
                          Hoch
                        </span>
                      )}
                      <button
                        onClick={() => handleEditTask(task)}
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                        title="Task bearbeiten"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-gray-400 hover:text-rose-500 transition-colors"
                        title="Task löschen"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {task.description && (
                    <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                      {task.description}
                    </p>
                  )}

                  {task.due_date && (
                    <div className="flex items-center gap-1 mt-1">
                      <Calendar className="w-3.5 h-3.5" style={{ color: isOverdue ? '#dc2626' : '#666' }} />
                      <span
                        className={`text-xs ${isOverdue ? 'text-rose-600 font-semibold' : 'text-gray-600'}`}
                        style={{ fontFamily: 'Open Sans, sans-serif' }}
                      >
                        {new Date(task.due_date).toLocaleDateString('de-DE')}
                        {isOverdue && ' (überfällig)'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        task={editingTask}
      />
    </div>
  );
}
