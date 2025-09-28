import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const SuccessPopup = ({ onClose }) => {
  // Auto-close after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer); // cleanup
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-sm w-full"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Thank You!
        </h2>
        <p className="text-gray-600 mb-6">
          Your enquiry has been received. We’ll get back to you shortly.
        </p>
        <button
          onClick={onClose}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all duration-300"
        >
          Close
        </button>
        <p className="mt-3 text-sm text-gray-400">(Closing in 2s...)</p>
      </motion.div>
    </div>
  );
};

export default SuccessPopup;
