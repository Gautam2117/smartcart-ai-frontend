import React, { useState } from 'react';
import Welcome from './components/Welcome';
import ChatInterface from './components/ChatInterface';
import ProductList from './components/ProductList';
import BundleSuggestion from './components/BundleSuggestion';
import Checkout from './components/Checkout';

// Dummy product data for now
const dummyProducts = [
  { id: 1, name: 'Casual Shoes', price: 2999, stock: 12 },
  { id: 2, name: 'Running Sneakers', price: 3499, stock: 5 },
  { id: 3, name: 'Formal Leather Shoes', price: 3999, stock: 8 }
];

function App() {
  const [stage, setStage] = useState("welcome");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSearch = (query) => {
    setProducts(dummyProducts);
    setStage("product");
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setStage("bundle");
  };

  const handleCheckout = () => {
    setStage("checkout");
  };

  return (
    <>
      {stage === "welcome" && <Welcome startShopping={() => setStage("chat")} />}
      {stage === "chat" && <ChatInterface onSearch={handleSearch} />}
      {stage === "product" && <ProductList products={products} onSelectProduct={handleSelectProduct} />}
      {stage === "bundle" && <BundleSuggestion product={selectedProduct} proceedToCheckout={handleCheckout} />}
      {stage === "checkout" && <Checkout />}
    </>
  );
}

export default App;
