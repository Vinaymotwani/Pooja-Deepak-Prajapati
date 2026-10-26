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
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 99999,
        width: "320px",
        padding: "16px",
        borderRadius: "12px",
        border: "1px solid #d1d5db",
        backgroundColor: "#ffffff",
        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        fontFamily: "sans-serif",
      }}
    >
      <h3 style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: "bold", color: "#111827" }}>
        Real-Time Chat
      </h3>
      <div
        style={{
          color: isConnected ? "#10b981" : "#ef4444",
          fontSize: "12px",
          fontWeight: "600",
          marginBottom: "10px",
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
          padding: "6px 10px",
          marginBottom: "10px",
          borderRadius: "6px",
          border: "1px solid #d1d5db",
          fontSize: "13px",
          boxSizing: "border-box",
        }}
      />

      <div
        style={{
          height: "150px",
          border: "1px solid #e5e7eb",
          borderRadius: "6px",
          padding: "8px",
          overflowY: "auto",
          marginBottom: "10px",
          backgroundColor: "#f9fafb",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        {messages.length === 0 ? (
          <div
            style={{
              color: "#9ca3af",
              fontSize: "12px",
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
                fontSize: "12px",
                padding: "6px 8px",
                backgroundColor: "#ffffff",
                borderRadius: "4px",
                border: "1px solid #f3f4f6",
              }}
            >
              <strong style={{ color: "#2563eb" }}>{msg.user}: </strong>
              {msg.text}
            </div>
          ))
        )}
      </div>

      <form onSubmit={sendMessage} style={{ display: "flex", gap: "6px" }}>
        <input
          type="text"
          placeholder="Type a message"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          style={{
            flex: 1,
            padding: "6px 10px",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            fontSize: "13px",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#2563eb",
            color: "#ffffff",
            border: "none",
            borderRadius: "6px",
            padding: "6px 14px",
            fontWeight: "600",
            fontSize: "13px",
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