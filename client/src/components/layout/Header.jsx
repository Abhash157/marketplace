import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <button 
          className="md:hidden mr-4 p-2 rounded-md bg-white shadow-md"
          onClick={toggleSidebar}
        >
          <i className="fas fa-bars text-purple-600"></i>
        </button>
        <h1 className="text-2xl font-bold bg-no-repeat bg-center bg-cover text-purple-500" >Tech Connect.</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <i className="fas fa-bell text-gray-600"></i>
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
        <div className="relative">
          <button 
            className="flex items-center space-x-2 focus:outline-none"
            onClick={toggleProfileMenu}
          >
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <i className="fas fa-user text-purple-600"></i>
            </div>
            <span className="hidden md:inline font-medium">Student</span>
            <i className={`fas fa-chevron-down text-xs text-gray-500 transition-transform ${isProfileOpen ? 'transform rotate-180' : ''}`}></i>
          </button>
          
          {isProfileOpen && (
            <div 
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
              onClick={(e) => e.target.closest('.absolute') && setIsProfileOpen(false)}
            >
              <Link
                to="/login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsProfileOpen(false)}
              >
                <i className="fas fa-sign-in-alt mr-2"></i> Login
              </Link>
              <div className="border-t border-gray-100 my-1"></div>
              <Link
                to="/register"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsProfileOpen(false)}
              >
                <i className="fas fa-user-plus mr-2"></i> Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;