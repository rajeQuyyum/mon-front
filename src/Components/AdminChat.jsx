import React, { useState, useEffect, useRef, useMemo } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const SOCKET_URL = import.meta.env.VITE_API || "http://localhost:8000";
const socket = io(SOCKET_URL);

const AdminChat = () => {
  const [users, setUsers] = useState([]);
  const [unread, setUnread] = useState({}); // { [email]: number }
  const [selectedUser, setSelectedUser] = useState(null); // ✅ store full user
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  const API = import.meta.env.VITE_API || "http://localhost:8000";

  const selectedEmail = selectedUser?.email || null;

  // ✅ Fetch users once
  const fetchUsers = () => {
    axios.get(`${API}/admin/users`).then((res) => setUsers(res.data));
  };

  useEffect(() => {
  socket.emit("joinAdmin");
}, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
  const handler = (msg) => {
    // If admin is viewing this chat, append message
    if (msg.email === selectedEmail) {
      setMessages((prev) => [...prev, msg]);
      return;
    }

    // If message is from user and admin is NOT viewing that chat -> unread dot
    if (msg.sender === "user") {
      setUnread((prev) => ({
        ...prev,
        [msg.email]: (prev[msg.email] || 0) + 1,
      }));
    }
  };

  socket.on("newMessage", handler);
  return () => socket.off("newMessage", handler);
}, [selectedEmail]);

  

  // ✅ Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Status listeners once
  useEffect(() => {
    const statusHandler = ({ messageId, status }) => {
      setMessages((prev) =>
        prev.map((msg) => (msg._id === messageId ? { ...msg, status } : msg))
      );
    };

    const seenHandler = () => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.sender === "admin" ? { ...msg, status: "seen" } : msg
        )
      );
    };

    socket.on("messageStatusUpdated", statusHandler);
    socket.on("adminMessagesSeen", seenHandler);

    return () => {
      socket.off("messageStatusUpdated", statusHandler);
      socket.off("adminMessagesSeen", seenHandler);
    };
  }, []);

  const sendReply = () => {
    if (!text.trim() || !selectedEmail) return;
    socket.emit("sendMessage", { email: selectedEmail, sender: "admin", text });
    setText("");
  };

  const deleteChat = (email) => {
    if (!window.confirm(`Are you sure you want to delete all messages for ${email}?`))
      return;

    axios
      .delete(`${API}/admin/messages/${email}`)
      .then(() => {
        if (selectedEmail === email) {
          setSelectedUser(null);
          setMessages([]);
        }
        fetchUsers(); // ✅ was fetchEmails()
      })
      .catch((err) => console.error("Delete failed", err));
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
  if (!selectedEmail) return;

  axios.get(`${API}/admin/messages/${selectedEmail}`).then((res) => {
    setMessages(res.data);

    // clear unread ONLY when chat is opened
    setUnread((prev) => ({ ...prev, [selectedEmail]: 0 }));
  });
}, [selectedEmail, API]);

  return (
    <div className="max-w-5xl mx-auto p-2 flex flex-col sm:flex-row gap-4 bg-white rounded shadow h-[70vh] mb-20">
      {/* Sidebar */}
      <div className="sm:w-1/3 w-full border sm:border-r border-gray-300 rounded md:p-2 p-6 overflow-y-auto h-28">
        <h3 className="font-bold mb-2">Users</h3>
        <div className="space-y-2">
          {users.map((u) => (
            <div
              key={u._id || u.email}
              className={`flex items-center justify-between p-2 rounded cursor-pointer ${
                u.email === selectedEmail ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              <span
                onClick={() => setSelectedUser(u)}
                className="truncate flex-1"
              >
                <div className="font-semibold truncate flex items-center gap-2">
  {u.name}
  {(unread[u.email] || 0) > 0 && (
    <span className="w-2.5 h-2.5 bg-green-500 rounded-full inline-block" />
  )}
</div>
                <div className="text-xs text-gray-500 truncate">{u.email}</div>
              </span>

              <button
                onClick={() => deleteChat(u.email)}
                className="ml-2 bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="sm:w-2/3 w-full flex flex-col h-full border border-gray-300 rounded">
        {selectedEmail ? (
          <>
            {/* ✅ show NAME instead of email */}
            <h3 className="font-bold p-3 border-b border-gray-300">
              Chat with {selectedUser?.name || selectedEmail}
            </h3>

            <div className="flex flex-col flex-1 p-3 gap-3 bg-gray-50 overflow-hidden">
              <div className="flex-1 overflow-y-auto flex flex-col gap-2">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`flex ${
                      msg.sender === "admin" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className="inline-block px-3 py-1 rounded shadow text-sm break-words whitespace-pre-wrap max-w-[80%] w-fit"
                      style={{
                        backgroundColor:
                          msg.sender === "admin" ? "#d1e7dd" : "#f8d7da",
                        wordBreak: "break-word",
                      }}
                    >
                      <strong>{msg.sender}:</strong> {msg.text}

                      <div className="text-xs text-gray-500 mt-1 text-right">
                        {formatDateTime(msg.createdAt)}
                        {msg.sender === "admin" && (
                          <>
                            {msg.status === "sent" && " ✅"}
                            {msg.status === "delivered" && " ✅✅"}
                            {msg.status === "seen" && (
                              <div className="text-green-600">seen✅✅</div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="flex gap-2">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type reply..."
                  className="flex-1 border border-gray-400 rounded px-1 py-2 resize-none overflow-y-auto outline-none"
                  rows={2}
                  style={{
                    maxHeight: "50px",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                />
                <button
                  onClick={sendReply}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-500 p-3">Select a user to start chat</p>
        )}
      </div>
    </div>
  );
};

export default AdminChat;