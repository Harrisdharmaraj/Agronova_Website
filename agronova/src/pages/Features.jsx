import Navbar from "../components/Navbar";

function Features({ setPage }) {

  const features = [
    {
      title: "Voice AI Assistant",
      desc: "Ask farming questions using voice or text."
    },
    {
      title: "Disease Detection",
      desc: "Detect plant diseases with AI image analysis."
    },
    {
      title: "Smart Crop Recommendation",
      desc: "Get best crops based on weather & soil."
    },
    {
      title: "Chemical Translator",
      desc: "Understand pesticides safely."
    },
    {
      title: "Crop Calendar",
      desc: "Plan full crop lifecycle with reminders."
    },
    {
      title: "Resource Hub",
      desc: "Find tractors, labor, and tools nearby."
    }
  ];

  return (
    <div style={{ padding: 20, animation: "fadeIn 0.4s ease" }}>

      <Navbar title="🚀 AgroNova Features" onBack={() => setPage("settings")} />

      <div style={{ marginTop: 10 }}>

        {features.map((f, i) => (
          <div key={i} style={card}>

            <h4>{f.title}</h4>
            <p style={{ color: "#777" }}>{f.desc}</p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Features;

const card = {
  background: "rgba(255,255,255,0.8)",
  backdropFilter: "blur(10px)",
  borderRadius: 20,
  padding: 18,
  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  border: "1px solid rgba(255,255,255,0.3)",
  marginTop:10
};