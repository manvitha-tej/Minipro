import mongoose from "mongoose";

const publishedPortfolioSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  templateId: { type: String, required: true },
  settings: {
    primaryColor: String,
    backgroundColor: String,
    textColor: String,
    font: String,
    sections: [String],
  },
  profileData: {
    name: String,
    title: String,
    about: String,
    projects: [
      {
        title: String,
        description: String,
        link: String,
      },
    ],
  },
  publishedAt: { type: Date, default: Date.now },
});

export default mongoose.model("PublishedPortfolio", publishedPortfolioSchema);
