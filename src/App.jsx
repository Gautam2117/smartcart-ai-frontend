import React, { useState } from 'react';
import Welcome from './components/Welcome';
import ChatInterface from './components/ChatInterface';
import ProductList from './components/ProductList';
import BundleSuggestion from './components/BundleSuggestion';
import Checkout from './components/Checkout';

function App() {
  const [stage, setStage] = useState("welcome");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSearch = (aiReply) => {
    try {
      const parsedProducts = JSON.parse(aiReply);

      if (Array.isArray(parsedProducts) && parsedProducts.length > 0) {
        // Add unique IDs if not already present
        const productsWithId = parsedProducts.map((p, index) => ({
          id: index + 1,
          name: p.name,
          price: p.price,
          stock: p.stock || Math.floor(Math.random() * 10) + 5
        }));

        setProducts(productsWithId);
        setStage("product");
      } else {
        alert("AI returned no valid products.");
      }

    } catch (err) {
      console.error("JSON parsing error:", err);
      alert("Failed to parse AI response.");
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setStage("bundle");
  };

  const handleCheckout = () => {
    setStage("checkout");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-100 via-white to-blue-100">
      {stage === "welcome" && <Welcome startShopping={() => setStage("chat")} />}
      {stage === "chat" && <ChatInterface onSearch={handleSearch} />}
      {stage === "product" && (
        <ProductList 
          products={products} 
          onSelectProduct={handleSelectProduct} 
        />
      )}
      {stage === "bundle" && (
        <BundleSuggestion 
          product={selectedProduct} 
          proceedToCheckout={handleCheckout} 
        />
      )}
      {stage === "checkout" && <Checkout />}
    </div>
  );
}

export default App;
