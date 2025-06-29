import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';

function AdminPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 w-full">
        <Header
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          navigate={navigate}
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          <p>Admin dashboard content goes here.</p>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
