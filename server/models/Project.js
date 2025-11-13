import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  profileId: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
  title: { type: String, required: true },
  description: { type: String },
  link: { type: String },
  imageUrl: { type: String }, // Cloudinary URL
}, { timestamps: true });

const Project = mongoose.model("Project", ProjectSchema);
export default Project;
