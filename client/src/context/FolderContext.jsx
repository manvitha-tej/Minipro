import React, { createContext, useState, useEffect } from "react";
import API from "../services/api";

export const FolderContext = createContext();

export const FolderProvider = ({ children }) => {
  const [folders, setFolders] = useState([]);

  // ✅ Fetch all folders
  const fetchFolders = async () => {
    try {
      const res = await API.get("/folders");
      setFolders(res.data);
    } catch (err) {
      console.error("Error fetching folders:", err);
    }
  };

  // ✅ Create new folder
  const createFolder = async (name) => {
    try {
      const res = await API.post("/folders", { name, userId: "defaultUser" });
      setFolders((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error creating folder:", err);
    }
  };

  // ✅ Rename folder
  const renameFolder = async (id, newName) => {
    try {
      const res = await API.put(`/folders/${id}`, { name: newName });
      setFolders((prev) =>
        prev.map((f) => (f._id === id ? { ...f, name: res.data.name } : f))
      );
    } catch (err) {
      console.error("Error renaming folder:", err);
    }
  };

  // ✅ Delete folder
  const deleteFolder = async (id) => {
    try {
      await API.delete(`/folders/${id}`);
      setFolders((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      console.error("Error deleting folder:", err);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <FolderContext.Provider
      value={{ folders, fetchFolders, createFolder, renameFolder, deleteFolder }}
    >
      {children}
    </FolderContext.Provider>
  );
};
