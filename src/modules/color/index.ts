// 主要组件导出
export { default as ColorPicker } from './ColorPicker';
export { default as ColorPanel } from './ColorPanel';
export { default as ColorConverter } from './ColorConverter';
export { default as ColorInput } from './ColorInput';
export { default as ColorModuleDemo } from './ColorModuleDemo';

// 工具函数导出
export {
  rgbToHex,
  hexToRgb,
  rgbToHsl,
  hslToRgb,
  rgbToHsb,
  hsbToRgb,
  rgbToCmyk,
  cmykToRgb,
  hslToHsb,
  hsbToHsl,
  formatRgbString,
  formatRgbaString,
  formatHslString,
  formatHsbString,
  formatCmykString,
  parseColorString,
  type RGB,
  type RGBA,
  type HSL,
  type HSB,
  type CMYK
} from './colorConverter';

export {
  presetColors,
  brandColors,
  copyToClipboard,
  generateRandomColor,
  isDarkColor,
  getContrastTextColor,
  adjustBrightness,
  calculateColorDifference,
  getColorName,
  isValidColor
} from './colorUtils';

// 样式文件
export './ColorPicker.css';
export './ColorPanel.css';
export './ColorConverter.css';
export './ColorInput.css';
export './ColorModuleDemo.css';