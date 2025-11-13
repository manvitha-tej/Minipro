import Folder from "../models/Folder.js";

// 📦 Get all folders
export const getFolders = async (req, res) => {
  try {
    const folders = await Folder.find();
    res.json(folders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching folders", error: err });
  }
};

// ➕ Create folder
export const createFolder = async (req, res) => {
  try {
    const { name, userId } = req.body;
    if (!name || !userId) {
      return res.status(400).json({ message: "Name and userId are required" });
    }

    const folder = new Folder({ name, userId });
    await folder.save();
    res.status(201).json(folder);
  } catch (err) {
    res.status(400).json({ message: "Error creating folder", error: err });
  }
};

// ✏️ Rename folder
export const renameFolder = async (req, res) => {
  try {
    const { name } = req.body;
    const folder = await Folder.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    res.json(folder);
  } catch (err) {
    res.status(400).json({ message: "Error renaming folder", error: err });
  }
};

// 🗑️ Delete folder
export const deleteFolder = async (req, res) => {
  try {
    await Folder.findByIdAndDelete(req.params.id);
    res.json({ message: "Folder deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting folder", error: err });
  }
};
