import React, { useState, useEffect } from "react";
import socket from "../socket";
import API_URL from "../config";

const Chat = () => {
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (socket.connected) setIsConnected(true);

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const messageData = {
      user: name || "Anonymous",
      text: inputMsg,
      timestamp: new Date().toLocaleTimeString(),
    };

    socket.emit("sendMessage", messageData);
    setMessages((prev) => [...prev, messageData]);
    setInputMsg("");
  };

  return (
    <div
      style={{
        width: "320px",
        margin: "30px auto",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #d1d5db",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        fontFamily: "sans-serif",
      }}
    >
      <h3 style={{ margin: "0 0 4px 0", fontSize: "18px", fontWeight: "bold" }}>
        Real-Time Chat
      </h3>
      <div
        style={{
          color: isConnected ? "#10b981" : "#ef4444",
          fontSize: "12px",
          fontWeight: "600",
          marginBottom: "12px",
        }}
      >
        {isConnected ? "Connected" : "Disconnected"}
      </div>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          width: "100%",
          padding: "8px 12px",
          marginBottom: "12px",
          borderRadius: "6px",
          border: "1px solid #d1d5db",
          fontSize: "14px",
          boxSizing: "border-box",
        }}
      />

      <div
        style={{
          height: "180px",
          border: "1px solid #d1d5db",
          borderRadius: "6px",
          padding: "10px",
          overflowY: "auto",
          marginBottom: "12px",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        {messages.length === 0 ? (
          <div
            style={{
              color: "#6b7280",
              fontSize: "13px",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                fontSize: "13px",
                padding: "6px 8px",
                backgroundColor: "#f3f4f6",
                borderRadius: "4px",
              }}
            >
              <strong>{msg.user}: </strong>
              {msg.text}
            </div>
          ))
        )}
      </div>

      <form onSubmit={sendMessage} style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          placeholder="Type a message"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          style={{
            flex: 1,
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            fontSize: "14px",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#2563eb",
            color: "#ffffff",
            border: "none",
            borderRadius: "6px",
            padding: "8px 16px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;