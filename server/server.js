// server/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";

import folderRoutes from "./routes/folders.js";
import profileRoutes from "./routes/profiles.js";
import projectRoutes from "./routes/projects.js";
import chatRoutes from "./routes/chatRoutes.js";
import templateRoutes from "./routes/templateRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import startChatServer from "./ai/ollamaChat.js";

dotenv.config();
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// API routes
app.use("/api/folders", folderRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/portfolio", portfolioRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Start HTTP + WebSocket server
const server = http.createServer(app);
startChatServer(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🌐 Server running on port ${PORT}`));
