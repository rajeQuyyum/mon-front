import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API || "http://localhost:8000";

export default function AdminLoans() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState({}); // notes per loanId
  const [error, setError] = useState("");

  const fetchLoans = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/admin/loans`);
      setLoans(res.data);
    } catch (e) {
      setError("Failed to load loans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const counts = useMemo(() => {
    const c = { pending: 0, approved: 0, rejected: 0 };
    loans.forEach((l) => (c[l.status] = (c[l.status] || 0) + 1));
    return c;
  }, [loans]);

  const updateStatus = async (loanId, status) => {
    try {
      await axios.put(`${API}/admin/loans/${loanId}/status`, {
        status,
        adminNote: note[loanId] || "",
      });

      // refresh list
      fetchLoans();
    } catch (e) {
      alert(e?.response?.data?.error || "Failed to update status");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-semibold text-black">Loan Requests</h2>

        <div className="text-sm text-gray-600 flex gap-3">
          <span>Pending: <b>{counts.pending}</b></span>
          <span>Approved: <b>{counts.approved}</b></span>
          <span>Rejected: <b>{counts.rejected}</b></span>
        </div>
      </div>

      {error && (
        <div className="mb-3 bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : loans.length === 0 ? (
        <div className="text-gray-500">No loan requests yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="py-2">User</th>
                <th className="py-2">Loan</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Duration</th>
                <th className="py-2">Status</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {loans.map((l) => (
                <tr key={l._id} className="border-b">
                  <td className="py-3">
                    <div className="font-medium text-black">{l.fullName}</div>
                    <div className="text-gray-500">{l.email}</div>
                    <div className="text-gray-500">{l.country}</div>
                  </td>

                  <td className="py-3">
                    <div className="text-black">{l.loanType}</div>
                    <div className="text-gray-500">{l.purpose}</div>
                  </td>

                  <td className="py-3 font-semibold text-black">
                    {Number(l.amount).toLocaleString()}
                  </td>

                  <td className="py-3 text-black">{l.durationMonths} months</td>

                  <td className="py-3">
                    <span
                      className={
                        "px-2 py-1 rounded-full text-xs font-semibold " +
                        (l.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : l.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800")
                      }
                    >
                      {l.status}
                    </span>
                  </td>

                  <td className="py-3">
                    <textarea
                      className="w-full border rounded-lg p-2 mb-2"
                      rows={2}
                      placeholder="Admin note (optional)"
                      value={note[l._id] || ""}
                      onChange={(e) =>
                        setNote((p) => ({ ...p, [l._id]: e.target.value }))
                      }
                    />

                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus(l._id, "approved")}
                        disabled={l.status === "approved"}
                        className="px-3 py-2 rounded-lg bg-black text-white disabled:opacity-40"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => updateStatus(l._id, "rejected")}
                        disabled={l.status === "rejected"}
                        className="px-3 py-2 rounded-lg bg-red-500 text-white disabled:opacity-40"
                      >
                        Decline
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}