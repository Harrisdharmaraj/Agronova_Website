import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

function ResourceHub({ setPage }) {

    

  const [resources, setResources] = useState([]);
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null); // 👈 NEW

  const email = localStorage.getItem("userEmail");
  const [coords, setCoords] = useState({ lat: null, lon: null });

  // 🔥 FETCH USER DATA
  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
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

 async function deleteResource(id) {

  try {
    await fetch("http://localhost:5000/delete-resource", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    });

    // 🔥 REMOVE FROM UI INSTANTLY
    setResources(prev => prev.filter(r => r.id !== id));

  } catch (err) {
    console.error("Delete error:", err);
  }
}

  // 📍 Get location + fetch resources
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      fetchResources(pos.coords.latitude, pos.coords.longitude);
    });
  }, []);

  async function fetchResources(lat, lon) {
    try {
      const res = await fetch(
        `http://localhost:5000/get-resources?lat=${lat}&lon=${lon}`
      );
      const data = await res.json();
      setResources(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function postResource() {

    if (!itemName || !category) {
      alert("Fill all fields");
      return;
    }

    if (!user) {
      alert("User data not loaded");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {

      setLoading(true);

      await fetch("http://localhost:5000/post-resource", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          ownerName: user.name,      // ✅ REAL NAME
          ownerPhone: user.phone,    // ✅ REAL PHONE
          itemName,
          category,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        })
      });


      setItemName("");
      setCategory("");
      setLoading(false);

      fetchResources(pos.coords.latitude, pos.coords.longitude);
    });
  }

  async function toggleAvailability(r) {

  try {
    await fetch("http://localhost:5000/edit-resource", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: r.id,
        itemName: r.itemName,
        category: r.category,
        isAvailable: !r.isAvailable
      })
    });

    // 🔥 INSTANT UI UPDATE (NO REFRESH)
    setResources(prev =>
      prev.map(item =>
        item.id === r.id
          ? { ...item, isAvailable: !item.isAvailable }
          : item
      )
    );

  } catch (err) {
    console.error("Toggle error:", err);
  }
}

  return (
    <div style={{ padding: 20, animation: "fadeIn 0.4s ease" }}>

      <Navbar title="🤝 Resource Hub" onBack={() => setPage("dashboard")} />

      {/* POST RESOURCE */}
      <div style={{
        background: "white",
        padding: 20,
        borderRadius: 16,
        marginBottom: 20
      }}>

        <h3>➕ Add Resource</h3>

        <input
          placeholder="Item Name (Tractor, Seeds...)"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Category (Equipment / Seeds / Labor)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={inputStyle}
        />

        <button onClick={postResource} style={btnStyle}>
          {loading ? "Posting..." : "Post Resource"}
        </button>
      </div>

      {/* LIST */}
      <div>
        <h3>📍 Nearby Resources</h3>

        {resources.length === 0 && <div style={{ textAlign: "center", marginTop: 30 }}>
  <h3>🌱 Nothing here yet</h3>
  <p style={{ color: "#777" }}>Start by adding something!</p>
</div>}

        {resources.map((r) => (
          <div key={r.id} style={cardStyle}>

            <h4>{r.itemName}</h4>

            <p>📦 {r.category}</p>
            <p>👤 {r.ownerName}</p>
            <div style={{ marginTop: 10, display: "flex", gap: 10 }}>

  {/* WhatsApp Chat */}
  <a
    href={`https://wa.me/${r.ownerPhone}`}
    target="_blank"
    rel="noreferrer"
    style={waBtn}
  >
    💬 Chat
  </a>

  {/* WhatsApp Call */}
  <a
    href={`https://wa.me/${r.ownerPhone}?text=Hi, I want to call you about ${r.itemName}`}
    target="_blank"
    rel="noreferrer"
    style={waBtn}
  >
    📞 Call
  </a>

</div>
            <p>📍 {r.distanceKm} km away</p>

            <span style={{
              color: r.isAvailable ? "green" : "red"
            }}>
              {r.isAvailable ? "Available" : "Not Available"}
            </span>

          </div>
        ))}
      </div>

      <h3 style={{ marginTop: 30 }}>📦 My Listings</h3>

{resources
  .filter(r => r.userEmail === email)
  .map((r) => (
    <div key={r.id} style={cardStyle}>

      <h4>{r.itemName}</h4>

      <p>📦 {r.category}</p>

      <div style={{ marginTop: 10, display: "flex", gap: 10 }}>

        {/* Toggle Availability */}
        <button
          style={editBtn}
          onClick={() => toggleAvailability(r)}
        >
          {r.isAvailable ? "Mark Unavailable" : "Mark Available"}
        </button>

        {/* Delete */}
        <button
          style={deleteBtn}
          onClick={() => deleteResource(r.id)}
        >
          Delete
        </button>

      </div>

    </div>
))}

    </div>
  );
}

// styles (same)
const inputStyle = {
  width: "100%",
  padding: 10,
  marginTop: 10,
  borderRadius: 10,
  border: "1px solid #ddd"
};

const btnStyle = {
  marginTop: 10,
  padding: 10,
  width: "100%",
  borderRadius: 10,
  border: "none",
  background: "#1b5e3c",
  color: "white",
  cursor: "pointer"
};

const cardStyle = {
  background: "rgba(255,255,255,0.8)",
  backdropFilter: "blur(10px)",
  borderRadius: 20,
  padding: 18,
  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  border: "1px solid rgba(255,255,255,0.3)",
  marginTop:10
};
const waBtn = {
  padding: "6px 10px",
  borderRadius: 8,
  background: "#25D366",
  color: "white",
  textDecoration: "none",
  fontSize: 12
};

const editBtn = {
  padding: "6px 10px",
  borderRadius: 8,
  background: "#1976d2",
  color: "white",
  border: "none",
  cursor: "pointer"
};

const deleteBtn = {
  padding: "6px 10px",
  borderRadius: 8,
  background: "#e53935",
  color: "white",
  border: "none",
  cursor: "pointer"
};

export default ResourceHub;