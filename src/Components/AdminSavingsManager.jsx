import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminSavingsManager() {
  const API = import.meta.env.VITE_API || "http://localhost:8000";

  const admin = JSON.parse(localStorage.getItem("admin"));
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // optional: show action result
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!admin) return;
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setMsg("");
      const res = await axios.get(`${API}/admin/users`);
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
      setMsg(err?.response?.data?.error || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const lockSavings = async (id) => {
    try {
      setLoading(true);
      setMsg("");
      await axios.put(`${API}/admin/user/${id}/savings/lock`);
      setMsg("Savings locked ✅");
      await fetchUsers();
    } catch (err) {
      console.error(err);
      setMsg(err?.response?.data?.error || "Lock failed");
    } finally {
      setLoading(false);
    }
  };

  const unlockSavings = async (id) => {
    try {
      setLoading(true);
      setMsg("");
      await axios.put(`${API}/admin/user/${id}/savings/unlock`);
      setMsg("Savings unlocked ✅");
      await fetchUsers();
    } catch (err) {
      console.error(err);
      setMsg(err?.response?.data?.error || "Unlock failed");
    } finally {
      setLoading(false);
    }
  };

  const unloadAllSavings = async (id) => {
    try {
      setLoading(true);
      setMsg("");
      await axios.post(`${API}/admin/user/${id}/savings/unload-all`);
      setMsg("Savings unloaded to main ✅");
      await fetchUsers();
    } catch (err) {
      console.error(err);
      setMsg(err?.response?.data?.error || "Unload failed");
    } finally {
      setLoading(false);
    }
  };

  if (!admin) {
    return (
      <div className="p-6">
        <p className="text-red-600 font-semibold">Admin not logged in</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 mt-10">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Admin Savings Manager</h1>
        <button
          onClick={fetchUsers}
          disabled={loading}
          className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
        >
          Refresh
        </button>
      </div>

      {msg && (
        <div className="mt-4 p-3 rounded bg-gray-100 text-gray-800">
          {msg}
        </div>
      )}

      <div className="mt-6 overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Main Balance</th>
              <th className="p-3">Savings</th>
              <th className="p-3">Savings Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => {
              const locked = !!u.isSavingsLocked;
              return (
                <tr key={u._id} className="border-t">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">${Number(u.balance || 0).toLocaleString()}</td>
                  <td className="p-3">
                    ${Number(u.savingsBalance || 0).toLocaleString()}
                  </td>
                  <td className="p-3">
                    {locked ? (
                      <span className="text-red-600 font-semibold">Locked</span>
                    ) : (
                      <span className="text-green-600 font-semibold">Unlocked</span>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-2">
                      {!locked ? (
                        <button
                          onClick={() => lockSavings(u._id)}
                          disabled={loading}
                          className="px-3 py-2 rounded bg-red-600 text-white disabled:opacity-50"
                        >
                          Lock
                        </button>
                      ) : (
                        <button
                          onClick={() => unlockSavings(u._id)}
                          disabled={loading}
                          className="px-3 py-2 rounded bg-green-600 text-white disabled:opacity-50"
                        >
                          Unlock
                        </button>
                      )}

                      <button
                        onClick={() => unloadAllSavings(u._id)}
                        disabled={loading}
                        className="px-3 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
                      >
                        Unload All
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {users.length === 0 && (
              <tr>
                <td className="p-4 text-gray-500" colSpan={6}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}