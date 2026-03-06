import React, { useEffect, useMemo, useState } from "react";
import { FaCaretUp } from "react-icons/fa";
import { IoArrowUpOutline } from "react-icons/io5";
import { LiaFunnelDollarSolid } from "react-icons/lia";
import { MdOutlinePayment } from "react-icons/md";
import { PiChartLineThin, PiHandDepositLight } from "react-icons/pi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { AiOutlineStock } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { FaHandHoldingDollar } from "react-icons/fa6";

import Footer from "../Components/Footer";
import InvestmentCard from "./InvestmentCard";
import HistoryCard from "./HistoryCard";
import DelayedLink from "../Components/DelayedLink";
import NotificationPopup from "../Components/NotificationPopup";

import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const API = import.meta.env.VITE_API || "http://localhost:8000";

export default function Font() {
  const [latestNotification, setLatestNotification] = useState(null);
  const [dismissedId, setDismissedId] = useState(
    localStorage.getItem("dismissedNotificationId")
  );

  const [showLoanForm, setShowLoanForm] = useState(false);
  const [loanForm, setLoanForm] = useState({
    amount: "",
    durationMonths: "",
    purpose: "",
    employmentStatus: "",
    monthlyIncome: "",
    repaymentMethod: "salary",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // ✅ Create socket ONCE
  const socket = useMemo(() => io(API, { transports: ["websocket"] }), []);

  // ✅ Fetch latest notification
  useEffect(() => {
    if (!user?.email) return;

    const fetchLatest = async () => {
      try {
        const res = await axios.get(
          `${API}/user/${user.email}/notifications?limit=1`
        );
        const newest = res.data?.[0];

        if (newest && newest._id !== dismissedId) {
          setLatestNotification(newest);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchLatest();
    const interval = setInterval(fetchLatest, 10000);
    return () => clearInterval(interval);
  }, [user, dismissedId]);

  // ✅ Close notification handler
  const handleClose = (id) => {
    setLatestNotification(null);
    setDismissedId(id);
    localStorage.setItem("dismissedNotificationId", id);
  };

  // 🚫 Force logout when blocked
  useEffect(() => {
    if (!user?.email) return;

    socket.emit("join", user.email);

    socket.on("accountBlocked", () => {
      alert("Your account has been blocked. Contact support for more info.");

      localStorage.removeItem("user");
      localStorage.removeItem("chatEmail");
      localStorage.removeItem("justLoggedIn");

      navigate("/login");
    });

    return () => {
      socket.off("accountBlocked");
    };
  }, [user, navigate, socket]);

  // ✅ Loan form handlers
  const handleLoanChange = (e) => {
    const { name, value } = e.target;
    setLoanForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitLoan = async (e) => {
    e.preventDefault();

    try {
      // ✅ Change this endpoint to your own backend route if different
      await axios.post(`${API}/loans/apply`, {
        ...loanForm,
        email: user?.email,
      });

      alert("Loan application submitted!");
      setShowLoanForm(false);

      setLoanForm({
        amount: "",
        durationMonths: "",
        purpose: "",
        employmentStatus: "",
        monthlyIncome: "",
        repaymentMethod: "salary",
      });
    } catch (err) {
      console.log(err);
      alert("Failed to submit loan application");
    }
  };

  return (
    <section className="lg:mt-28 mt-24 px-4">
      {/* Top action buttons */}
      <div className="bg-white text-black rounded-lg shadow-lg mb-10 w-full max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center md:justify-between gap-6 px-4 py-6">
          <div className="flex flex-col items-center">
            <DelayedLink to="/act">
              <ImProfile className="text-5xl md:text-6xl bg-black text-white rounded-full p-4 mb-3" />
              <h1 className="text-sm md:text-base">Profile</h1>
            </DelayedLink>
          </div>

          <div className="flex flex-col items-center">
            <DelayedLink to="/trransfer">
              <IoArrowUpOutline className="text-5xl md:text-6xl bg-black text-white rounded-full p-4 mb-3" />
              <h1 className="text-sm md:text-base">Transfer</h1>
            </DelayedLink>
          </div>

          <div className="flex flex-col items-center">
            <DelayedLink to="/stock">
              <AiOutlineStock className="text-5xl md:text-6xl bg-black text-white rounded-full p-4 mb-3" />
              <h1 className="text-sm md:text-base">Stock-chat</h1>
            </DelayedLink>
          </div>

          <div className="flex flex-col items-center">
            <DelayedLink to="/bill">
              <MdOutlinePayment className="text-5xl md:text-6xl bg-black text-white rounded-full p-4 mb-3" />
              <h1 className="text-sm md:text-base">Pay Bills</h1>
            </DelayedLink>
          </div>
        </div>
      </div>

      {/* Investment & History */}
      <div className="max-w-6xl mx-auto space-y-6 mb-10">
        <InvestmentCard />
        <HistoryCard />
      </div>

      {/* ✅ Banking Services (NEW DESIGN) */}
<div className="w-full max-w-6xl mx-auto mb-24">
  {/* Header */}
  <div className="flex items-end justify-between gap-4 mb-6">
    <div>
      <h1 className="text-xl md:text-2xl font-semibold text-black">
        Banking Services
      </h1>
      <p className="text-sm text-gray-500">
        Quick actions for your account
      </p>
    </div>

    <div className="hidden md:flex items-center gap-2">
      <span className="inline-flex h-2 w-2 rounded-full bg-green-500" />
      <p className="text-sm text-gray-600">Services available</p>
    </div>
  </div>

  {/* Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
    {/* Savings */}
    <div className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg transition">
      <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition" />
      <div className="p-5 relative">
        <div className="flex items-center justify-between">
          <div className="h-12 w-12 rounded-xl bg-black text-white flex items-center justify-center">
            <LiaFunnelDollarSolid className="text-2xl" />
          </div>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-50 text-green-600">
            +0.25%
          </span>
        </div>

        <h2 className="mt-4 text-base font-semibold text-gray-900">
          Savings Account
        </h2>
        <p className="text-sm text-gray-500">2.5% APY • Flexible access</p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs font-bold tracking-wider text-gray-400">
            SAV
          </span>
          <NavLink to="/sav" className="text-sm font-semibold text-black hover:opacity-70">
            Open →
          </NavLink>
        </div>
      </div>
    </div>

    {/* Fixed Deposit */}
    <div className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg transition">
      <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition" />
      <div className="p-5 relative">
        <div className="flex items-center justify-between">
          <div className="h-12 w-12 rounded-xl bg-black text-white flex items-center justify-center">
            <PiHandDepositLight className="text-2xl" />
          </div>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-purple-50 text-purple-700">
            Locked
          </span>
        </div>

        <h2 className="mt-4 text-base font-semibold text-gray-900">
          Fixed Deposit
        </h2>
        <p className="text-sm text-gray-500">Stable returns • Set duration</p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs font-bold tracking-wider text-gray-400">
            FD
          </span>
          <NavLink to="/fxd" className="text-sm font-semibold text-black hover:opacity-70">
            Start →
          </NavLink>
        </div>
      </div>
    </div>

    {/* Investment Funds */}
    <div className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg transition">
      <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition" />
      <div className="p-5 relative">
        <div className="flex items-center justify-between">
          <div className="h-12 w-12 rounded-xl bg-black text-white flex items-center justify-center">
            <RiMoneyDollarCircleFill className="text-2xl" />
          </div>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-50 text-blue-700">
            Growth
          </span>
        </div>

        <h2 className="mt-4 text-base font-semibold text-gray-900">
          Investment Funds
        </h2>
        <p className="text-sm text-gray-500">Diversified • Long-term</p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs font-bold tracking-wider text-gray-400">
            INV
          </span>
          <NavLink to="/vst" className="text-sm font-semibold text-black hover:opacity-70">
            Explore →
          </NavLink>
        </div>
      </div>
    </div>

    {/* ✅ Loan (opens modal) */}
    <button
      onClick={() => setShowLoanForm(true)}
      className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg transition text-left"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition" />
      <div className="p-5 relative">
        <div className="flex items-center justify-between">
          <div className="h-12 w-12 rounded-xl bg-black text-white flex items-center justify-center">
            <FaHandHoldingDollar className="text-2xl" />
          </div>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-amber-50 text-amber-700">
            Fast
          </span>
        </div>

        <h2 className="mt-4 text-base font-semibold text-gray-900">Loan</h2>
        <p className="text-sm text-gray-500">Apply • Flexible repayment</p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs font-bold tracking-wider text-gray-400">
            LOAN
          </span>
          <NavLink to="/loan" className="text-sm font-semibold text-black group-hover:opacity-70">
            Apply →
          </NavLink>
        </div>
      </div>
    </button>
  </div>
</div>

      

      {/* ✅ Notification popup */}
      <NotificationPopup
        notification={latestNotification}
        onClose={handleClose}
      />

      <Footer />
    </section>
  );
}