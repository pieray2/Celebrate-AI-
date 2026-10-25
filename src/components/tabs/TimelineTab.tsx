import React, { useState } from 'react';
import { CelebrationEvent, TimelineTask, TaskPriority } from '../../types/event';
import { formatDatePretty } from '../../utils/formatters';
import { useEvents } from '../../context/EventContext';
import { 
  CheckCircle2, 
  Circle, 
  Calendar, 
  Plus, 
  Trash2, 
  Edit2, 
  Clock, 
  Flag, 
  CheckCheck, 
  X,
  Filter
} from 'lucide-react';

interface TimelineTabProps {
  event: CelebrationEvent;
}

const PHASES = [
  '4-6 Months Prior',
  '2-3 Months Prior',
  '1 Month Prior',
  '2 Weeks Prior',
  '1 Week Prior',
  'Day Before & Event Day',
];

const PRIORITY_BADGES: Record<TaskPriority, { label: string; style: string }> = {
  high: { label: 'High Priority', style: 'bg-rose-50 text-rose-700 border-rose-200' },
  medium: { label: 'Medium', style: 'bg-amber-50 text-amber-700 border-amber-200' },
  low: { label: 'Low', style: 'bg-slate-100 text-slate-600 border-slate-200' },
};

export const TimelineTab: React.FC<TimelineTabProps> = ({ event }) => {
  const { toggleTaskComplete, addTask, updateTask, deleteTask } = useEvents();

  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed'>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TimelineTask | null>(null);

  // Form states for new task
  const [newTitle, setNewTitle] = useState('');
  const [newPhase, setNewPhase] = useState('1 Month Prior');
  const [newCategory, setNewCategory] = useState('General');
  const [newPriority, setNewPriority] = useState<TaskPriority>('medium');
  const [newDueDate, setNewDueDate] = useState(() => {
    return event.eventDate || new Date().toISOString().split('T')[0];
  });
  const [newNotes, setNewNotes] = useState('');

  // Metrics
  const totalTasks = event.timelineTasks.length;
  const completedTasks = event.timelineTasks.filter((t) => t.completed).length;
  const percentCompleted = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Filter tasks
  const filteredTasks = event.timelineTasks.filter((task) => {
    if (filterStatus === 'pending' && task.completed) return false;
    if (filterStatus === 'completed' && !task.completed) return false;
    if (filterPriority !== 'all' && task.priority !== filterPriority) return false;
    return true;
  });

  // Group by phase
  const tasksByPhase: Record<string, TimelineTask[]> = {};
  filteredTasks.forEach((task) => {
    const phaseKey = task.phase || 'General Preparations';
    if (!tasksByPhase[phaseKey]) {
      tasksByPhase[phaseKey] = [];
    }
    tasksByPhase[phaseKey].push(task);
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addTask(event.id, {
      title: newTitle.trim(),
      phase: newPhase,
      category: newCategory.trim() || 'General',
      priority: newPriority,
      dueDate: newDueDate,
      completed: false,
      notes: newNotes.trim() || undefined,
    });

    setNewTitle('');
    setNewNotes('');
    setIsAddModalOpen(false);
  };

  const handleUpdateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask) return;

    updateTask(event.id, editingTask);
    setEditingTask(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Timeline Progress Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-bold font-display text-slate-900">
              Celebration Countdown & Roadmap
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            {completedTasks} of {totalTasks} milestones completed ({percentCompleted}%)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-36 bg-slate-100 rounded-full h-3 overflow-hidden p-0.5">
            <div 
              className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${percentCompleted}%` }}
            />
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 sm:px-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-400 font-semibold mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
              filterStatus === 'all' ? 'bg-amber-100 text-amber-800' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All ({totalTasks})
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
              filterStatus === 'pending' ? 'bg-amber-100 text-amber-800' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Pending ({totalTasks - completedTasks})
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
              filterStatus === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Completed ({completedTasks})
          </button>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 bg-white"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>

      {/* Phased Roadmap Groupings */}
      {Object.keys(tasksByPhase).length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 text-slate-400 text-xs">
          No tasks found matching current filters.
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(tasksByPhase).map(([phase, tasks]) => (
            <div 
              key={phase}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden"
            >
              <div className="px-5 py-3.5 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider">
                    {phase}
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-slate-400">
                  {tasks.filter((t) => t.completed).length}/{tasks.length} done
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {tasks.map((task) => {
                  const isDone = !!task.completed;
                  const priorityMeta = PRIORITY_BADGES[task.priority] || PRIORITY_BADGES.medium;

                  return (
                    <div 
                      key={task.id}
                      className="p-4 sm:px-6 hover:bg-slate-50/60 transition-colors flex items-start sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-3.5 min-w-0 flex-1">
                        <button
                          type="button"
                          onClick={() => toggleTaskComplete(event.id, task.id)}
                          className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                            isDone 
                              ? 'bg-emerald-600 border-emerald-600 text-white' 
                              : 'border-slate-300 hover:border-slate-400 bg-white'
                          }`}
                          title={isDone ? 'Mark as pending' : 'Mark as complete'}
                        >
                          {isDone ? <CheckCheck className="w-3.5 h-3.5" /> : null}
                        </button>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                              {task.category}
                            </span>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${priorityMeta.style}`}>
                              {priorityMeta.label}
                            </span>
                            {task.dueDate && (
                              <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                                <Calendar className="w-3 h-3 text-slate-400" />
                                {formatDatePretty(task.dueDate)}
                              </span>
                            )}
                          </div>

                          <p className={`text-sm font-semibold text-slate-900 ${isDone ? 'line-through text-slate-400' : ''}`}>
                            {task.title}
                          </p>

                          {task.notes && (
                            <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                              {task.notes}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1.5 shrink-0 self-start sm:self-center">
                        <button
                          onClick={() => setEditingTask(task)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                          title="Edit task"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteTask(event.id, task.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete task"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Task Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-bold text-slate-900 font-display">
                Add Timeline Milestone Task
              </h4>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Schedule choreography rehearsals, Order sweets"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Timeline Phase
                  </label>
                  <select
                    value={newPhase}
                    onChange={(e) => setNewPhase(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 bg-white"
                  >
                    {PHASES.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as TaskPriority)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 bg-white"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="e.g. Venue, Catering, Music"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Notes & Details
                </label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Call vendor at 10 AM, ask for sample box"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs cursor-pointer"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {editingTask && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-bold text-slate-900 font-display">
                Edit Milestone Task
              </h4>
              <button 
                onClick={() => setEditingTask(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Timeline Phase
                  </label>
                  <select
                    value={editingTask.phase}
                    onChange={(e) => setEditingTask({ ...editingTask, phase: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 bg-white"
                  >
                    {PHASES.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={editingTask.priority}
                    onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value as TaskPriority })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 bg-white"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    required
                    value={editingTask.dueDate}
                    onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={editingTask.category}
                    onChange={(e) => setEditingTask({ ...editingTask, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Notes & Details
                </label>
                <textarea
                  rows={2}
                  value={editingTask.notes || ''}
                  onChange={(e) => setEditingTask({ ...editingTask, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="taskCompleteCheck"
                  checked={!!editingTask.completed}
                  onChange={(e) => setEditingTask({ ...editingTask, completed: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <label htmlFor="taskCompleteCheck" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Mark task as completed
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingTask(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs cursor-pointer"
                >
                  Update Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
