import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRCodeGenerator() {
  const [text, setText] = useState("");
  const qrRef = useRef(); // to reference the QR canvas

  // Function to download QR as image
  const downloadQR = () => {
    const canvas = qrRef.current.querySelector("canvas"); // get the canvas element
    const image = canvas.toDataURL("image/png"); // convert it to image data
    const link = document.createElement("a"); // create an invisible download link
    link.href = image;
    link.download = `qr-${Date.now()}.png`; // file name
    link.click(); // trigger download
  };

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h2>QR Code Generator</h2>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Enter text or URL"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      {/* QR Code Display */}
      <div ref={qrRef} style={{ marginTop: "20px" }}>
        {text && (
          <QRCodeCanvas
            value={text}
            size={200}
            bgColor="#ffffff"
            fgColor="#000000"
            level="H"
            includeMargin={true}
          />
        )}
      </div>

      {/* Download Button */}
      {text && (
        <button
          onClick={downloadQR}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Download QR Code
        </button>
      )}
    </div>
  );
}
