import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCheckCircle, FaTag, FaArrowLeft, FaGift, FaMoneyBillWave, FaSpinner, FaReceipt 
} from 'react-icons/fa';

const Checkout = ({ product, selectedBundles, goHome }) => {
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  const basePrice = product.price;
  const bundleTotal = selectedBundles.reduce((sum, item) => sum + item.price, 0);
  const discount = selectedBundles.length > 0 ? Math.floor(bundleTotal * 0.15) : 0;
  const grandTotal = basePrice + bundleTotal - discount;

  const handlePayment = () => {
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentSuccess(true);

      // ✅ Save into localStorage history
      const purchase = {
        product,
        bundles: selectedBundles,
        total: grandTotal,
        date: new Date().toLocaleString()
      };

      const prev = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
      localStorage.setItem('purchaseHistory', JSON.stringify([purchase, ...prev]));
    }, 2000);
  };

  const purchaseDate = new Date().toLocaleString();

  // ✅ Receipt screen
  if (showReceipt) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-100 via-white to-blue-100 p-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl p-12 shadow-2xl border border-green-200 max-w-3xl w-full text-center"
        >
          <FaReceipt className="text-blue-500 text-7xl mb-8 drop-shadow-lg" />
          <h2 className="text-4xl font-extrabold text-green-700 mb-6">Purchase Receipt</h2>

          <div className="text-left text-lg text-gray-700 mb-6">
            <p><strong>Product:</strong> {product.name}</p>
            <p><strong>Brand:</strong> {product.brand}</p>
            {selectedBundles.length > 0 && (
              <>
                <p className="mt-4 font-bold text-yellow-600">Bundles Selected:</p>
                <ul className="list-disc list-inside">
                  {selectedBundles.map((bundle, idx) => (
                    <li key={idx}>{bundle.name} (₹{bundle.price.toLocaleString()})</li>
                  ))}
                </ul>
              </>
            )}
            <p className="mt-4"><strong>Total Paid:</strong> ₹{grandTotal.toLocaleString()}</p>
            <p><strong>Purchase Date:</strong> {purchaseDate}</p>
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="bg-green-500 text-white px-14 py-4 rounded-full font-semibold text-xl shadow-lg hover:bg-green-600 transition"
            onClick={goHome}
          >
            Back to Home
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // ✅ Payment success screen
  if (paymentSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-100 via-white to-blue-100 p-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl p-12 shadow-2xl border border-green-200 max-w-3xl w-full text-center"
        >
          <FaCheckCircle className="text-green-500 text-7xl mb-8 drop-shadow-lg" />
          <h2 className="text-4xl font-extrabold text-green-700 mb-4">
            🎉 Payment Successful!
          </h2>
          <p className="text-xl text-gray-700 mb-10">Thank you for shopping with SmartCart AI 🚀</p>
          <div className="flex justify-center gap-8">
            <button 
              onClick={() => setShowReceipt(true)}
              className="bg-blue-500 text-white px-12 py-4 rounded-full font-semibold text-xl shadow-lg hover:bg-blue-600 transition"
            >
              View Receipt
            </button>

            <button 
              onClick={goHome}
              className="bg-green-500 text-white px-12 py-4 rounded-full font-semibold text-xl shadow-lg hover:bg-green-600 transition"
            >
              Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ✅ Normal checkout summary screen
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-100 via-white to-blue-100 p-6">

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-white via-green-50 to-white rounded-3xl p-12 shadow-2xl border border-green-200 max-w-3xl w-full text-center"
      >

        <div className="flex justify-center mb-8">
          <FaCheckCircle className="text-green-500 text-6xl drop-shadow-lg" />
        </div>

        <h2 className="text-4xl font-extrabold text-green-700 mb-6">
          🛒 Smart AI Checkout Summary
        </h2>

        {/* Main Product */}
        <div className="bg-white p-6 rounded-xl shadow-lg border mb-8 text-left">
          <h3 className="text-2xl font-bold text-green-700 mb-2">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-2">Brand: {product.brand}</p>
          <p className="text-sm text-gray-500">{product.description}</p>
          <div className="mt-4 text-green-600 text-xl font-bold">₹{product.price.toLocaleString()}</div>
        </div>

        {/* Bundle Summary */}
        {selectedBundles.length > 0 ? (
          <div className="bg-white p-6 rounded-xl shadow-lg border mb-8 text-left">
            <h4 className="text-xl font-bold text-yellow-600 mb-4 flex items-center gap-2">
              <FaGift /> Your Selected Bundles
            </h4>
            {selectedBundles.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center mb-3">
                <div>
                  <p className="font-semibold text-green-700">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <p className="font-semibold text-green-600">₹{item.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-lg text-gray-500 mb-8 font-medium">
            ⚠️ No bundle selected — proceeding with only main product.
          </div>
        )}

        {/* Pricing Summary */}
        <div className="bg-green-100 p-6 rounded-xl border border-green-300 mb-10 text-left">
          <div className="flex justify-between font-semibold text-lg mb-2">
            <span>Subtotal:</span>
            <span>₹{(basePrice + bundleTotal).toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-semibold text-yellow-700 mb-2">
            <span><FaTag className="inline mr-1" /> Bundle Discount:</span>
            <span>-₹{discount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-bold text-2xl text-green-700">
            <span>Total Payable:</span>
            <span>₹{grandTotal.toLocaleString()}</span>
          </div>
        </div>

        {paymentProcessing ? (
          <div className="flex items-center justify-center gap-3 text-green-700 text-xl mb-6">
            <FaSpinner className="animate-spin text-3xl" /> Processing Payment...
          </div>
        ) : (
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-16 py-5 rounded-full text-2xl font-bold shadow-xl hover:shadow-2xl mb-6"
            onClick={handlePayment}
          >
            <FaMoneyBillWave /> Pay Now
          </motion.button>
        )}

        <button 
          onClick={goHome}
          className="flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-green-600 transition"
        >
          <FaArrowLeft /> Back to Home
        </button>
      </motion.div>
    </div>
  );
};

export default Checkout;
