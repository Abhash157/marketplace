import React from 'react';

const QuickStats = ({ openAddFundsModal }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Your Balance</p>
            <h3 className="text-2xl font-bold">Rs 245.50</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
            <i className="fas fa-wallet text-purple-600 text-xl"></i>
          </div>
        </div>
        <button 
          className="mt-4 text-purple-600 text-sm font-medium flex items-center"
          onClick={openAddFundsModal}
        >
          Add Funds <i className="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Your Startup</p>
            <h3 className="text-2xl font-bold">EcoBags</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <i className="fas fa-leaf text-green-600 text-xl"></i>
          </div>
        </div>
        <button className="mt-4 text-purple-600 text-sm font-medium flex items-center">
          View Analytics <i className="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Mentor Sessions</p>
            <h3 className="text-2xl font-bold">3 Available</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <i className="fas fa-users text-blue-600 text-xl"></i>
          </div>
        </div>
        <button className="mt-4 text-purple-600 text-sm font-medium flex items-center">
          Connect Now <i className="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
    </div>
  );
};

export default QuickStats;