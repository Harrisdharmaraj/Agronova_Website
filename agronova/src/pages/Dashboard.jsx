import WeatherCard from "../components/WeatherCard";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";


function Dashboard({ setPage, setWeatherData, weatherData }) {

  const cardStyle = {
  background: "rgba(255,255,255,0.8)",
  backdropFilter: "blur(10px)",
  borderRadius: 20,
  padding: 18,
  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  border: "1px solid rgba(255,255,255,0.3)",
  marginTop:10
};

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 15
  };

  const [cropAdvice, setCropAdvice] = useState("");

  // 🌾 AUTO CROP RECOMMENDATION
  useEffect(() => {

  async function fetchCropAdvice() {
    console.log("WEATHER DATA:", weatherData);

    if (!weatherData || !weatherData.main || !weatherData.weather) {
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: "Suggest best crops for current weather",
          location: weatherData.name,
          temperature: weatherData.main.temp,
          condition: weatherData.weather[0].main,
          language: "English"
        })
      });

      const data = await res.json();
      console.log("CROP RESPONSE:", data);

      setCropAdvice(data.reply || "No recommendation");

    } catch (err) {
      console.error("CROP ERROR:", err);
      setCropAdvice("Error getting recommendation");
    }
  }

  fetchCropAdvice();

}, [weatherData]);

  return (
    <div style={{ padding: 15, animation: "fadeIn 0.4s ease" }}>

      {/* TOPBAR */}
      <h2 style={{ color: "#1b5e3c" }}>🌿 AgroNova</h2>

      <div style={{
  margin: 5,
  padding: 20,
  borderRadius: 20,
  background: "linear-gradient(135deg,#1b5e3c,#43a047)",
  color: "white",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
}}>
  <h2>🌿 Welcome Back!</h2>
  <p>Smart farming insights at your fingertips</p>
</div>

      {/* WEATHER */}
      <WeatherCard
        onClick={() => setPage("weather")}
        setWeatherData={setWeatherData}
      />

      {/* 🌾 AUTO CROP */}
      <div style={cardStyle}>
        <h3>🌾 Today’s Crop Recommendation</h3>
          <ReactMarkdown style={{ fontSize: 14 }}>{cropAdvice || "Analyzing weather..."}</ReactMarkdown>
      </div>

      {/* 🔲 FEATURES */}
      <div style={gridStyle}>

        <div style={cardStyle} onClick={() => setPage("scanner")}
            onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}>
          <div style={{ fontSize: 30 }}>📷</div>
          <h4 style={{ margin: "10px 0 5px" }}>Disease Scanner</h4>
        </div>

        <div style={cardStyle} onClick={() => setPage("chemical")}
            onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}>
          <div style={{ fontSize: 30 }}>🧪</div>
          <h4 style={{ margin: "10px 0 5px" }}>Chemical Translator</h4>
        </div>

        <div style={cardStyle} onClick={() => setPage("hub")}
             onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}>
  <div style={{ fontSize: 30 }}>🤝</div>
          <h4 style={{ margin: "10px 0 5px" }}>Resource Hub</h4>
        </div>

        <div style={cardStyle} onClick={() => setPage("calendar")}
             onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}>
  <div style={{ fontSize: 30 }}>📅</div>
          <h4 style={{ margin: "10px 0 5px" }}>Crop Calendar</h4>
        </div>

        <div style={cardStyle} onClick={() => setPage("crop")}
            onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}>
          <div style={{ fontSize: 30 }}>🌾</div>
          <h4 style={{ margin: "10px 0 5px" }}>Crop Recommendation</h4>
        </div>

        <div style={cardStyle} onClick={() => setPage("tools")}
             onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}>
  <div style={{ fontSize: 30 }}>📰</div>
          <h4 style={{ margin: "10px 0 5px" }}>News & Tools</h4>
        </div>

        <div style={cardStyle} onClick={() => setPage("assistant")}
            onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}>
          <div style={{ fontSize: 30 }}>🤖</div>
          <h4 style={{ margin: "10px 0 5px" }}>AI Assistant</h4>
        </div>

        {/* 📊 MARKET */}
      <div style={cardStyle} onClick={() => setPage("market")}
            onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}>
        <h3>📊 Market Insights</h3>
        <p>Tap to view today's trends</p>
      </div>

      </div>

    </div>
  );
}

export default Dashboard;