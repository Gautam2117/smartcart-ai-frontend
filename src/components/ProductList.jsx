import React from 'react';
import { motion } from 'framer-motion';
import { FaShoppingBag, FaStar, FaWarehouse, FaTag, FaBolt, FaFire } from 'react-icons/fa';

const ProductList = ({ products, onSelectProduct }) => {

  const handleProductSelect = (product) => {
    // ✅ Save recently viewed into localStorage
    const prevViewed = JSON.parse(localStorage.getItem('recentViewed') || '[]');
    const updatedViewed = [product, ...prevViewed.filter(p => p.name !== product.name)].slice(0, 10);
    localStorage.setItem('recentViewed', JSON.stringify(updatedViewed));

    // Then call original select handler
    onSelectProduct(product);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex flex-col items-center py-16 px-8">

      <motion.h2 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-green-700 mb-16 flex items-center gap-4 drop-shadow-lg"
      >
        <FaShoppingBag className="text-6xl text-green-500 drop-shadow-md" /> 
        Discover Your AI-Picked Products
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-12 w-full max-w-7xl">
        {products.map((product, index) => (
          <motion.div 
            key={`${product.name}-${index}`}  
            whileHover={{ scale: 1.04, rotate: 0.5 }}
            transition={{ type: "spring", stiffness: 250 }}
            className="relative bg-white rounded-3xl p-7 shadow-2xl border-2 border-green-300 transition-all flex flex-col justify-between hover:shadow-green-300"
          >
            <div className="absolute -top-4 left-4 bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-1 rounded-full shadow text-xs font-bold flex items-center gap-1 z-10">
              <FaTag /> AI Picked
            </div>

            <h3 className="text-2xl font-extrabold text-green-900 mb-3 mt-2">{product.name}</h3>

            <p className="text-sm text-gray-600 mb-1">Brand: <span className="font-semibold">{product.brand}</span></p>
            <p className="text-sm text-gray-500 mb-4">{product.description.slice(0, 80)}...</p>

            <ul className="list-disc list-inside mb-4 text-sm text-gray-600">
              {product.features.slice(0, 3).map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>

            <div className="flex justify-between items-center mb-3">
              <p className="text-green-600 font-extrabold text-2xl tracking-wide">
                ₹{product.price.toLocaleString()}
              </p>
              <div className={`flex items-center gap-2 text-sm font-semibold ${product.stock < 10 ? "text-red-500" : "text-gray-500"}`}>
                <FaWarehouse /> {product.stock} left
              </div>
            </div>

            <div className="flex items-center gap-1 mb-3">
              {[...Array(Math.round(product.rating))].map((_, i) => (
                <FaStar key={i} className="text-yellow-400" />
              ))}
              <span className="ml-2 text-gray-700 font-semibold">{product.rating.toFixed(1)} / 5</span>
            </div>

            <a 
              href={product.url} 
              target="_blank" 
              rel="noreferrer"
              className="block w-full text-center mb-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full shadow transition"
            >
              🔗 View Details
            </a>

            <button 
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-full font-bold text-lg shadow-xl transition"
              onClick={() => handleProductSelect(product)}
            >
              Add to Bundle
            </button>

            {product.stock < 8 && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-red-400 to-red-600 text-white px-3 py-1 rounded-full shadow text-xs font-bold flex items-center gap-1">
                <FaBolt /> Limited Stock
              </div>
            )}

            {product.rating >= 4.5 && (
              <div className="absolute bottom-5 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full shadow text-xs font-bold flex items-center gap-1">
                <FaFire /> Best Seller
              </div>
            )}
          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default ProductList;
