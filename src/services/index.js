const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export { delay };
export { default as taskService } from './api/taskService';
export { default as categoryService } from './api/categoryService';