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
    }
  },
});

export const { onAddNewTask } = taskSlice.actions;
