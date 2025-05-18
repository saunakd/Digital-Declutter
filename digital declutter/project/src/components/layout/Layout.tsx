import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { motion } from 'framer-motion';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <motion.div 
          className="fixed inset-0 z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-neutral-900 bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
          
          {/* Sidebar */}
          <motion.div 
            className="fixed inset-y-0 left-0 flex w-full max-w-xs"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3 }}
          >
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </motion.div>
        </motion.div>
      )}
      
      {/* Main content */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <Navbar onMenuClick={toggleSidebar} />
        
        <main className="relative flex-1 overflow-y-auto focus:outline-none p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;