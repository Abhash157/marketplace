import React from 'react';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <button 
          className="md:hidden mr-4 p-2 rounded-md bg-white shadow-md"
          onClick={toggleSidebar}
        >
          <i className="fas fa-bars text-purple-600"></i>
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <i className="fas fa-bell text-gray-600"></i>
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
        <button className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <i className="fas fa-user text-purple-600"></i>
          </div>
          <span className="hidden md:inline font-medium">Student</span>
        </button>
      </div>
    </header>
  );
};

export default Header;