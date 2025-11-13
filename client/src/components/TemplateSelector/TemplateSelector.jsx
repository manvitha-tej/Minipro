import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TemplateSelector.module.css";
import TemplateCard from "./TemplateCard";
import TemplatePreview from "./TemplatePreview";

const templates = [
  { id: "modern", name: "Modern", thumbnail: "/images/modern.png" },
  { id: "minimal", name: "Minimal", thumbnail: "/images/minimal.png" },
  { id: "creative", name: "Creative", thumbnail: "/images/creative.png" },
];

const TemplateSelector = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Choose Your Portfolio Template</h2>

      <div className={styles.templateGrid}>
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            selected={selected === template.id}
            onSelect={() => setSelected(template.id)}
          />
        ))}
      </div>

      {selected && (
        <>
          <TemplatePreview templateId={selected} />
          <div className={styles.buttonArea}>
            <button
              className={styles.startBtn}
              onClick={() => navigate(`/customize/${selected}`)}
            >
              ✨ Start Customizing
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TemplateSelector;
