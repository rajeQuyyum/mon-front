import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminFixedDepositManager() {
  const API = import.meta.env.VITE_API || "http://localhost:8000";

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [resettingUserId, setResettingUserId] = useState(null);
  const [msg, setMsg] = useState("");

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const res = await axios.get(`${API}/admin/users`);
      setUsers(res.data || []);
    } catch (e) {
      setMsg(
        e?.response?.data?.message ||
          e?.response?.data?.error ||
          "Failed to load users"
      );
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  const resetFixed = async (userId) => {
    setMsg("");
    try {
      setResettingUserId(userId);
      await axios.post(`${API}/admin/user/${userId}/fixed/reset`);
      setMsg("✅ Fixed deposits reset successfully");
      await fetchUsers();
    } catch (e) {
      setMsg(
        e?.response?.data?.message ||
          e?.response?.data?.error ||
          "Reset failed"
      );
    } finally {
      setResettingUserId(null);
    }
  };

  const getActiveFixedDeposits = (fixedDeposits = []) => {
    return fixedDeposits.filter((fd) => fd.status === "active");
  };

  const getTotalLocked = (fixedDeposits = []) => {
    return getActiveFixedDeposits(fixedDeposits).reduce(
      (sum, fd) => sum + Number(fd.amount || 0),
      0
    );
  };

  const getTotalInterest = (fixedDeposits = []) => {
    return getActiveFixedDeposits(fixedDeposits).reduce(
      (sum, fd) => sum + Number(fd.expectedInterest || 0),
      0
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Fixed Deposit Manager</h2>

      {msg && <p className="mb-4 text-sm text-gray-700">{msg}</p>}

      {loadingUsers ? (
        <p className="text-sm text-gray-600">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-sm text-gray-600">No users found.</p>
      ) : (
        <div className="space-y-4">
          {users.map((u) => {
            const fixedDeposits = Array.isArray(u.fixedDeposits)
              ? u.fixedDeposits
              : [];

            const activeFixedDeposits = getActiveFixedDeposits(fixedDeposits);
            const totalLocked = getTotalLocked(fixedDeposits);
            const totalInterest = getTotalInterest(fixedDeposits);

            return (
              <div key={u._id} className="border rounded-lg p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="font-semibold text-lg">{u.name}</p>
                    <p className="text-sm text-gray-600">{u.email}</p>

                    <div className="mt-2 text-sm text-gray-700 space-y-1">
                      <p>
                        <strong>Main Balance:</strong> $
                        {Number(u.balance || 0).toFixed(2)}
                      </p>
                      <p>
                        <strong>Fixed Count:</strong> {fixedDeposits.length}
                      </p>
                      <p>
                        <strong>Active Locked Amount:</strong> $
                        {Number(totalLocked).toFixed(2)}
                      </p>
                      <p>
                        <strong>Active Interest:</strong> $
                        {Number(totalInterest).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => resetFixed(u._id)}
                    disabled={resettingUserId === u._id}
                    className={`px-4 py-2 rounded text-white ${
                      resettingUserId === u._id
                        ? "bg-red-300 cursor-not-allowed"
                        : "bg-red-600"
                    }`}
                  >
                    {resettingUserId === u._id ? "Resetting..." : "Reset Fixed"}
                  </button>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Fixed Deposit Details</h3>

                  {fixedDeposits.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No fixed deposits for this user.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {fixedDeposits.map((fd) => (
                        <div
                          key={fd._id}
                          className="border rounded p-3 bg-gray-50"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                            <p>
                              <strong>Amount Locked:</strong> $
                              {Number(fd.amount || 0).toFixed(2)}
                            </p>
                            <p>
                              <strong>Term:</strong> {fd.termMonths} months
                            </p>
                            <p>
                              <strong>Interest Rate:</strong>{" "}
                              {(Number(fd.rate || 0) * 100).toFixed(2)}%
                            </p>
                            <p>
                              <strong>Status:</strong>{" "}
                              <span
                                className={
                                  fd.status === "active"
                                    ? "text-blue-600 font-semibold"
                                    : fd.status === "withdrawn"
                                    ? "text-green-600 font-semibold"
                                    : "text-red-600 font-semibold"
                                }
                              >
                                {fd.status}
                              </span>
                            </p>
                            <p>
                              <strong>Start Date:</strong>{" "}
                              {fd.startDate
                                ? new Date(fd.startDate).toLocaleDateString()
                                : "-"}
                            </p>
                            <p>
                              <strong>Due Date:</strong>{" "}
                              {fd.maturityDate
                                ? new Date(fd.maturityDate).toLocaleDateString()
                                : "-"}
                            </p>
                            <p>
                              <strong>Expected Interest:</strong> $
                              {Number(fd.expectedInterest || 0).toFixed(2)}
                            </p>
                            <p>
                              <strong>Total At Maturity:</strong> $
                              {Number(fd.totalAtMaturity || 0).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {activeFixedDeposits.length > 0 && (
                  <div className="mt-4 p-3 rounded bg-blue-50 text-sm text-gray-800">
                    <p>
                      <strong>Summary:</strong> This user currently has{" "}
                      {activeFixedDeposits.length} active fixed deposit
                      {activeFixedDeposits.length > 1 ? "s" : ""}, with $
                      {Number(totalLocked).toFixed(2)} locked and $
                      {Number(totalInterest).toFixed(2)} expected interest.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}