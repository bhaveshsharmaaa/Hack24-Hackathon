// src/Store/Store.jsx
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // or import storage from 'redux-persist/es/storage'
import authReducer from "./Slices/authSlice";
import cartReducer from "./Slices/cartSlice";
import courseReducer from "./Slices/courseSlice";
import userProfileReducer from "./Slices/userProfileSlice";
import viewCourseReducer from "./Slices/viewCourseSlice";

// Configuration for redux-persist
const viewCoursePersistConfig = {
  key: "viewCourse",
  storage,
};

const persistedViewCourseReducer = persistReducer(
  viewCoursePersistConfig,
  viewCourseReducer
);

const rootReducer = {
  auth: authReducer,
  cart: cartReducer,
  profile: userProfileReducer,
  course: courseReducer,
  viewCourse: persistedViewCourseReducer, // Apply persistence only to viewCourse
};

const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);

export { store };
