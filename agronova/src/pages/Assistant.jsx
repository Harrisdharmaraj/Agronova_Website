import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import ReactMarkdown from "react-markdown";

function Assistant({ setPage }) {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);

  const recognitionRef = useRef(null);
  const bottomRef = useRef(null);

  const email = localStorage.getItem("userEmail");
  const CHAT_KEY = `chat_${email}`;

  // ================= LOAD CHAT =================
  useEffect(() => {
  const savedChat = localStorage.getItem(CHAT_KEY);

  if (savedChat && JSON.parse(savedChat).length > 0) {
    setChat(JSON.parse(savedChat));
  } else {
    const defaultMessage = [
      {
        text: "👋 Hey, I’m your agriculture mentor! What are we sowing today? 🌱",
        sender: "bot"
      }
    ];

    setChat(defaultMessage);

    // ✅ SAVE IMMEDIATELY (NO DELAY)
    localStorage.setItem(CHAT_KEY, JSON.stringify(defaultMessage));
  }
}, [CHAT_KEY]);

  // ================= SAVE CHAT =================
  useEffect(() => {
  if (chat.length > 0) {   // ✅ prevent saving empty []
    localStorage.setItem(CHAT_KEY, JSON.stringify(chat));
  }
}, [chat, CHAT_KEY]);

  // ================= AUTO SCROLL =================
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // ================= VOICE =================
  function toggleVoice() {

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice not supported");
      return;
    }

    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-IN";

      recognitionRef.current.onresult = (event) => {
        setMessage(event.results[0][0].transcript);
      };

      recognitionRef.current.onend = () => setIsListening(false);
    }

    if (!isListening) {
      recognitionRef.current.start();
      setIsListening(true);
    } else {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }

  // ================= TYPING EFFECT =================
  async function typeMessage(fullText) {
    let current = "";

    for (let i = 0; i < fullText.length; i++) {
      current += fullText[i];

      setChat(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          text: current,
          sender: "bot"
        };
        return updated;
      });

      await new Promise(r => setTimeout(r, 10));
    }
  }

  // ================= SEND =================
  async function sendMessage(customMessage) {

    const text = customMessage || message;
    if (!text) return;

    setChat(prev => [...prev, { text, sender: "user" }]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: text,
          location: localStorage.getItem("city") || "",
          temperature: localStorage.getItem("temp") || "",
          condition: localStorage.getItem("condition") || ""
        })
      });

      const data = await res.json();

      // placeholder bot message
      setChat(prev => [...prev, { text: "", sender: "bot" }]);

      await typeMessage(data.reply);

    } catch {
      setChat(prev => [
        ...prev,
        { text: "Error connecting to AI", sender: "bot" }
      ]);
    }

    setLoading(false);
  }

  // ================= IMAGE UPLOAD =================
  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      sendImage(reader.result.split(",")[1]);
    };

    reader.readAsDataURL(file);
  }

  async function sendImage(base64) {

    setChat(prev => [...prev, { text: "📷 Image uploaded", sender: "user" }]);

    const res = await fetch("http://localhost:5000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        imageBase64: base64,
        location: localStorage.getItem("city") || ""
      })
    });

    const data = await res.json();

    setChat(prev => [...prev, { text: data.reply, sender: "bot" }]);
  }

  // ================= CLEAR =================
  function clearChat() {
  localStorage.removeItem(CHAT_KEY);

  const defaultMessage = [
    {
      text: "👋 Hey, I’m your agriculture mentor! What are we sowing today? 🌱",
      sender: "bot"
    }
  ];

  setChat(defaultMessage);
  localStorage.setItem(CHAT_KEY, JSON.stringify(defaultMessage));
}

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh",animation: "fadeIn 0.4s ease" }}>

      <Navbar title="🤖 AgroNova AI" onBack={() => setPage("dashboard")} />

      {/* SUGGESTIONS */}
      {chat.length === 0 && (
        <div style={{ padding: 15, display: "flex", gap: 10 }}>
          <button style={chip} onClick={() => sendMessage("Best crop for summer")}>
            🌱 Crop Advice
          </button>
          <button style={chip} onClick={() => sendMessage("Weather forecast")}>
            🌦 Weather
          </button>
          <button style={chip} onClick={() => sendMessage("Fertilizer for rice")}>
            🧪 Fertilizer
          </button>
        </div>
      )}

      {/* CHAT */}
      <div style={{ flex: 1, overflowY: "auto", padding: 15 }}>

        {chat.map((msg, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
            marginBottom: 10
          }}>
            <div style={{
              maxWidth: "70%",
              padding: 12,
              borderRadius: 16,
              background: msg.sender === "user"
  ? "linear-gradient(135deg,#1b5e3c,#43a047)"
  : "rgba(255,255,255,0.9)",
boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
borderRadius: "18px",
              color: msg.sender === "user" ? "white" : "#333"
            }}>
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && <p style={{ color: "#888" }}>AI is typing...</p>}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div style={{ display: "flex", padding: 10, background: "white" }}>

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about farming..."
          style={input}
        />

        <input type="file" hidden id="imgUpload" onChange={handleImage} />

        <button onClick={() => document.getElementById("imgUpload").click()} style={btn}>
          📷
        </button>

        <button onClick={toggleVoice} style={{
          ...btn,
          background: isListening ? "#ff3b30" : "#1b5e3c"
        }}>
          🎤
        </button>

        <button onClick={() => sendMessage()} style={btn}>
          ➤
        </button>

      </div>

    </div>
  );
}

export default Assistant;

// ================= STYLES =================
const input = {
  flex: 1,
  padding: 12,
  borderRadius: 20,
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

const chip = {
  padding: "8px 12px",
  borderRadius: 20,
  border: "1px solid #ddd",
  background: "white",
  cursor: "pointer"
};