import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Checkbox from '@/components/atoms/Checkbox';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import TextArea from '@/components/atoms/TextArea';
import Select from '@/components/atoms/Select';
import TaskItemContent from '@/components/molecules/TaskItemContent';
import { isToday, isPast, parseISO } from 'date-fns';

const TaskCard = ({ task, category, isSelected, onToggleSelect, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || '',
    priority: task.priority,
    dueDate: task.dueDate
  });

  const dueDateObj = parseISO(task.dueDate);
  const isOverdue = isPast(dueDateObj) && !isToday(dueDateObj) && !task.completed;
  const isDueToday = isToday(dueDateObj);

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
          <Checkbox checked={task.completed} onClick={handleComplete} />

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-3">
                <Input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                  className="font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:border-primary pb-1 border-none focus:ring-0 rounded-none"
                />
                <TextArea
                  value={editData.description}
                  onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Add description..."
                  rows={2}
                  className="text-gray-600 bg-transparent border border-gray-300 rounded px-2 py-1 focus:border-primary resize-none"
                />
                <div className="flex items-center space-x-4">
                  <Select
                    value={editData.priority}
                    onChange={(e) => setEditData(prev => ({ ...prev, priority: parseInt(e.target.value) }))}
                    className="px-2 py-1 border border-gray-300 rounded focus:border-primary"
                  >
                    <option value={1}>Low</option>
                    <option value={2}>Medium</option>
                    <option value={3}>High</option>
                  </Select>
                  <Input
                    type="date"
                    value={editData.dueDate}
                    onChange={(e) => setEditData(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="px-2 py-1 border border-gray-300 rounded focus:border-primary"
                  />
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleSaveEdit}
                      className="px-3 py-1 bg-primary text-white rounded text-sm font-medium"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      className="px-3 py-1 text-gray-600 hover:text-gray-800 text-sm"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <TaskItemContent 
                task={{ ...task, isOverdue, isDueToday }} 
                category={category} 
                onClick={() => setIsEditing(true)} 
              />
            )}
          </div>

          {/* Actions */}
          {!isEditing && (
            <div className="flex items-start space-x-2">
              <Button
                onClick={onToggleSelect}
                className={`p-1 rounded ${
                  isSelected ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ApperIcon name="MoreHorizontal" size={16} />
              </Button>
              <Button
                onClick={onDelete}
                className="p-1 text-gray-400 hover:text-error"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ApperIcon name="Trash2" size={16} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;