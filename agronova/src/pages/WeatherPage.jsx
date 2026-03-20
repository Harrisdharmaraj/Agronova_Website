import { useEffect, useState } from "react";

const API_KEY = "ffa37b16e0f7161d3bd28ffa65133df0";

function WeatherPage({ setPage, weatherData }) {

  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);

  useEffect(() => {
  if (weatherData) {
    fetchForecast();
  }
}, [weatherData]);

 async function fetchForecast() {

  const lat = weatherData.coord.lat;
  const lon = weatherData.coord.lon;

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  const data = await res.json();

  // hourly
  setHourly(data.list.slice(0, 8));

  // 🔥 DAILY (every 8 = 24 hrs)
  const dailyData = [];

  for (let i = 0; i < data.list.length; i += 8) {
    dailyData.push(data.list[i]);
  }

  setDaily(dailyData.slice(0, 7)); // 7 days
}

  if (!weatherData) {
    return (
      <div style={{ padding: 20 }}>
        <button onClick={() => setPage("dashboard")}>⬅ Back</button>
        <p>No data</p>
      </div>
    );
  }

  return (
    <div style={{
      padding: 20,
      minHeight: "100vh",
      color: "white",
      background: "linear-gradient(135deg,#2c5364,#203a43,#0f2027)",
      animation: "fadeIn 0.4s ease"
    }}>

      <button onClick={() => setPage("dashboard")}>
        ⬅ Back
      </button>

      <h2>{weatherData.name}</h2>

      <h1 style={{ fontSize: 70 }}>
        {Math.round(weatherData.main.temp)}°C
      </h1>

      <p>{weatherData.weather[0].description}</p>

      {/* 🔥 HOURLY FORECAST */}
      <div style={{
        marginTop: 20,
        display: "flex",
        gap: 15,
        overflowX: "auto"
      }}>

        {hourly.map((item, index) => {

          let time = new Date(item.dt * 1000).getHours();
          time = index === 0 ? "Now" : time + ":00";

          return (
            <div key={index} style={{
              minWidth: 70,
              textAlign: "center",
              background: "rgba(255,255,255,0.2)",
              padding: 10,
              borderRadius: 12
            }}>

              <p>{time}</p>

              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt=""
              />

              <p>{Math.round(item.main.temp)}°</p>

            </div>
          );
        })}

      </div>

      {/* 📅 DAILY FORECAST */}
<div style={{ marginTop: 30 }}>

  <h3>7-Day Forecast</h3>

  {daily.map((item, index) => {

    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString("en-US", { weekday: "short" });

    return (
      <div key={index} style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        marginTop: 8,
        background: "rgba(255,255,255,0.15)",
        borderRadius: 10
      }}>

        <p>{day}</p>

        <img
          src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
          alt=""
        />

        <p>{Math.round(item.main.temp)}°</p>

      </div>
    );
  })}

</div>

      {/* 🌡 EXTRA DATA */}
      <div style={{
        marginTop: 20,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10
      }}>

        <div style={{ background: "rgba(255,255,255,0.2)", padding: 10 }}>
          💧 {weatherData.main.humidity}%
        </div>

        <div style={{ background: "rgba(255,255,255,0.2)", padding: 10 }}>
          🌬 {weatherData.wind.speed} m/s
        </div>

        <div style={{ background: "rgba(255,255,255,0.2)", padding: 10 }}>
          🌡 {Math.round(weatherData.main.feels_like)}°C
        </div>

      </div>

    </div>
  );
}

export default WeatherPage;