import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowUp, faArrowDown, faPlus, faCoins, 
  faExchangeAlt, faShoppingCart, faGift, faInfoCircle 
} from '@fortawesome/free-solid-svg-icons';
import AddFundsModal from '../../components/wallet/AddFundsModal';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';

const nepaliWalletsMock = [
  { id: 'esewa', name: 'eSewa', balance: 14500.75, logo: '/assets/2.jpeg' },
  { id: 'khalti', name: 'Khalti', balance: 8800.5, logo: '/assets/4.jpeg' },
  { id: 'imepay', name: 'IME Pay', balance: 7300.0, logo: '/assets/3.jpeg' },
  { id: 'fonepay', name: 'Fonepay', balance: 4000.25, logo: '/assets/1.jpeg' },
];

const WalletPage = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [isAddFundsModalOpen, setIsAddFundsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Fetch wallet data
  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setBalance(22455.00);
        setTransactions([
          { id: 1, amount: 1000, type: 'credit', description: 'Initial deposit', date: '2025-06-28T10:30:00', category: 'deposit' },
          { id: 2, amount: -49.99, type: 'debit', description: 'Course purchase', date: '2025-06-27T15:45:00', category: 'education' },
          { id: 3, amount: 300, type: 'credit', description: 'Referral bonus', date: '2025-06-26T09:15:00', category: 'bonus' },
          { id: 4, amount: -0.26, type: 'debit', description: 'Transaction fee', date: '2025-06-25T11:20:00', category: 'fee' },
          { id: 5, amount: -120, type: 'debit', description: 'Online shopping', date: '2025-06-24T14:30:00', category: 'shopping' },
          { id: 6, amount: 500, type: 'credit', description: 'Refund', date: '2025-06-23T16:20:00', category: 'refund' },
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
    setIsAddFundsModalOpen(true);
  };

  const handleFundsAdded = (amount, walletId) => {
    // Update the wallet balance
    const wallet = nepaliWalletsMock.find(w => w.id === walletId);
    if (wallet) {
      wallet.balance += amount;
      
      // Add a new transaction
      const newTransaction = {
        id: Date.now(),
        amount: amount,
        type: 'credit',
        description: `Funds added via ${wallet.name}`,
        date: new Date().toISOString(),
        category: 'deposit'
      };
      
      setTransactions(prev => [newTransaction, ...prev]);
      setBalance(prev => prev + amount);
      
      alert(`Successfully added NPR ${amount.toFixed(2)} to your ${wallet.name} wallet`);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatNPR = (amount) => {
    return `रु ${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  const filteredTransactions = activeTab === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === activeTab);

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'deposit': return faArrowDown;
      case 'education': return faExchangeAlt;
      case 'shopping': return faShoppingCart;
      case 'bonus': return faGift;
      default: return faInfoCircle;
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'deposit': return 'bg-blue-100 text-blue-600';
      case 'education': return 'bg-purple-100 text-purple-600';
      case 'shopping': return 'bg-yellow-100 text-yellow-600';
      case 'bonus': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-0' : 'md:ml-64'}`}>
        <Header toggleSidebar={toggleSidebar} />
        <AddFundsModal 
          isOpen={isAddFundsModalOpen}
          onClose={() => setIsAddFundsModalOpen(false)}
          onAddFunds={handleFundsAdded}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 max-w-7xl mx-auto w-full">
          {/* Main Wallet */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">My Wallet</h1>
              <button
                onClick={handleAddFunds}
                className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-1.5 rounded-lg shadow transition duration-200"
                aria-label="Add funds"
              >
                <FontAwesomeIcon icon={faPlus} size="xs" />
                <span>Add Funds</span>
              </button>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-5 shadow-lg flex items-center justify-between text-white">
              <div>
                <p className="text-xs opacity-80 tracking-wide">Available Balance</p>
                <h2 className="text-2xl md:text-3xl font-bold mt-1">Rs. {balance.toFixed(2)}</h2>
              </div>
              <div className="bg-white bg-opacity-30 p-3 rounded-full">
                <FontAwesomeIcon icon={faCoins} className="text-xl" />
              </div>
            </div>
          </section>

          {/* Nepali Wallets Section */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg md:text-xl font-bold text-gray-900">Wallets</h2>
              <button 
                className="text-xs text-blue-600 hover:underline"
                onClick={() => alert('Connect more wallets')}
              >
                + Add Wallet
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {nepaliWalletsMock.map((wallet) => (
                <div
                  key={wallet.id}
                  className={`bg-white rounded-lg shadow p-3 flex flex-col items-center text-center transition-all cursor-pointer border ${
                    selectedWallet === wallet.id 
                      ? 'border-blue-500 shadow-md transform scale-[1.02]' 
                      : 'border-gray-100 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedWallet(wallet.id)}
                >
                  <div className="bg-gray-100 rounded-full p-2 mb-2">
                    <img
                      src={wallet.logo}
                      alt={`${wallet.name} logo`}
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/64?text=Logo';
                      }}
                    />
                  </div>
                  <h3 className="text-sm font-medium mb-0.5">{wallet.name}</h3>
                  <p className="text-xs font-semibold text-gray-700">{formatNPR(wallet.balance)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Transaction History */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg md:text-xl font-bold text-gray-900">Transaction History</h2>
              <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                {['all', 'credit', 'debit'].map((tab) => (
                  <button
                    key={tab}
                    className={`text-xs px-2 py-1 rounded-md transition-colors ${
                      activeTab === tab
                        ? 'bg-white shadow-sm font-medium'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === 'all' ? 'All' : tab === 'credit' ? 'Income' : 'Expense'}
                  </button>
                ))}
              </div>
            </div>

            {filteredTransactions.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p>No {activeTab !== 'all' ? activeTab : ''} transactions yet</p>
                <button 
                  className="mt-2 text-blue-600 text-sm hover:underline"
                  onClick={handleAddFunds}
                >
                  Add funds to get started
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${getCategoryColor(transaction.category)}`}>
                        <FontAwesomeIcon 
                          icon={getCategoryIcon(transaction.category)} 
                          className="text-sm" 
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
                      </div>
                    </div>
                    <div
                      className={`font-semibold text-sm ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {transaction.type === 'credit' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {filteredTransactions.length > 0 && (
              <button 
                className="w-full mt-4 text-center text-sm text-blue-600 hover:underline py-2"
                onClick={() => alert('View all transactions')}
              >
                View all transactions
              </button>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default WalletPage;