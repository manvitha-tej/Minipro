import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import folderRoutes from "./routes/folders.js";
import profileRoutes from "./routes/profiles.js";
import projectRoutes from "./routes/projects.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/folders", folderRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/projects", projectRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌐 Server running on port ${PORT}`));
