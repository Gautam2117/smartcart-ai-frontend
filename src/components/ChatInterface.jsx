import React, { useState } from 'react';
import axios from 'axios';

const ChatInterface = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");  // To store AI response
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show loading while waiting for AI response
    setLoading(true);

    try {
        const response = await axios.post('https://smartcart-ai-backend.onrender.com/chat', {
        message: input
        });

      setReply(response.data.reply);
    } catch (err) {
      console.error(err);
      setReply("Error processing your request. Please try again.");
    }

    setLoading(false);
    setInput("");
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-700">SmartCart AI Assistant</h2>
      
      <form onSubmit={handleSubmit} className="flex space-x-4 mb-4">
        <input 
          type="text" 
          className="border rounded-xl px-4 py-2 w-80" 
          placeholder="What are you looking for?" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-xl shadow">
          Search
        </button>
      </form>

      {loading && (
        <div className="text-gray-500 mb-4">Processing your request...</div>
      )}

      {reply && (
        <div className="bg-blue-100 p-4 rounded-xl shadow w-[80%] text-gray-700 whitespace-pre-line">
          {reply}
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
