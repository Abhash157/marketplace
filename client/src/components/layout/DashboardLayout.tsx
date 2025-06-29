import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from './Header';
import Sidebar from './Sidebar';

const DashboardLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!user) {
    return null; // or loading state
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        user={user} 
        onLogout={logout} 
        toggleSidebar={toggleSidebar}
      />
      <div className="flex pt-16">
        <Sidebar 
          isOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar} 
        />
        <main className={`flex-1 p-6 overflow-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
