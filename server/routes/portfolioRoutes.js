import express from "express";
import { publishPortfolio, getPublishedPortfolio } from "../controllers/portfolioController.js";

const router = express.Router();

router.post("/publish", publishPortfolio);
router.get("/:username", getPublishedPortfolio);

export default router;
