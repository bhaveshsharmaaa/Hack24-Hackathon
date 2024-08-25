// controllers/projectController.js
const Project = require("../models/ProjectSchema");
const User = require("../models/User");
const Category = require("../models/Category");

exports.createProject = async (req, res) => {
  try {
    const { title, description, categoryId, instructorId } = req.body;
    const newProject = new Project({
      title,
      description,
      category: categoryId,
      instructor: instructorId,
    });
    await newProject.save();
    await Category.findByIdAndUpdate(categoryId, {
      $push: { projects: newProject._id },
    });
    await User.findByIdAndUpdate(instructorId, {
      $push: { projects: newProject._id },
    });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("category")
      .populate("instructor");
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    await Project.findByIdAndDelete(id);
    await Category.findByIdAndUpdate(project.category, {
      $pull: { projects: id },
    });
    await User.findByIdAndUpdate(project.instructor, {
      $pull: { projects: id },
    });
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
