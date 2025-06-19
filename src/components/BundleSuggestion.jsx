import React from 'react';

const BundleSuggestion = ({ product, proceedToCheckout }) => {
  return (
    <div className="p-4 bg-yellow-100 rounded-xl shadow-md">
      <h3 className="text-lg font-bold mb-2 text-gray-700">
        Bundle Suggestion for: {product.name}
      </h3>
      <p className="mb-2">Add matching accessories for just ₹499 extra!</p>
      <button 
        className="bg-green-500 text-white px-6 py-2 rounded-xl"
        onClick={proceedToCheckout}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default BundleSuggestion;
