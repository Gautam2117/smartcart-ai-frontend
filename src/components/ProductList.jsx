import React from 'react';
import { motion } from 'framer-motion';
import { FaShoppingBag } from 'react-icons/fa';

const ProductList = ({ products, onSelectProduct }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 flex flex-col items-center p-8">

      <motion.h2 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-3xl font-extrabold text-green-700 mb-10 flex items-center gap-3"
      >
        <FaShoppingBag /> Search Results
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {products.map((product) => (
          <motion.div 
            key={product.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl p-6 shadow-xl border border-green-200 transition-all"
          >
            <h3 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h3>
            <p className="text-green-600 text-2xl font-semibold mb-2">₹{product.price}</p>
            <p className="text-sm text-gray-500 mb-4">{product.stock} in stock</p>
            <button 
              className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
              onClick={() => onSelectProduct(product)}
            >
              View Bundle
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
