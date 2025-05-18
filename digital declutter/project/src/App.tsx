import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DigitalInventoryProvider } from './contexts/DigitalInventoryContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import InventoryPage from './pages/InventoryPage';
import HealthCheckPage from './pages/HealthCheckPage';
import ProfilePage from './pages/ProfilePage';
import ItemDetailPage from './pages/ItemDetailPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <DigitalInventoryProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            
            <Route element={<Layout />}>
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/inventory" 
                element={
                  <ProtectedRoute>
                    <InventoryPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/inventory/:itemId" 
                element={
                  <ProtectedRoute>
                    <ItemDetailPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/health-check" 
                element={
                  <ProtectedRoute>
                    <HealthCheckPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
            </Route>
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </DigitalInventoryProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;