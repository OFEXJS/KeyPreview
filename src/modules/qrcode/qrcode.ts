import QRCode from "qrcode";

export interface QRCodeOptions {
  text: string;
  width?: number;
  margin?: number;
  color?: {
    dark?: string;
    light?: string;
  };
  errorCorrectionLevel?: "low" | "medium" | "quartile" | "high";
}

export interface QRCodeWithLogoOptions extends QRCodeOptions {
  // Logo and background image functionality removed
}

/**
 * Generate QR code as base64 string
 */
export const generateQRCode = async (
  options: QRCodeOptions
): Promise<string> => {
  try {
    return await QRCode.toDataURL(options.text, {
      width: options.width || 300,
      margin: options.margin || 4,
      color: options.color,
      errorCorrectionLevel: options.errorCorrectionLevel || "M",
    });
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw new Error("Failed to generate QR code");
  }
};

/**
 * Generate QR code as base64 string
 * Simplified version without logo and background image functionality
 */
export const generateQRCodeWithLogo = async (
  options: QRCodeWithLogoOptions
): Promise<string> => {
  try {
    // Use the basic generateQRCode function directly
    return await generateQRCode(options);
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw new Error("Failed to generate QR code");
  }
};

// fileToBase64 function removed as it's no longer needed

/**
 * Preset QR code styles
 */
export const qrCodeStyles = [
  {
    id: "default",
    name: "默认样式",
    color: {
      dark: "#000000",
      light: "#FFFFFF",
    },
  },
  {
    id: "blue",
    name: "蓝色风格",
    color: {
      dark: "#0066CC",
      light: "#FFFFFF",
    },
  },
  {
    id: "green",
    name: "绿色风格",
    color: {
      dark: "#009933",
      light: "#FFFFFF",
    },
  },
  {
    id: "purple",
    name: "紫色风格",
    color: {
      dark: "#663399",
      light: "#FFFFFF",
    },
  },
  {
    id: "dark",
    name: "深色风格",
    color: {
      dark: "#FFFFFF",
      light: "#222222",
    },
  },
  {
    id: "gold",
    name: "金色风格",
    color: {
      dark: "#D4AF37",
      light: "#FFFFFF",
    },
  },
  {
    id: "newyear",
    name: "新年风格",
    color: {
      dark: "#E74C3C",
      light: "#FFFFFF",
    },
  },
  {
    id: "bubble",
    name: "泡泡风格",
    color: {
      dark: "#3498DB",
      light: "#ECF0F1",
    },
  },
  {
    id: "succulent",
    name: "多肉风格",
    color: {
      dark: "#27AE60",
      light: "#E8F5E8",
    },
  },
  {
    id: "envelope",
    name: "信封风格",
    color: {
      dark: "#E67E22",
      light: "#FFFFFF",
    },
  },
];
