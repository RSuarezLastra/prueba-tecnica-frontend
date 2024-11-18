import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    status: string;
    user: Record<string, any>;
    errorMessage?: string;
}

const initialState: AuthState = {
    status: 'checking',
    user: {},
    errorMessage: undefined,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        checking: (state) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined;
        },
        onLogin: (state, { payload }: PayloadAction<{ uid: string; name: string }>) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: (state, { payload }: PayloadAction<string | undefined>) => { 
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload;
        },
        clearError: (state) => {
            state.errorMessage = undefined;
        },
    },
});

export const { checking, onLogin, onLogout, clearError } = authSlice.actions;
