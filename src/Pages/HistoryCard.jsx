import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHistory } from 'react-icons/fa';
import axios from 'axios';

export default function HistoryCard({ title = "Transaction History" }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [showHistory, setShowHistory] = useState(false);
  const [transactions, setTransactions] = useState([]);
   const API = import.meta.env.VITE_API || 'http://localhost:8000';

  // Fetch transactions when history is shown
  useEffect(() => {
    if (showHistory && user?.id) {
      axios.get(`${API}/user/${user.id}/transactions`)
        .then(res => setTransactions(res.data))
        .catch(console.log);
    }
  }, [showHistory, user]);

  const toggleHistory = () => {
    setShowHistory(prev => !prev);
    if (user?.isFrozen) {
  alert("Account is frozen. Contact customer care.");
  return;
}
  };

  return (
    <div className='w-full flex justify-center mt-10'>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className='bg-gradient-to-r from-gray-500 p-8 rounded-2xl shadow-2xl w-[90%] max-w-5xl relative overflow-hidden'
      >
        {/* Animated moving background */}
        <motion.div
          className='absolute top-[-40px] left-[-40px] w-36 h-36 bg-white/20 rounded-full'
          animate={{ x: [0, 250, 0], y: [0, 80, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        />
        <motion.div
          className='absolute bottom-[-50px] right-[-50px] w-52 h-52 bg-white/10 rounded-full'
          animate={{ x: [-50, -180, -50], y: [0, -50, 0] }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
        />

        <div className='relative z-10 flex flex-col items-center gap-4'>
          <div className='flex items-center gap-3 mb-6'>
            {/* <FaHistory className='text-white text-5xl animate-spin' /> */}
            <h2 className='text-white text-3xl font-bold'>{title}</h2>
          </div>

          <button
            onClick={toggleHistory}
            className='bg-white text-purple-600 font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform'
          >
            {showHistory ? "Hide History" : "View History"}
          </button>

          {showHistory && (
            <div className='mt-6 w-full max-h-80 overflow-y-auto space-y-2'>
              {transactions.length === 0 ? (
                <p className='text-white/80 text-center'>No transactions yet.</p>
              ) : (
                transactions.map((tx) => (
                  <motion.div
                    key={tx._id}
                    className='bg-white/20 backdrop-blur-md rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center'
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div className='mb-2 md:mb-0'>
                      <p className='text-white font-semibold'>{tx.description || tx.type}</p>
                      <p className='text-white/80 text-sm'>
                        Recipient: {tx.recipientName} ({tx.counterpartyAccount})
                      </p>
                      <p className='text-white/80 text-sm'>Date: {new Date(tx.date).toLocaleString()}</p>
                    </div>
                    <p className={`font-bold ${tx.type === 'credit' ? 'text-green-400' : 'text-red-400'} text-lg`}>
                      {tx.type === 'credit' ? '+' : '-'}${tx.amount}
                    </p>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
