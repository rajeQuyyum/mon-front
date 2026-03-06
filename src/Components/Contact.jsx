import React, { useState } from "react";
import { sendContactEmail } from "../utils/email";
import { CiMail } from "react-icons/ci";
import { NavLink } from "react-router-dom";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendContactEmail(form);
      alert("Message sent successfully ✅");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to send message ❌");
    }
  };

  return (
    <div className="h-[100vh] jig flex items-center justify-center">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-xl p-6 sm:p-8 rounded-lg shadow-md space-y-5"
      >
        <div className="flex items-center justify-center gap-1">
          <h1 className="text-2xl text-white">Contact Us</h1>
          <CiMail className="text-2xl text-white" />
        </div>

        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full rounded-md px-4 py-3 bg-white/10 text-white placeholder-gray-300 focus:outline-none"
        />

        <input
          name="email"
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full rounded-md px-4 py-3 bg-white/10 text-white placeholder-gray-300 focus:outline-none"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
          className="w-full bad rounded-md px-4 py-3  text-white placeholder-gray-300 resize-none h-40 focus:outline-none"
        />

        <button
          type="submit"
          className=" bg-[rgb(67,67,109)] text-white py-3 rounded-md font-medium px-3 block m-auto"
        >
          Send Message
        </button>


        <div className="social flex justify-between mt-4">
          <NavLink to="/register">
            <h4>Register</h4>
          </NavLink>
          <NavLink className="flex items-center" to="/login">
            <h4>Login</h4>
            
          </NavLink>
        </div>
      </form>
    </div>

  );
};

export default Contact;
