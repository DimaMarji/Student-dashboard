import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../Pages/Home/TaskForm/interface';
import { createTask, deleteTaskApi, fetchTasks, patchTask } from '../api/fakeApi';


interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<number | string | undefined>) => {
      const taskId = action.payload;
      state.tasks = state.tasks.filter(task => task.id !== taskId);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const updatedTask = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === updatedTask.id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = updatedTask;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          [
            fetchTasks.pending.type,
            createTask.pending.type,
            deleteTaskApi.pending.type,
            patchTask.pending.type,
          ].includes(action.type),
        (state:any) => {
          state.status = 'isLoading';
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          [
            fetchTasks.fulfilled.type,
          ].includes(action.type),
        (state:any, action:any) => {
          state.status = 'isSuccess';
          state.tasks = action.payload;
        }
      )
      .addMatcher(
        (action) =>
          [
            fetchTasks.rejected.type,
            createTask.rejected.type,
            deleteTaskApi.rejected.type,
            patchTask.rejected.type,
          ].includes(action.type),
        (state:any, action:any) => {
          state.status = 'isError';
          state.error = action.error.message;
        }
      );
  }
});

export const { addTask,deleteTask,updateTask  } = tasksSlice.actions;
export default tasksSlice.reducer;