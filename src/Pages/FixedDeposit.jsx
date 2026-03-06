import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function FixedDeposit() {
  const API = import.meta.env.VITE_API || "http://localhost:8000";

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [mainBalance, setMainBalance] = useState(user?.balance || 0);
  const [fixedDeposits, setFixedDeposits] = useState([]);

  const [amount, setAmount] = useState("");
  const [termMonths, setTermMonths] = useState("6");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchMain = async () => {
    if (!userId) return;
    const res = await axios.get(`${API}/user/${userId}/balance`);
    setMainBalance(res.data.balance || 0);

    const updatedUser = { ...user, balance: res.data.balance };
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const fetchFixed = async () => {
    if (!userId) return;
    const res = await axios.get(`${API}/user/${userId}/fixed`);
    setFixedDeposits(res.data.fixedDeposits || []);
  };

  useEffect(() => {
    fetchMain();
    fetchFixed();
    // eslint-disable-next-line
  }, []);

  const createFixed = async () => {
    setMsg("");
    const a = Number(amount);
    const t = Number(termMonths);

    if (!a || a <= 0) return setMsg("Enter a valid amount");

    try {
      setLoading(true);
      const res = await axios.post(`${API}/user/${userId}/fixed/create`, {
        amount: a,
        termMonths: t,
      });

      setMainBalance(res.data.balance);
      setFixedDeposits(res.data.fixedDeposits || []);
      setAmount("");
      setMsg("✅ Fixed deposit created");
    } catch (e) {
      setMsg(e?.response?.data?.message || e?.response?.data?.error || "Create fixed failed");
    } finally {
      setLoading(false);
    }
  };

  const withdrawFixed = async (fixedId) => {
    setMsg("");

    try {
      setLoading(true);
      const res = await axios.post(`${API}/user/${userId}/fixed/withdraw/${fixedId}`);

      setMainBalance(res.data.balance);
      setFixedDeposits(res.data.fixedDeposits || []);
      setMsg("✅ Fixed deposit withdrawn");
    } catch (e) {
      setMsg(e?.response?.data?.message || e?.response?.data?.error || "Withdraw failed");
    } finally {
      setLoading(false);
    }
  };

  const isMatured = (maturityDate) => new Date() >= new Date(maturityDate);

  return (
    <div>
      <Navbar />

      <div className="mt-28 max-w-4xl mx-auto px-4 mb-56">
        <h1 className="text-2xl font-semibold mb-6">Fixed Deposit</h1>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">
            Lock your funds for a period of time and earn guaranteed returns.
          </p>

          <div className="mt-6 grid gap-2">
            <p>
              <strong>Main Balance:</strong> ${Number(mainBalance).toFixed(2)}
            </p>
          </div>

          {/* CREATE FIXED */}
          <div className="mt-6 grid gap-3">
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="border rounded px-3 py-2 w-full"
              type="number"
              min="0"
            />

            <select
              value={termMonths}
              onChange={(e) => setTermMonths(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="3">3 Months (3%)</option>
              <option value="6">6 Months (5.5%)</option>
              <option value="12">12 Months (8%)</option>
            </select>

            <button
              onClick={createFixed}
              disabled={loading}
              className={`text-white px-4 py-2 rounded ${
                loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600"
              }`}
            >
              Create Fixed Deposit
            </button>
          </div>

          {/* LIST */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3">Your Fixed Deposits</h2>

            {fixedDeposits.length === 0 ? (
              <p className="text-gray-600">No fixed deposits yet.</p>
            ) : (
              <div className="space-y-3">
                {fixedDeposits.map((fd) => {
                  const matured = isMatured(fd.maturityDate);
                  const active = fd.status === "active";

                  return (
                    <div key={fd._id} className="border rounded p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">
                          ${Number(fd.amount).toFixed(2)} — {fd.termMonths} months
                        </p>

                        <span
                          className={`text-sm font-semibold ${
                            fd.status === "active"
                              ? "text-blue-600"
                              : fd.status === "withdrawn"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {fd.status.toUpperCase()}
                        </span>
                      </div>

                      <div className="mt-2 text-sm text-gray-700 grid gap-1">
                        <p>Rate: {(Number(fd.rate) * 100).toFixed(2)}%</p>
                        <p>Start: {new Date(fd.startDate).toLocaleDateString()}</p>
                        <p>Maturity: {new Date(fd.maturityDate).toLocaleDateString()}</p>
                        <p>Interest: ${Number(fd.expectedInterest || 0).toFixed(2)}</p>
                        <p>Total at maturity: ${Number(fd.totalAtMaturity || 0).toFixed(2)}</p>
                      </div>

                      {active && (
                        <button
                          onClick={() => withdrawFixed(fd._id)}
                          disabled={loading || !matured}
                          className={`mt-3 px-4 py-2 rounded text-white ${
                            loading || !matured
                              ? "bg-green-300 cursor-not-allowed"
                              : "bg-green-600"
                          }`}
                        >
                          {matured ? "Withdraw" : "Not Matured Yet"}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {msg && <p className="mt-4 text-sm text-gray-700">{msg}</p>}
        </div>
      </div>

      <Footer />
    </div>
  );
}