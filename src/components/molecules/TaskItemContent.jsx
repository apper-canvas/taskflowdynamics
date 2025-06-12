import CategoryBadge from '@/components/molecules/CategoryBadge';
import PriorityIndicator from '@/components/molecules/PriorityIndicator';
import TaskStatusPill from '@/components/molecules/TaskStatusPill';

const TaskItemContent = ({ task, category, onClick }) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <div className="flex items-center space-x-2 mb-1">
        <h3 className={`font-medium break-words ${
          task.completed 
            ? 'text-gray-500 line-through' 
            : 'text-gray-900'
        }`}>
          {task.title}
        </h3>
        <PriorityIndicator 
          priority={task.priority} 
          isOverdue={task.isOverdue} 
          isCompleted={task.completed} 
        />
      </div>
      {task.description && (
        <p className={`text-sm mb-2 break-words ${
          task.completed ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {task.description}
        </p>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <CategoryBadge category={category} />
          <TaskStatusPill 
            dueDate={task.dueDate} 
            isOverdue={task.isOverdue} 
            isDueToday={task.isDueToday} 
            isCompleted={task.completed}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskItemContent;