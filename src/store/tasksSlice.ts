import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  title: string;
  description: string;
  status: string;
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

  },
});

export const {  } = taskSlice.actions;
