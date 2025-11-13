import TemplateCustomization from "../models/TemplateCustomization.js";

export const saveCustomization = async (req, res) => {
  try {
    const { userId, templateId, settings } = req.body;
    if (!userId || !templateId)
      return res.status(400).json({ message: "Missing required fields." });

    const existing = await TemplateCustomization.findOne({ userId, templateId });
    if (existing) {
      existing.settings = settings;
      existing.updatedAt = new Date();
      await existing.save();
      return res.status(200).json({ message: "Customization updated." });
    }

    const newCustomization = new TemplateCustomization({ userId, templateId, settings });
    await newCustomization.save();

    res.status(201).json({ message: "Customization saved successfully." });
  } catch (error) {
    console.error("Error saving customization:", error);
    res.status(500).json({ message: "Server error." });
  }
};

export const getCustomization = async (req, res) => {
  try {
    const { userId, templateId } = req.params;
    const customization = await TemplateCustomization.findOne({ userId, templateId });

    if (!customization)
      return res.status(404).json({ message: "No customization found." });

    res.status(200).json(customization);
  } catch (error) {
    console.error("Error loading customization:", error);
    res.status(500).json({ message: "Server error." });
  }
};
