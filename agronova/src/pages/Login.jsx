import { useState } from "react";

function Login({ setPage }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleLogin() {

    if (!email || !password) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.status === 200) {
        localStorage.setItem("userEmail", email);
        setPage("dashboard");
      } else {
        alert(data.message || data.error || "Something went wrong");
      }

    } catch {
      alert("Server error");
    }
  }

  return (
    <div style={{
      height: "100vh",
      background: "#f4f6f5",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      animation: "fadeIn 0.4s ease"
    }}>

      {/* LOGO */}
      <div style={{
        textAlign: "center",
        marginBottom: 20
      }}>
        <div style={{
          width: 70,
          height: 70,
          background: "#e8f5e9",
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto"
        }}>
          🌿
        </div>

        <h2 style={{ marginTop: 10, color: "#1b5e3c" }}>
          AgroNova
        </h2>

        <p style={{ color: "#777", fontSize: 14 }}>
          Smart Farming Evolution
        </p>
      </div>

      {/* CARD */}
      <div style={{
        width: "100%",
        maxWidth: 350,
        background: "white",
        padding: 25,
        borderRadius: 20,
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
      }}>

        <h3 style={{ marginBottom: 5 }}>
          Welcome Back, Farmer
        </h3>

        <p style={{ fontSize: 13, color: "#777", marginBottom: 20 }}>
          Access your AI-powered field insights
        </p>

        {/* EMAIL */}
        <div style={{ marginBottom: 15 }}>
          <p style={{ fontSize: 12 }}>Email Address</p>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="farmer@agronova.ai"
            style={{
              width: "93%",
              padding: 12,
              borderRadius: 12,
              border: "1px solid #eee",
              background: "#f7f7f7"
            }}
          />
        </div>

        {/* PASSWORD */}
        <div style={{ marginBottom: 15 }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12
          }}>
            <span>Password</span>
          </div>
          <div style={{
  position: "relative",
  marginTop: 12
}}>

          <input
            type={showConfirm ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            style={{
              width: "93%",
              padding: 12,
              borderRadius: 12,
              border: "1px solid #eee",
              background: "#f7f7f7",
              marginTop: 5
            }}
          />
          <span onClick={() => setShowConfirm(!showConfirm)} style={eye}>
            {showConfirm ? "🙈" : "👁️"}
          </span>
          </div>
        </div>


        {/* BUTTON */}
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 12,
            border: "none",
            background: "linear-gradient(135deg, #1b5e3c, #2e7d32)",
            color: "white",
            fontWeight: "bold",
            fontSize: 14,
            cursor: "pointer",
            boxShadow: "0 6px 15px rgba(0,0,0,0.15)"
          }}
        >
          Login to Dashboard
        </button>

      </div>

      {/* SIGNUP */}
      <p style={{ marginTop: 15, fontSize: 13 }}>
        Don’t have an account?{" "}
        <span
          onClick={() => setPage("signup")}
          style={{ color: "#1b5e3c", cursor: "pointer" }}
        >
          Sign Up
        </span>
      </p>

    </div>
  );
}

export default Login;
const eye = {
  position: "absolute",
  right: 12,
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer"
};