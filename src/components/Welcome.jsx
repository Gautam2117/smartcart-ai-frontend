import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaMagic, FaBolt, FaHistory, FaEye } from 'react-icons/fa';

const Welcome = ({ startShopping, goToHistory }) => {
  const [recentSearches, setRecentSearches] = useState([]);
  const [recentViewed, setRecentViewed] = useState([]);

  useEffect(() => {
    const searches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    const viewed = JSON.parse(localStorage.getItem('recentViewed') || '[]');
    setRecentSearches(searches);
    setRecentViewed(viewed);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-tr from-green-100 via-white to-blue-100 relative overflow-hidden px-6 py-12">

      {/* Background Floating Circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-green-300 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-300 rounded-full blur-3xl opacity-20 animate-pulse" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center z-10 w-full max-w-5xl"
      >
        {/* Logo */}
        <div className="flex items-center gap-4 mb-6">
          <FaShoppingCart className="text-green-500 text-6xl drop-shadow-lg" />
          <h1 className="text-5xl font-extrabold text-gray-800 drop-shadow-lg tracking-tight">
            SmartCart AI
          </h1>
        </div>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl sm:text-2xl text-gray-700 mb-8 text-center px-4 leading-relaxed"
        >
          Your intelligent AI-powered <span className="text-green-600 font-bold">personal shopper</span>.<br />
          Get tailored product suggestions, compare options, and shop smarter.
        </motion.p>

        {/* Feature Highlights */}
        <div className="flex gap-6 flex-wrap justify-center mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col items-center bg-white p-5 rounded-2xl shadow-xl min-w-[140px]"
          >
            <FaMagic className="text-green-400 text-3xl mb-2" />
            <p className="text-md font-semibold text-gray-700 text-center">AI Recommendations</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col items-center bg-white p-5 rounded-2xl shadow-xl min-w-[140px]"
          >
            <FaBolt className="text-yellow-400 text-3xl mb-2" />
            <p className="text-md font-semibold text-gray-700 text-center">Instant Results</p>
          </motion.div>
        </div>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div className="w-full bg-white rounded-2xl shadow-xl p-5 mb-5 border border-green-200">
            <h3 className="text-xl font-bold text-green-700 flex items-center gap-2 mb-3">
              <FaHistory /> Recent Searches
            </h3>
            <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto pr-2">
              {recentSearches.map((query, idx) => (
                <span key={idx} className="px-3 py-1 bg-green-100 rounded-full text-green-800 font-medium text-sm shadow">
                  {query}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed */}
        {recentViewed.length > 0 && (
          <div className="w-full bg-white rounded-2xl shadow-xl p-5 mb-6 border border-blue-200">
            <h3 className="text-xl font-bold text-blue-700 flex items-center gap-2 mb-3">
              <FaEye /> Recently Viewed
            </h3>
            <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto pr-2">
              {recentViewed.map((product, idx) => (
                <span key={idx} className="px-3 py-1 bg-blue-100 rounded-full text-blue-800 font-medium text-sm shadow">
                  {product.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Buttons */}
        <motion.button 
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="mt-4 px-12 py-4 bg-green-500 text-white text-xl font-bold rounded-full shadow-lg hover:bg-green-600 transition"
          onClick={startShopping}
        >
          Start Shopping Now
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          className="mt-4 bg-blue-500 text-white px-10 py-3 rounded-full text-md font-bold shadow-md hover:bg-blue-600 transition"
          onClick={goToHistory}
        >
          View Purchase History
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Welcome;
