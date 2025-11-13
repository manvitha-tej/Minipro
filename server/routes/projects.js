import express from "express";
import upload from "../middleware/upload.js";
import { getProjects, createProject, deleteProject } from "../controllers/projectController.js";

const router = express.Router();

router.get("/:profileId", getProjects);
router.post("/", upload.single("image"), createProject);
router.delete("/:id", deleteProject);

export default router;
