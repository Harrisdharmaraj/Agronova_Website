import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Profile({ setPage }) {

  const [user, setUser] = useState(null);

  const email = localStorage.getItem("userEmail");
  const city = localStorage.getItem("city") || "Not set";

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const res = await fetch(
        `http://localhost:5000/get-profile?email=${email}`
      );
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error(err);
    }
  }

  if (!user) return <p style={{ padding: 20 }}>Loading...</p>;

  return (
    <div style={{ padding: 20, animation: "fadeIn 0.4s ease" }}>

      <Navbar 
        title="👤 Profile" 
        onBack={() => setPage("dashboard")} 
      />

      {/* ===== PROFILE CARD ===== */}
      <div style={profileCard}>

        <div style={avatar}>
          {user.name.charAt(0).toUpperCase()}
        </div>

        <h2 style={{ margin: "10px 0 5px" }}>{user.name}</h2>
        <p style={{ color: "#777" }}>{user.email}</p>

        <div style={infoRow}>
          <span>📞 {user.phone}</span>
        </div>

      </div>

      {/* ===== SETTINGS NAVIGATION ===== */}
<div style={{ marginTop: 25 }}>

  <h3>⚙️ Settings</h3>

  <div 
    style={settingsButton}
    onClick={() => setPage("settings")}
    onMouseEnter={(e) => {
  e.currentTarget.style.transform = "scale(1.02)";
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = "scale(1)";
}}
  >
    <div>
      <p style={{ margin: 0, fontWeight: 500 }}>App Settings</p>
      <p style={{ margin: 0, fontSize: 12, color: "#777" }}>
        Edit Profile, Change Password
      </p>
    </div>

    <span style={{ fontSize: 18 }}>➤</span>

  </div>

</div>

      {/* ===== ACTIONS ===== */}
      <div style={{ marginTop: 30 }}>

        <button style={logoutBtn} onClick={handleLogout}>
          🚪 Logout
        </button>

      </div>

    </div>
  );

  function handleLogout() {
    localStorage.clear();
    setPage("login");
  }
}

export default Profile;

// ================= STYLES =================

const profileCard = {
  background: "white",
  padding: 20,
  borderRadius: 18,
  textAlign: "center",
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
};

const settingsButton = {
  background: "white",
  padding: 15,
  borderRadius: 16,
  marginTop: 10,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  transition: "0.2s"
};

const avatar = {
  width: 80,
  height: 80,
  borderRadius: "50%",
  background: "linear-gradient(135deg,#1b5e3c,#2e7d32)",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 30,
  margin: "0 auto"
};

const infoRow = {
  marginTop: 10,
  color: "#555"
};

const settingCard = {
  background: "white",
  borderRadius: 16,
  padding: 15,
  marginTop: 10,
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
};

const settingRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 5px",
  borderBottom: "1px solid #eee"
};

const value = {
  color: "#777"
};

const logoutBtn = {
  width: "100%",
  padding: 14,
  borderRadius: 14,
  border: "none",
  background: "#e53935",
  color: "white",
  fontSize: 16,
  cursor: "pointer",
  boxShadow: "0 6px 15px rgba(229,57,53,0.3)"
};