import React, { useEffect, useState } from "react";
import axios from "axios";
import { div } from "framer-motion/client";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Savings() {
  const API = import.meta.env.VITE_API || "http://localhost:8000";

  const user = JSON.parse(localStorage.getItem("user")); // must contain id + balance
  const userId = user?.id;

  const [mainBalance, setMainBalance] = useState(user?.balance || 0);
  const [savingsBalance, setSavingsBalance] = useState(0);
  const [isSavingsLocked, setIsSavingsLocked] = useState(false);

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchSavings = async () => {
    if (!userId) return;
    const res = await axios.get(`${API}/user/${userId}/savings`);
    setSavingsBalance(res.data.savingsBalance || 0);
    setIsSavingsLocked(!!res.data.isSavingsLocked); // ✅ lock flag from backend
  };

  const fetchMain = async () => {
    if (!userId) return;
    const res = await axios.get(`${API}/user/${userId}/balance`);
    setMainBalance(res.data.balance || 0);

    // keep localStorage in sync
    const updatedUser = { ...user, balance: res.data.balance };
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  useEffect(() => {
    fetchSavings();
    fetchMain();
    // eslint-disable-next-line
  }, []);

  const deposit = async () => {
    setMsg("");

    if (isSavingsLocked) {
      return setMsg("Savings is locked. Contact customer care.");
    }

    const a = Number(amount);
    if (!a || a <= 0) return setMsg("Enter a valid amount");

    try {
      setLoading(true);
      const res = await axios.post(`${API}/user/${userId}/savings/deposit`, { amount: a });
      setMainBalance(res.data.balance);
      setSavingsBalance(res.data.savingsBalance);
      setAmount("");
      setMsg("✅ Deposited to savings");
    } catch (e) {
      setMsg(e?.response?.data?.error || "Deposit failed");
    } finally {
      setLoading(false);
    }
  };

  const withdraw = async () => {
    setMsg("");

    if (isSavingsLocked) {
      return setMsg("Savings is locked. Contact customer care.");
    }

    const a = Number(amount);
    if (!a || a <= 0) return setMsg("Enter a valid amount");

    try {
      setLoading(true);
      const res = await axios.post(`${API}/user/${userId}/savings/withdraw`, { amount: a });
      setMainBalance(res.data.balance);
      setSavingsBalance(res.data.savingsBalance);
      setAmount("");
      setMsg("✅ Withdrawn to main balance");
    } catch (e) {
      setMsg(e?.response?.data?.error || "Withdraw failed");
    } finally {
      setLoading(false);
    }
  };

  const depositDisabled = loading || isSavingsLocked;
  const withdrawDisabled = loading || isSavingsLocked;

  return (
    <div>
        <Navbar />
        <div className="mt-28 max-w-4xl mx-auto px-4">
      <h1 className="text-2xl font-semibold mb-6">Savings Account</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          Move money between your main balance and savings anytime.
        </p>

        <div className="mt-6 grid gap-3">
          <p>
            <strong>Main Balance:</strong> ${Number(mainBalance).toFixed(2)}
          </p>
          <p>
            <strong>Savings Balance:</strong> ${Number(savingsBalance).toFixed(2)}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span className={isSavingsLocked ? "text-red-600 font-semibold" : "text-green-600 font-semibold"}>
              {isSavingsLocked ? "Locked" : "Active"}
            </span>
          </p>

          <p>
            <strong>Interest Rate:</strong> 2.5% APY
          </p>
          <p>
            <strong>Minimum Balance:</strong> $0
          </p>
        </div>

        <div className="mt-6 flex gap-3">
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="border rounded px-3 py-2 w-full"
            type="number"
            min="0"
          />

          <button
            onClick={deposit}
            disabled={depositDisabled}
            className={`text-white px-4 py-2 rounded ${
              depositDisabled ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600"
            }`}
          >
            Deposit
          </button>

          <button
            onClick={withdraw}
            disabled={withdrawDisabled}
            className={`text-white px-4 py-2 rounded ${
              withdrawDisabled ? "bg-green-300 cursor-not-allowed" : "bg-green-600"
            }`}
          >
            Withdraw
          </button>
        </div>

        {isSavingsLocked && (
          <p className="text-red-600 mt-2">
            Savings is locked. Contact customer care.
          </p>
        )}

        {msg && <p className="mt-3 text-sm text-gray-700">{msg}</p>}
      </div>
    </div>
    <Footer />
    </div>
  );
}