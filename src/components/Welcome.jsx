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
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-tr from-green-100 via-white to-blue-100 relative overflow-hidden">

      {/* Background Floating Circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-green-300 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-300 rounded-full blur-3xl opacity-20 animate-pulse" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center z-10"
      >
        <div className="flex items-center gap-4 mb-8">
          <FaShoppingCart className="text-green-500 text-7xl drop-shadow-lg" />
          <h1 className="text-6xl font-extrabold text-gray-800 drop-shadow-lg tracking-tight">
            SmartCart AI
          </h1>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl text-gray-700 mb-8 text-center px-6 leading-relaxed"
        >
          Your intelligent AI-powered <span className="text-green-600 font-bold">personal shopper</span>. <br />
          Get tailored product suggestions, compare options, and shop smarter.
        </motion.p>

        <div className="flex gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-xl"
          >
            <FaMagic className="text-green-400 text-4xl mb-3" />
            <p className="text-lg font-semibold text-gray-700">AI Recommendations</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-xl"
          >
            <FaBolt className="text-yellow-400 text-4xl mb-3" />
            <p className="text-lg font-semibold text-gray-700">Instant Results</p>
          </motion.div>
        </div>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h3 className="text-2xl font-bold text-green-700 flex items-center gap-2 mb-4">
              <FaHistory /> Recent Searches
            </h3>
            <div className="flex flex-wrap gap-3">
              {recentSearches.map((query, idx) => (
                <span key={idx} className="px-4 py-2 bg-green-100 rounded-full text-green-700 font-semibold shadow">
                  {query}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed */}
        {recentViewed.length > 0 && (
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h3 className="text-2xl font-bold text-blue-700 flex items-center gap-2 mb-4">
              <FaEye /> Recently Viewed
            </h3>
            <div className="flex flex-wrap gap-3">
              {recentViewed.map((product, idx) => (
                <span key={idx} className="px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-semibold shadow">
                  {product.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Start Shopping Button */}
        <motion.button 
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="mt-6 px-14 py-5 bg-green-500 text-white text-2xl font-bold rounded-full shadow-2xl hover:bg-green-600 transition-all"
          onClick={startShopping}
        >
          Start Shopping Now
        </motion.button>

        {/* View Purchase History Button */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          className="mt-6 bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg hover:bg-blue-600 transition"
          onClick={goToHistory}
        >
          View Purchase History
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Welcome;
