import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { CiMail } from "react-icons/ci";
import { IoLanguage } from "react-icons/io5";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API || "http://localhost:8000";

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${API}/register`, { name, email, password })
      .then((result) => {
        console.log(result);

        emailjs.send(
          import.meta.env.VITE_EMAIL_SERVICE_ID,
          "template_r2gg4pd",
          { name, email },
          import.meta.env.VITE_EMAIL_PUBLIC_KEY
        );

        alert("✅ Registration Successful! welcome To Dirrox Financial ");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  // 🌍 TRANSLATOR (same as Login)
  const [showTranslate, setShowTranslate] = useState(false);
  const [selectedLang, setSelectedLang] = useState(
    localStorage.getItem("selectedLang") || "en"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      try {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      } catch (e) {
        console.warn("Google translate init error", e);
      }
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    } else {
      if (window.google?.translate?.TranslateElement) {
        window.googleTranslateElementInit();
      }
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  return (
    <>
      <div className="h-[100vh] jig">
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>

        {/* 🌍 TRANSLATOR ICON (top-right) */}
        <div className="absolute top-4 right-4 z-50" ref={dropdownRef}>
          <button
            onClick={() => setShowTranslate((s) => !s)}
            className="text-white text-2xl hover:text-green-400 transition relative"
            type="button"
          >
            <IoLanguage />
            <span className="absolute -top-1 -right-2 bg-green-500 text-xs text-black px-1.5 py-[1px] rounded-full">
              {selectedLang.toUpperCase()}
            </span>
          </button>

          {/* ✅ Desktop dropdown */}
          <div
            className={`hidden md:block absolute right-0 top-10 bg-white text-black rounded shadow-lg p-2 w-52 md:w-60 border border-gray-200 transform transition-all duration-300 ease-out origin-top ${
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
                  type="button"
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

        {/* ✅ Mobile dropdown overlay */}
        {showTranslate && (
          <div className="md:hidden fixed inset-0 z-[9999]">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setShowTranslate(false)}
            />
            <div
              className="absolute top-16 left-1/2 -translate-x-1/2 w-[92%] max-w-sm bg-white text-black rounded shadow-lg p-2 border border-gray-200"
              style={{ maxHeight: "70vh", overflowY: "auto" }}
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
                    type="button"
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
        )}

        <div id="google_translate_element" style={{ display: "none" }} />

        <form onSubmit={handleSubmit}>
          <h3>Register Here</h3>

          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />

          <label>Username</label>
          <input
            type="text"
            placeholder="Email or Phone"
            id="username"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="">
            <input type="checkbox" required />
            <h1>Agree to terms and conditions</h1>
          </div>

          <button className="button">Register</button>

          <div className="social flex justify-between mt-4">
            <NavLink to="/login">
              <h4>Login</h4>
            </NavLink>
            <NavLink className="flex items-center" to="/ct">
              <h4>Contact Us</h4>
              <CiMail className="text-lg bg-blue-500" />
            </NavLink>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;