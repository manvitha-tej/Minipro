import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ColorPicker from "./ColorPicker";
import FontSelector from "./FontSelector";
import LayoutManager from "./LayoutManager";
import PreviewWindow from "./PreviewWindow";
import styles from "./CustomizationPanel.module.css";

const CustomizationPanel = () => {
  const { templateId } = useParams();
  const [settings, setSettings] = useState({
    primaryColor: "#007bff",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    font: "Inter",
    sections: ["About", "Projects", "Skills", "Contact"],
  });
  const [status, setStatus] = useState("");

  const userId = "12345";
  const username = "chethan";

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch("https://adralli-server.onrender.com/api/templates/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, templateId, settings }),
      });
      setStatus(res.ok ? "✅ Customization saved!" : "⚠️ Save failed.");
    } catch {
      setStatus("❌ Server error while saving.");
    }
  };

  const handleLoad = async () => {
    try {
      const res = await fetch(
        `https://adralli-server.onrender.com/api/templates/${userId}/${templateId}`
      );
      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings);
        setStatus("✅ Customization loaded!");
      } else {
        setStatus("⚠️ No saved data found.");
      }
    } catch {
      setStatus("❌ Failed to load customization.");
    }
  };

  const handlePublish = async () => {
    try {
      const payload = {
        userId,
        username,
        templateId,
        settings,
      };
      const res = await fetch("https://adralli-server.onrender.com/api/portfolio/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus(`🌐 Published! View: ${data.portfolioUrl}`);
      } else {
        setStatus(`⚠️ Publish failed: ${data.message}`);
      }
    } catch {
      setStatus("❌ Error publishing portfolio.");
    }
  };

  const handlePreviewLive = () => {
    window.open(`/u/${username}`, "_blank");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>
        <h3 className={styles.heading}>Customize {templateId} Template</h3>

        <ColorPicker settings={settings} updateSetting={updateSetting} />
        <FontSelector settings={settings} updateSetting={updateSetting} />
        <LayoutManager settings={settings} updateSetting={updateSetting} />

        <div className={styles.buttonGroup}>
          <button onClick={handleSave} className={styles.saveBtn}>💾 Save</button>
          <button onClick={handleLoad} className={styles.loadBtn}>🔄 Load</button>
          <button onClick={handlePreviewLive} className={styles.previewBtn}>👀 Preview</button>
          <button onClick={handlePublish} className={styles.publishBtn}>🌐 Publish</button>
        </div>

        {status && <p className={styles.status}>{status}</p>}
      </div>

      <div className={styles.preview}>
        <PreviewWindow settings={settings} templateId={templateId} />
      </div>
    </div>
  );
};

export default CustomizationPanel;
