import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faStore, 
  faSearch, 
  faTags, 
  faRocket, 
  faBoxOpen, 
  faChartLine, 
  faWallet, 
  faUsers, 
  faLeaf,
  faUser
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  
  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  
  const isActive = (path) => {
    return location.pathname === path ? 'text-purple-700 bg-purple-50' : 'text-gray-700 hover:bg-gray-100';
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
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <span className="logo-text text-xl font-bold text-purple-800">UniConnect</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-4 mb-6">
            <h3 className="sidebar-text text-xs uppercase font-semibold text-gray-500 mb-2">Main</h3>
            <Link 
              to="/dashboard" 
              className={`flex items-center space-x-3 p-2 rounded-lg ${isActive('/dashboard')}`}
            >
              <FontAwesomeIcon icon={faHome} className="w-5 text-center" />
              <span>Dashboard</span>
            </Link>
          </div>
          
          <div className="px-4 mb-6">
            <h3 className="sidebar-text text-xs uppercase font-semibold text-gray-500 mb-2">Marketplace</h3>
            <Link 
              to="/products" 
              className={`flex items-center space-x-3 p-2 rounded-lg ${isActive('/products')}`}
            >
              <FontAwesomeIcon icon={faStore} className="w-5 text-center" />
              <span>Browse Products</span>
            </Link>
            <Link 
              to="/search" 
              className={`flex items-center space-x-3 p-2 rounded-lg ${isActive('/search')}`}
            >
              <FontAwesomeIcon icon={faSearch} className="w-5 text-center" />
              <span>Search</span>
            </Link>
            <Link 
              to="/categories" 
              className={`flex items-center space-x-3 p-2 rounded-lg ${isActive('/categories')}`}
            >
              <FontAwesomeIcon icon={faTags} className="w-5 text-center" />
              <span>Categories</span>
            </Link>
          </div>
          
          <div className="px-4 mb-6">
            <h3 className="sidebar-text text-xs uppercase font-semibold text-gray-500 mb-2">Startup Tools</h3>
            <Link 
              to="/register-startup" 
              className={`flex items-center space-x-3 p-2 rounded-lg ${isActive('/register-startup')}`}
            >
              <FontAwesomeIcon icon={faRocket} className="w-5 text-center" />
              <span>Register Startup</span>
            </Link>
            <Link 
              to="/manage-products" 
              className={`flex items-center space-x-3 p-2 rounded-lg ${isActive('/manage-products')}`}
            >
              <FontAwesomeIcon icon={faBoxOpen} className="w-5 text-center" />
              <span>Manage Products</span>
            </Link>
            <Link 
              to="/analytics" 
              className={`flex items-center space-x-3 p-2 rounded-lg ${isActive('/analytics')}`}
            >
              <FontAwesomeIcon icon={faChartLine} className="w-5 text-center" />
              <span>Analytics</span>
            </Link>
          </div>
          
          <div className="px-4 mb-6">
            <h3 className="sidebar-text text-xs uppercase font-semibold text-gray-500 mb-2">Support</h3>
            <Link 
              to="/wallet" 
              className={`flex items-center space-x-3 p-2 rounded-lg ${isActive('/wallet')}`}
            >
              <FontAwesomeIcon icon={faWallet} className="w-5 text-center" />
              <span>Wallet</span>
            </Link>
            <Link 
              to="/mentors" 
              className={`flex items-center space-x-3 p-2 rounded-lg ${isActive('/mentors')}`}
            >
              <FontAwesomeIcon icon={faUsers} className="w-5 text-center" />
              <span>Mentors</span>
            </Link>
            <Link 
              to="/sustainability" 
              className={`flex items-center space-x-3 p-2 rounded-lg ${isActive('/sustainability')}`}
            >
              <FontAwesomeIcon icon={faLeaf} className="w-5 text-center" />
              <span>Sustainability</span>
            </Link>
          </div>
        </div>
        
        <div className="p-4 border-t">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <i className="fas fa-user text-gray-600"></i>
            </div>
            <div className="sidebar-text">
              <p className="text-sm font-medium">Student User</p>
              <p className="text-xs text-gray-500">student@university.edu</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;