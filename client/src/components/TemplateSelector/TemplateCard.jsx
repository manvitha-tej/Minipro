import React from "react";
import styles from "./TemplateCard.module.css";

const TemplateCard = ({ template, selected, onSelect }) => {
  return (
    <div
      className={`${styles.card} ${selected ? styles.selected : ""}`}
      onClick={onSelect}
    >
      <img
        src={template.thumbnail}
        alt={template.name}
        className={styles.thumbnail}
      />
      <h3>{template.name}</h3>
    </div>
  );
};

export default TemplateCard;
