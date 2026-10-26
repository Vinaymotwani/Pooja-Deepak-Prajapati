import React, { useState, useEffect } from "react";
import socket from "../socket";
import API_URL from "../config";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState("");

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const messageData = { text: inputMsg, timestamp: new Date().toLocaleTimeString() };
    socket.emit("sendMessage", messageData);
    setMessages((prev) => [...prev, messageData]);
    setInputMsg("");
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 9999 }}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "55px",
            height: "55px",
            fontSize: "24px",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          }}
        >
          ??
        </button>
      ) : (
        <div
          style={{
            width: "300px",
            height: "400px",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "10px 15px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            <span>Live Chat</span>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: "none", border: "none", color: "#fff", fontSize: "16px", cursor: "pointer" }}
            >
              ?
            </button>
          </div>
          <div style={{ flex: 1, padding: "10px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px" }}>
            {messages.length === 0 ? (
              <p style={{ color: "#888", fontSize: "14px", textAlign: "center", marginTop: "20px" }}>No messages yet.</p>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} style={{ backgroundColor: "#f1f1f1", padding: "8px 12px", borderRadius: "6px", fontSize: "14px" }}>
                  {msg.text}
                </div>
              ))
            )}
          </div>
          <form onSubmit={sendMessage} style={{ display: "flex", borderTop: "1px solid #ccc", padding: "8px" }}>
            <input
              type="text"
              placeholder="Type a message..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              style={{ flex: 1, border: "1px solid #ccc", borderRadius: "4px", padding: "6px 8px", outline: "none" }}
            />
            <button
              type="submit"
              style={{ backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", marginLeft: "6px", padding: "6px 12px", cursor: "pointer" }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
