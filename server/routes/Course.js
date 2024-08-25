// Import the required modules
const express = require("express");
const router = express.Router();
const cors = require("cors");

// Import the Controllers

// Course Controllers Import
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  getInstructorCourses,
  editCourse,
  getFullCourseDetails,
  deleteCourse,
  searchCourse,
  updateCourseStatus,
  markLectureAsComplete,
} = require("../controllers/Course");

// Categories Controllers Import
const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
  addCourseToCategory,
} = require("../controllers/Category");

// Sections Controllers Import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

// Sub-Sections Controllers Import
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/Subsection");

// Rating Controllers Import
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReviews");

// Importing Middlewares
const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middlewares/auth");

//                                      Course routes

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, createCourse);
// Update Course Status

router.put("/updateCourseStatus", auth, updateCourseStatus);
//Add a Section to a Course
router.post("/addSection", auth, createSection);
// Update a Section
router.post("/updateSection", auth, updateSection);
// Delete a Section
router.post("/deleteSection", auth, deleteSection);
// Edit Sub Section
router.post("/updateSubSection", auth, updateSubSection);
// Delete Sub Section
router.post("/deleteSubSection", auth, deleteSubSection);
// Add a Sub Section to a Section
router.post("/addSubSection", auth, createSubSection);
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses);
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails);
// Edit a Course
router.post("/editCourse", auth, editCourse);
// Get all Courses of a Specific Instructor
router.get("/getInstructorCourses", auth, getInstructorCourses);
//Get full course details
router.post("/getFullCourseDetails", auth, getFullCourseDetails);
// Delete a Course
router.delete("/deleteCourse", auth, deleteCourse);
// Search Courses
router.post("/searchCourse", searchCourse);
//mark lecture as complete
router.post("/updateCourseProgress", auth, markLectureAsComplete);

//                                      Category routes (Only by Admin)
// Category can Only be Created by Admin
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);
router.post("/addCourseToCategory", auth, isInstructor, addCourseToCategory);

//                                      Rating and Review
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

module.exports = router;
