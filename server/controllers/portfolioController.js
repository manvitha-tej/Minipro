// server/controllers/portfolioController.js
import PublishedPortfolio from "../models/PublishedPortfolio.js";

// ✅ Publish or update a portfolio
export const publishPortfolio = async (req, res) => {
  try {
    // Destructure data from frontend payload
    const { userId, username, templateId, settings, profileData } = req.body;

    // 🔒 Validation: make sure required data is present
    if (!userId || !username || !templateId) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // 🔁 Find if the user already has a published portfolio
    // If yes, update it (so they can re-publish after editing)
    // If not, create a new entry
    const portfolio = await PublishedPortfolio.findOneAndUpdate(
      { userId },
      { username, templateId, settings, profileData, publishedAt: new Date() },
      { upsert: true, new: true } // upsert = create if not exist
    );

    // ✅ Send success response
    res.status(200).json({
      message: "✅ Portfolio published successfully!",
      portfolioUrl: `/u/${username}`,
      portfolio,
    });
  } catch (error) {
    console.error("Error publishing portfolio:", error);
    res.status(500).json({ message: "Server error during publish." });
  }
};

// ✅ Retrieve a published portfolio (public route)
export const getPublishedPortfolio = async (req, res) => {
  try {
    const { username } = req.params;

    // Fetch the published portfolio by username
    const portfolio = await PublishedPortfolio.findOne({ username });

    // If not found, return 404
    if (!portfolio)
      return res.status(404).json({ message: "Portfolio not found." });

    // Return the full portfolio object
    res.status(200).json(portfolio);
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    res.status(500).json({ message: "Server error." });
  }
};
