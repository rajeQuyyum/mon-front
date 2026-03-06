import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminFixedDepositManager() {
  const API = import.meta.env.VITE_API || "http://localhost:8000";
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchUsers = async () => {
    const res = await axios.get(`${API}/admin/users`);
    setUsers(res.data || []);
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  const resetFixed = async (userId) => {
    setMsg("");
    try {
      setLoading(true);
      await axios.post(`${API}/admin/user/${userId}/fixed/reset`);
      setMsg("✅ Fixed deposits reset successfully");
      fetchUsers();
    } catch (e) {
      setMsg(e?.response?.data?.message || e?.response?.data?.error || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Fixed Deposit Manager</h2>

      {msg && <p className="mb-3 text-sm text-gray-700">{msg}</p>}

      <div className="space-y-3">
        {users.map((u) => (
          <div key={u._id} className="border rounded p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold">{u.name}</p>
              <p className="text-sm text-gray-600">{u.email}</p>
              <p className="text-sm text-gray-700">
                Main: ${Number(u.balance || 0).toFixed(2)} | Fixed count:{" "}
                {Array.isArray(u.fixedDeposits) ? u.fixedDeposits.length : 0}
              </p>
            </div>

            <button
              onClick={() => resetFixed(u._id)}
              disabled={loading}
              className={`px-4 py-2 rounded text-white ${
                loading ? "bg-red-300 cursor-not-allowed" : "bg-red-600"
              }`}
            >
              Reset Fixed
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}