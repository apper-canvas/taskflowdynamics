import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

const EmptyState = ({ searchQuery, activeCategory, onClearFilters }) => {
  if (searchQuery.trim()) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <ApperIcon name="Search" className="w-16 h-16 text-gray-300 mx-auto" />
        </motion.div>
        <h3 className="mt-4 text-lg font-medium text-gray-900">No tasks found</h3>
        <p className="mt-2 text-gray-500">
          No tasks match your search for "{searchQuery}"
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClearFilters}
          className="mt-4 px-4 py-2 text-primary hover:bg-primary/10 rounded-lg font-medium transition-colors"
        >
          Clear search
        </motion.button>
      </motion.div>
    );
  }

  if (activeCategory !== 'all') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <ApperIcon name="FolderOpen" className="w-16 h-16 text-gray-300 mx-auto" />
        </motion.div>
        <h3 className="mt-4 text-lg font-medium text-gray-900">No tasks in this category</h3>
        <p className="mt-2 text-gray-500">
          Create your first task in this category using the quick add bar above
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClearFilters}
          className="mt-4 px-4 py-2 text-primary hover:bg-primary/10 rounded-lg font-medium transition-colors"
        >
          View all tasks
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <motion.div
        animate={{ 
          rotate: [0, 10, -10, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 4,
          ease: "easeInOut"
        }}
      >
        <ApperIcon name="CheckSquare" className="w-20 h-20 text-primary/30 mx-auto" />
      </motion.div>
      <h3 className="mt-6 text-xl font-semibold text-gray-900 font-display">
        Ready to get productive?
      </h3>
      <p className="mt-3 text-gray-600 max-w-md mx-auto">
        Start by adding your first task using the quick add bar above. 
        Break big goals into smaller, manageable tasks and watch your productivity soar! 🚀
      </p>
      <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg max-w-md mx-auto">
        <h4 className="font-semibold text-gray-900 mb-2">Quick Tips:</h4>
        <ul className="text-left text-sm text-gray-600 space-y-1">
          <li>• Use ⌘+Enter to quickly save tasks</li>
          <li>• Set priority levels to stay focused</li>
          <li>• Organize with color-coded categories</li>
          <li>• Click tasks to edit them inline</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default EmptyState;