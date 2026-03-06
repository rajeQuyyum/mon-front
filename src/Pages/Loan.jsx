// ✅ SIMPLE GLOBAL LOAN FORM (NO BVN, NO STATE LIST)
// src/Pages/Loan.jsx

import React, { useMemo, useState } from "react";
import axios from "axios";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const API = import.meta.env.VITE_API || "http://localhost:8000";

export default function Loan() {
  const user = JSON.parse(localStorage.getItem("user"));

  const loanTypes = useMemo(
    () => [
      { value: "personal", label: "Personal Loan" },
      { value: "business", label: "Business Loan" },
      { value: "education", label: "Education Loan" },
      { value: "rent", label: "Rent Support" },
    ],
    []
  );

  const purposes = useMemo(
    () => [
      "Emergency",
      "Bills",
      "Rent",
      "Education",
      "Business",
      "Medical",
      "Debt Consolidation",
      "Other",
    ],
    []
  );

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    // Loan
    loanType: "personal",
    amount: "",
    durationMonths: "",
    purpose: "",
    purposeOther: "",

    // Applicant
    fullName: "",
    phone: "",
    email: user?.email || "",
    country: "",
    city: "",
    address: "",

    // Income
    employmentStatus: "",
    monthlyIncome: "",

    // ID (global)
    idType: "",
    idNumber: "",

    // Agreement
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    if (!user?.email) return "Please login again.";
    if (!form.fullName.trim()) return "Enter your full name.";
    if (!form.phone.trim()) return "Enter phone number.";
    if (!form.country.trim()) return "Enter your country.";
    if (!form.amount || Number(form.amount) <= 0) return "Enter a valid amount.";
    if (!form.durationMonths || Number(form.durationMonths) <= 0)
      return "Enter a valid duration.";
    if (!form.purpose) return "Select a purpose.";
    if (form.purpose === "Other" && !form.purposeOther.trim())
      return "Please type your purpose.";
    if (!form.employmentStatus) return "Select employment status.";
    if (!form.monthlyIncome || Number(form.monthlyIncome) <= 0)
      return "Enter your monthly income.";
    if (!form.idType) return "Select an ID type.";
    if (!form.agree) return "You must agree to the terms.";
    return null;
  };

  const submitLoan = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    const err = validate();
    if (err) return setErrorMsg(err);

    setSubmitting(true);
    try {
      await axios.post(`${API}/loans/apply`, {
        email: user.email, // server uses this
        ...form,
      });

      setSuccessMsg("Loan application submitted successfully!");

      setForm((prev) => ({
        ...prev,
        amount: "",
        durationMonths: "",
        purpose: "",
        purposeOther: "",
        fullName: "",
        phone: "",
        country: "",
        city: "",
        address: "",
        employmentStatus: "",
        monthlyIncome: "",
        idType: "",
        idNumber: "",
        agree: false,
        email: user?.email || "",
        loanType: "personal",
      }));
    } catch (error) {
      console.log(error);
      setErrorMsg(
        error?.response?.data?.error ||
          "Failed to submit loan application. Try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
   <div>
    <Navbar />
     <div className="mt-28 max-w-4xl mx-auto px-4 pb-16 mb-10">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-black text-center">
          Loan Application
        </h1>
        
      </div>

      <form onSubmit={submitLoan} className="space-y-6 loan-form">
        {/* Alerts */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg">
            {successMsg}
          </div>
        )}

        {/* ✅ Loan Details */}
        <div className="bg-white rounded-2xl shadow p-5">
          <h2 className="text-lg font-semibold text-black mb-4">Loan Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-700">Loan Type *</label>
              <select
                name="loanType"
                value={form.loanType}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              >
                {loanTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-700">Amount *</label>
              <input
                name="amount"
                value={form.amount}
                onChange={handleChange}
                type="number"
                min="0"
                className="w-full border rounded-lg px-3 py-2"
                placeholder="e.g 200000"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Duration (Months) *</label>
              <select
                name="durationMonths"
                value={form.durationMonths}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                required
              >
                <option value="">Select</option>
                {[3, 6, 9, 12, 18, 24, 36].map((m) => (
                  <option key={m} value={m}>
                    {m} months
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-700">Purpose *</label>
              <select
                name="purpose"
                value={form.purpose}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                required
              >
                <option value="">Select</option>
                {purposes.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {form.purpose === "Other" && (
              <div className="md:col-span-2">
                <label className="text-sm text-gray-700">Purpose (Other) *</label>
                <input
                  name="purposeOther"
                  value={form.purposeOther}
                  onChange={handleChange}
                  type="text"
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Explain briefly..."
                  required
                />
              </div>
            )}
          </div>
        </div>

        {/* ✅ Personal Details (Global) */}
        <div className="bg-white rounded-2xl shadow p-5">
          <h2 className="text-lg font-semibold text-black mb-4">
            Personal Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-700">Full Name *</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                type="text"
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Full name"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Phone *</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                type="tel"
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Phone number"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                placeholder="Email"
                disabled
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Country *</label>
              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                type="text"
                className="w-full border rounded-lg px-3 py-2"
                placeholder="e.g Canada"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                type="text"
                className="w-full border rounded-lg px-3 py-2"
                placeholder="City"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-gray-700">Address</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                type="text"
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Street address (optional)"
              />
            </div>
          </div>
        </div>

        {/* ✅ Income */}
        <div className="bg-white rounded-2xl shadow p-5">
          <h2 className="text-lg font-semibold text-black mb-4">Income</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-700">Employment Status *</label>
              <select
                name="employmentStatus"
                value={form.employmentStatus}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                required
              >
                <option value="">Select</option>
                <option value="employed">Employed</option>
                <option value="self-employed">Self-employed</option>
                <option value="student">Student</option>
                <option value="unemployed">Unemployed</option>
                <option value="contract">Contract</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-700">Monthly Income *</label>
              <input
                name="monthlyIncome"
                value={form.monthlyIncome}
                onChange={handleChange}
                type="number"
                min="0"
                className="w-full border rounded-lg px-3 py-2"
                placeholder="e.g 150000"
                required
              />
            </div>
          </div>
        </div>

        {/* ✅ ID (Global) */}
        <div className="bg-white rounded-2xl shadow p-5">
          <h2 className="text-lg font-semibold text-black mb-4">Identity</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-700">ID Type *</label>
              <select
                name="idType"
                value={form.idType}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                required
              >
                <option value="">Select</option>
                <option value="passport">Passport</option>
                <option value="drivers_license">Driver’s License</option>
                <option value="national_id">National ID</option>
                <option value="voters_card">Voter’s Card</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-700">ID Number</label>
              <input
                name="idNumber"
                value={form.idNumber}
                onChange={handleChange}
                type="text"
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Optional"
              />
            </div>
          </div>
        </div>

        {/* ✅ Agreement + Submit */}
        <div className="bg-white rounded-2xl shadow p-5">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              className="mt-1"
            />
            <span className="text-sm text-gray-600">
              I confirm the information is correct and agree to Dirrox Financial
              terms. *
            </span>
          </label>

          <button
            disabled={submitting}
            type="submit"
            className="mt-5 w-full bg-red-500 text-white py-3 rounded-lg disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit Loan Application"}
          </button>
        </div>
      </form>
    </div>
    <Footer />
   </div>
  );
}