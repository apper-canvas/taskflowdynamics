import { toast } from 'react-toastify';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const taskService = {
  async getAll() {
    await delay(200);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: ['Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy', 'title', 'description', 'category_id', 'priority', 'due_date', 'completed', 'created_at', 'completed_at'],
        orderBy: [
          {
            fieldName: 'created_at',
            SortType: 'DESC'
          }
        ]
      };

      const response = await apperClient.fetchRecords('task', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      // Map database fields to frontend format
      const tasks = (response.data || []).map(item => ({
        id: item.Id,
        title: item.title || item.Name || '',
        description: item.description || '',
        categoryId: item.category_id || '',
        priority: item.priority || 1,
        dueDate: item.due_date || '',
        completed: item.completed || false,
        createdAt: item.created_at || item.CreatedOn || new Date().toISOString(),
        completedAt: item.completed_at || null,
        tags: item.Tags || '',
        owner: item.Owner || ''
      }));

      return [...tasks];
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to load tasks");
      return [];
    }
  },

  async getById(id) {
    await delay(150);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: ['Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy', 'title', 'description', 'category_id', 'priority', 'due_date', 'completed', 'created_at', 'completed_at']
      };

      const response = await apperClient.getRecordById('task', id, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (!response.data) {
        throw new Error('Task not found');
      }

      // Map database fields to frontend format
      const task = {
        id: response.data.Id,
        title: response.data.title || response.data.Name || '',
        description: response.data.description || '',
        categoryId: response.data.category_id || '',
        priority: response.data.priority || 1,
        dueDate: response.data.due_date || '',
        completed: response.data.completed || false,
        createdAt: response.data.created_at || response.data.CreatedOn || new Date().toISOString(),
        completedAt: response.data.completed_at || null,
        tags: response.data.Tags || '',
        owner: response.data.Owner || ''
      };

      return { ...task };
    } catch (error) {
      console.error(`Error fetching task with ID ${id}:`, error);
      throw error;
    }
  },

  async create(taskData) {
    await delay(300);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields
      const params = {
        records: [{
          Name: taskData.title || '',
          Tags: taskData.tags || '',
          Owner: taskData.owner || '',
          title: taskData.title || '',
          description: taskData.description || '',
          category_id: taskData.categoryId || '',
          priority: taskData.priority || 1,
          due_date: taskData.dueDate || '',
          completed: taskData.completed || false,
          created_at: taskData.createdAt || new Date().toISOString(),
          completed_at: taskData.completedAt || null
        }]
      };

      const response = await apperClient.createRecord('task', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} tasks:${failedRecords}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          const created = successfulRecords[0].data;
          return {
            id: created.Id,
            title: created.title || created.Name || '',
            description: created.description || '',
            categoryId: created.category_id || '',
            priority: created.priority || 1,
            dueDate: created.due_date || '',
            completed: created.completed || false,
            createdAt: created.created_at || created.CreatedOn || new Date().toISOString(),
            completedAt: created.completed_at || null,
            tags: created.Tags || '',
            owner: created.Owner || ''
          };
        }
      }
      
      throw new Error('Failed to create task');
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  },

  async update(id, updates) {
    await delay(250);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Build update object with only Updateable fields
      const updateData = { Id: id };
      if (updates.title !== undefined) {
        updateData.Name = updates.title;
        updateData.title = updates.title;
      }
      if (updates.tags !== undefined) updateData.Tags = updates.tags;
      if (updates.owner !== undefined) updateData.Owner = updates.owner;
      if (updates.description !== undefined) updateData.description = updates.description;
      if (updates.categoryId !== undefined) updateData.category_id = updates.categoryId;
      if (updates.priority !== undefined) updateData.priority = updates.priority;
      if (updates.dueDate !== undefined) updateData.due_date = updates.dueDate;
      if (updates.completed !== undefined) updateData.completed = updates.completed;
      if (updates.createdAt !== undefined) updateData.created_at = updates.createdAt;
      if (updates.completedAt !== undefined) updateData.completed_at = updates.completedAt;

      const params = {
        records: [updateData]
      };

      const response = await apperClient.updateRecord('task', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} tasks:${failedUpdates}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          const updated = successfulUpdates[0].data;
          return {
            id: updated.Id,
            title: updated.title || updated.Name || '',
            description: updated.description || '',
            categoryId: updated.category_id || '',
            priority: updated.priority || 1,
            dueDate: updated.due_date || '',
            completed: updated.completed || false,
            createdAt: updated.created_at || updated.CreatedOn || new Date().toISOString(),
            completedAt: updated.completed_at || null,
            tags: updated.Tags || '',
            owner: updated.Owner || ''
          };
        }
      }
      
      throw new Error('Failed to update task');
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  },

  async delete(id) {
    await delay(200);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [id]
      };

      const response = await apperClient.deleteRecord('task', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} tasks:${failedDeletions}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }
};

export default taskService;