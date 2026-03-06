import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaCcVisa, FaCcMastercard, FaTrash } from "react-icons/fa";

export default function AdminCards() {
  const [cards, setCards] = useState([]);
   
   const API = import.meta.env.VITE_API || 'http://localhost:8000'
   
  useEffect(() => {
    axios
      .get(`${API}/admin/cards`)
      .then((res) => setCards(res.data))
      .catch(console.log);
  }, []);

  const handleDeleteCard = (cardId) => {
    axios
      .delete(`${API}/admin/cards/${cardId}`)
      .then(() => {
        setCards(cards.filter((c) => c._id !== cardId));
      })
      .catch(console.log);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        All User Cards
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {cards.length === 0 ? (
          <p className="text-gray-600 text-center col-span-full">
            No cards created yet.
          </p>
        ) : (
          cards.map((card) => (
            <motion.div
              key={card._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-[300px] sm:w-[330px] md:w-[350px] h-[200px] rounded-2xl shadow-2xl p-6 relative text-white"
              style={{
                background:
                  card.type === "Visa"
                    ? "linear-gradient(135deg, #1a2980, #26d0ce)"
                    : "linear-gradient(135deg, #b31217, #e52d27)",
              }}
            >
              {/* Delete button */}
              <button
                onClick={() => handleDeleteCard(card._id)}
                className="absolute top-4 left-4 bg-white/20 p-2 rounded-full hover:bg-white/40 transition"
              >
                <FaTrash className="text-white text-lg" />
              </button>

              {/* Card brand */}
              <div className="absolute top-4 right-4 text-4xl">
                {card.type === "Visa" ? <FaCcVisa /> : <FaCcMastercard />}
              </div>

              {/* Card details */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="tracking-widest text-lg font-mono truncate">
                  {card.number}
                </p>
                <div className="flex justify-between mt-3 text-sm">
                  <span className="truncate">{card.holder}</span>
                  <span>{card.expiry}</span>
                </div>
                <p className="text-xs mt-2 text-gray-200 truncate">
                  User: {card.userId?.name} ({card.userId?.email})
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
