import { FaHome, FaCamera, FaFlask, FaSeedling, FaCalendar, FaRobot, FaUser, FaSignOutAlt, FaHandshake, FaMoneyBill, FaNewspaper, FaChartLine } from "react-icons/fa";

function Sidebar({ setPage, currentPage }) {

  const itemStyle = (active) => ({
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 14px",
    borderRadius: 10,
    marginBottom: 10,
    cursor: "pointer",
    background: active ? "rgba(255,255,255,0.2)" : "transparent",
    transform: active ? "scale(1.05)" : "scale(1)",
    transition: "0.2s"
  });

  return (
    <div style={{
  width: 240,
  height: "100vh",
  background: "linear-gradient(180deg, #1b5e3c, #081c10)",
  boxShadow: "4px 0 20px rgba(0,0,0,0.2)",
  color: "white",
  padding: 20,
  position: "fixed",

  overflowY: "auto",   // ✅ ADD THIS
  scrollbarWidth: "none" // optional (Firefox)
}}>

      <h2 style={{ marginTop:5,marginBottom: 10 }}>🌿 AgroNova</h2>

      <div style={itemStyle(currentPage === "dashboard")} onClick={() => setPage("dashboard")}>
        <FaHome /> Dashboard
      </div>

      <div style={itemStyle(currentPage === "scanner")} onClick={() => setPage("scanner")}>
        <FaCamera /> Scanner
      </div>

      <div style={itemStyle(currentPage === "chemical")} onClick={() => setPage("chemical")}>
        <FaFlask /> Chemical
      </div>

      <div style={itemStyle(currentPage === "crop")} onClick={() => setPage("crop")}>
        <FaSeedling /> Crop
      </div>

      <div style={itemStyle(currentPage === "hub")}
     onClick={() => setPage("hub")}>
       <FaHandshake /> Resource Hub
</div>

      <div style={itemStyle(currentPage === "calendar")} onClick={() => setPage("calendar")}>
        <FaCalendar /> Calendar
      </div>

      <div style={itemStyle(currentPage === "tools")}
     onClick={() => setPage("tools")}>
   <FaNewspaper /> News & Tools
</div>

<div style={itemStyle(currentPage === "market")}
     onClick={() => setPage("market")}>
  <FaChartLine /> Market Trends
</div>

      <div style={itemStyle(currentPage === "assistant")} onClick={() => setPage("assistant")}>
        <FaRobot /> Assistant
      </div>

      <div style={itemStyle(currentPage === "profile")} onClick={() => setPage("profile")}>
        <FaUser /> Profile
      </div>

      {/* Logout */}
      <div style={{
        marginTop: 20,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 14px",
        borderRadius: 10,
        background: "#e53935",
        cursor: "pointer"
      }} onClick={() => {
        const email = localStorage.getItem("userEmail");
        localStorage.removeItem(`chat_${email}`);
        localStorage.removeItem("userEmail");
        setPage("login");
      }}>
        <FaSignOutAlt /> Logout
      </div>

    </div>
  );
}

export default Sidebar;