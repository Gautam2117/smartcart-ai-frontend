import React from 'react';
import { motion } from 'framer-motion';

const Welcome = ({ startShopping }) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 via-green-100 to-blue-100">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-4xl font-bold mb-8 text-gray-800">
        SmartCart AI
      </motion.h1>
      <motion.button 
        whileHover={{ scale: 1.1 }} 
        className="px-8 py-4 bg-green-500 text-white text-lg rounded-xl shadow-lg"
        onClick={startShopping}
      >
        Start Shopping
      </motion.button>
    </div>
  );
};

export default Welcome;
