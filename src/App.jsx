import { useState } from "react";
import { sendMessageToGroq } from "./services/groq";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    {
      text: "Olá! 👋 Sou seu assistente IA. Como posso ajudar você hoje?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    const userQuestion = input;
    setInput("");
    setIsLoading(true);

    const botResponse = await sendMessageToGroq(userQuestion);

    setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) {
      sendMessage();
    }
  };

  const formatMessage = (text) => {
    return text.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="header-info">
          <div className="header-icon">💬</div>
          <div className="header-text">
            <h1>Chatbot AI</h1>
            <p>Assistente inteligente</p>
          </div>
        </div>
        <div className="header-status">
          <div className="status-dot"></div>
          <span className="status-text">Online</span>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div className="message-bubble">{formatMessage(msg.text)}</div>
          </div>
        ))}
        {isLoading && (
          <div className="message bot">
            <div className="message-bubble typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite sua mensagem..."
          className="chat-input"
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          className="send-button"
          disabled={isLoading}
        >
          {isLoading ? "Enviando..." : "Enviar"}
        </button>
      </div>
    </div>
  );
}

export default App;
