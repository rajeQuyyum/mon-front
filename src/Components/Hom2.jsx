import React, { useEffect, useState } from 'react'
import Font from '../Pages/Font'
import Navbar from './Navbar'

export default function Hom2() {
  const [showPopup, setShowPopup] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // ✅ Show popup only if user just logged in
    const justLoggedIn = localStorage.getItem("justLoggedIn")
    if (justLoggedIn === "true") {
      setShowPopup(true)
      localStorage.removeItem("justLoggedIn") // Remove flag after showing
    }
  }, [])

  const handleAccept = () => {
    // ✅ Show loading animation for 2 seconds
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setShowPopup(false)
    }, 2000)
  }

  return (
    <div className="relative min-h-screen bg-lightBg dark:bg-darkBg text-black dark:text-white transition-colors duration-300">
      <Navbar />
      <Font />

      {/* ✅ Terms Popup (appears only once after login) */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-[#1e1e1e] text-black dark:text-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md text-center transform transition-all scale-100 border border-gray-300 dark:border-gray-700">
            {!loading ? (
              <>
                <h2 className="text-xl font-bold mb-3">Terms & Conditions</h2>
                <p className="text-sm mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                  By continuing to use this bank, you agree to our Terms & Conditions.
                  Please ensure you have read and understood all user guidelines.
                </p>
                <button
                  onClick={handleAccept}
                  className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-all"
                >
                  Accept
                </button>
              </>
            ) : (
              // ✅ 2-second loading animation
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Please wait...
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
