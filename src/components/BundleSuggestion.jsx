import React from 'react';
import { motion } from 'framer-motion';
import { FaGift } from 'react-icons/fa';

const BundleSuggestion = ({ product, proceedToCheckout }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 flex flex-col items-center justify-center p-6">

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="bg-yellow-100 rounded-2xl p-10 shadow-2xl border border-yellow-300 max-w-lg w-full text-center"
      >
        <div className="flex justify-center mb-4">
          <FaGift className="text-yellow-500 text-5xl drop-shadow-lg" />
        </div>

        <h3 className="text-2xl font-extrabold mb-2 text-gray-800">
          Bundle Offer for: <span className="text-green-700">{product.name}</span>
        </h3>

        <p className="mb-6 text-lg text-gray-600">
          🎁 Add matching accessories for just <span className="font-bold text-green-600">₹499 extra!</span>
        </p>

        <motion.button 
          whileHover={{ scale: 1.1 }} 
          className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg"
          onClick={proceedToCheckout}
        >
          Proceed to Checkout
        </motion.button>
      </motion.div>

    </div>
  );
};

export default BundleSuggestion;
