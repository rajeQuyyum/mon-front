import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [users, setUsers] = useState([]);
  const [newNotif, setNewNotif] = useState({
    title: "",
    message: "",
    userEmail: "",
  });
  const [editingNotif, setEditingNotif] = useState(null);

  // ✅ FIXED: Use ?? to avoid truthy string bug
   const API = import.meta.env.VITE_API || 'http://localhost:8000';
  // --- Fetch notifications ---
  const fetchNotifications = () => {
    axios
      .get(`${API}/admin/notifications`)
      .then((res) => setNotifications(res.data))
      .catch((err) => console.error("❌ Error fetching notifications:", err));
  };

  // --- Fetch all users for dropdown ---
  const fetchUsers = () => {
    axios
      .get(`${API}/admin/users`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("❌ Error fetching users:", err));
  };

  useEffect(() => {
    fetchNotifications();
    fetchUsers();
  }, []);

  // --- Create a new notification ---
  const handleCreate = () => {
    if (!newNotif.title || !newNotif.message)
      return alert("Please fill in title and message");

    axios
      .post(`${API}/admin/notifications`, newNotif)
      .then(() => {
        setNewNotif({ title: "", message: "", userEmail: "" });
        fetchNotifications();
      })
      .catch((err) => console.error("❌ Error creating notification:", err));
  };

  // --- Update an existing notification ---
const handleUpdate = (id) => {
  axios
    .put(`${API}/admin/notifications/${id}`, {
      title: editingNotif.title,
      message: editingNotif.message,
      date: editingNotif.date, // ✅ THIS IS THE FIX
    })
    .then(() => {
      setEditingNotif(null);
      fetchNotifications();
    })
    .catch((err) => console.error("❌ Error updating notification:", err));
};


  // --- Delete a notification ---
  const handleDelete = (id) => {
    if (!window.confirm("Delete this notification?")) return;
    axios
      .delete(`${API}/admin/notifications/${id}`)
      .then(fetchNotifications)
      .catch((err) => console.error("❌ Error deleting notification:", err));
  };

  return (
    <div className="bg-white shadow p-4 rounded mt-6">
      <h2 className="text-lg font-bold mb-3">📢 Notifications</h2>

      {/* --- Create Notification Form --- */}
      <div className="flex flex-col gap-2 mb-4">
        <input
          className="border p-2 rounded"
          placeholder="Title"
          value={newNotif.title}
          onChange={(e) => setNewNotif({ ...newNotif, title: e.target.value })}
        />
        <textarea
          className="border p-2 rounded"
          placeholder="Message"
          value={newNotif.message}
          onChange={(e) =>
            setNewNotif({ ...newNotif, message: e.target.value })
          }
        />

        {/* --- Dropdown for user selection --- */}
        <select
          className="border p-2 rounded"
          value={newNotif.userEmail}
          onChange={(e) =>
            setNewNotif({ ...newNotif, userEmail: e.target.value })
          }
        >
          <option value="">All Users</option>
          {users.map((u) => (
            <option key={u._id} value={u.email}>
              {u.name} ({u.email})
            </option>
          ))}
        </select>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
          onClick={handleCreate}
        >
          ➕ Create Notification
        </button>
      </div>

      {/* --- List of Notifications --- */}
      <div className="flex flex-col gap-3">
        {notifications.map((n) => (
          <div
            key={n._id}
            className="border rounded p-3 bg-gray-50 hover:bg-gray-100 transition"
          >
            {editingNotif?._id === n._id ? (
              <>
                <input
  className="border w-full mb-2 p-2 rounded"
  value={editingNotif.title}
  onChange={(e) =>
    setEditingNotif({ ...editingNotif, title: e.target.value })
  }
/>

<textarea
  className="border w-full mb-2 p-2 rounded"
  value={editingNotif.message}
  onChange={(e) =>
    setEditingNotif({ ...editingNotif, message: e.target.value })
  }
/>

<input
  type="datetime-local"
  className="border w-full mb-2 p-2 rounded"
  value={
    editingNotif.date
      ? new Date(editingNotif.date).toISOString().slice(0, 16)
      : new Date(n.date || n.createdAt).toISOString().slice(0, 16)
  }
  onChange={(e) =>
    setEditingNotif({
      ...editingNotif,
      date: e.target.value,
    })
  }
/>

                <div className="flex gap-2">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded"
                    onClick={() => handleUpdate(n._id)}
                  >
                    💾 Save
                  </button>
                  <button
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                    onClick={() => setEditingNotif(null)}
                  >
                    ❌ Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-semibold">{n.title}</h3>
                <p>{n.message}</p>
                {n.userEmail && (
                  <p className="text-sm text-gray-500">
                    🎯 Sent to: {n.userEmail}
                  </p>
                )}
                <div className="flex gap-2 mt-2">
                  <button
                    className="bg-purple-500 text-white px-3 py-1 rounded"
                    onClick={() => setEditingNotif(n)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(n._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

