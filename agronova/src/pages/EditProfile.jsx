import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function EditProfile({ setPage }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("userEmail");

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

  function handleChange(field, value) {
    setUser(prev => ({ ...prev, [field]: value }));
  }

  async function saveChanges() {

    if (!user.name || !user.phone) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/update-profile", {
        method: "POST", // or PUT
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: user.email,
          name: user.name,
          phone: user.phone
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Profile updated successfully");

        localStorage.setItem("userName", user.name);

        setPage("profile");
      } else {
        alert(data.error || "Update failed");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }

    setLoading(false);
  }

  if (!user) return <p style={{ padding: 20 }}>Loading...</p>;

  return (
    <div style={{ padding: 20, animation: "fadeIn 0.4s ease" }}>

      <Navbar title="Edit Profile" onBack={() => setPage("settings")} />

      <div style={card}>

        {/* Avatar */}
        <div style={avatar}>
          {user.name.charAt(0).toUpperCase()}
        </div>

        <h3 style={{ textAlign: "center" }}>{user.name}</h3>

        <input
          value={user.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Full Name"
          style={input}
        />

        <input
          value={user.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          placeholder="Phone"
          style={input}
        />

        <input
          value={user.email}
          disabled
          style={input}
        />

        <button style={btn} onClick={saveChanges}>
          {loading ? "Saving..." : "💾 Save Changes"}
        </button>

      </div>

    </div>
  );
}

export default EditProfile;

// styles same as yours

// styles
const card = {
  background: "rgba(255,255,255,0.8)",
  backdropFilter: "blur(10px)",
  borderRadius: 20,
  padding: 18,
  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  border: "1px solid rgba(255,255,255,0.3)",
  marginTop:10
};

const avatar = {
  width: 90,
  height: 90,
  borderRadius: "50%",
  background: "linear-gradient(135deg,#1b5e3c,#2e7d32)",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 32,
  margin: "0 auto 15px"
};

const input = {
  width: "100%",
  padding: 12,
  marginTop: 12,
  borderRadius: 12,
  border: "1px solid #ddd"
};

const btn = {
  padding: "12px 16px",
  borderRadius: 14,
  border: "none",
  background: "linear-gradient(135deg,#1b5e3c,#43a047)",
  color: "white",
  fontWeight: "500",
  cursor: "pointer",
  boxShadow: "0 6px 15px rgba(27,94,60,0.3)",
  marginRight:2
};