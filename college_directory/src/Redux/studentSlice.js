import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {
    userId: "",
    name: "",
    email: "",
    phone: "",
    regNumber: "",
    department: "",
    photo: "",
  },
  isLoading: false,
  error: null,
};

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setProfile, setLoading, setError } = studentSlice.actions;

export const selectProfile = (state) => state.student.profile;

export default studentSlice.reducer;
