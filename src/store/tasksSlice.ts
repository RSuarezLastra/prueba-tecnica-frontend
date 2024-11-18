import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id?: string
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
      action.payload.forEach(task => {
        const exist = state.tasks.some(stateTask => stateTask.id === task.id);
        if (!exist) {
          state.tasks.push(task)
        }
      })
    },

  },
});

export const { onAddNewTask, onLoadTask } = taskSlice.actions;
