import { useEffect, useState } from "react";

const API_KEY = "ffa37b16e0f7161d3bd28ffa65133df0";

function WeatherCard({ onClick, setWeatherData }) {

  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("Detecting...");

  useEffect(() => {
    detectLocation();
  }, []);

  function detectLocation() {

    if (!navigator.geolocation) {
      setLocation("Not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        fetchWeather(lat, lon);
      },
      () => {
        // fallback (Chennai)
        fetchWeather(13.0827, 80.2707);
      }
    );
  }

  async function fetchWeather(lat, lon) {

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      const data = await res.json();

      setWeather(data);
      setWeatherData(data);
      setLocation(data.name);

    } catch (err) {
      console.error(err);
    }
  }

  if (!weather) return <p style={{ padding: 20 }}>Loading weather...</p>;

  return (
    <div onClick={onClick} style={{
      margin: 5,
      marginBottom:20,
      padding: 20,
      borderRadius: 20,
      background: "linear-gradient(135deg,#1b5e3c,#2e7d32)",
      color: "white",
      cursor: "pointer"
    }}>

      <p>{location}</p>

      <h1>{Math.round(weather.main.temp)}°</h1>

      <p>{weather.weather[0].main}</p>

    </div>
  );
}

export default WeatherCard;