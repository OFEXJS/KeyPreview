import React, { useState, useEffect } from "react";
import { generateQRCodeWithLogo, qrCodeStyles } from "../modules/qrcode";
import "./QRCodeTab.css";

const QRCodeTab: React.FC = () => {
  const [inputText, setInputText] = useState<string>("https://www.baidu.com");
  const [qrCodeDataUrl, setQRCodeDataUrl] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [width, setWidth] = useState<number>(300);
  const [margin, setMargin] = useState<number>(4);
  const [colorDark, setColorDark] = useState<string>("#000000");
  const [colorLight, setColorLight] = useState<string>("#FFFFFF");
  const [selectedStyle, setSelectedStyle] = useState<string>("default");

  // Generate QR code function
  const generateQRCode = async () => {
    try {
      setError("");
      setSuccess("");

      // Validate width and margin

      if (!width || !margin) {
        setError("请输入二维码宽度或者边距");
        return;
      }

      if (width < 100) {
        setError("二维码宽度不能小于100px");
        return;
      }

      if (margin < 4) {
        setError("二维码边距不能小于4px");
        return;
      }

      const dataUrl = await generateQRCodeWithLogo({
        text: inputText,
        width,
        margin,
        color: {
          dark: colorDark,
          light: colorLight,
        },
      });
      setQRCodeDataUrl(dataUrl);
      const successMsg = "二维码生成成功";
      setSuccess(successMsg);

      // Auto-dismiss success message after 3 seconds
      const timer = setTimeout(() => {
        setSuccess("");
      }, 3000);

      return () => clearTimeout(timer);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "生成二维码失败";
      setError(errorMsg);

      // Auto-dismiss error message after 5 seconds
      const timer = setTimeout(() => {
        setError("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  };

  // Auto-generate QR code on initial load
  useEffect(() => {
    generateQRCode();
  }, []);

  // Handle style selection
  const handleStyleChange = (styleId: string) => {
    setSelectedStyle(styleId);
    const style = qrCodeStyles.find((s) => s.id === styleId);
    if (style) {
      setColorDark(style.color.dark);
      setColorLight(style.color.light);
    }
  };

  // Download QR code
  const handleDownload = () => {
    if (qrCodeDataUrl) {
      const link = document.createElement("a");
      link.href = qrCodeDataUrl;
      link.download = "qrcode.png";
      link.click();
      // Show download success message temporarily
      const successMsg = "二维码下载成功";
      setSuccess(successMsg);
      // Clear download message after 3 seconds
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    }
  };

  return (
    <div className="qrcode-container">
      <div className="qrcode-controls">
        <div className="button-group">
          <button className="generate-btn" onClick={generateQRCode}>
            📱 生成二维码
          </button>
        </div>

        <div className="option-group">
          <label>📝 输入文本/URL：</label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="请输入要生成二维码的文本或URL"
            rows={3}
          />
        </div>

        <div className="option-row">
          <div className="option-group">
            <label>📏 二维码大小：</label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value))}
              placeholder="最小尺寸100"
            />
          </div>

          <div className="option-group">
            <label>🔲 边距：</label>
            <input
              type="number"
              value={margin}
              onChange={(e) => setMargin(parseInt(e.target.value))}
              placeholder="最小边距4"
            />
          </div>
        </div>

        <div className="option-group">
          <label>🎨 颜色：</label>
          <div className="color-inputs">
            <div>
              <label>二维码：</label>
              <input
                type="color"
                value={colorDark}
                onChange={(e) => setColorDark(e.target.value)}
              />
              <input
                type="text"
                value={colorDark}
                onChange={(e) => setColorDark(e.target.value)}
                placeholder="#000000"
              />
            </div>
            <div>
              <label>背景色：</label>
              <input
                type="color"
                value={colorLight}
                onChange={(e) => setColorLight(e.target.value)}
              />
              <input
                type="text"
                value={colorLight}
                onChange={(e) => setColorLight(e.target.value)}
                placeholder="#FFFFFF"
              />
            </div>
          </div>
        </div>

        <div className="option-group">
          <label>🎨 预设样式：</label>
          <div className="style-options-container">
            <div className="style-options">
              {qrCodeStyles.map((style) => (
                <div
                  key={style.id}
                  className={`style-option ${selectedStyle === style.id ? "selected" : ""}`}
                  onClick={() => handleStyleChange(style.id)}
                >
                  <div
                    className="style-preview"
                    style={{
                      backgroundColor: style.color.light,
                      border: `2px solid ${style.color.dark}`,
                    }}
                  >
                    <div
                      className="style-sample"
                      style={{
                        backgroundColor: style.color.dark,
                        width: "20px",
                        height: "20px",
                        margin: "5px",
                      }}
                    />
                  </div>
                  <span className="style-name">{style.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="qrcode-preview">
        <div className="preview-header">
          <h3>二维码预览</h3>
          {qrCodeDataUrl && (
            <button className="download-btn" onClick={handleDownload}>
              📥 下载二维码
            </button>
          )}
        </div>
        {qrCodeDataUrl ? (
          <div className="qrcode-image-container">
            <img src={qrCodeDataUrl} alt="二维码" className="qrcode-image" />
          </div>
        ) : (
          <div className="qrcode-placeholder">🖱️ 请点击生成按钮创建二维码</div>
        )}
      </div>

      {error && (
        <div className="notification error">
          <span className="notification-icon">⚠️</span>
          <span className="notification-message">{error}</span>
        </div>
      )}
      {success && (
        <div className="notification success">
          <span className="notification-icon">✅</span>
          <span className="notification-message">{success}</span>
        </div>
      )}
    </div>
  );
};

export default QRCodeTab;
