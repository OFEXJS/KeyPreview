import React, { useState, useRef, useEffect } from "react";
import ColorPicker from "./ColorPicker";
import { presetColors, brandColors } from "./colorUtils";
import "./ColorPanel.css";

interface ColorPanelProps {
  initialColor?: string;
  onChange?: (color: string) => void;
  disabled?: boolean;
}

const ColorPanel: React.FC<ColorPanelProps> = ({
  initialColor = "#007bff",
  onChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    if (onChange) {
      onChange(color);
    }
  };

  const handlePresetColorClick = (color: string) => {
    handleColorChange(color);
  };

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const openPanel = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  return (
    <div className="color-panel" ref={panelRef}>
      {/* 色块预览 - 点击打开面板 */}
      <div
        className={`color-swatch-trigger ${disabled ? 'disabled' : ''}`}
        style={{ backgroundColor: selectedColor }}
        onClick={openPanel}
        title={disabled ? "颜色选择器已禁用" : "点击打开颜色选择器"}
      />
      
      {/* 颜色面板弹窗 */}
      {isOpen && (
        <div className="color-panel-dropdown">
          <div className="color-panel-header">
            <h3>颜色选择器</h3>
            <button
              className="close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="关闭"
            >
              ×
            </button>
          </div>

          <div className="color-panel-content">
            {/* 主要颜色选择器 */}
            <div className="color-picker-section">
              <ColorPicker
                initialColor={selectedColor}
                onChange={handleColorChange}
              />
            </div>

            {/* 预设颜色手风琴 */}
            <div className="preset-colors-section">
              {/* 基础颜色手风琴 */}
              <div className="accordion-item">
                <button
                  className="accordion-header"
                  onClick={() => toggleAccordion('preset')}
                >
                  <span>基础颜色</span>
                  <span className={`accordion-arrow ${activeAccordion === 'preset' ? 'open' : ''}`}>
                    ▼
                  </span>
                </button>
                {activeAccordion === 'preset' && (
                  <div className="accordion-content">
                    <div className="color-grid">
                      {presetColors.map((color) => (
                        <div
                          key={color.value}
                          className="color-grid-item"
                          style={{ backgroundColor: color.value }}
                          onClick={() => handlePresetColorClick(color.value)}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 品牌颜色手风琴 */}
              <div className="accordion-item">
                <button
                  className="accordion-header"
                  onClick={() => toggleAccordion('brand')}
                >
                  <span>品牌颜色</span>
                  <span className={`accordion-arrow ${activeAccordion === 'brand' ? 'open' : ''}`}>
                    ▼
                  </span>
                </button>
                {activeAccordion === 'brand' && (
                  <div className="accordion-content">
                    <div className="color-grid">
                      {brandColors.map((color) => (
                        <div
                          key={color.value}
                          className="color-grid-item"
                          style={{ backgroundColor: color.value }}
                          onClick={() => handlePresetColorClick(color.value)}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPanel;