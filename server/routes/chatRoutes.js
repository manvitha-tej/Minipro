// server/routes/chatRoutes.js
import express from "express";
import ChatMessage from "../models/ChatMessage.js";

const router = express.Router();

// 🧠 Load chat history by folder or profile
router.get("/history", async (req, res) => {
  const { folderId, profileId } = req.query;

  try {
    const query = {};
    if (folderId) query.folderId = folderId;
    if (profileId) query.profileId = profileId;

    const messages = await ChatMessage.find(query).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    console.error("Error fetching chat history:", err);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
});

export default router;
