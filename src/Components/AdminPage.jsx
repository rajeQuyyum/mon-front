import React, { useEffect, useState, useRef } from "react";

function AdminPage() {
  const [messages, setMessages] = useState([]);
  const [adminMessage, setAdminMessage] = useState("");
  const adminName = "Admin"; // you can also make it editable
  const chatRef = useRef(null);

  const loadMessages = () => {
    const stored = JSON.parse(localStorage.getItem("chatMessages")) || [];
    setMessages(stored);
  };

  const sendMessage = () => {
    if (!adminMessage.trim()) return;

    const stored = JSON.parse(localStorage.getItem("chatMessages")) || [];
    const newMsg = { username: adminName, message: adminMessage, time: new Date().toLocaleString() };
    stored.push(newMsg);
    localStorage.setItem("chatMessages", JSON.stringify(stored));

    window.dispatchEvent(new CustomEvent("newMessage", { detail: newMsg }));
    setAdminMessage("");
  };

  useEffect(() => {
    loadMessages();
    const handleStorage = () => loadMessages();
    const handleNewMessage = () => loadMessages();

    window.addEventListener("storage", handleStorage);
    window.addEventListener("newMessage", handleNewMessage);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("newMessage", handleNewMessage);
    };
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Chat</h2>
      <div
        ref={chatRef}
        className="border p-4 h-80 overflow-y-scroll bg-gray-50 rounded mb-4"
      >
        {messages.length === 0 ? (
          <p className="text-gray-500">No messages yet.</p>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`mb-2 p-2 border-b rounded shadow-sm ${msg.username === adminName ? "bg-blue-50" : "bg-white"}`}>
              <p className="font-semibold">
                {msg.username} <span className="text-gray-400 text-sm">[{msg.time}]</span>
              </p>
              <p>{msg.message}</p>
            </div>
          ))
        )}
      </div>

      {/* Admin input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={adminMessage}
          onChange={(e) => setAdminMessage(e.target.value)}
          placeholder="Type a message"
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={sendMessage}
          className="bg-green-500 text-white px-4 rounded hover:bg-green-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default AdminPage;
