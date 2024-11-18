import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  _id: string
  title: string;
  description: string;
  status: string;
  user?: string
}

interface State {
  isLoading: boolean;
  tasks: Array<Task>;
}

const initialState: State = {
  isLoading: true,
  tasks: [],
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    onAddNewTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    onLoadTask: (state, action: PayloadAction<Task[]>) => {
      state.isLoading = false;
      state.tasks = action.payload;
    },
    onLogoutTasks: (state) => {
      state.isLoading = true;
      state.tasks = [];
    },
    onDeleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task._id != action.payload);
    },
    onUpdateTask: (state, action: PayloadAction<Task>) => {
        state.tasks = state.tasks.map( task => {
          if(task._id === action.payload._id) return action.payload;

          return task;
        })
    }

  },
});

export const { onAddNewTask, onLoadTask, onDeleteTask, onLogoutTasks, onUpdateTask } = taskSlice.actions;
