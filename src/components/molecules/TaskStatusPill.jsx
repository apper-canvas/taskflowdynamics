import { format } from 'date-fns';

const TaskStatusPill = ({ dueDate, isOverdue, isDueToday, isCompleted, className }) => {
  return (
    <span className={`text-xs ${
      isOverdue && !isCompleted ? 'text-accent font-medium' : 
      isDueToday && !isCompleted ? 'text-warning font-medium' : 
      'text-gray-500'
    } ${className || ''}`}>
      {isDueToday ? 'Due today' : 
       isOverdue && !isCompleted ? 'Overdue' : 
       format(new Date(dueDate), 'MMM d')}
    </span>
  );
};

export default TaskStatusPill;