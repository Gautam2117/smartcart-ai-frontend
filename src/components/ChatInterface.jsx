import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  FaRobot, FaSpinner, FaCheckCircle, FaStar, FaMicrophone, FaMicrophoneSlash, FaWarehouse, FaHistory 
} from 'react-icons/fa';

const ChatInterface = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recentQueries, setRecentQueries] = useState([]);

  const userId = "test-user";  // ✅ Hardcoded user for MVP

  // Load recent search history on page load
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`https://smartcart-ai-backend.onrender.com/get-history/${userId}`);
        setRecentQueries(response.data);
      } catch (err) {
        console.error("Failed to fetch history", err);
      }
    };
    fetchHistory();
  }, []);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const handleVoiceInput = () => {
    if (!recognition) {
      alert("Your browser doesn't support Speech Recognition.");
      return;
    }
    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      alert("Voice recognition failed. Please try again.");
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setProducts([]);

    try {
      const response = await axios.post('https://smartcart-ai-backend.onrender.com/chat', { message: input, userId });

      if (response.data && Array.isArray(response.data)) {
        setProducts(response.data);

        // ✅ Update local recent searches for personalization
        const prevSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        const updatedSearches = [input, ...prevSearches.filter(q => q !== input)].slice(0, 10);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));

      } else {
        alert("AI returned empty or invalid response.");
      }
    } catch (err) {
      console.error("Backend Error:", err);
      alert("⚠️ Backend failed to respond.");
    }

    setLoading(false);
    setInput("");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-green-100 via-white to-blue-100 p-8">

      {/* Top Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-4 mb-10"
      >
        <FaRobot className="text-green-500 text-5xl drop-shadow-lg" />
        <h1 className="text-5xl font-extrabold text-gray-800 drop-shadow-lg">
          SmartCart AI Assistant
        </h1>
      </motion.div>

      {/* Recent Search History */}
      {recentQueries.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-6 w-full max-w-2xl bg-white rounded-xl shadow-lg p-5 border border-green-200"
        >
          <div className="flex items-center mb-4">
            <FaHistory className="text-green-500 text-2xl mr-2" />
            <h3 className="text-xl font-semibold text-gray-700">Recent Searches</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentQueries.map((query, idx) => (
              <button 
                key={idx}
                className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium shadow hover:bg-green-200 transition"
                onClick={() => setInput(query)}
              >
                {query}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Search Bar */}
      <motion.form 
        onSubmit={handleSubmit} 
        className="flex w-full max-w-2xl shadow-xl rounded-full overflow-hidden border border-green-400 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <input 
          type="text" 
          className="flex-grow px-6 py-4 text-xl focus:outline-none rounded-l-full" 
          placeholder="What would you like to shop today?" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          required 
        />
        <button 
          type="submit" 
          className="bg-green-500 text-white px-8 py-4 text-xl font-bold hover:bg-green-600 transition rounded-none"
        >
          Search
        </button>
      </motion.form>

      {/* Voice Input */}
      <div className="mt-4">
        <button
          onClick={handleVoiceInput}
          disabled={isListening}
          className={`flex items-center gap-3 px-8 py-3 rounded-full text-lg font-semibold transition ${
            isListening ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
          }`}
        >
          {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />} {isListening ? "Listening..." : "Speak"}
        </button>
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex items-center gap-3 text-green-700 text-xl mt-10">
          <FaSpinner className="animate-spin text-3xl" /> Processing your request...
        </div>
      )}

      {/* AI Product Response */}
      {products.length > 0 && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-white rounded-3xl shadow-2xl p-10 w-full max-w-7xl text-gray-800"
          >
            <div className="flex items-center mb-8">
              <FaCheckCircle className="text-green-500 text-4xl mr-4" />
              <h2 className="text-3xl font-bold">
                SmartCart AI picked {products.length} amazing options for you!
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {products.map((product, index) => (
                <motion.div 
                  key={index} 
                  whileHover={{ scale: 1.03 }} 
                  className="p-8 bg-green-50 rounded-3xl border border-green-200 shadow-xl"
                >
                  <h3 className="font-extrabold text-2xl text-green-700 mb-3">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">Brand: <span className="font-medium">{product.brand}</span></p>
                  <p className="text-sm text-gray-600 mb-3">{product.description}</p>

                  <p className="text-green-600 font-bold text-3xl mb-2">₹{product.price.toLocaleString()}</p>
                  <p className="text-gray-500 mb-2">Stock: {product.stock} units</p>

                  <div className="flex items-center gap-1 text-yellow-400 mb-3">
                    {[...Array(Math.round(product.rating))].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                    <span className="text-gray-700 ml-2 font-semibold">{product.rating.toFixed(1)} / 5</span>
                  </div>

                  <ul className="text-sm text-gray-600 mb-4 list-disc list-inside">
                    {product.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>

                  <a 
                    href={product.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="block mt-4 bg-blue-500 text-white text-center py-3 rounded-full font-semibold hover:bg-blue-600 transition"
                  >
                    View Product
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.07 }}
            className="mt-16 bg-green-500 text-white px-16 py-6 rounded-full text-3xl font-bold shadow-xl hover:bg-green-600 transition"
            onClick={() => onSearch(products)}   
          >
            Proceed to SmartCart ➔
          </motion.button>
        </>
      )}
    </div>
  );
};

export default ChatInterface;
