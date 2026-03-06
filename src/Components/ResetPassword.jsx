import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const API = import.meta.env.VITE_API || "http://localhost:8000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ❌ Passwords don't match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    try {
      await axios.post(`${API}/reset-password`, {
        token,
        password,
      });

      alert("Password reset successful");
    } catch (err) {
      alert("Reset failed. Link may be expired.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        style={{ marginTop: 10 }}
      />

      {/* 🔴 Error message */}
      {error && (
        <p style={{ color: "red", fontSize: 14, marginTop: 5 }}>
          {error}
        </p>
      )}

      <button  className="bg-blue-500 px-2 py-2 rounded-md" style={{ marginTop: 15, }}>
        Reset Password
      </button>
    </form>
  );
};

export default ResetPassword;
