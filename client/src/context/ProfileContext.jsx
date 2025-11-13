import React, { createContext, useState } from "react";
import API from "../services/api";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);

  // ✅ Fetch profiles for a folder
  const fetchProfiles = async (folderId) => {
    try {
      const res = await API.get(`/profiles/${folderId}`);
      setProfiles(res.data);
    } catch (err) {
      console.error("Error fetching profiles:", err);
    }
  };

  // ✅ Create a new profile
  const createProfile = async (profileData) => {
    try {
      await API.post("/profiles", profileData);
      fetchProfiles(profileData.folderId);
    } catch (err) {
      console.error("Error creating profile:", err);
    }
  };

  // ✅ Delete profile
  const deleteProfile = async (id) => {
    try {
      await API.delete(`/profiles/${id}`);
      setProfiles((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting profile:", err);
    }
  };

  return (
    <ProfileContext.Provider
      value={{ profiles, fetchProfiles, createProfile, deleteProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
