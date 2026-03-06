import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { CiMail } from "react-icons/ci";
import { IoLanguage } from "react-icons/io5";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API || "http://localhost:8000";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    axios
      .post(`${API}/login`, { email, password })
      .then((result) => {
        if (result.data.status === "success") {
          localStorage.setItem("user", JSON.stringify(result.data.user));
          localStorage.setItem("justLoggedIn", "true");
          localStorage.setItem("chatEmail", email);

          setTimeout(() => {
            setLoading(false);
            navigate("/home");
          }, 3000);
        } else {
          setLoading(false);
          setError(result.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);

        if (err.response?.status === 403 && err.response?.data?.status === "blocked") {
          setError("User blocked. Contact support for more info.");
          return;
        }

        setError("Something went wrong. Please try again.");
      });
  };

  // 🌍 TRANSLATOR (same behavior as Navbar, but dropdown becomes overlay on small screens)
  const [showTranslate, setShowTranslate] = useState(false);
  const [selectedLang, setSelectedLang] = useState(localStorage.getItem("selectedLang") || "en");
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    // ✅ always define init (important when script already exists)
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

    // ✅ add script if not added
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    } else {
      // ✅ if script already exists and google is ready, init now
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

  return (
    <div className="h-[100vh] jig flex items-center justify-center">
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

        {/* ✅ Desktop dropdown (same style as Navbar) */}
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
            <p className="text-gray-500 text-center text-sm py-2">No results found</p>
          )}
        </div>
      </div>

      {/* ✅ Mobile dropdown (on top of the form, not inside it) */}
      {showTranslate && (
        <div className="md:hidden fixed inset-0 z-[9999]">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowTranslate(false)}
          />
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[92%] max-w-sm bg-white text-black rounded shadow-lg p-2 border border-gray-200"
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
              <p className="text-gray-500 text-center text-sm py-2">No results found</p>
            )}
          </div>
        </div>
      )}

      <div id="google_translate_element" style={{ display: "none" }} />

      <form onSubmit={handleSubmit} className="relative">
        <h3>Login Here</h3>

        <label>Username</label>
        <input
          type="text"
          placeholder="Email or Phone"
          id="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button className="button" disabled={loading}>
          {loading ? "Logging in... wait" : "Log In"}
        </button>

        {loading && (
          <div className="mt-4 flex justify-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className="social flex justify-between mt-4 underline">
          <NavLink to="/register">
            <h4>Register</h4>
          </NavLink>
          {/* <NavLink to="/forgot-password">
            <h4>Reset Password</h4>
          </NavLink>
          <NavLink className="flex items-center" to="/ct">
            <h4>Contact Us</h4>
            <CiMail className="text-lg bg-blue-500" />
          </NavLink> */}
        </div>
      </form>
    </div>
  );
};

export default Login;