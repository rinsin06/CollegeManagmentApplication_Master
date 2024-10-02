import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: null,
        role: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.userInfo = action.payload;
        },
        logout: (state) => {
            state.userInfo = null;
            state.role = null;
        },
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;