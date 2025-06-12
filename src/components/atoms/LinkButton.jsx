import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LinkButton = ({ to, children, className, whileHover, whileTap, ...props }) => {
  return (
    <motion.div
      whileHover={whileHover || { scale: 1.05 }}
      whileTap={whileTap || { scale: 0.95 }}
      {...props}
    >
      <Link to={to} className={className}>
        {children}
      </Link>
    </motion.div>
  );
};

export default LinkButton;