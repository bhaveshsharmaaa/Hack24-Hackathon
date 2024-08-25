// src/App.js
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/verifyEmail";
import Myprofile from "./pages/Myprofile";
import AboutUs from "./pages/AboutUs";
import EditProfile from "./pages/EditProfile";
import EnrolledCoursesList from "./pages/EnrolledCourse";
import Cart from "./pages/Cart";
import CourseCreationPage from "./components/Instructor/CourseCreationModal";
import UploadVideoPage from "./components/Instructor/uploadVideoPage";
import MyCoursesModal from "./components/Instructor/MyCoursesModal";
import DashboardModal from "./components/Instructor/DashboardModal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/resetpassword",
        element: <ResetPassword />,
      },
      {
        path: "/updatepassword/:id",
        element: <UpdatePassword />,
      },
      {
        path: "/verifyemail",
        element: <VerifyEmail />,
      },
      {
        path: "/myprofile",
        element: <Myprofile />,
      },
      {
        path: "/editprofile",
        element: <EditProfile />,
      },
      {
        path: "/enrollcourse",
        element: <EnrolledCoursesList />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/coursecreation",
        element: <CourseCreationPage />,
      },
      {
        path: "/mycourses",
        element: <MyCoursesModal />,
      },
      {
        path: "/dashboardinstructor",
        element: <DashboardModal />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
