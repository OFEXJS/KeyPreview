import React, { useState } from "react";
import ColorPicker from "../modules/color/ColorPicker";

const ColorTab: React.FC = () => {
  const [color, setColor] = useState<string>("#007bff");

  // 处理颜色变化
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  return (
    <div className="color-tab">
      <h2>颜色选择器</h2>
      <div className="color-content">
        <ColorPicker initialColor={color} onChange={handleColorChange} />
      </div>
    </div>
  );
};

export default ColorTab;
