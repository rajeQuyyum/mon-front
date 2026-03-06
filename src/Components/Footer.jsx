import React, { useEffect, useState } from "react";
import { FaRocketchat } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { BsCoin } from "react-icons/bs";
import { FaRegAddressCard } from "react-icons/fa";
import DelayedLink from "./DelayedLink";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";

const SOCKET_URL = import.meta.env.VITE_API || "http://localhost:8000";
const socket = io(SOCKET_URL);

export default function Footer() {
  const location = useLocation();
  const [chatUnread, setChatUnread] = useState(
    localStorage.getItem("chatUnread") === "1"
  );

  useEffect(() => {
    const email = localStorage.getItem("chatEmail");
    if (!email) return;

    socket.emit("join", email);

    const handler = (msg) => {
      // Only show dot when admin sends message and user is NOT on /msg
      if (msg.email === email && msg.sender === "admin" && location.pathname !== "/msg") {
        localStorage.setItem("chatUnread", "1");
        setChatUnread(true);
      }
    };

    socket.on("newMessage", handler);
    return () => socket.off("newMessage", handler);
  }, [location.pathname]);

  // When user opens /msg, clear the dot
  useEffect(() => {
    if (location.pathname === "/msg") {
      localStorage.setItem("chatUnread", "0");
      setChatUnread(false);
    }
  }, [location.pathname]);

  return (
    <footer className="bg-[#4949ad] text-white py-4 fixed bottom-0 left-0 w-full z-50">
      <ul className="flex justify-around items-center max-w-screen-md mx-auto px-4">
        <li>
          <DelayedLink to="/home">
            <div className="flex flex-col items-center">
              <IoMdHome className="text-green-500 text-2xl md:text-3xl" />
              <h1 className="text-xs md:text-sm">Home</h1>
            </div>
          </DelayedLink>
        </li>

        <li>
          <DelayedLink to="/invest">
            <div className="flex flex-col items-center">
              <BsCoin className="text-xl md:text-2xl" />
              <h1 className="text-xs md:text-sm">Invest</h1>
            </div>
          </DelayedLink>
        </li>

        <li>
          <DelayedLink to="/crd">
            <div className="flex flex-col items-center">
              <FaRegAddressCard className="text-xl md:text-2xl" />
              <h1 className="text-xs md:text-sm">Cards</h1>
            </div>
          </DelayedLink>
        </li>

        {/* Chat icon + red dot */}
        <li className="relative">
          <DelayedLink to="/msg">
            <div className="relative">
              <FaRocketchat className="text-3xl md:text-4xl text-green-500" />
              {chatUnread && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full" />
              )}
            </div>
          </DelayedLink>
        </li>
      </ul>
    </footer>
  );
}