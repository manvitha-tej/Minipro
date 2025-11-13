import Profile from "../models/Profile.js";

// Get all profiles in a folder
export const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({ folderId: req.params.folderId });
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profiles", error: err });
  }
};

// Create new profile
export const createProfile = async (req, res) => {
  try {
    const { name, folderId } = req.body;
    const profile = new Profile({ name, folderId });
    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    res.status(400).json({ message: "Error creating profile", error: err });
  }
};

// Delete profile
export const deleteProfile = async (req, res) => {
  try {
    await Profile.findByIdAndDelete(req.params.id);
    res.json({ message: "Profile deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting profile", error: err });
  }
};
