import React from 'react';

const WelcomeBanner = () => {
  return (
    <div className="gradient-bg rounded-xl p-6 text-white mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-white-500">Welcome back, Student!</h2>
          <p className="mb-4">Discover new products from student startups or manage your own business.</p>
          <button className="bg-white text-purple-700 px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition">
            Explore Marketplace
          </button>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 bg-[url(/assets/Tech.jepg)]..."/>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;