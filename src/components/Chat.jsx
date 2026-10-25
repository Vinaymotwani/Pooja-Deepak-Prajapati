import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL, {
  autoConnect: false
});

function Chat() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);
    const onMessage = (data) => {
      setMessages((previous) => [...previous, data]);
    };

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

  const sendMessage = (event) => {
    event.preventDefault();

    if (!username.trim() || !message.trim() || !connected) {
      return;
    }

    socket.emit("chatMessage", {
      username: username.trim(),
      message: message.trim()
    });

    setMessage("");
  };

  return (
    <section className="max-w-3xl mx-auto my-12 px-6">
      <div className="bg-white rounded-2xl shadow-lg border p-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Real-Time Chat
        </h2>

        <p className={connected ? "text-green-600" : "text-red-600"}>
          {connected ? "Connected" : "Disconnected"}
        </p>

        <input
          className="w-full border rounded-lg p-3 my-4"
          placeholder="Enter your name"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          maxLength={30}
        />

        <div className="h-64 overflow-y-auto border rounded-lg p-3 mb-4">
          {messages.length === 0 ? (
            <p className="text-gray-500">
              No messages yet. Start the conversation!
            </p>
          ) : (
            messages.map((item, index) => (
              <p key={index} className="mb-2">
                <strong>{item.username}:</strong> {item.message}
              </p>
            ))
          )}
        </div>

        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            className="flex-1 min-w-0 border rounded-lg p-3"
            placeholder="Type a message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            maxLength={500}
          />

          <button
            type="submit"
            disabled={!connected}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-5 rounded-lg"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}

export default Chat;


