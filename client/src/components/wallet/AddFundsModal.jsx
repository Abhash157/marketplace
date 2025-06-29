import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faWallet, faRupeeSign } from '@fortawesome/free-solid-svg-icons';

const AddFundsModal = ({ isOpen, onClose, onAddFunds }) => {
  const [amount, setAmount] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('esewa');
  const [isLoading, setIsLoading] = useState(false);

  const wallets = [
    { id: 'esewa', name: 'eSewa', logo: '/assets/2.jpeg' },
    { id: 'khalti', name: 'Khalti', logo: '/assets/4.jpeg' },
    { id: 'imepay', name: 'IME Pay', logo: '/assets/3.jpeg' },
    { id: 'fonepay', name: 'Fonepay', logo: '/assets/1.jpeg' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call the parent component's handler with the amount and wallet
      onAddFunds(parseFloat(amount), selectedWallet);
      onClose();
    } catch (error) {
      console.error('Error adding funds:', error);
      alert('Failed to add funds. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">Add Funds</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              disabled={isLoading}
            >
              <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Wallet
              </label>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {wallets.map((wallet) => (
                  <div 
                    key={wallet.id}
                    onClick={() => setSelectedWallet(wallet.id)}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedWallet === wallet.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <img 
                        src={wallet.logo} 
                        alt={wallet.name} 
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span className="font-medium">{wallet.name}</span>
                    </div>
                  </div>
                ))}
              </div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (NPR)
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faRupeeSign} className="text-gray-500" />
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 py-3 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                  step="0.01"
                  min="1"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  'Processing...'
                ) : (
                  <>
                    <FontAwesomeIcon icon={faWallet} className="mr-2" />
                    Add NPR {parseFloat(amount) ? parseFloat(amount).toFixed(2) : '0.00'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFundsModal;
