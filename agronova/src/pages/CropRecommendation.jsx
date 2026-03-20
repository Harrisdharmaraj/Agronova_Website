import { useState } from "react";
import Navbar from "../components/Navbar";
import ReactMarkdown from "react-markdown";

function CropRecommendation({ setPage }) {

    const buttonStyle = {
  padding: "12px 18px",
  border: "none",
  borderRadius: 12,
  background: "linear-gradient(135deg, #1b5e3c, #2e7d32)",
  color: "white",
  cursor: "pointer",
  fontSize: 14,
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  transition: "0.2s",
  width: "100%"
};

const selectStyle = {
  width: "100%",
  padding: 12,
  borderRadius: 10,
  border: "1px solid #ddd",
  marginBottom: 12
};

  const [form, setForm] = useState({
    soil: "",
    season: "",
    water: ""
  });

  const [result, setResult] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function getRecommendation() {

    setResult("🔍 Analyzing...");

    const res = await fetch("http://localhost:5000/recommend-crop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    setResult(data.result);
  }

  return (
    <div>

      <Navbar 
        title="🌾 Crop Recommendation" 
        onBack={() => setPage("dashboard")} 
      />

      <div style={{ padding: 20, animation: "fadeIn 0.4s ease" }}>

  <select name="soil" onChange={handleChange} style={selectStyle}>
    <option value="">🌱 Select Soil Type</option>
    <option>Clay</option>
    <option>Sandy</option>
    <option>Loamy</option>
  </select>

  <select name="season" onChange={handleChange} style={selectStyle}>
    <option value="">🌦 Select Season</option>
    <option>Kharif</option>
    <option>Rabi</option>
    <option>Summer</option>
  </select>

  <select name="water" onChange={handleChange} style={selectStyle}>
    <option value="">💧 Water Availability</option>
    <option>Low</option>
    <option>Medium</option>
    <option>High</option>
  </select>

  <button
    style={buttonStyle}
    onClick={getRecommendation}
    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
  >
    🌾 Get Recommendation
  </button>

  <div style={{
    marginTop: 20,
    background: "white",
    padding: 15,
    borderRadius: 14,
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    whiteSpace: "pre-line"
  }}>
    <ReactMarkdown>{result}</ReactMarkdown>
  </div>

</div>

    </div>
  );
}

export default CropRecommendation;