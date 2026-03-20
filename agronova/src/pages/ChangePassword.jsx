import { useState } from "react";
import Navbar from "../components/Navbar";

function ChangePassword({ setPage }) {

  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("userEmail");

  async function handleChangePassword() {

  if (!current || !newPass || !confirm) {
    alert("Fill all fields");
    return;
  }

  if (newPass !== confirm) {
    alert("Passwords do not match");
    return;
  }

  setLoading(true);

  try {

    // 🔥 STEP 1: VERIFY CURRENT PASSWORD
    const verifyRes = await fetch("http://localhost:5000/verify-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        currentPassword: current
      })
    });

    const verifyData = await verifyRes.json();

    if (!verifyRes.ok) {
      alert(verifyData.error || "Incorrect current password");
      setLoading(false);
      return;
    }

    // 🔥 STEP 2: CHANGE PASSWORD
    const changeRes = await fetch("http://localhost:5000/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        newPassword: newPass
      })
    });

    const changeData = await changeRes.json();

    if (changeRes.ok) {
      alert("✅ Password updated successfully");
      setPage("settings");
    } else {
      alert(changeData.error || "Failed to update password");
    }

  } catch (err) {
    console.error(err);
    alert("Server error");
  }

  setLoading(false);
}

  return (
    <div style={{ padding: 20, animation: "fadeIn 0.4s ease" }}>

      <Navbar title="🔐 Change Password" onBack={() => setPage("settings")} />

      <div style={card}>

        {/* CURRENT PASSWORD */}
        <div style={inputWrapper}>
          <input
            type={showCurrent ? "text" : "password"}
            placeholder="Current Password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            style={input}
          />
          <span onClick={() => setShowCurrent(!showCurrent)} style={eye}>
            {showCurrent ? "🙈" : "👁️"}
          </span>
        </div>

        {/* NEW PASSWORD */}
        <div style={inputWrapper}>
          <input
            type={showNew ? "text" : "password"}
            placeholder="New Password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            style={input}
          />
          <span onClick={() => setShowNew(!showNew)} style={eye}>
            {showNew ? "🙈" : "👁️"}
          </span>
        </div>

        {/* CONFIRM PASSWORD */}
        <div style={inputWrapper}>
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            style={input}
          />
          <span onClick={() => setShowConfirm(!showConfirm)} style={eye}>
            {showConfirm ? "🙈" : "👁️"}
          </span>
        </div>

        <button style={btn} onClick={handleChangePassword}>
          {loading ? "Updating..." : "Update Password"}
        </button>

        <p style={hint}>
          ⚠️ Must include uppercase, lowercase, number & symbol (6–8 chars)
        </p>

      </div>

    </div>
  );
}

export default ChangePassword;

const card = {
  background: "white",
  padding: 20,
  borderRadius: 18,
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
};

const inputWrapper = {
  position: "relative",
  marginTop: 12
};

const input = {
  width: "100%",
  padding: 12,
  borderRadius: 12,
  border: "1px solid #ddd"
};

const eye = {
  position: "absolute",
  right: 12,
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer"
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

const hint = {
  marginTop: 10,
  fontSize: 12,
  color: "#777"
};