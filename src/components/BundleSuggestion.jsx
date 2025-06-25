import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaGift, FaSpinner, FaLink, FaMagic, FaCheckCircle } from 'react-icons/fa';

const BundleSuggestion = ({ product, proceedToCheckout }) => {
  const [bundles, setBundles] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBundle = async () => {
      try {
        const response = await axios.post('https://smartcart-ai-backend.onrender.com/bundle', { product });
        setBundles(response.data);
        const initialSelections = {};
        response.data.forEach((_, idx) => { initialSelections[idx] = false });
        setSelectedItems(initialSelections);
      } catch (err) {
        console.error("Bundle AI error:", err);
        alert("Failed to fetch bundle suggestions.");
      }
      setLoading(false);
    };
    fetchBundle();
  }, [product]);

  const bundleTotal = Object.entries(selectedItems).reduce((total, [idx, selected]) => {
    if (selected) total += bundles[idx].price;
    return total;
  }, 0);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-green-100 via-white to-blue-100 p-8">

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-yellow-50 via-yellow-100 to-white rounded-3xl p-10 shadow-2xl border border-yellow-300 w-full max-w-5xl text-center"
      >

        <motion.div 
          initial={{ y: -10 }} 
          animate={{ y: 10 }} 
          transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1 }}
          className="flex justify-center mb-6"
        >
          <FaMagic className="text-yellow-500 text-7xl drop-shadow-lg" />
        </motion.div>

        <h3 className="text-4xl font-extrabold mb-8 text-gray-800">
          🎯 Smart AI Bundle for: <span className="text-green-700">{product.name}</span>
        </h3>

        {loading ? (
          <div className="flex items-center justify-center gap-3 text-green-700 text-xl">
            <FaSpinner className="animate-spin text-3xl" /> Generating personalized suggestions...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {bundles.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ scale: 1.05 }} 
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-white rounded-2xl p-6 shadow-xl border border-green-300 relative"
                >
                  <input
                    type="checkbox"
                    checked={selectedItems[idx] || false}
                    onChange={(e) => setSelectedItems(prev => ({ ...prev, [idx]: e.target.checked }))}
                    className="absolute top-4 right-4 w-6 h-6 text-green-500 rounded focus:ring-green-300"
                  />

                  <h4 className="font-extrabold text-2xl text-green-700 mb-2">{item.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  <div className="text-green-600 font-bold text-xl mb-2">₹{item.price.toLocaleString()}</div>
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-blue-500 text-sm font-medium hover:underline"
                  >
                    <FaLink /> View Accessory
                  </a>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 text-xl text-gray-700 font-semibold">
              Selected Bundle Total: 
              <span className="text-green-600 ml-3 font-bold">₹{bundleTotal.toLocaleString()}</span>
            </div>

            <motion.button 
              whileHover={{ scale: 1.07 }}
              className="mt-8 bg-gradient-to-r from-green-500 to-green-600 text-white px-16 py-5 rounded-full text-2xl font-bold shadow-xl hover:shadow-2xl transition"
              onClick={() => {
                const selectedBundles = bundles.filter((_, idx) => selectedItems[idx]);
                proceedToCheckout(selectedBundles);
              }}
            >
              <FaCheckCircle className="inline mr-3 text-white text-3xl" /> Proceed to Smart Checkout
            </motion.button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default BundleSuggestion;
