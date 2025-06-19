import React from 'react';

const ProductList = ({ products, onSelectProduct }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Search Results:</h2>
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-xl p-4 shadow hover:shadow-lg transition">
            <h3 className="font-bold">{product.name}</h3>
            <p>₹{product.price}</p>
            <p className="text-sm text-gray-500">{product.stock} in stock</p>
            <button 
              className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
              onClick={() => onSelectProduct(product)}
            >
              View Bundle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
