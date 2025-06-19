import React from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';

const Welcome = ({ startShopping }) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-green-100 via-white to-blue-100">
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="flex items-center gap-4 mb-8"
      >
        <FaShoppingCart className="text-green-500 text-6xl drop-shadow-lg" />
        <h1 className="text-5xl font-extrabold text-gray-800 drop-shadow-lg">
          SmartCart AI
        </h1>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xl text-gray-600 mb-10 text-center px-4"
      >
        Your personal AI-powered shopping assistant.
      </motion.p>

      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="px-10 py-4 bg-green-500 text-white text-xl font-semibold rounded-full shadow-xl transition"
        onClick={startShopping}
      >
        Start Shopping
      </motion.button>
    </div>
  );
};

export default Welcome;
