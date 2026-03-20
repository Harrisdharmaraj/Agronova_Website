import { useState } from "react";
import Navbar from "../components/Navbar";

function ChemicalTranslator({ setPage }) {

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

  const cardStyle = {
  background: "rgba(255,255,255,0.8)",
  backdropFilter: "blur(10px)",
  borderRadius: 20,
  padding: 18,
  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  border: "1px solid rgba(255,255,255,0.3)",
  marginTop:10
};

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleImage(e) {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = error => reject(error);
    });
  }

  async function scanChemical() {

    if (!image) {
      alert("Upload image first");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const base64 = await convertToBase64(image);

      const res = await fetch("http://localhost:5000/translate-chemical", {
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
      setResult({ error: "Failed to analyze" });
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: 20, animation: "fadeIn 0.4s ease" }}>

      <Navbar 
        title="🧪 Chemical Translator" 
        onBack={() => setPage("dashboard")} 
      />

      <input type="file" accept="image/*" onChange={handleImage} />

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

      <button
        style={{ ...buttonStyle, marginTop: 15 }}
        onClick={scanChemical}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        🔍 Analyze Chemical
      </button>

      {loading && <p style={{ marginTop: 15 }}>🔄 Analyzing...</p>}

      {result && !loading && (
        <div style={{ marginTop: 20 }}>

          {result.error ? (
            <p>{result.error}</p>
          ) : (
            <>
              <div style={cardStyle}>
                <h3>🧪 {result.chemicalName}</h3>
                <p><strong>⚠️ Toxicity:</strong> {result.toxicityLevel}</p>
              </div>

              <div style={cardStyle}>
                <h4>📌 Purpose</h4>
                <p>{result.purpose}</p>
              </div>

              <div style={cardStyle}>
                <h4>💧 Dosage</h4>
                <p>{result.dosage}</p>
              </div>

              <div style={cardStyle}>
                <h4>⏰ Timing</h4>
                <p>{result.timing}</p>
              </div>

              <div style={cardStyle}>
                <h4>🚨 Safety</h4>
                <ul>
                  {result.safetyWarnings?.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            </>
          )}

        </div>
      )}

    </div>
  );
}

export default ChemicalTranslator;