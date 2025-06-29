// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './contexts/AuthContext';
// import LoginPage from './pages/auth/LoginPage';
// import RegisterPage from './pages/auth/RegisterPage';
// import DashboardLayout from './components/layout/DashboardLayout';
// import WelcomeBanner from './components/dashboard/WelcomeBanner';

// // Protected Route wrapper
// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const { isAuthenticated, loading } = useAuth();

//   if (loading) {
//     return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
//   }

//   return isAuthenticated ? (
//     <DashboardLayout>{children}</DashboardLayout>
//   ) : (
//     <Navigate to="/login" replace />
//   );
// };

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/register" element={<RegisterPage />} />
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <div className="space-y-6">
//               <WelcomeBanner />
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//                 {/* Add your dashboard components here */}
//               </div>
//             </div>
//           </ProtectedRoute>
//         }
//       />
//       <Route path="/" element={<Navigate to="/dashboard" replace />} />
//       <Route path="*" element={<Navigate to="/dashboard" replace />} />
//     </Routes>
//   );
// };

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <AppRoutes />
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;
