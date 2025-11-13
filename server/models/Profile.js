import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: String,
  title: String,
  about: String,
  skills: [{ name: String, level: Number }],
  projects: [{ title: String, description: String }],
  socials: {
    github: String,
    linkedin: String,
    twitter: String,
  },
  profileImage: String,
});

export default mongoose.model("Profile", profileSchema);
