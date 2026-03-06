// src/Components/DelayedLink.js
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function DelayedLink({ to, children, className }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);

    // ⏳ 3s delay
    setTimeout(() => {
      setLoading(false);
      navigate(to);
    }, 1000);
  };

  return (
    <>
      <a href={to} onClick={handleClick} className={className}>
        {children}
      </a>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 gap-2">
          {/* spinner */}
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <h1 className="text-white">loading</h1>
        </div>
      )}
    </>
  );
}
