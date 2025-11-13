import Project from "../models/Project.js";

// ✅ Get all projects for a profile
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ profileId: req.params.profileId });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
};

// ✅ Create new project (with image)
export const createProject = async (req, res) => {
  try {
    const { profileId, title, description, link } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    const project = new Project({ profileId, title, description, link, imageUrl });
    await project.save();

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error creating project", error });
  }
};

// ✅ Delete project
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error });
  }
};
