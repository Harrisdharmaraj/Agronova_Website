import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function MarketTrends({ setPage }) {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarket();
  }, []);

  async function fetchMarket() {

    const location = localStorage.getItem("city") || "India";

    try {
      const res = await fetch(
        `http://localhost:5000/market-prediction?location=${location}&language=English`
      );

      const result = await res.json();

      if (result.error === "QUOTA_EXHAUSTED") {
        setData(null);
      } else {
        setData(result.data);
      }

      setLoading(false);

    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20 }}>

      <Navbar 
        title="📊 Market Trends" 
        onBack={() => setPage("dashboard")} 
      />

      {/* LOADING */}
      {loading && (
        <div style={center}>
          <p>Analyzing market trends...</p>
        </div>
      )}

      {/* ERROR */}
      {!loading && !data && (
        <div style={center}>
          <p>⚠️ Unable to fetch trends right now</p>
        </div>
      )}

      {/* DATA */}
      {data && (
        <>
          {/* SUMMARY */}
          <div style={summaryCard}>
            <h3>📍 Market Overview</h3>
            <p>{data.summary}</p>
          </div>

          {/* TRENDS */}
          <div style={{ marginTop: 20 }}>
            <h3>📈 Crop Trends</h3>

            {data.trends.map((t, i) => (
              <div key={i} style={trendCard}>

                <div style={{ flex: 1 }}>
                  <h4>{t.emoji} {t.cropName}</h4>
                  <p style={reason}>{t.reason}</p>
                </div>

                <div style={{
                  color: t.trend === "UP" ? "#2e7d32" : "#e53935",
                  fontWeight: "bold",
                  fontSize: 18
                }}>
                  {t.trend === "UP" ? "↑" : "↓"} {t.percentage}
                </div>

              </div>
            ))}

          </div>
        </>
      )}

    </div>
  );
}

export default MarketTrends;

// ================= STYLES =================

const center = {
  textAlign: "center",
  marginTop: 50
};

const summaryCard = {
  background: "linear-gradient(135deg, #1b5e3c, #2e7d32)",
  color: "white",
  padding: 20,
  borderRadius: 18,
  boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
};

const trendCard = {
  background: "white",
  padding: 15,
  borderRadius: 14,
  marginTop: 12,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
};

const reason = {
  fontSize: 13,
  color: "#777"
};