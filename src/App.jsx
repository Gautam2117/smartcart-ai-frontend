import React, { useState } from 'react';
import Welcome from './components/Welcome';
import ChatInterface from './components/ChatInterface';
import ProductList from './components/ProductList';
import BundleSuggestion from './components/BundleSuggestion';
import Checkout from './components/Checkout';
import PurchaseHistory from './components/PurchaseHistory';

function App() {
  const [stage, setStage] = useState("welcome");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedBundles, setSelectedBundles] = useState([]);

  const handleSearch = (productList) => {
    if (!productList || productList.length === 0) {
      alert("⚠️ No products found.");
      setStage("chat");
      return;
    }
    setProducts(productList);
    setStage("product");
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setStage("bundle");
  };

  const handleProceedToCheckout = (selected) => {
    setSelectedBundles(selected);
    setStage("checkout");
  };

  const handleRestart = () => {
    setProducts([]);
    setSelectedProduct(null);
    setSelectedBundles([]);
    setStage("welcome");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-100 via-white to-blue-100 font-sans">
      
      {stage === "welcome" && (
        <Welcome 
          startShopping={() => setStage("chat")} 
          goToHistory={() => setStage("history")} 
        />
      )}

      {stage === "chat" && <ChatInterface onSearch={handleSearch} />}
      {stage === "product" && <ProductList products={products} onSelectProduct={handleSelectProduct} />}
      {stage === "bundle" && <BundleSuggestion product={selectedProduct} proceedToCheckout={handleProceedToCheckout} />}
      {stage === "checkout" && <Checkout product={selectedProduct} selectedBundles={selectedBundles} goHome={handleRestart} />}
      {stage === "history" && <PurchaseHistory goHome={handleRestart} />}
    </div>
  );
}

export default App;
