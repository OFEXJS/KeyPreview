// CSS渐变类型
export type GradientType = "linear" | "radial" | "conic";

// 渐变颜色停止点接口
export interface ColorStop {
  id: string;
  color: string;
  position: number;
  alpha?: number;
}

// 将hex颜色转换为rgba
export const hexToRgba = (hex: string, alpha: number = 1): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return hex.includes('rgba') ? hex : `rgba(0, 0, 0, ${alpha})`;
  }
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// 根据颜色值生成带透明度的颜色
export const applyAlphaToColor = (color: string, alpha: number): string => {
  if (color.startsWith('#')) {
    return hexToRgba(color, alpha);
  }
  if (color.startsWith('rgba')) {
    return color.replace(/rgba?\(([^)]+)\)/, (_, args) => {
      const parts = args.split(',').map((p: string) => p.trim());
      return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${alpha})`;
    });
  }
  if (color.startsWith('rgb')) {
    return hexToRgba(color, alpha);
  }
  return color;
};

// 渐变配置接口
interface LinearGradientConfig {
  type: 'linear';
  name: string;
  linearDirection: string;
  colorStops: ColorStop[];
}

interface RadialGradientConfig {
  type: 'radial';
  name: string;
  radialShape: string;
  radialSize: string;
  radialPosition: string;
  colorStops: ColorStop[];
}

interface ConicGradientConfig {
  type: 'conic';
  name: string;
  conicFrom: string;
  conicAt: string;
  colorStops: ColorStop[];
}

export type GradientConfig = LinearGradientConfig | RadialGradientConfig | ConicGradientConfig;

// 阴影配置接口
export interface ShadowConfig {
  type: "box" | "text";
  offsetX: number;
  offsetY: number;
  blurRadius: number;
  spreadRadius: number;
  color: string;
  inset: boolean;
}

// 生成渐变CSS代码
export const generateGradientCSS = (config: GradientConfig): string => {
  const { type, colorStops } = config;
  
  // 生成颜色停止点字符串，保持数组顺序（拖拽排序的关键）
  const colorStopsStr = colorStops
    .map(stop => {
      const color = stop.alpha !== undefined 
        ? applyAlphaToColor(stop.color, stop.alpha) 
        : stop.color;
      return `${color} ${stop.position}%`;
    })
    .join(", ");
  
  switch (type) {
    case "linear":
      return `linear-gradient(${config.linearDirection}, ${colorStopsStr})`;
    
    case "radial":
      return `radial-gradient(${config.radialShape} ${config.radialSize} at ${config.radialPosition}, ${colorStopsStr})`;
    
    case "conic":
      return `conic-gradient(${config.conicFrom} at ${config.conicAt.replace("at ", "")}, ${colorStopsStr})`;
    
    default:
      return "linear-gradient(to right, #000000, #ffffff)";
  }
};

// 生成阴影CSS代码
export const generateShadowCSS = (config: ShadowConfig): string => {
  const { type, offsetX, offsetY, blurRadius, spreadRadius, color, inset } = config;
  
  if (type === "text") {
    return `text-shadow: ${offsetX}px ${offsetY}px ${blurRadius}px ${color}`;
  } else {
    return `box-shadow: ${inset ? "inset " : ""}${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px ${color}`;
  }
};

// 生成多个阴影的CSS代码
export const generateMultipleShadowsCSS = (configs: ShadowConfig[]): string => {
  const boxShadows = configs
    .filter(config => config.type === "box")
    .map(generateShadowCSS)
    .map(shadow => shadow.replace("box-shadow: ", ""));
  
  const textShadows = configs
    .filter(config => config.type === "text")
    .map(generateShadowCSS)
    .map(shadow => shadow.replace("text-shadow: ", ""));
  
  const result: string[] = [];
  if (boxShadows.length > 0) {
    result.push(`box-shadow: ${boxShadows.join(", ")}`);
  }
  if (textShadows.length > 0) {
    result.push(`text-shadow: ${textShadows.join(", ")}`);
  }
  
  return result.join("\n");
};

// 格式化CSS代码，使其更易读
export const formatCSSCode = (cssCode: string): string => {
  // 简单的CSS格式化，添加缩进和换行
  let formatted = cssCode
    .replace(/{/g, ' {\n  ')
    .replace(/;/g, ';\n  ')
    .replace(/}/g, '\n}')
    .replace(/\n  }/g, '\n}')
    .replace(/\n  \n/g, '\n');
  
  // 确保最后一个属性后面没有多余的换行
  formatted = formatted.replace(/\n  \n}/g, '\n}');
  
  return formatted;
};