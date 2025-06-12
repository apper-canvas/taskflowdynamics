import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import taskService from '@/services/api/taskService';
import categoryService from '@/services/api/categoryService';
import QuickAddForm from '@/components/organisms/QuickAddForm';
import TaskCard from '@/components/organisms/TaskCard';
import CategorySidebar from '@/components/organisms/CategorySidebar';
import SearchOverlay from '@/components/organisms/SearchOverlay';
import BulkActionToolbar from '@/components/organisms/BulkActionToolbar';
import EmptyState from '@/components/organisms/EmptyState';
import Button from '@/components/atoms/Button';
import { isToday, isPast, parseISO } from 'date-fns';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [showSearch, setShowSearch] = useState(false);

  // Calculate completed tasks for today
  const completedCountToday = useMemo(() => {
    return tasks.filter(task => task.completed && isToday(parseISO(task.completedAt || task.createdAt))).length;
  }, [tasks]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ]);
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message || 'Failed to load data');
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    if (activeCategory !== 'all') {
      filtered = filtered.filter(task => task.categoryId === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => {
      // Sort completed tasks to the bottom
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      // Sort by priority (high to low) for uncompleted tasks
      if (a.priority !== b.priority) return b.priority - a.priority;
      // Finally, sort by creation date
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  }, [tasks, activeCategory, searchQuery]);

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [newTask, ...prev]);
      toast.success('Task added successfully!');
    } catch (err) {
      toast.error('Failed to add task');
    }
  };

  const handleUpdateTask = async (id, updates) => {
    const taskToUpdate = tasks.find(task => task.id === id);
    const updatedTaskData = { ...taskToUpdate, ...updates };

    // Set completedAt timestamp if task is being completed
    if (updates.completed && !taskToUpdate.completed) {
      updatedTaskData.completedAt = new Date().toISOString();
    } else if (!updates.completed && taskToUpdate.completed) {
      // Clear completedAt if task is being uncompleted
      delete updatedTaskData.completedAt;
    }

    setTasks(prev => prev.map(task => 
      task.id === id ? updatedTaskData : task
    ));
    
    try {
      await taskService.update(id, updates);
      if (updates.completed !== undefined) {
        if (updates.completed) {
          toast.success('Task completed! 🎉');
        }
      } else {
        toast.success('Task updated successfully!');
      }
    } catch (err) {
      // Revert state on error and reload data
      loadData();
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      setTasks(prev => prev.filter(task => task.id !== id));
      await taskService.delete(id);
      toast.success('Task deleted');
    } catch (err) {
      // Revert state on error and reload data
      loadData();
      toast.error('Failed to delete task');
    }
  };

  const handleBulkComplete = async () => {
    const taskIds = Array.from(selectedTasks);
    try {
      const updatesPromises = taskIds.map(id => {
        const task = tasks.find(t => t.id === id);
        // Only update if not already completed
        if (!task.completed) {
          return handleUpdateTask(id, { completed: true });
        }
        return Promise.resolve(); // Already completed, no update needed
      });
      await Promise.all(updatesPromises);
      setSelectedTasks(new Set());
    } catch (err) {
      toast.error('Failed to update tasks');
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm('Are you sure you want to delete selected tasks?')) return;
    
    const taskIds = Array.from(selectedTasks);
    try {
      const deletions = taskIds.map(id => handleDeleteTask(id));
      await Promise.all(deletions);
      setSelectedTasks(new Set());
    } catch (err) {
      toast.error('Failed to delete tasks');
    }
  };

  const toggleTaskSelection = (taskId) => {
    setSelectedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col">
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-4"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="flex-1 flex">
          <div className="w-64 bg-white border-r border-gray-200 p-4">
            <div className="animate-pulse space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
          <div className="flex-1 p-6">
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="AlertCircle" className="w-12 h-12 text-error mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button
            onClick={loadData}
            className="px-4 py-2 bg-primary text-white rounded-lg font-medium"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col max-w-full overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-display">TaskFlow</h1>
            <p className="text-gray-600">{completedCountToday} tasks completed today</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 text-gray-500 hover:text-primary transition-colors"
            >
              <ApperIcon name="Search" size={20} />
            </Button>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-lg">{completedCountToday}</span>
            </div>
          </div>
        </div>
        <QuickAddForm categories={categories} onAdd={handleAddTask} />
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {showSearch && (
          <SearchOverlay
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onClose={() => setShowSearch(false)}
          />
        )}
      </AnimatePresence>

      {/* Bulk Action Toolbar */}
      <AnimatePresence>
        {selectedTasks.size > 0 && (
          <BulkActionToolbar
            selectedCount={selectedTasks.size}
            onComplete={handleBulkComplete}
            onDelete={handleBulkDelete}
            onClear={() => setSelectedTasks(new Set())}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Category Sidebar */}
        <CategorySidebar
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          tasks={tasks}
        />

        {/* Task List */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredTasks.length === 0 ? (
            <EmptyState
              searchQuery={searchQuery}
              activeCategory={activeCategory}
              onClearFilters={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
            />
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {filteredTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                  >
                    <TaskCard
                      task={task}
                      category={categories.find(cat => cat.id === task.categoryId)}
                      isSelected={selectedTasks.has(task.id)}
                      onToggleSelect={() => toggleTaskSelection(task.id)}
                      onUpdate={(updates) => handleUpdateTask(task.id, updates)}
                      onDelete={() => handleDeleteTask(task.id)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;