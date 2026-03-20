import { useState } from "react";
import Navbar from "../components/Navbar";

function CropCalendar({ setPage }) {

  const [crop, setCrop] = useState("");
  const [date, setDate] = useState("");
  const [tasks, setTasks] = useState([]);

  const cardStyle = {
  background: "rgba(255,255,255,0.8)",
  backdropFilter: "blur(10px)",
  borderRadius: 20,
  padding: 18,
  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  border: "1px solid rgba(255,255,255,0.3)",
  marginTop:10
};

  async function generateCalendar() {

    if (!crop || !date) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/generate-calendar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
          cropName: crop,
          sowingDate: date
        })
      });

      const data = await res.json();
      setTasks(data.tasks);

    } catch (err) {
      console.error(err);
    }
  }

  async function markDone(taskId) {

    await fetch("http://localhost:5000/mark-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ taskId })
    });

    // update UI
    setTasks(prev =>
      prev.map(t =>
        t.id === taskId ? { ...t, isCompleted: true } : t
      )
    );
  }

  return (
    <div style={{ padding: 20, animation: "fadeIn 0.4s ease" }}>

      <Navbar
        title="📅 Crop Calendar"
        onBack={() => setPage("dashboard")}
      />

      {/* INPUT */}
      <input
        placeholder="Enter crop (e.g. Rice)"
        value={crop}
        onChange={(e) => setCrop(e.target.value)}
        style={{ width: "98%", padding: 10, marginTop: 10 }}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ width: "98%", padding: 10, marginTop: 10 }}
      />

      <button
        style={{
          marginTop: 15,
          padding: 10,
          width: "100%",
          background: "#1b5e3c",
          color: "white",
          border: "none",
          borderRadius: 10
        }}
        onClick={generateCalendar}
      >
        Generate Calendar
      </button>

      {/* TASKS */}
      {tasks.map((task) => (
        <div key={task.id} style={cardStyle}>

          <h4>
            Day {task.day} – {task.title}
          </h4>

          <p>{task.description}</p>

          <p style={{ fontSize: 12, color: "#777" }}>
            📅 {task.date}
          </p>

          {!task.isCompleted && (
            <button
              onClick={() => markDone(task.id)}
              style={{
                marginTop: 10,
                padding: "6px 10px",
                borderRadius: 8,
                border: "none",
                background: "#2e7d32",
                color: "white"
              }}
            >
              ✔ Mark Done
            </button>
          )}

          {task.isCompleted && (
            <p style={{ color: "green" }}>✅ Completed</p>
          )}

        </div>
      ))}

    </div>
  );
}

export default CropCalendar;