import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../API/ProfileAPI/ProfileAPi";
import { useNavigate } from "react-router-dom";

const EnrolledCourses = () => {
  const courses = [
    {
      name: "React for Beginners",
      description:
        "Learn the basics of React, including JSX, state, props, and hooks.",
      thumbnail: "https://media1.tenor.com/m/_KsnH9YVT5QAAAAC/kakashi.gif", // Kakashi image
      completedPercentage: 75,
      duration: "4 weeks",
      instructor: "John Doe",
      level: "Beginner",
    },
    {
      name: "Advanced Node.js",
      description:
        "Master Node.js with advanced concepts and practical examples.",
      thumbnail:
        "https://media1.tenor.com/m/8pAZZiNKKQ0AAAAd/minato-naruto.gif", // Minato image
      completedPercentage: 60,
      duration: "6 weeks",
      instructor: "Jane Smith",
      level: "Advanced",
    },
    {
      name: "Full-Stack Web Development",
      description: "Become a full-stack web developer with hands-on projects.",
      thumbnail:
        "https://media1.tenor.com/m/PU2qGjHspuUAAAAC/itachi-uchiha-itachi.gif", // Itachi image
      completedPercentage: 80,
      duration: "12 weeks",
      instructor: "Alice Johnson",
      level: "Intermediate",
    },
    {
      name: "Full-Stack Web Development",
      description: "Become a full-stack web developer with hands-on projects.",
      thumbnail:
        "https://media1.tenor.com/m/PU2qGjHspuUAAAAC/itachi-uchiha-itachi.gif", // Itachi image
      completedPercentage: 100,
      duration: "12 weeks",
      instructor: "Alice Johnson",
      level: "Intermediate",
    },
  ];
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [coursesenroll, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true); // New state for loading
  const [error, setError] = useState(null); // New state for error handling

  useEffect(() => {
    if (!token) {
      navigate("/");
      return; // Exit early if token is not available
    }

    async function fetchEnrolledCourses() {
      try {
        const courses = await getUserEnrolledCourses(token);
        if (Array.isArray(courses)) {
          setEnrolledCourses(courses);
        } else {
          console.error("Fetched data is not an array:", courses);
          setEnrolledCourses([]);
        }
      } catch (err) {
        console.error("Error while fetching enrolled courses:", err);
        setError("Error fetching courses. Please try again later.");
        setEnrolledCourses([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEnrolledCourses();
  }, [token, navigate]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Enrolled Courses</h1>
        <p className="text-gray-600 text-lg">
          View the details of your purchased courses.
        </p>
      </div>
      {/* {coursesenroll.length === 0 ? (
        <p className="text-center py-8 text-gray-600">
          You have not enrolled in any courses yet. Explore available courses
          and start learning today!
        </p>
      ) : ( */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-4">
              <img
                className="w-full h-48 object-cover rounded-lg mb-4" // Added margin-bottom for spacing
                src={course.thumbnail}
                alt={course.name}
              />
              <h2 className="text-xl font-bold mb-2">{course.name}</h2>
              <p className="text-gray-700 mb-4">{course.description}</p>
              <div className="flex justify-between text-gray-600 text-sm mb-2">
                <span>Duration: {course.duration}</span>
                <span>Instructor: {course.instructor}</span>
              </div>
              <div className="relative">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-gray-600">
                    {course.completedPercentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${course.completedPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* )} */}
    </div>
  );
};

export default EnrolledCourses;
