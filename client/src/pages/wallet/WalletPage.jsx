import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faPlus, faCoins } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';

const WalletPage = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Fetch wallet data (replace with actual API call)
  useEffect(() => {
    // Simulate API call
    const fetchWalletData = async () => {
      try {
        // Replace with actual API call
        // const response = await api.get('/api/wallet');
        // setBalance(response.data.balance);
        // setTransactions(response.data.transactions);
        
        // Mock data for now
        setBalance(1250.75);
        setTransactions([
          { id: 1, amount: 1000, type: 'credit', description: 'Initial deposit', date: '2025-06-28T10:30:00' },
          { id: 2, amount: -49.99, type: 'debit', description: 'Course purchase', date: '2025-06-27T15:45:00' },
          { id: 3, amount: 300, type: 'credit', description: 'Referral bonus', date: '2025-06-26T09:15:00' },
          { id: 4, amount: -0.26, type: 'debit', description: 'Transaction fee', date: '2025-06-25T11:20:00' },
        ]);
      } catch (error) {
        console.error('Error fetching wallet data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWalletData();
  }, []);

  const handleAddFunds = () => {
    // Navigate to add funds page or open modal
    // navigate('/add-funds');
    alert('Add funds functionality will be implemented here');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }


  return (
    <>
    <div className="container mx-auto">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarOpen ? 'ml-0' : 'md:ml-64'
      }`}>
        <Header toggleSidebar={toggleSidebar} />  
        {/* Wallet Balance Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">My Wallet</h1>
            <button
              onClick={handleAddFunds}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add Funds
            </button>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-blue-100 text-sm">Available Balance</p>
                <h2 className="text-3xl font-bold">${balance.toFixed(2)}</h2>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <FontAwesomeIcon icon={faCoins} className="text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Transaction History</h2>
          
          {transactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No transactions yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div 
                  key={transaction.id} 
                  className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    <div className={`p-3 rounded-full ${
                      transaction.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      <FontAwesomeIcon 
                        icon={transaction.type === 'credit' ? faArrowDown : faArrowUp} 
                        className="text-sm" 
                      />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-800">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(transaction.date)}
                      </p>
                    </div>
                  </div>
                  <div className={`font-semibold ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default WalletPage;