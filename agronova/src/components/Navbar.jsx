function Navbar({ title, onBack }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "15px 20px",
      background: "white",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      position: "sticky",
      top: 0,
      zIndex: 100
    }}>

      {/* LEFT */}
      {onBack ? (
        <span
          onClick={onBack}
          style={{
            padding: "10px 16px",
  border: "none",
  borderRadius: 12,
  background: "linear-gradient(135deg, #1b5e3c, #2e7d32)",
  color: "white",
  cursor: "pointer",
  fontSize: 14,
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  transition: "0.2s"
          }}
        >
          ←
        </span>
      ) : <div style={{ width: 20 }} />}

      {/* CENTER */}
      <h3 style={{
        margin: 0,
        fontWeight: 500
      }}>
        {title}
      </h3>

      {/* RIGHT (placeholder) */}
      <div style={{ width: 20 }} />

    </div>
  );
}

export default Navbar;