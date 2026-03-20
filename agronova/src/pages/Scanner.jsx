import { useState } from "react";
import Navbar from "../components/Navbar";

function Scanner({ setPage }) {

  const buttonStyle = {
    padding: "10px 16px",
    border: "none",
    borderRadius: 12,
    background: "linear-gradient(135deg, #1b5e3c, #2e7d32)",
    color: "white",
    cursor: "pointer",
    fontSize: 14,
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    transition: "0.2s"
  };

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // 📷 handle image
  function handleImage(e) {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  // 🔄 convert to base64
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = error => reject(error);
    });
  }

  // 🔍 scan image
  async function scanImage() {

    if (!image) {
      alert("Upload image first");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const base64 = await convertToBase64(image);

      const res = await fetch("http://localhost:5000/scan-disease", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          imageBase64: base64,
          language: "English"
        })
      });

      const data = await res.json();
      setResult(data);

    } catch (err) {
      console.error(err);
      setResult({ error: "Scan failed" });
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: 20, animation: "fadeIn 0.4s ease" }}>

      <Navbar 
        title="📷 Disease Scanner" 
        onBack={() => setPage("dashboard")} 
      />

      {/* Upload */}
      <input type="file" accept="image/*" onChange={handleImage} />

      {/* Preview */}
      {preview && (
        <img
          src={preview}
          alt=""
          style={{
            width: "100%",
            marginTop: 15,
            borderRadius: 12
          }}
        />
      )}

      {/* Button */}
      <button
        style={{ ...buttonStyle, marginTop: 15 }}
        onClick={scanImage}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        🔍 Scan Image
      </button>

      {/* Loading */}
      {loading && (
        <p style={{ marginTop: 15 }}>🔄 Analyzing image...</p>
      )}

      {/* Result */}
      {result && !loading && (
        <div style={{
          marginTop: 20,
          background: "white",
          padding: 18,
          borderRadius: 14,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
        }}>

          {result.error ? (
            <p>{result.error}</p>
          ) : (
            <>
              <h3 style={{ marginBottom: 5 }}>
                🌿 {result.diseaseName}
              </h3>

              <p style={{ color: "#1b5e3c", fontWeight: "bold" }}>
                📊 {result.confidence}
              </p>

              <p style={{ marginTop: 10 }}>
                {result.description}
              </p>

              <h4 style={{ marginTop: 15 }}>💊 Treatment</h4>

              <ul>
                {result.treatmentSteps?.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </>
          )}

        </div>
      )}

    </div>
  );
}

export default Scanner;