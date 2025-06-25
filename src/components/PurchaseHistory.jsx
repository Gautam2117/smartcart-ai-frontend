import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaHistory, FaReceipt } from 'react-icons/fa';

const PurchaseHistory = ({ goHome }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('purchaseHistory');
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-100 via-white to-blue-100 p-6">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-3xl p-12 shadow-2xl border border-green-200 max-w-5xl w-full"
      >
        <div className="flex justify-center mb-8">
          <FaHistory className="text-blue-500 text-7xl drop-shadow-lg" />
        </div>
        <h2 className="text-4xl font-extrabold text-green-700 mb-8 text-center">Purchase History</h2>

        {history.length === 0 ? (
          <p className="text-center text-xl text-gray-500">No previous purchases found.</p>
        ) : (
          <div className="space-y-8">
            {history.map((record, idx) => (
              <div key={idx} className="bg-gradient-to-br from-white via-green-50 to-white p-6 rounded-xl border shadow-lg">
                <h3 className="text-2xl font-bold text-green-700 mb-2">{record.product.name}</h3>
                <p className="text-sm text-gray-600 mb-1">Brand: {record.product.brand}</p>
                <p className="text-sm text-gray-500 mb-4">{record.product.description}</p>

                {record.bundles.length > 0 && (
                  <div className="mb-3">
                    <p className="font-bold text-yellow-600">Bundles:</p>
                    <ul className="list-disc list-inside text-gray-700">
                      {record.bundles.map((bundle, i) => (
                        <li key={i}>{bundle.name} (₹{bundle.price})</li>
                      ))}
                    </ul>
                  </div>
                )}

                <p className="font-semibold text-lg">Total Paid: ₹{record.total}</p>
                <p className="text-sm text-gray-500 mt-1">Date: {record.date}</p>
              </div>
            ))}
          </div>
        )}

        <motion.button 
          whileHover={{ scale: 1.05 }}
          onClick={goHome}
          className="mt-10 bg-green-500 text-white px-12 py-4 rounded-full font-bold text-xl shadow-lg hover:bg-green-600 transition"
        >
          Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PurchaseHistory;
