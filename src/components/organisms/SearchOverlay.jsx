import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

const SearchOverlay = ({ searchQuery, onSearchChange, onClose }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/50 z-50 flex items-start justify-center pt-20"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 overflow-hidden"
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <ApperIcon name="Search" className="text-gray-400" size={20} />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search tasks by title or description..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="flex-1 text-lg font-medium outline-none border-none focus:ring-0"
            />
            <Button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ApperIcon name="X" size={20} />
            </Button>
          </div>
        </div>
        <div className="p-4">
          <div className="text-sm text-gray-500">
            {searchQuery.trim() ? (
              <>Searching for: <span className="font-medium">"{searchQuery}"</span></>
            ) : (
              'Start typing to search your tasks...'
            )}
          </div>
          <div className="mt-4 text-xs text-gray-400">
            Press <kbd className="px-2 py-1 bg-gray-100 rounded">Escape</kbd> to close
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SearchOverlay;