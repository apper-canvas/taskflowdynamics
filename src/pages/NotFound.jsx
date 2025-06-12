import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ApperIcon from '../components/ApperIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <ApperIcon name="FileX" className="w-24 h-24 text-gray-300 mx-auto mb-6" />
        </motion.div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4 font-display">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Looks like this task got lost! Let's get you back to your productivity dashboard.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <ApperIcon name="ArrowLeft" size={20} />
            <span>Back to Tasks</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;