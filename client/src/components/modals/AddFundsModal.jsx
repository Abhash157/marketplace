import React from 'react';

const AddFundsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Add Funds to Wallet</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
            <input 
              type="number" 
              className="w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
              placeholder="0.00"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Payment Method</label>
          <div className="grid grid-cols-3 gap-2">
            <button className="border rounded-lg py-2 px-4 hover:bg-gray-50">
              <i className="fab fa-cc-visa text-blue-600"></i>
            </button>
            <button className="border rounded-lg py-2 px-4 hover:bg-gray-50">
              <i className="fab fa-cc-mastercard text-red-600"></i>
            </button>
            <button className="border rounded-lg py-2 px-4 hover:bg-gray-50">
              <i className="fab fa-cc-paypal text-blue-500"></i>
            </button>
          </div>
        </div>
        <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
          Add Funds
        </button>
      </div>
    </div>
  );
};

export default AddFundsModal;