import React, { useEffect, useState, useRef } from "react";
import { HiOutlineArrowLeftOnRectangle } from "react-icons/hi2";
import { IoLanguage } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import DelayedLink from "./DelayedLink";
import { IoIosNotificationsOutline } from "react-icons/io";
import { io } from "socket.io-client";


const SOCKET_URL = import.meta.env.VITE_API || "http://localhost:8000";
const socket = io(SOCKET_URL);

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [balance, setBalance] = useState(user ? user.balance : 0);
  const [profileImage, setProfileImage] = useState(null);

  const [showBalance, setShowBalance] = useState(
    localStorage.getItem("showBalance") === "false" ? false : true
  );
  const [showTranslate, setShowTranslate] = useState(false);
  const [selectedLang, setSelectedLang] = useState(
    localStorage.getItem("selectedLang") || "en"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // 🔗 API base
  const API = import.meta.env.VITE_API || "http://localhost:8000";

  // 🔔 Notification state
  const [hasNewNotification, setHasNewNotification] = useState(
    localStorage.getItem("hasNewNotification") === "true"
  );

  const fetchProfileImage = () => {
  if (!user) return;

  axios
    .get(`${API}/user/${user.id}/profile-image`)
    .then((res) => {
      if (res.data?.imageUrl) {
        setProfileImage(res.data.imageUrl);
      }
    })
    .catch(() => {});
};


  // 🪙 Fetch balance
  const fetchBalance = () => {
  if (!user) return;
  if (user?.isFrozen) return; // ✅ stop fetching

  axios
    .get(`${API}/user/${user.id}/balance`)
    .then((res) => setBalance(res.data.balance))
    .catch((err) => {
      if (err?.response?.status === 423) alert("Account is frozen. Contact customer care.");
      else console.log(err);
    });
};


  useEffect(() => {
  fetchBalance();
  fetchProfileImage();

  const interval = setInterval(fetchBalance, 2000);
  return () => clearInterval(interval);
}, [user]);


  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleBalance = () => {
    const newValue = !showBalance;
    setShowBalance(newValue);
    localStorage.setItem("showBalance", newValue);
  };

  // 🌍 Google Translate setup
  useEffect(() => {
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        try {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              layout:
                window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            },
            "google_translate_element"
          );
        } catch (e) {
          console.warn("Google translate init error", e);
        }
      };
    }

    const savedLang = localStorage.getItem("selectedLang");
    if (savedLang && savedLang !== "en") {
      document.cookie = `googtrans=/en/${savedLang};path=/`;
      setSelectedLang(savedLang);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowTranslate(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languages = [
    { code: "en", label: "English (Original)" },
    { code: "es", label: "Español (Spanish)" },
    { code: "fr", label: "Français (French)" },
    { code: "de", label: "Deutsch (German)" },
    { code: "it", label: "Italiano (Italian)" },
    { code: "pt", label: "Português (Portuguese)" },
    { code: "ru", label: "Русский (Russian)" },
    { code: "zh-CN", label: "中文 (Simplified Chinese)" },
    { code: "zh-TW", label: "中文 (Traditional Chinese)" },
    { code: "ja", label: "日本語 (Japanese)" },
    { code: "ko", label: "한국어 (Korean)" },
    { code: "hi", label: "हिन्दी (Hindi)" },
    { code: "bn", label: "বাংলা (Bengali)" },
    { code: "ar", label: "العربية (Arabic)" },
    { code: "tr", label: "Türkçe (Turkish)" },
    { code: "th", label: "ไทย (Thai)" },
    { code: "vi", label: "Tiếng Việt (Vietnamese)" },
    { code: "pl", label: "Polski (Polish)" },
    { code: "uk", label: "Українська (Ukrainian)" },
    { code: "ro", label: "Română (Romanian)" },
    { code: "fa", label: "فارسی (Persian)" },
    { code: "id", label: "Bahasa Indonesia" },
    { code: "ms", label: "Bahasa Melayu" },
    { code: "sv", label: "Svenska (Swedish)" },
    { code: "nl", label: "Nederlands (Dutch)" },
    { code: "el", label: "Ελληνικά (Greek)" },
    { code: "sq", label: "Shqip (Albanian)" },
{ code: "bs", label: "Bosanski (Bosnian)" },
{ code: "bg", label: "Български (Bulgarian)" },
{ code: "ca", label: "Català (Catalan)" },
{ code: "hr", label: "Hrvatski (Croatian)" },
{ code: "cs", label: "Čeština (Czech)" },
{ code: "da", label: "Dansk (Danish)" },
{ code: "et", label: "Eesti (Estonian)" },
{ code: "fi", label: "Suomi (Finnish)" },
{ code: "hu", label: "Magyar (Hungarian)" },
{ code: "is", label: "Íslenska (Icelandic)" },
{ code: "ga", label: "Gaeilge (Irish)" },
{ code: "lv", label: "Latviešu (Latvian)" },
{ code: "lt", label: "Lietuvių (Lithuanian)" },
{ code: "mk", label: "Македонски (Macedonian)" },
{ code: "mt", label: "Malti (Maltese)" },
{ code: "no", label: "Norsk (Norwegian)" },
{ code: "sk", label: "Slovenčina (Slovak)" },
{ code: "sl", label: "Slovenščina (Slovenian)" },
{ code: "sr", label: "Српски (Serbian)" },
{ code: "cy", label: "Cymraeg (Welsh)" },
{ code: "eu", label: "Euskara (Basque)" },
{ code: "gl", label: "Galego (Galician)" },
{ code: "lb", label: "Lëtzebuergesch (Luxembourgish)" }
  ];

  const filteredLanguages = languages.filter((l) =>
    l.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const applyLanguage = (langCode) => {
    if (!langCode || langCode === "en") {
      document.cookie = "googtrans=;path=/;max-age=0";
      document.cookie = "googtrans=;path=/";
      localStorage.setItem("selectedLang", "en");
      setSelectedLang("en");
      window.location.reload();
      return;
    }
    document.cookie = `googtrans=/en/${langCode};path=/`;
    localStorage.setItem("selectedLang", langCode);
    setSelectedLang(langCode);
    window.location.reload();
  };

  // 🔔 Socket.io: Listen for notifications (reactive)
  useEffect(() => {
  if (!user?.email) return;

  socket.emit("join", user.email);      // ✅ for freeze/block events
  socket.emit("register", user.email);  // ✅ for notifications

  const handleNotification = () => {
    setHasNewNotification(true);
    localStorage.setItem("hasNewNotification", "true");
  };

  const handleBlocked = () => {
    alert("Your account has been blocked. Contact support.");

    localStorage.removeItem("user");
    localStorage.removeItem("chatEmail");
    localStorage.removeItem("justLoggedIn");

    navigate("/login");
  };

  socket.on("newNotification", handleNotification);
  socket.on("notificationUpdated", handleNotification);
  socket.on("notificationDeleted", handleNotification);
  socket.on("redPopup", handleNotification);

  socket.on("profileImageUpdated", (imageUrl) => setProfileImage(imageUrl));

  socket.on("accountBlocked", handleBlocked);

  return () => {
    socket.off("newNotification", handleNotification);
    socket.off("notificationUpdated", handleNotification);
    socket.off("notificationDeleted", handleNotification);
    socket.off("redPopup", handleNotification);

    socket.off("profileImageUpdated");
    socket.off("accountBlocked", handleBlocked);
  };
}, [user?.email, navigate]);

useEffect(() => {
  const handleFrozen = () => {
    const u = JSON.parse(localStorage.getItem("user"));
    if (!u) return;

    localStorage.setItem("user", JSON.stringify({ ...u, isFrozen: true }));
    alert("Account is frozen. Contact customer care.");
    window.location.reload();
  };

  const handleUnfrozen = () => {
    const u = JSON.parse(localStorage.getItem("user"));
    if (!u) return;

    localStorage.setItem("user", JSON.stringify({ ...u, isFrozen: false }));
    alert("Account has been unfrozen.");
    window.location.reload();
  };

  socket.on("accountFrozen", handleFrozen);
  socket.on("accountUnfrozen", handleUnfrozen);

  return () => {
    socket.off("accountFrozen", handleFrozen);
    socket.off("accountUnfrozen", handleUnfrozen);
  };
}, []);


  return (
    <nav className="bg-[#4949ad] fixed top-0 left-0 w-full shadow-md z-[99999]">
      <div className="max-w-screen-xl mx-auto flex flex-row items-center justify-between px-4 py-3 gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div>
            <h1 className="text-xs md:text-sm font-sans text-white italic">
              Welcome back!
            </h1>
            {user && (
              <>
                <h1 className="text-white font-bold text-sm md:text-base">
                  {user.name}
                </h1>
               <div className="flex items-center gap-3">
  <h1 className="text-green-500 font-bold text-sm md:text-base">
    Balance: {user?.isFrozen ? "" : (showBalance ? `$${balance}` : "****")}
  </h1>

  {user?.isFrozen && (
  <span className="text-red-500 font-bold ml-2">Frozen</span>
)}

  <button onClick={toggleBalance}>
    {showBalance ? (
      <AiOutlineEyeInvisible className="text-white" />
    ) : (
      <AiOutlineEye className="text-white" />
    )}
  </button>

  {/* 👤 Profile Image OR Initials */}
  <div className="w-9 h-9 rounded-full overflow-hidden border border-green-500 flex items-center justify-center bg-gray-800">
    {profileImage ? (
      <img
        src={profileImage}
        alt="Profile"
        className="w-full h-full object-cover"
      />
    ) : (
      <span className="text-white text-xs font-bold uppercase">
        {user?.name
          ?.split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2) || "MA"}
      </span>
    )}
  </div>
</div>

              </>
            )}
          </div>
        </div>

        {/* 🔔 Notifications Icon */}
        <div className="relative">
          <DelayedLink
            to="/noti"
            onClick={() => {
              setHasNewNotification(false);
              localStorage.setItem("hasNewNotification", "false");
            }}
            className="text-white text-2xl hover:text-green-400 transition"
          >
            <IoIosNotificationsOutline />
            {hasNewNotification && (
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </DelayedLink>
        </div>

        {/* 🌍 Language + Logout */}
        <div className="flex items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowTranslate((s) => !s)}
              className="text-black text-2xl hover:text-green-400 transition relative"
              aria-label="Choose language"
            >
              <IoLanguage />
              <span className="absolute -top-1 -right-2 bg-green-500 text-xs text-black px-1.5 py-[1px] rounded-full">
                {selectedLang.toUpperCase()}
              </span>
            </button>

            <div
              className={`absolute right-0 top-10 bg-white text-black rounded shadow-lg p-2 w-52 md:w-60 border border-gray-200 transform transition-all duration-300 ease-out origin-top ${
                showTranslate
                  ? "scale-100 opacity-100 translate-y-0"
                  : "scale-95 opacity-0 -translate-y-2 pointer-events-none"
              }`}
              style={{ maxHeight: "60vh", overflowY: "auto", zIndex: 999999 }}
            >
              <input
                type="text"
                placeholder="Search language..."
                className="w-full px-2 py-1 mb-2 text-sm border rounded outline-none focus:ring-1 focus:ring-green-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {filteredLanguages.length > 0 ? (
                filteredLanguages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => applyLanguage(l.code)}
                    className={`block w-full text-left px-3 py-2 text-sm rounded ${
                      selectedLang === l.code
                        ? "bg-green-100 text-green-600 font-semibold"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {l.label}
                  </button>
                ))
              ) : (
                <p className="text-gray-500 text-center text-sm py-2">
                  No results found
                </p>
              )}
            </div>
          </div>

          {/* 🚪 Logout */}
          <div>
            {user ? (
              <button onClick={handleLogout}>
                <HiOutlineArrowLeftOnRectangle className="text-white text-3xl md:text-4xl" />
              </button>
            ) : (
              <NavLink to="/login">
                <HiOutlineArrowLeftOnRectangle className="text-white text-3xl md:text-4xl" />
              </NavLink>
            )}
          </div>
        </div>
      </div>
      <div id="google_translate_element" style={{ display: "none" }} />
    </nav>
  );
}
