import express from "express";
import Profile from "../models/Profile.js";

const router = express.Router();

// ✅ Get a profile by userId
router.get("/:id", async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.id });

    if (!profile) {
      // fallback default demo data
      return res.json({
        userId: req.params.id,
        name: "Chethan Er",
        title: "AI Developer & Designer",
        about:
          "Building intelligent assistants and crafting modern web experiences.",
        skills: [
          { name: "Python", level: 90 },
          { name: "React", level: 85 },
          { name: "Node.js", level: 80 },
        ],
        projects: [
          { title: "Adralli", description: "AI-powered portfolio builder." },
          { title: "Jarvis AI", description: "Voice-based Python assistant." },
        ],
        socials: {
          github: "https://github.com/chethan",
          linkedin: "https://linkedin.com/in/chethan",
          twitter: "https://twitter.com/chethan",
        },
        profileImage: "/images/profile1.jpg",
      });
    }

    res.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error." });
  }
});

// ✅ Create or update a profile
router.post("/save", async (req, res) => {
  try {
    const { userId, name, title, about, skills, projects, socials, profileImage } =
      req.body;

    const existing = await Profile.findOne({ userId });
    if (existing) {
      Object.assign(existing, { name, title, about, skills, projects, socials, profileImage });
      await existing.save();
      return res.json({ message: "Profile updated successfully." });
    }

    const newProfile = new Profile({
      userId,
      name,
      title,
      about,
      skills,
      projects,
      socials,
      profileImage,
    });
    await newProfile.save();
    res.status(201).json({ message: "Profile created successfully." });
  } catch (error) {
    console.error("Error saving profile:", error);
    res.status(500).json({ message: "Server error." });
  }
});

export default router;
