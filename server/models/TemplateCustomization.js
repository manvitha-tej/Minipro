import mongoose from "mongoose";

const customizationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  templateId: { type: String, required: true },
  settings: {
    primaryColor: String,
    backgroundColor: String,
    textColor: String,
    font: String,
    sections: [String],
  },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("TemplateCustomization", customizationSchema);
