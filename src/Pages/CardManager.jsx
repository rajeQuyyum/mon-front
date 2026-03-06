import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCcVisa, FaCcMastercard, FaTrash } from "react-icons/fa";
import axios from "axios";
import Footer from "../Components/Footer";
import { div } from "framer-motion/client";
import Navbar from "../Components/Navbar";
 const API = import.meta.env.VITE_API || 'http://localhost:8000'


export default function CardManager() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [cards, setCards] = useState([]);
  const [cardType, setCardType] = useState("Visa");
  const [holderName, setHolderName] = useState("");

  useEffect(() => {
    if (user?.id) {
      axios.get(`${API}/user/${user.id}/cards`)
        .then(res => setCards(res.data))
        .catch(console.log);
    }
  }, [user]);

  // Generate fake card number (random digits)
  const generateCardNumber = () => {
    return Array.from({ length: 16 }, () => Math.floor(Math.random() * 10))
      .join("")
      .replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  // Generate expiry date
  const generateExpiry = () => {
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
    const year = String(new Date().getFullYear() + 4).slice(-2);
    return `${month}/${year}`;
  };

  const handleCreateCard = () => {
    if (!holderName) return alert("Please enter card holder name!");

    const newCard = {
      type: cardType,
      holder: holderName,
      number: generateCardNumber(),
      expiry: generateExpiry(),
    };

    axios.post(`${API}/user/${user.id}/cards`, newCard)
      .then(res => {
        setCards([...cards, res.data]);
        setHolderName("");
      })
      .catch(console.log);
  };

  const handleDeleteCard = (cardId) => {
    axios.delete(`${API}/user/${user.id}/cards/${cardId}`)
      .then(() => {
        setCards(cards.filter(c => c._id !== cardId));
      })
      .catch(console.log);
  };

  return (
    <div>
        <Navbar />
        <h1 className="lg:w-[1000px] w-full lg:ml-52">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, a blanditiis nihil dignissimos quia ut, soluta tenetur mollitia minus inventore natus esse? Aperiam odit ipsa laudantium sint consequuntur quae, dignissimos animi. Astatum quibusdam architecto officia aut necessitatibus maiores asperiores fuga odio distinctio error consequatur facilis itaque ad, illo sit magni nobis laborum nihil pariatur. Nesciunt possimus in provident ut quo dignissimos et impedit exercitationem. Quibusdam suscipit a possimus?</h1>
        <div className="w-full flex flex-col items-center mt-10 space-y-10 my-28">
      {/* Form to create card */}
      <div className="bg-white shadow-lg rounded-xl p-6 w-[400px]">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Create New Card</h2>
        <label className="block mb-2 text-gray-600">Card Holder Name</label>
        <input
          type="text"
          value={holderName}
          onChange={(e) => setHolderName(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4"
          placeholder="John Doe"
        />

        <label className="block mb-2 text-gray-600">Card Type</label>
        <select
          value={cardType}
          onChange={(e) => setCardType(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4"
        >
          <option value="Visa">Visa</option>
          <option value="MasterCard">MasterCard</option>
        </select>

        <button
          onClick={handleCreateCard}
          className="w-full bg-purple-600 text-white font-bold py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Create Card
        </button>
      </div>

      {/* Display cards */}
      <div className="flex flex-wrap gap-6 justify-center">
        {cards.map((card) => (
          <motion.div
            key={card._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-[350px] h-[200px] rounded-2xl shadow-2xl p-6 relative text-white"
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
            <div className="absolute bottom-6 left-6">
              <p className="tracking-widest text-lg font-mono">{card.number}</p>
              <div className="flex justify-between mt-3 text-sm">
                <span>{card.holder}</span>
                <span>{card.expiry}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    
    
    </div>
    <Footer />
    </div>
  );
}
