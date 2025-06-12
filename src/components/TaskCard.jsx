import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from './ApperIcon';
import { format, isToday, isPast, parseISO } from 'date-fns';

const TaskCard = ({ task, category, isSelected, onToggleSelect, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || '',
    priority: task.priority,
    dueDate: task.dueDate
  });

  const dueDate = parseISO(task.dueDate);
  const isOverdue = isPast(dueDate) && !isToday(dueDate) && !task.completed;
  const isDueToday = isToday(dueDate);

  const handleComplete = () => {
    onUpdate({ completed: !task.completed });
  };

  const handleSaveEdit = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditData({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      dueDate: task.dueDate
    });
    setIsEditing(false);
  };

  const getPriorityIcon = (priority) => {
    if (priority >= 3) return { icon: 'AlertTriangle', color: 'text-accent' };
    if (priority === 2) return { icon: 'Circle', color: 'text-warning' };
    return { icon: 'Minus', color: 'text-surface-400' };
  };

  const priorityConfig = getPriorityIcon(task.priority);

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.02, y: -2 }}
      className={`bg-white rounded-lg border-l-4 shadow-sm hover:shadow-md transition-all duration-200 ${
        isSelected ? 'ring-2 ring-primary' : ''
      } ${task.completed ? 'opacity-75' : ''}`}
      style={{ borderLeftColor: category?.color || '#6B7280' }}
    >
      <div className="p-4">
        <div className="flex items-start space-x-3">
          {/* Checkbox */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleComplete}
            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
              task.completed
                ? 'bg-success border-success text-white'
                : 'border-gray-300 hover:border-primary'
            }`}
          >
            {task.completed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500 }}
              >
                <ApperIcon name="Check" size={12} />
              </motion.div>
            )}
          </motion.button>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:border-primary outline-none pb-1"
                />
                <textarea
                  value={editData.description}
                  onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Add description..."
                  rows={2}
                  className="w-full text-gray-600 bg-transparent border border-gray-300 rounded px-2 py-1 focus:border-primary outline-none resize-none"
                />
                <div className="flex items-center space-x-4">
                  <select
                    value={editData.priority}
                    onChange={(e) => setEditData(prev => ({ ...prev, priority: parseInt(e.target.value) }))}
                    className="px-2 py-1 border border-gray-300 rounded focus:border-primary outline-none"
                  >
                    <option value={1}>Low</option>
                    <option value={2}>Medium</option>
                    <option value={3}>High</option>
                  </select>
                  <input
                    type="date"
                    value={editData.dueDate}
                    onChange={(e) => setEditData(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="px-2 py-1 border border-gray-300 rounded focus:border-primary outline-none"
                  />
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSaveEdit}
                      className="px-3 py-1 bg-primary text-white rounded text-sm font-medium"
                    >
                      Save
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCancelEdit}
                      className="px-3 py-1 text-gray-600 hover:text-gray-800 text-sm"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </div>
              </div>
            ) : (
              <div onClick={() => setIsEditing(true)} className="cursor-pointer">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className={`font-medium break-words ${
                    task.completed 
                      ? 'text-gray-500 line-through' 
                      : 'text-gray-900'
                  }`}>
                    {task.title}
                  </h3>
                  <ApperIcon 
                    name={priorityConfig.icon} 
                    size={14} 
                    className={`${priorityConfig.color} ${
                      isOverdue && !task.completed ? 'animate-pulse-priority' : ''
                    }`}
                  />
                </div>
                {task.description && (
                  <p className={`text-sm mb-2 break-words ${
                    task.completed ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {task.description}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span 
                      className="text-xs px-2 py-1 rounded-full text-white font-medium"
                      style={{ backgroundColor: category?.color || '#6B7280' }}
                    >
                      {category?.name || 'Uncategorized'}
                    </span>
                    <span className={`text-xs ${
                      isOverdue ? 'text-accent font-medium' : 
                      isDueToday ? 'text-warning font-medium' : 
                      'text-gray-500'
                    }`}>
                      {isDueToday ? 'Due today' : 
                       isOverdue ? 'Overdue' : 
                       format(dueDate, 'MMM d')}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          {!isEditing && (
            <div className="flex items-start space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onToggleSelect}
                className={`p-1 rounded ${
                  isSelected ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <ApperIcon name="MoreHorizontal" size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onDelete}
                className="p-1 text-gray-400 hover:text-error"
              >
                <ApperIcon name="Trash2" size={16} />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;