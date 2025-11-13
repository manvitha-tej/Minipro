// server/models/ChatMessage.js
import mongoose from "mongoose";

const ChatMessageSchema = new mongoose.Schema({
  folderId: { type: String, required: false },
  folderName: { type: String, required: false }, // optional context
  profileId: { type: String, required: false },
  profileType: { type: String, required: false },
  role: { type: String, enum: ["user", "assistant"], required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("ChatMessage", ChatMessageSchema);
