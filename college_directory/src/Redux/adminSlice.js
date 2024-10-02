import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    students: [],
    faculty: [],
  },
  reducers: {
    setStudents: (state, action) => {
      state.students = action.payload;
    },
    setFaculty: (state, action) => {
      state.faculty = action.payload;
    },
  },
});

export const { setStudents, setFaculty } = adminSlice.actions;
export default adminSlice.reducer;
