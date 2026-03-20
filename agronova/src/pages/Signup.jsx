import { useState } from "react";

function Signup({ setPage }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: ""
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSignup() {

    if (!form.name || !form.email || !form.password || !form.confirm) {
      alert("Fill all fields");
      return;
    }

    if (form.password !== form.confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone,
        })
      });

      const data = await res.json();

      if (res.status === 200) {
        alert("Account created!");
        setPage("login");
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

      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>

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

        <h2 style={{ color: "#1b5e3c", marginTop: 10 }}>
          AgroNova
        </h2>

        <h3 style={{ color: "#2e7d32", marginTop: 5 }}>
          Create Your Account
        </h3>

      </div>

      {/* CARD */}
      <div style={{
        width: "100%",
        maxWidth: 360,
        background: "white",
        padding: 25,
        borderRadius: 20,
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
      }}>

        {/* INPUT STYLE */}
        {[
          { name: "name", placeholder: "Full Name" },
          { name: "email", placeholder: "Email Address" },
          { name: "phone", placeholder: "Phone Number" }
        ].map((field) => (
          <input
            key={field.name}
            name={field.name}
            value={form[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 12,
              border: "1px solid #eee",
              background: "#f7f7f7",
              marginBottom: 12
            }}
          />
        ))}

        {/* PASSWORD */}
        <div style={{ position: "relative" }}>
          <input
            type={showPass ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 12,
              border: "1px solid #eee",
              background: "#f7f7f7",
              marginBottom: 12
            }}
          />
          <span
            onClick={() => setShowPass(!showPass)}
            style={{
              position: "absolute",
              right: 10,
              top: 12,
              cursor: "pointer"
            }}
          >
            👁
          </span>
        </div>

        {/* CONFIRM PASSWORD */}
        <div style={{ position: "relative" }}>
          <input
            type={showConfirm ? "text" : "password"}
            name="confirm"
            value={form.confirm}
            onChange={handleChange}
            placeholder="Confirm Password"
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 12,
              border: "1px solid #eee",
              background: "#f7f7f7",
              marginBottom: 12
            }}
          />
          <span
            onClick={() => setShowConfirm(!showConfirm)}
            style={{
              position: "absolute",
              right: 10,
              top: 12,
              cursor: "pointer"
            }}
          >
            👁
          </span>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSignup}
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
          Sign Up
        </button>

      </div>

      {/* LOGIN LINK */}
      <p style={{ marginTop: 15, fontSize: 13 }}>
        Already have an account?{" "}
        <span
          onClick={() => setPage("login")}
          style={{ color: "#1b5e3c", cursor: "pointer" }}
        >
          Login
        </span>
      </p>

    </div>
  );
}

export default Signup;