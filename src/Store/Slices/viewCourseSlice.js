// src/redux/slices/viewCourseSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  status: "idle",
  error: null,
};

const viewCourseSlice = createSlice({
  name: "viewCourses",
  initialState,
  reducers: {
    setCourses(state, action) {
      state.courses = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    removeCourse(state, action) {
      state.courses = state.courses.filter(
        (course) => course._id !== action.payload
      );
    },
  },
});

export const { setCourses, setStatus, setError, removeCourse } =
  viewCourseSlice.actions;

export default viewCourseSlice.reducer;
