import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../API/CourseApi/courseDetails"; // Adjust path as needed
import { Link } from "react-router-dom";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoBookOutline } from "react-icons/io5";
import { LuLaptop } from "react-icons/lu";
import { FiGrid, FiTrash2 } from "react-icons/fi";
import {
  setCourses,
  setError,
  setStatus,
  removeCourse, // Action to remove a course
} from "../../Store/Slices/viewCourseSlice";

const MyCoursesModal = () => {
  const dispatch = useDispatch();
  const { courses, status, error } = useSelector((state) => state.viewCourse);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.profile.user);

  useEffect(() => {
    const fetchCourses = async () => {
      dispatch(setStatus("loading"));
      try {
        const response = await fetchInstructorCourses(token);
        dispatch(setCourses(response));
        localStorage.setItem("courses", JSON.stringify(response)); // Store data in local storage
        dispatch(setStatus("succeeded"));
      } catch (error) {
        dispatch(setError(error.message));
        dispatch(setStatus("failed"));
      }
    };
    fetchCourses();
  }, [dispatch, token]);

  // Function to handle course removal
  const handleRemoveCourse = (courseId) => {
    console.log("id", courseId);
    deleteCourse(courseId, token); // Call API to delete course
    dispatch(removeCourse(courseId));
    localStorage.setItem("courses", JSON.stringify(updatedCourses)); // Update local storage
    const updatedCourses = courses.filter((course) => course._id !== courseId);
    localStorage.setItem("courses", JSON.stringify(updatedCourses)); // Update local storage
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>{error}</p>;

  return (
    <div className="flex w-full bg-gray-100 min-h-screen">
      {user?.accountType === "Student" && (
        <>
          {/* Sidebar for larger screens */}
          <aside className="fixed inset-y-0 top-16 left-0 z-10 hidden w-20 flex-col border-r bg-white shadow-lg sm:flex">
            <nav className="flex flex-col items-center gap-6 px-2 py-6">
              <Link
                to="/myprofile"
                className="group relative flex h-12 w-12 items-center justify-center rounded-full text-xl hover:bg-gray-100 transition-all duration-200"
              >
                <RiAccountCircleLine size={30} />
                <span className="absolute left-14 w-max opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded-md py-1 px-2 transition-opacity duration-300">
                  Student Profile
                </span>
              </Link>
              <Link
                to="/mycourses"
                className="group relative flex h-12 w-12 items-center justify-center rounded-full text-xl hover:bg-gray-100 transition-all duration-200"
              >
                <IoBookOutline size={30} />
                <span className="absolute left-14 w-max opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded-md py-1 px-2 transition-opacity duration-300">
                  My Project
                </span>
              </Link>
              <Link
                to="/coursecreation"
                className="group relative flex h-12 w-12 items-center justify-center rounded-full text-xl hover:bg-gray-100 transition-all duration-200"
              >
                <LuLaptop size={30} />
                <span className="absolute left-14 w-max opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded-md py-1 px-2 transition-opacity duration-300">
                  Project Creation
                </span>
              </Link>
              <Link
                to="/dashboardinstructor"
                className="group relative flex h-12 w-12 items-center justify-center rounded-full text-xl hover:bg-gray-100 transition-all duration-200"
              >
                <FiGrid size={30} />
                <span className="absolute left-14 w-max opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded-md py-1 px-2 transition-opacity duration-300">
                  Dashboard
                </span>
              </Link>
            </nav>
          </aside>

          {/* My Courses Section */}
          <div className="md:ml-20 flex-grow p-6">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              My Project
            </h2>
            {courses.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-lg font-semibold text-gray-700 mb-4">
                  You don't have any projects yet.
                </p>
                <Link
                  to="/coursecreation"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                  Create a Project
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course) => (
                  <div
                    key={course._id}
                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
                  >
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="h-48 w-full object-cover rounded-lg mb-4"
                    />
                    <div className="flex flex-col flex-grow">
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">
                        {course.courseName}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {course.courseDescription}
                      </p>

                      <p className="text-sm text-gray-500 mb-2">
                        Created At:{" "}
                        {new Date(course.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-lg font-bold text-gray-800 mb-4">
                        Project Budget: ${course.price}
                      </p>
                      {/* Project Completion Bar */}
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 mb-1">
                          Completion
                        </p>
                        <div className="relative pt-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-600">
                              0%
                            </span>
                            <span className="text-xs font-medium text-gray-600">
                              100%
                            </span>
                          </div>
                          <div className="flex">
                            <div
                              className="w-full bg-gray-200 h-2 rounded-full"
                              aria-hidden="true"
                            >
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `0%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => handleRemoveCourse(course._id)}
                        className="text-red-500 hover:text-red-700 flex items-center space-x-1"
                      >
                        <FiTrash2 size={20} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom navigation for mobile screens */}
          <aside className="fixed bottom-0 left-0 right-0 z-10 flex sm:hidden w-full border-t bg-white shadow-lg">
            <nav className="flex flex-row items-center justify-around w-full py-2">
              <Link
                to="/myprofile"
                className="group relative flex flex-col items-center justify-center text-xl hover:bg-gray-100 transition-all duration-200"
              >
                <RiAccountCircleLine size={24} />
                <span className="text-xs">Profile</span>
              </Link>
              <Link
                to="/mycourses"
                className="group relative flex flex-col items-center justify-center text-xl hover:bg-gray-100 transition-all duration-200"
              >
                <IoBookOutline size={24} />
                <span className="text-xs">Courses</span>
              </Link>
              <Link
                to="/coursecreation"
                className="group relative flex flex-col items-center justify-center text-xl hover:bg-gray-100 transition-all duration-200"
              >
                <LuLaptop size={24} />
                <span className="text-xs">Create</span>
              </Link>
              <Link
                to="/dashboardinstructor"
                className="group relative flex flex-col items-center justify-center text-xl hover:bg-gray-100 transition-all duration-200"
              >
                <FiGrid size={24} />
                <span className="text-xs">Dashboard</span>
              </Link>
            </nav>
          </aside>
        </>
      )}
    </div>
  );
};

export default MyCoursesModal;
