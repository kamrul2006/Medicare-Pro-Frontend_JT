import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    role: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.token = action.payload.token;
            state.role = action.payload.role;
        },
        logout: (state) => {
            state.token = null;
            state.role = null;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
