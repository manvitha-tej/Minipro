import React from "react";

const fonts = ["Inter", "Lato", "Poppins", "Playfair Display", "Roboto"];

const FontSelector = ({ settings, updateSetting }) => (
  <div>
    <label>Font Family</label>
    <select
      value={settings.font}
      onChange={(e) => updateSetting("font", e.target.value)}
    >
      {fonts.map((font) => (
        <option key={font} value={font}>
          {font}
        </option>
      ))}
    </select>
  </div>
);

export default FontSelector;
