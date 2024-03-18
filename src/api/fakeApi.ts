import { createAsyncThunk } from '@reduxjs/toolkit';
import { Task } from '../Pages/Home/TaskForm/interface';
import axios from 'axios';

// Authentication
export const login = createAsyncThunk('auth/login', async (credentials:any) => {
  // Simulate authentication logic
  if (credentials.username === 'admin' && credentials.password === 'password') {
    return { token: 'fake-token' };
  } else {
    throw new Error('Invalid username or password');
  }
});

// CRUD operations
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await axios.get<Task[]>('http://localhost:4000/tasks');
    return response.data;
  });

  export const createTask = createAsyncThunk(
    'tasks/addTask',
    async (newTask: Task) => {
      try {
        const response = await axios.post<Task>(
          'http://localhost:4000/tasks',
          newTask
        );
        return response.data;
      } catch (error) {
        console.error('error', error);
        throw error;
      }
    }
  );

  export const patchTask = createAsyncThunk(
    'tasks/patchTask',
    async (updatedTask: Task) => {
      try {
        console.log("updatedTask.id",updatedTask.id);
    
        const response = await axios.patch<Task>(
          `http://localhost:4000/tasks/${updatedTask.id}`,
          updatedTask
        );
        return response.data;
      } catch (error) {
        console.error('error', error);
        throw error;
      }
    }
  );
  
  export const deleteTaskApi = createAsyncThunk(
    'tasks/deleteTask',
    async (taskId: number) => {
      try {
        await axios.delete(`http://localhost:4000/tasks/${taskId}`);
        return taskId;
      } catch (error) {
        console.error('error', error);
        throw error;
      }
    }
  );