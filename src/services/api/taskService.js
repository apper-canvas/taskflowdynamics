import { delay } from '../index';
import mockTasks from '../mockData/tasks.json';

// Simulate localStorage persistence
const STORAGE_KEY = 'taskflow_tasks';

const getStoredTasks = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : mockTasks;
  } catch {
    return mockTasks;
  }
};

const setStoredTasks = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.warn('Failed to save tasks to localStorage:', error);
  }
};

const taskService = {
  async getAll() {
    await delay(200);
    return [...getStoredTasks()];
  },

  async getById(id) {
    await delay(150);
    const tasks = getStoredTasks();
    const task = tasks.find(t => t.id === id);
    if (!task) throw new Error('Task not found');
    return { ...task };
  },

  async create(taskData) {
    await delay(300);
    const tasks = getStoredTasks();
    const newTask = {
      ...taskData,
      id: `task_${Date.now()}`,
      createdAt: new Date().toISOString(),
      completed: false
    };
    tasks.unshift(newTask);
    setStoredTasks(tasks);
    return { ...newTask };
  },

  async update(id, updates) {
    await delay(250);
    const tasks = getStoredTasks();
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');
    
    tasks[index] = { ...tasks[index], ...updates };
    setStoredTasks(tasks);
    return { ...tasks[index] };
  },

  async delete(id) {
    await delay(200);
    const tasks = getStoredTasks();
    const filteredTasks = tasks.filter(t => t.id !== id);
    if (filteredTasks.length === tasks.length) {
      throw new Error('Task not found');
    }
    setStoredTasks(filteredTasks);
    return true;
  }
};

export default taskService;