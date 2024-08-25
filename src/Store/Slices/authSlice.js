import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  signUpData: null,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupdata: (state, action) => {
      state.signUpData = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Export the reducer
export const { setToken, setLoading, setSignupdata } = authSlice.actions;
export default authSlice.reducer;
