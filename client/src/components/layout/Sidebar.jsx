import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed h-screen w-64 bg-white shadow-lg flex flex-col z-40 transition-all duration-300 ${
          isOpen ? 'left-0' : '-left-64 md:left-0'
        }`}
      >
        <div className="p-4 flex items-center space-x-2 border-b">
          <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold">
            UC
          </div>
          <span className="logo-text text-xl font-bold text-purple-800">UniConnect</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-4 mb-6">
            <h3 className="sidebar-text text-xs uppercase font-semibold text-gray-500 mb-2">Main</h3>
            <a href="#" className="menu-item flex items-center space-x-3 p-2 rounded-lg text-purple-700 bg-purple-50">
              <i className="fas fa-home"></i>
              <span className="sidebar-text">Dashboard</span>
            </a>
          </div>
          
          <div className="px-4 mb-6">
            <h3 className="sidebar-text text-xs uppercase font-semibold text-gray-500 mb-2">Marketplace</h3>
            <a href="#" className="menu-item flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700">
              <i className="fas fa-store"></i>
              <span className="sidebar-text">Browse Products</span>
            </a>
            <a href="#" className="menu-item flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700">
              <i className="fas fa-search"></i>
              <span className="sidebar-text">Search</span>
            </a>
            <a href="#" className="menu-item flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700">
              <i className="fas fa-tags"></i>
              <span className="sidebar-text">Categories</span>
            </a>
          </div>
          
          <div className="px-4 mb-6">
            <h3 className="sidebar-text text-xs uppercase font-semibold text-gray-500 mb-2">Startup Tools</h3>
            <a href="#" className="menu-item flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700">
              <i className="fas fa-rocket"></i>
              <span className="sidebar-text">Register Startup</span>
            </a>
            <a href="#" className="menu-item flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700">
              <i className="fas fa-box-open"></i>
              <span className="sidebar-text">Manage Products</span>
            </a>
            <a href="#" className="menu-item flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700">
              <i className="fas fa-chart-line"></i>
              <span className="sidebar-text">Analytics</span>
            </a>
          </div>
          
          <div className="px-4 mb-6">
            <h3 className="sidebar-text text-xs uppercase font-semibold text-gray-500 mb-2">Support</h3>
            <a href="#" className="menu-item flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700">
              <i className="fas fa-wallet"></i>
              <span className="sidebar-text">Wallet</span>
            </a>
            <a href="#" className="menu-item flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700">
              <i className="fas fa-users"></i>
              <span className="sidebar-text">Mentors</span>
            </a>
            <a href="#" className="menu-item flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700">
              <i className="fas fa-leaf"></i>
              <span className="sidebar-text">Sustainability</span>
            </a>
          </div>
        </div>
        
        <div className="p-4 mt-auto border-t">
          <div className="relative">
            {/* Profile button */}
            <div 
              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2"
              onClick={toggleProfileMenu}
            >
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <i className="fas fa-user text-purple-600"></i>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">John Doe</p>
                <p className="text-xs text-gray-500 truncate">student@university.edu</p>
              </div>
              <i className={`fas fa-chevron-up text-xs text-gray-500 transition-transform ${isProfileOpen ? 'transform rotate-180' : ''}`}></i>
            </div>
            
            {/* Dropdown menu - opens upward */}
            {isProfileOpen && (
              <div 
                className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <i className="fas fa-sign-in-alt mr-3 w-5 text-center"></i>
                  <span>Login</span>
                </Link>
                <div className="border-t border-gray-100 my-1"></div>
                <Link
                  to="/register"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <i className="fas fa-user-plus mr-3 w-5 text-center"></i>
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;