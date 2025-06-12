import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

const BulkActionToolbar = ({ selectedCount, onComplete, onDelete, onClear }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-primary text-white px-6 py-3 flex items-center justify-between border-b border-primary/20"
    >
      <div className="flex items-center space-x-3">
        <span className="font-medium">
          {selectedCount} task{selectedCount !== 1 ? 's' : ''} selected
        </span>
      </div>
      
      <div className="flex items-center space-x-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="flex items-center space-x-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
        >
          <ApperIcon name="Check" size={16} />
          <span className="text-sm font-medium">Complete</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onDelete}
          className="flex items-center space-x-2 px-3 py-1 bg-accent/20 hover:bg-accent/30 rounded-lg transition-colors"
        >
          <ApperIcon name="Trash2" size={16} />
          <span className="text-sm font-medium">Delete</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClear}
          className="p-1 hover:bg-white/20 rounded"
        >
          <ApperIcon name="X" size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default BulkActionToolbar;