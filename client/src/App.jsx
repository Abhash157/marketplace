import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import QuickStats from './components/dashboard/QuickStats';
import FeaturedProducts from './components/dashboard/FeaturedProducts';
import MentorSection from './components/dashboard/MentorSection'; 
import Footer from './components/layout/Footer';
import AddFundsModal from './components/modals/AddFundsModal';
import ProductDetailModal from './components/modals/ProductDetailModal';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import BrowsePage from './pages/browse/BrowsePage';
import WalletPage from './pages/wallet/WalletPage';
import { featuredProducts } from './data/products';
import { mentors } from './data/mentors';
import ManagePage from './pages/manage/ManagePage';
import MentorsPage from './pages/mentors/MentorsPage';
import AnalyticsPage from './pages/analytics/AnalyticsPage';
import Whatsapp from './components/dashboard/Whatasapp';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addFundsModalOpen, setAddFundsModalOpen] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setProductModalOpen(true);
  };

  const addToCart = (product) => {
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-0' : 'md:ml-64'}`}>
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-6">
          {/* <WelcomeBanner /> */}
          <QuickStats openAddFundsModal={() => setAddFundsModalOpen(true)} />
          <FeaturedProducts
            products={featuredProducts}
            openProductModal={openProductModal}
            addToCart={addToCart}
          />
          <MentorSection mentors={mentors} />
          <Whatsapp />
        </main>
        <Footer />
      </div>

      <AddFundsModal
        isOpen={addFundsModalOpen}
        onClose={() => setAddFundsModalOpen(false)}
      />

      {selectedProduct && (
        <ProductDetailModal
          isOpen={productModalOpen}
          onClose={() => setProductModalOpen(false)}
          product={selectedProduct}
          addToCart={addToCart}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mentors" element={<MentorsPage />} />
          <Route path="/manage" element={<ManagePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
