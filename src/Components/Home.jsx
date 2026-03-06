import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { IoLanguage } from "react-icons/io5";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [fadeLoader, setFadeLoader] = useState(true);
  const [fadeContent, setFadeContent] = useState(false);

  // 🌍 TRANSLATOR (same behavior as Login)
  const [showTranslate, setShowTranslate] = useState(false);
  const [selectedLang, setSelectedLang] = useState(
    localStorage.getItem("selectedLang") || "en"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Step 1: Fade out loader
    const fadeTimer = setTimeout(() => setFadeLoader(false), 1800);
    // Step 2: Hide loader completely
    const timer = setTimeout(() => {
      setLoading(false);
      setFadeContent(true); // fade in content
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(fadeTimer);
    };
  }, []);

  // 🌍 Google Translate setup
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

  // ✅ Loading Screen with Fade Out
  if (loading) {
    return (
      <div
        className={`flex flex-col items-center justify-center h-screen bg-white text-black transition-opacity duration-700 fsb ${
          fadeLoader ? "opacity-100" : "opacity-0"
        }`}
      >
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

        <div className="loader mb-6"></div>
        <h2 className="text-lg font-semibold animate-pulse bg-black text-white">
          Welcome To Dirrox Financial
        </h2>

        <style>{`
          .loader {
            border: 6px solid rgba(255, 255, 255, 0.2);
            border-top: 6px solid #f87171;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // ✅ Your Page with Smooth Fade-In
  return (
    <div
      className={`jig2 md:py-18 py-2 transition-opacity duration-1000  ${
        fadeContent ? "opacity-100" : "opacity-0"
      }`}
    >
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

      <NavLink to="/" className="">
        <h1></h1>
      </NavLink>

      <div className="">
        <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 items-start">

  {/* LEFT SIDE INTRO */}
  <div className="flex flex-col gap-6 text-gray-800 font-serif">
    <h1 className="text-3xl font-semibold">
      Welcome To Dirrox Financial
    </h1>

    <p className="text-gray-600 leading-relaxed">
      Dirrox Financial provides fast, secure, and reliable financial
      services designed for individuals and businesses. Our mission is to
      make banking simple while helping you grow, protect, and manage your
      money with confidence.
    </p>

    <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-3">Our Mission</h2>

      <ul className="space-y-2 text-gray-700">
        <li>• Security: Advanced protection for your financial data</li>
        <li>• Reliability: Transparent and trusted banking services</li>
        <li>• Accessibility: Banking solutions available anytime</li>
      </ul>
    </div>
  </div>

  {/* RIGHT SIDE FEATURES */}
  <div className="grid gap-6">

    <div className="bg-white border rounded-lg p-5 shadow-sm">
      <h2 className="font-semibold text-lg mb-2">Savings Solutions</h2>
      <p className="text-gray-600 text-sm">
        Flexible savings accounts designed to help you grow your money
        securely over time.
      </p>
    </div>

    <div className="bg-white border rounded-lg p-5 shadow-sm">
      <h2 className="font-semibold text-lg mb-2">Fixed Deposit</h2>
      <p className="text-gray-600 text-sm">
        Lock your funds for a fixed period and earn guaranteed interest
        with competitive returns.
      </p>
    </div>

    <div className="bg-white border rounded-lg p-5 shadow-sm">
      <h2 className="font-semibold text-lg mb-2">Loans</h2>
      <p className="text-gray-600 text-sm">
        Quick and flexible loan options with fast approval and simple
        repayment plans.
      </p>
    </div>

    <div className="bg-white border rounded-lg p-5 shadow-sm">
      <h2 className="font-semibold text-lg mb-2">Financial Guidance</h2>
      <p className="text-gray-600 text-sm">
        Expert advice and tools to help you make smarter financial
        decisions for the future.
      </p>
    </div>

  </div>

</div>
        <div className="flex items-center justify-center text-2xl text-white font-serif gap-5 py-8">
          <NavLink
            className="bg-[rgb(67,67,109)] w-fit py-2 px-3 rounded-full hover:border-b"
            to="/login"
          >
            <h1>Login here</h1>
          </NavLink>
          <NavLink
            className="bg-[rgb(67,67,109)] w-fit py-2 px-3 rounded-full hover:border-b"
            to="/register"
          >
            <h1>Create an Account</h1>
          </NavLink>
        </div>
      </div>
    </div>
  );
}