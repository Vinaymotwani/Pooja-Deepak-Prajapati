import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL || "https://hotel-booking-backend002.onrender.com";

// Enforce WebSocket transport to avoid polling CORS preflight issues
const socket = io(API_URL, {
  autoConnect: false,
  transports: ["websocket", "polling"],
  withCredentials: true
});

export default function Chat() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);
    const onMessage = (msg) => setMessages((prev) => [...prev, msg]);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("chatMessage", onMessage);

    socket.connect();

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("chatMessage", onMessage);
      socket.disconnect();
    };
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!username.trim() || !message.trim() || !isConnected) return;

    socket.emit("chatMessage", {
      username: username.trim(),
      message: message.trim()
    });

    setMessage("");
  };

  return (
    <section className="max-w-3xl mx-auto my-12 px-6">
      <div className="bg-white rounded-2xl shadow-lg border p-6">
        <h2 className="text-2xl font-bold text-gray-900">Real-Time Chat</h2>
        <p className={isConnected ? "text-green-600" : "text-red-600"}>
          {isConnected ? "Connected" : "Disconnected"}
        </p>

        <input
          className="w-full border rounded-lg p-3 my-4"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          maxLength={30}
        />

        <div className="h-64 overflow-y-auto border rounded-lg p-3 mb-4">
          {messages.length === 0 ? (
            <p className="text-gray-500">No messages yet. Start the conversation!</p>
          ) : (
            messages.map((msg, idx) => (
              <p key={idx} className="mb-2">
                <strong>{msg.username}:</strong> {msg.message}
              </p>
            ))
          )}
        </div>

        <form onSubmit={handleSend} className="flex gap-2">
          <input
            className="flex-1 min-w-0 border rounded-lg p-3"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={500}
          />
          <button
            type="submit"
            disabled={!isConnected}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-5 rounded-lg"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}
