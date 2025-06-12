import { delay } from '../index';
import mockCategories from '../mockData/categories.json';

// Simulate localStorage persistence
const STORAGE_KEY = 'taskflow_categories';

const getStoredCategories = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : mockCategories;
  } catch {
    return mockCategories;
  }
};

const setStoredCategories = (categories) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  } catch (error) {
    console.warn('Failed to save categories to localStorage:', error);
  }
};

const categoryService = {
  async getAll() {
    await delay(150);
    return [...getStoredCategories()];
  },

  async getById(id) {
    await delay(100);
    const categories = getStoredCategories();
    const category = categories.find(c => c.id === id);
    if (!category) throw new Error('Category not found');
    return { ...category };
  },

  async create(categoryData) {
    await delay(250);
    const categories = getStoredCategories();
    const newCategory = {
      ...categoryData,
      id: `category_${Date.now()}`,
      taskCount: 0
    };
    categories.push(newCategory);
    setStoredCategories(categories);
    return { ...newCategory };
  },

  async update(id, updates) {
    await delay(200);
    const categories = getStoredCategories();
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Category not found');
    
    categories[index] = { ...categories[index], ...updates };
    setStoredCategories(categories);
    return { ...categories[index] };
  },

  async delete(id) {
    await delay(200);
    const categories = getStoredCategories();
    const filteredCategories = categories.filter(c => c.id !== id);
    if (filteredCategories.length === categories.length) {
      throw new Error('Category not found');
    }
    setStoredCategories(filteredCategories);
    return true;
  }
};

export default categoryService;