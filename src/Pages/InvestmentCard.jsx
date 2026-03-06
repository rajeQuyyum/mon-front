import React from 'react';
import { motion } from 'framer-motion';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import DelayedLink from '../Components/DelayedLink';

export default function InvestmentCard() {
  return (
    <div className='w-full flex justify-center mt-20'>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className='bg-gradient-to-r from-gray-300 to-blue-500 p-8 rounded-2xl shadow-xl w-[90%] max-w-4xl relative overflow-hidden'
      >
        {/* Animated moving background circle */}
        <motion.div
          className='absolute top-[-50px] left-[-50px] w-40 h-40 bg-white/20 rounded-full'
          animate={{ x: [0, 300, 0], y: [0, 100, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        />
        <motion.div
          className='absolute bottom-[-50px] right-[-50px] w-56 h-56 bg-white/10 rounded-full'
          animate={{ x: [-50, -200, -50], y: [0, -50, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        />

        <div className='relative z-10 flex flex-col md:flex-row items-center justify-between gap-6'>
          <div className='flex items-center gap-4'>
            <AiOutlineDollarCircle className='text-white text-6xl animate-bounce' />
            <div>
              <h2 className='text-white text-3xl font-bold'>Invest Now</h2>
              <p className='text-white/90 mt-2'>Grow your balance with our safe and fast investments.</p>
            </div>
          </div>

         <DelayedLink to="/invest">
             <button className='bg-white text-green-600 font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform'>
            Invest
          </button>
         </DelayedLink>
        </div>
      </motion.div>
    </div>
  )
}
