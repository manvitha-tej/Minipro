import React from "react";

const ColorPicker = ({ settings, updateSetting }) => (
  <div>
    <label>Primary Color</label>
    <input
      type="color"
      value={settings.primaryColor}
      onChange={(e) => updateSetting("primaryColor", e.target.value)}
    />
    <label>Background Color</label>
    <input
      type="color"
      value={settings.backgroundColor}
      onChange={(e) => updateSetting("backgroundColor", e.target.value)}
    />
    <label>Text Color</label>
    <input
      type="color"
      value={settings.textColor}
      onChange={(e) => updateSetting("textColor", e.target.value)}
    />
  </div>
);

export default ColorPicker;
