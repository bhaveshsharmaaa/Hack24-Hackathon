import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCourse: [],
  isEditingCourse: false,
  isPaymentLoading: false,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
    setIsEditingCourse: (state, action) => {
      state.isEditingCourse = action.payload;
    },
    setIsPaymentLoading: (state, action) => {
      state.isPaymentLoading = action.payload;
    },
    resetCourseState: (state) => {
      state.selectedCourse = null;
      state.isEditingCourse = false;
      state.isPaymentLoading = false;
    },
  },
});

export const {
  setSelectedCourse,
  setIsEditingCourse,
  setIsPaymentLoading,
  resetCourseState,
} = courseSlice.actions;

export default courseSlice.reducer;
