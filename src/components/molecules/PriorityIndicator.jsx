import ApperIcon from '@/components/ApperIcon';

const PriorityIndicator = ({ priority, isOverdue, isCompleted, className }) => {
  const getPriorityConfig = (p) => {
    if (p >= 3) return { icon: 'AlertTriangle', color: 'text-accent' };
    if (p === 2) return { icon: 'Circle', color: 'text-warning' };
    return { icon: 'Minus', color: 'text-surface-400' };
  };

  const priorityConfig = getPriorityConfig(priority);

  return (
    <ApperIcon 
      name={priorityConfig.icon} 
      size={14} 
      className={`${priorityConfig.color} ${
        isOverdue && !isCompleted ? 'animate-pulse-priority' : ''
      } ${className || ''}`}
    />
  );
};

export default PriorityIndicator;