import React, { useState } from 'react';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';

const ChatInterface = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setReply("");

    try {
      const response = await axios.post('https://smartcart-ai-backend.onrender.com/chat', {
        message: input
      });

      setReply(response.data.reply);  // This reply will be pure JSON string

    } catch (err) {
      console.error(err);
      setReply("❌ Error processing your request. Please try again.");
    }

    setLoading(false);
    setInput("");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-100 via-white to-blue-100 p-6">

      <h1 className="text-4xl font-extrabold text-green-700 mb-6 shadow-sm">SmartCart AI Assistant</h1>

      <form 
        onSubmit={handleSubmit} 
        className="flex w-full max-w-xl shadow-lg rounded-xl overflow-hidden border border-green-300"
      >
        <input 
          type="text" 
          className="flex-grow px-6 py-4 text-lg focus:outline-none" 
          placeholder="What are you looking for?" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          required 
        />
        <button 
          type="submit" 
          className="bg-green-500 text-white px-8 py-4 text-lg font-semibold hover:bg-green-600 transition"
        >
          Search
        </button>
      </form>

      {loading && (
        <div className="flex items-center gap-2 text-green-700 text-lg mt-8">
          <FaSpinner className="animate-spin" /> Processing your request...
        </div>
      )}

      {reply && (
        <>
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl text-gray-800 text-center text-xl">
            ✅ Product suggestions ready!
          </div>

          <button
            className="mt-6 bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-green-600 transition"
            onClick={() => onSearch(reply)}   // Pass pure JSON string to App
          >
            View Product Suggestions
          </button>
        </>
      )}
    </div>
  );
};

export default ChatInterface;
