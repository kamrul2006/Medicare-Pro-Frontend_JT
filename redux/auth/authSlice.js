import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
    role: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { token, role } = action.payload;
            state.token = token;
            state.role = role;
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', token);
            }
        },
        logout: (state) => {
            state.token = null;
            state.role = null;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
            }
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
