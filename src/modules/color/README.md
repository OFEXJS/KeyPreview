# 颜色模块使用指南

这个优化后的颜色模块提供了完整的颜色选择、转换和管理功能。

## 主要功能

### 1. 多色彩模式支持
- **HEX**: 十六进制颜色代码 (#FF5733)
- **RGB**: 红绿蓝颜色模式 (rgb(255, 87, 51))
- **RGBA**: 带透明度的RGB (rgba(255, 87, 51, 0.8))
- **HSL**: 色相、饱和度、亮度 (hsl(9, 100%, 60%))
- **HSB**: 色相、饱和度、明度 (hsb(9, 100%, 100%))
- **CMYK**: 印刷色彩模式 (cmyk(0%, 66%, 80%, 0%))

### 2. 交互功能
- 点击色块打开颜色选择面板
- 手风琴式预设颜色展示
- 一键复制任意格式的颜色值
- 实时颜色格式转换
- 拖拽式颜色选择器
- 透明度滑块调节

### 3. 响应式设计
- 移动端适配
- 暗色模式支持
- 触摸交互优化
- 无障碍访问支持

## 基本使用

### 使用颜色面板 (ColorPanel)

```tsx
import React, { useState } from 'react';
import { ColorPanel } from './modules/color';

function MyComponent() {
  const [color, setColor] = useState('#007bff');

  return (
    <div>
      <ColorPanel
        initialColor={color}
        onChange={setColor}
      />
      <p>当前颜色: {color}</p>
    </div>
  );
}
```

### 使用颜色转换器 (ColorConverter)

```tsx
import { ColorConverter } from './modules/color';

function ColorTool() {
  return (
    <ColorConverter
      initialColor="#ff5733"
      onColorChange={(color) => console.log('颜色已更改:', color)}
    />
  );
}
```

### 使用增强的颜色选择器 (ColorPicker)

```tsx
import { ColorPicker } from './modules/color';

function AdvancedColorPicker() {
  return (
    <ColorPicker
      initialColor="#28a745"
      onChange={(color) => {
        // 颜色变化回调
        console.log('新颜色:', color);
      }}
    />
  );
}
```

## 工具函数使用

### 颜色格式转换

```tsx
import { 
  hexToRgb, 
  rgbToHsl, 
  rgbToCmyk, 
  parseColorString 
} from './modules/color';

const rgb = hexToRgb('#ff5733');
console.log(rgb); // { r: 255, g: 87, b: 51 }

const hsl = rgbToHsl(rgb);
console.log(hsl); // { h: 9, s: 100, l: 60 }

const cmyk = rgbToCmyk(rgb);
console.log(cmyk); // { c: 0, m: 66, y: 80, k: 0 }

const allFormats = parseColorString('#ff5733');
console.log(allFormats); // 包含所有格式的完整对象
```

### 复制到剪贴板

```tsx
import { copyToClipboard } from './modules/color';

async function copyColor() {
  const success = await copyToClipboard('#ff5733');
  if (success) {
    console.log('颜色已复制到剪贴板');
  }
}
```

### 颜色分析工具

```tsx
import { 
  isDarkColor, 
  getContrastTextColor, 
  adjustBrightness 
} from './modules/color';

const rgb = { r: 50, g: 50, b: 50 };
const isDark = isDarkColor(rgb);
const textColor = getContrastTextColor(rgb);
const brighter = adjustBrightness(rgb, 20);
```

## 组件属性

### ColorPanel Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| initialColor | string | "#007bff" | 初始颜色值 |
| onChange | (color: string) => void | - | 颜色变化回调 |
| disabled | boolean | false | 是否禁用 |

### ColorConverter Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| initialColor | string | "#007bff" | 初始颜色值 |
| onColorChange | (color: string) => void | - | 颜色变化回调 |

### ColorPicker Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| initialColor | string | "#007bff" | 初始颜色值 |
| onChange | (color: string) => void | - | 颜色变化回调 |

## 样式定制

所有组件都支持 CSS 变量定制，主要变量包括：

```css
:root {
  --bg-color-primary: #f8f9fa;
  --bg-color-secondary: #ffffff;
  --bg-color-hover: #e9ecef;
  --text-color: #333333;
  --text-color-secondary: #666666;
  --border-color: #e1e4e8;
}
```

暗色模式变量：

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-color-primary-dark: #1a1a1a;
    --bg-color-secondary-dark: #2d2d2d;
    --text-color-dark: #ffffff;
    --text-color-secondary-dark: #b0b0b0;
    --border-color-dark: #404040;
  }
}
```

## 完整演示

查看 `ColorModuleDemo.tsx` 文件了解所有功能的完整使用示例。