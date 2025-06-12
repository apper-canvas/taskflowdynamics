import { motion } from 'framer-motion';

const Button = ({ children, onClick, className, whileHover, whileTap, type = 'button', ...props }) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={className}
      whileHover={whileHover || { scale: 1.05 }}
      whileTap={whileTap || { scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;