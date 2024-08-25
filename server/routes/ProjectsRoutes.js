// routes/projectRoutes.js
const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjects,
  deleteProject,
} = require("../controllers/Project");

// Routes for projects
router.post("/create", createProject);
router.get("/", getProjects);
router.delete("/:id", deleteProject);

module.exports = router;
