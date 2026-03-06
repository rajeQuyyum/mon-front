import { useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { div } from "framer-motion/client";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const API = import.meta.env.VITE_API || "http://localhost:8000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(`${API}/forgot-password`, { email });

    await emailjs.send(
  import.meta.env.VITE_RESET_SERVICE_ID,
  import.meta.env.VITE_RESET_TEMPLATE_ID,
  {
    email: email,
    name: res.data.name || "there",
    reset_link: res.data.resetLink,
  },
  import.meta.env.VITE_RESET_PUBLIC_KEY
);



    alert("Reset link sent");
  };

  return (
    <div className="h-[100vh] jig flex items-center justify-center">
      <form className="" onSubmit={handleSubmit}>
      <h1>Reset Password</h1>
      <input className="mb-5"
        type="email"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button className="bg-blue-500 m-auto block px-2 rounded-full py-2">Send Reset Link</button>
    </form>
    </div>
  );
};

export default ForgotPassword;
