import express from "express";
import { saveCustomization, getCustomization } from "../controllers/templateController.js";

const router = express.Router();

router.post("/save", saveCustomization);
router.get("/:userId/:templateId", getCustomization);

export default router;
