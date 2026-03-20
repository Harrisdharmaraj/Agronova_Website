import { useState } from "react";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import WeatherPage from "./pages/WeatherPage";
import Scanner from "./pages/Scanner";
import Assistant from "./pages/Assistant";
import CropRecommendation from "./pages/CropRecommendation";
import ChemicalTranslator from "./pages/ChemicalTranslator";
import CropCalendar from "./pages/CropCalendar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResourceHub from "./pages/ResourceHub";
import AgriTools from "./pages/AgriTools";
import MarketTrends from "./pages/MarketTrends";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import HowToUse from "./pages/HowToUse";
import Features from "./pages/Features";
import Sidebar from "./components/Sidebar";

function App() {

  const [page, setPage] = useState("dashboard");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
  const user = localStorage.getItem("userEmail");

  if (user) {
    setPage("dashboard");
  } else {
    setPage("login");
  }
}, []);

  return (
    <>

      <div style={{ display: "flex",animation: "fadeIn 0.4s ease" }}>

  {/* Sidebar */}
  {page !== "login" && page !== "signup" && (
    <Sidebar setPage={setPage} currentPage={page} />
  )}

  {/* Main Content */}
  <div style={{
    marginLeft: page === "login" || page === "signup" ? 0 : 280,
    width: "100%"
  }}>
    {page === "dashboard" && 
        <Dashboard setPage={setPage} setWeatherData={setWeatherData} weatherData={weatherData} />
      }

      {page === "weather" && 
        <WeatherPage setPage={setPage} weatherData={weatherData}  />
      }

    {page === "login" && <Login setPage={setPage} />}
    {page === "signup" && <Signup setPage={setPage} />}
    {page === "scanner" && <Scanner setPage={setPage} />}
    {page === "chemical" && <ChemicalTranslator setPage={setPage} />}
    {page === "crop" && <CropRecommendation setPage={setPage} />}
    {page === "hub" && <ResourceHub setPage={setPage} />}
    {page === "calendar" && <CropCalendar setPage={setPage} />}
    {page === "assistant" && <Assistant setPage={setPage} />}
    {page === "profile" && <Profile setPage={setPage} />}
    {page === "tools" && <AgriTools setPage={setPage} />}
    {page === "market" && <MarketTrends setPage={setPage} />}
    {page === "settings" && <Settings setPage={setPage} />}
    {page === "editprofile" && <EditProfile setPage={setPage} />}
    {page === "changepassword" && <ChangePassword setPage={setPage} />}
    {page === "how" && <HowToUse setPage={setPage} />}
    {page === "features" && <Features setPage={setPage} />}

  </div>

</div>
    </>
  );
}

export default App;