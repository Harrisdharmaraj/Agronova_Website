import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

function AgriTools({ setPage }) {

  // ================= CALCULATOR =================
  const [crop, setCrop] = useState("");
  const [land, setLand] = useState("");
  const [unit, setUnit] = useState("acre");
  const [result, setResult] = useState("");

  async function calculate() {

    if (!crop || !land) {
      alert("Fill all fields");
      return;
    }

    setResult("Calculating...");

    try {
      const res = await fetch("http://180.235.121.245:8032/calculate-farm-inputs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cropName: crop,
          landSize: land,
          unit: unit,
          language: "English"
        })
      });

      const data = await res.json();

      setResult(`
🌱 Seeds: ${data.data.seedRequirement}
🧪 Fertilizer: ${data.data.fertilizerRequirement}
💡 Tip: ${data.data.proTip}
      `);

    } catch (err) {
      setResult("Error calculating");
    }
  }

  // ================= NEWS =================
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    try {
      const res = await fetch(
        "http://localhost:5000/agri-news?language=English"
      );
      const data = await res.json();
      setNews(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ padding: 20 }}>

      <Navbar 
        title="🧠 Tools & News" 
        onBack={() => setPage("dashboard")} 
      />

      {/* ================= CALCULATOR ================= */}
      <div style={box}>

        <h3>🧠 AI Farm Input Calculator</h3>

        <input
          placeholder="Crop (e.g. Rice)"
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
          style={input}
        />

        <input
          placeholder="Land Size"
          value={land}
          onChange={(e) => setLand(e.target.value)}
          style={input}
        />

        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          style={input}
        >
          <option value="acre">Acre</option>
          <option value="hectare">Hectare</option>
        </select>

        <button onClick={calculate} style={btn}>
          Calculate
        </button>

        {result && (
          <div style={resultBox}>
            {result}
          </div>
        )}

      </div>

      {/* ================= NEWS ================= */}
      <div style={{ marginTop: 25 }}>

        <h3>📰 Agriculture News</h3>

        {news.length === 0 && <p>Loading news...</p>}

        {news.map((n, i) => (
          <div key={i} style={newsCard}>

            <div>
              <strong>{n.title}</strong>
              <p style={{ fontSize: 12, color: "#777" }}>
                {n.source}
              </p>
            </div>

            <a
              href={n.link}
              target="_blank"
              rel="noreferrer"
              style={readBtn}
            >
              Read →
            </a>

          </div>
        ))}

      </div>

    </div>
  );
}

export default AgriTools;

// ================= STYLES =================

const box = {
  background: "white",
  padding: 20,
  borderRadius: 16,
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
};

const input = {
  width: "100%",
  padding: 10,
  marginTop: 10,
  borderRadius: 10,
  border: "1px solid #ddd"
};

const btn = {
  marginTop: 10,
  padding: 10,
  width: "100%",
  borderRadius: 10,
  border: "none",
  background: "#1b5e3c",
  color: "white",
  cursor: "pointer"
};

const resultBox = {
  marginTop: 15,
  padding: 12,
  borderRadius: 10,
  background: "#f4f6f5",
  whiteSpace: "pre-line"
};

const newsCard = {
  background: "white",
  padding: 15,
  borderRadius: 14,
  marginTop: 10,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
};

const readBtn = {
  background: "#1b5e3c",
  color: "white",
  padding: "6px 10px",
  borderRadius: 8,
  textDecoration: "none",
  fontSize: 12
};
