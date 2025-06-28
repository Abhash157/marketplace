import React from 'react';

const StartupAnalytics = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Your Startup Analytics</h2>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h3 className="font-bold text-lg">EcoBags Performance</h3>
            <p className="text-gray-500">Last 30 days</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition">
              View Detailed Report
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-purple-700 font-medium">Total Revenue</p>
            <h3 className="text-2xl font-bold">$1,245.80</h3>
            <p className="text-sm text-green-600 mt-1">+12% from last month</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-700 font-medium">Products Sold</p>
            <h3 className="text-2xl font-bold">48</h3>
            <p className="text-sm text-green-600 mt-1">+8% from last month</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-700 font-medium">Carbon Saved</p>
            <h3 className="text-2xl font-bold">124 kg</h3>
            <p className="text-sm text-green-600 mt-1">+15% from last month</p>
          </div>
        </div>
        
        <div className="chart-container bg-gray-50 rounded-lg p-4 h-80">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <i className="fas fa-chart-line text-4xl text-gray-300 mb-2"></i>
              <p className="text-gray-500">Revenue chart would display here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupAnalytics;