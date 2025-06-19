import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const Checkout = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-green-100 via-white to-blue-100">

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center bg-white p-10 rounded-xl shadow-2xl"
      >
        <FaCheckCircle className="text-green-500 text-6xl mb-4 drop-shadow-lg" />
        
        <h2 className="text-4xl font-extrabold text-green-600 mb-4">Order Successful 🎉</h2>
        
        <p className="text-lg text-gray-700 mb-2">Thank you for shopping with <span className="font-semibold text-green-700">SmartCart AI</span>!</p>
        
        <p className="text-sm text-gray-500">Your personalized recommendations were powered by real-time AI ✨</p>
      </motion.div>

    </div>
  );
};

export default Checkout;
