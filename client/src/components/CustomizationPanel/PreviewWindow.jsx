import React from "react";
import styles from "./PreviewWindow.module.css";

const PreviewWindow = ({ settings, templateId }) => {
  const { primaryColor, backgroundColor, textColor, font, sections } = settings;

  return (
    <div
      className={styles.preview}
      style={{
        backgroundColor,
        color: textColor,
        fontFamily: font,
      }}
    >
      <h2 style={{ color: primaryColor }}>
        {templateId.charAt(0).toUpperCase() + templateId.slice(1)} Template
      </h2>
      {sections.map((sec) => (
        <div key={sec} className={styles.section}>
          <h3>{sec}</h3>
          <p>Sample content for {sec} section...</p>
        </div>
      ))}
    </div>
  );
};

export default PreviewWindow;
