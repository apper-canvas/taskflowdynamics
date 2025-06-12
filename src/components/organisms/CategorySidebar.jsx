import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';

const CategorySidebar = ({ categories, activeCategory, onCategoryChange, tasks }) => {
  const getCategoryTaskCount = (categoryId) => {
    if (categoryId === 'all') return tasks.length;
    return tasks.filter(task => task.categoryId === categoryId).length;
  };

  const allCategories = [
    { id: 'all', name: 'All Tasks', color: '#6B7280', icon: 'List' },
    ...categories
  ];

  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
          Categories
        </h2>
        <div className="space-y-1">
          {allCategories.map((category) => {
            const taskCount = getCategoryTaskCount(category.id);
            const isActive = activeCategory === category.id;
            
            return (
              <Button
                key={category.id}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onCategoryChange(category.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="font-medium">{category.name}</span>
                </div>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  isActive 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {taskCount}
                </span>
              </Button>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Today's Progress</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Completed</span>
              <span className="font-medium text-success">
                {completedTasks}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Pending</span>
              <span className="font-medium text-gray-900">
                {pendingTasks}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total</span>
              <span className="font-medium text-primary">{totalTasks}</span>
            </div>
          </div>
          {totalTasks > 0 && (
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Progress</span>
                <span>
                  {progressPercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${progressPercentage}%`
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="bg-primary h-2 rounded-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;