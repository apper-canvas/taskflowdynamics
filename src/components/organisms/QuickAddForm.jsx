import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import TextArea from '@/components/atoms/TextArea';
import Select from '@/components/atoms/Select';
import FormField from '@/components/molecules/FormField';
import { format } from 'date-fns';

const QuickAddForm = ({ categories, onAdd }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: categories[0]?.id || '',
    priority: 1,
    dueDate: format(new Date(), 'yyyy-MM-dd')
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onAdd({
      ...formData,
      completed: false,
      createdAt: new Date().toISOString()
    });

    setFormData({
      title: '',
      description: '',
      categoryId: categories[0]?.id || '',
      priority: 1,
      dueDate: format(new Date(), 'yyyy-MM-dd')
    });
    setIsExpanded(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.metaKey) {
      handleSubmit(e);
    }
    if (e.key === 'Escape') {
      setIsExpanded(false);
    }
  };

  const priorityOptions = [
    { value: 1, label: 'Low', color: 'text-surface-400' },
    { value: 2, label: 'Medium', color: 'text-warning' },
    { value: 3, label: 'High', color: 'text-accent' }
  ];

  return (
    <motion.div
      layout
      className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 hover:border-primary/50 transition-colors"
    >
      <form onSubmit={handleSubmit}>
        <div className="p-4">
          <div className="flex items-center space-x-3">
            <ApperIcon name="Plus" className="text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Add a new task... (⌘+Enter to save)"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              onFocus={() => setIsExpanded(true)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none text-gray-900 placeholder-gray-500 font-medium"
            />
            {formData.title.trim() && (
              <Button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                type="submit"
                className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <ApperIcon name="Plus" size={16} />
              </Button>
            )}
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-4 space-y-4 overflow-hidden"
              >
                <FormField label="Description">
                  <TextArea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Add more details..."
                    rows={2}
                  />
                </FormField>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField label="Category">
                    <Select
                      value={formData.categoryId}
                      onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </Select>
                  </FormField>

                  <FormField label="Priority">
                    <Select
                      value={formData.priority}
                      onChange={(e) => setFormData(prev => ({ ...prev, priority: parseInt(e.target.value) }))}
                    >
                      {priorityOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </FormField>

                  <FormField label="Due Date">
                    <Input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                    />
                  </FormField>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-sm text-gray-500">
                    Press ⌘+Enter to save, Escape to cancel
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      onClick={() => setIsExpanded(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                      Add Task
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
    </motion.div>
  );
};

export default QuickAddForm;