import React, { createContext, useState } from "react";
import API from "../services/api";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  // ✅ Fetch all projects for a profile
  const fetchProjects = async (profileId) => {
    try {
      const res = await API.get(`/projects/${profileId}`);
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  // ✅ Create a new project (with image)
  const createProject = async (formData) => {
    try {
      await API.post("/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const profileId = formData.get("profileId");
      fetchProjects(profileId);
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  // ✅ Delete project
  const deleteProject = async (id) => {
    try {
      await API.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  return (
    <ProjectContext.Provider
      value={{ projects, fetchProjects, createProject, deleteProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
