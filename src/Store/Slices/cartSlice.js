import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const dummyCourses = [
  {
    id: 1,
    thumbnail: "https://via.placeholder.com/150",
    name: "React for Beginners",
    instructor: "John Doe",
    rating: 4,
    price: 49.99,
  },
  {
    id: 2,
    thumbnail: "https://via.placeholder.com/150",
    name: "Advanced Node.js",
    instructor: "Jane Smith",
    rating: 5,
    price: 59.99,
  },
  // Add more courses as needed
];

const initialState = {
  courses: localStorage.getItem("cartCourses")
    ? JSON.parse(localStorage.getItem("cartCourses"))
    : dummyCourses,
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : dummyCourses.length,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      state.courses.push(action.payload);
      state.totalItems += 1;
      localStorage.setItem("cartCourses", JSON.stringify(state.courses));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      toast.success("Added to cart");
    },
    removeFromCart: (state, action) => {
      state.courses = state.courses.filter(
        (course) => course.id !== action.payload
      );
      state.totalItems -= 1;
      localStorage.setItem("cartCourses", JSON.stringify(state.courses));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      toast.error("Removed from cart");
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
