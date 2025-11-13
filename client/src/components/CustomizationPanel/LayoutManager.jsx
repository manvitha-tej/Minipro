import React from "react";

const LayoutManager = ({ settings, updateSetting }) => {
  const handleReorder = (from, to) => {
    const newOrder = [...settings.sections];
    const [moved] = newOrder.splice(from, 1);
    newOrder.splice(to, 0, moved);
    updateSetting("sections", newOrder);
  };

  return (
    <div>
      <h4>Reorder Sections</h4>
      <ul>
        {settings.sections.map((sec, i) => (
          <li key={sec}>
            {sec}
            <button disabled={i === 0} onClick={() => handleReorder(i, i - 1)}>↑</button>
            <button disabled={i === settings.sections.length - 1} onClick={() => handleReorder(i, i + 1)}>↓</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LayoutManager;
