import express from "express";
import {
  getFolders,
  createFolder,
  renameFolder,
  deleteFolder,
} from "../controllers/folderController.js";

const router = express.Router();

router.get("/", getFolders);
router.post("/", createFolder);
router.put("/:id", renameFolder);
router.delete("/:id", deleteFolder);

export default router;
