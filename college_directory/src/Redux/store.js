import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import studentReducer from './studentSlice';
import facultyReducer from './facultySlice';
import adminReducer from './adminSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        student: studentReducer,
        faculty: facultyReducer,
        admin: adminReducer
    },
});

export default store;
