import Navbar from "../components/Navbar";

function HowToUse({ setPage }) {

  const steps = [
    {
      title: "Using Voice Assistant",
      desc: "Tap the mic and ask farming questions naturally."
    },
    {
      title: "Scanning Crop Diseases",
      desc: "Upload a leaf image to detect diseases instantly."
    },
    {
      title: "Sharing of Resources",
      desc: "Rent your resources or rent from others."
    },
    {
      title: "Translating Chemicals",
      desc: "Scan pesticide labels and understand usage."
    },
    {
      title: "Using Crop Calendar",
      desc: "Plan sowing, irrigation, and harvest schedule."
    }
  ];

  return (
    <div style={{ padding: 20, animation: "fadeIn 0.4s ease" }}>

      <Navbar title="📘 How to Use AgroNova" onBack={() => setPage("settings")} />

      <div style={{ marginTop: 10 }}>

        {steps.map((s, i) => (
          <div key={i} style={card}>

            <h4>{s.title}</h4>
            <p style={{ color: "#777" }}>{s.desc}</p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default HowToUse;

const card = {
  background: "rgba(255,255,255,0.8)",
  backdropFilter: "blur(10px)",
  borderRadius: 20,
  padding: 18,
  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  border: "1px solid rgba(255,255,255,0.3)",
  marginTop:10
};