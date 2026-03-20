import Navbar from "../components/Navbar";

function Settings({ setPage }) {

  return (
    <div style={{ padding: 20, animation: "fadeIn 0.4s ease" }}>

      <Navbar title="⚙️ Settings" onBack={() => setPage("profile")} />

      <div style={card}>

        <div style={{ marginTop: 25 }}>

  <div 
    style={settingsButton}
    onClick={() => setPage("editprofile")}
    onMouseEnter={(e) => {
  e.currentTarget.style.transform = "scale(1.02)";
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = "scale(1)";
}}
  >
    <div>
      <p style={{ margin: 0, fontWeight: 500 }}>✏️ Edit Profile</p>
    </div>

    <span style={{ fontSize: 18 }}>➤</span>

  </div>

</div>

<div style={{ marginTop: 25 }}>

  <div 
    style={settingsButton}
    onClick={() => setPage("changepassword")}
    onMouseEnter={(e) => {
  e.currentTarget.style.transform = "scale(1.02)";
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = "scale(1)";
}}
  >
    <div>
      <p style={{ margin: 0, fontWeight: 500 }}>🔐 Change Password</p>
    </div>

    <span style={{ fontSize: 18 }}>➤</span>

  </div>

</div>

<div style={{ marginTop: 25 }}>

  <div 
    style={settingsButton}
    onClick={() => setPage("how")}
    onMouseEnter={(e) => {
  e.currentTarget.style.transform = "scale(1.02)";
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = "scale(1)";
}}
  >
    <div>
      <p style={{ margin: 0, fontWeight: 500 }}>❔ How to Use the App</p>
    </div>

    <span style={{ fontSize: 18 }}>➤</span>

  </div>

</div>

<div style={{ marginTop: 25 }}>

  <div 
    style={settingsButton}
    onClick={() => setPage("features")}
    onMouseEnter={(e) => {
  e.currentTarget.style.transform = "scale(1.02)";
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = "scale(1)";
}}
  >
    <div>
      <p style={{ margin: 0, fontWeight: 500 }}>⭐ App Features</p>
    </div>

    <span style={{ fontSize: 18 }}>➤</span>

  </div>

</div>

<div style={{ marginTop: 25 }}>

  <div 
    style={logoutBtn}
    onClick={() => {
            localStorage.clear();
            setPage("login");
          }}
    onMouseEnter={(e) => {
  e.currentTarget.style.transform = "scale(1.02)";
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = "scale(1)";
}}
  >
    <div>
      <p style={{ margin: 0, fontWeight: 500 }}>🚪 Logout</p>
    </div>

    <span style={{ fontSize: 18 }}>➤</span>

  </div>

</div>

      </div>

    </div>
  );
}

function Item({ title, onClick, color }) {
  return (
    <div onClick={onClick} style={{
      padding: "14px 10px",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      color: color || "#333"
    }}>
      {title} ➤
    </div>
  );
}

const card = {
  background: "rgba(255,255,255,0.8)",
  backdropFilter: "blur(10px)",
  borderRadius: 20,
  padding: 18,
  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  border: "1px solid rgba(255,255,255,0.3)",
  marginTop:10
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

const logoutBtn = {
  background: "red",
  color: "white",
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

export default Settings;