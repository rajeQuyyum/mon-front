import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminProfileImageManager() {
  const API = import.meta.env.VITE_API || "http://localhost:8000";

  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch users
  useEffect(() => {
    axios
      .get(`${API}/admin/users`)
      .then((res) => setUsers(res.data))
      .catch(console.error);
  }, []);

  // 🔹 Update selected user
  useEffect(() => {
    const user = users.find((u) => u._id === selectedUserId);
    setSelectedUser(user || null);
  }, [selectedUserId, users]);

  const handleUpload = async () => {
    if (!selectedUserId) return alert("Please select a user");
    if (!image) return alert("Please select an image");

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);
      await axios.post(
  `${API}/admin/user/${selectedUserId}/profile-image`,
  formData
);

      alert("Profile image uploaded successfully");
      setImage(null);
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl bg-white rounded-lg shadow p-6">
      <h1 className="text-xl font-bold mb-4">
        Upload User Profile Image
      </h1>

      {/* 👤 Select User */}
      <label className="block mb-2 text-sm font-medium">Select User</label>
      <select
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-4"
      >
        <option value="">-- Choose a user --</option>
        {users.map((u) => (
          <option key={u._id} value={u._id}>
            {u.name} ({u.email})
          </option>
        ))}
      </select>

      {/* 👀 Selected user preview */}
      {selectedUser && (
        <div className="mb-4 text-sm text-gray-600">
          Uploading image for:
          <span className="font-semibold ml-1">
            {selectedUser.name}
          </span>
        </div>
      )}

      {/* 🖼️ Image picker */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="mb-4"
      />

      {/* ⬆️ Upload button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-60"
      >
        {loading ? "Uploading..." : "Upload Image"}
      </button>
    </div>
  );
}
