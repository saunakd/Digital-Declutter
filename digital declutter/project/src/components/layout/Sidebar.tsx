import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, LayoutDashboard, Database, BarChart2, Settings, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Digital Inventory', href: '/inventory', icon: Database },
    { name: 'Health Check', href: '/health-check', icon: Sparkles },
    { name: 'Analytics', href: '/analytics', icon: BarChart2 },
    { name: 'Settings', href: '/profile', icon: Settings },
  ];

  return (
    <div className="flex flex-col w-64 bg-primary-700 text-white h-full">
      <div className="flex items-center justify-between h-16 px-4 border-b border-primary-600">
        <div className="flex items-center">
          <span className="text-xl font-semibold">Digital Declutter</span>
        </div>
        
        {onClose && (
          <button
            type="button"
            className="md:hidden text-primary-200 hover:text-white focus:outline-none"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        )}
      </div>
      
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <nav className="mt-5 flex-1 px-3 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => 
                `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  isActive 
                    ? 'bg-primary-800 text-white' 
                    : 'text-primary-100 hover:bg-primary-600'
                }`
              }
              onClick={onClose}
            >
              {({ isActive }) => (
                <>
                  <item.icon 
                    size={20} 
                    className={`mr-3 ${isActive ? 'text-white' : 'text-primary-300'}`} 
                  />
                  <span>{item.name}</span>
                  
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute left-0 w-1 h-6 bg-accent-400 rounded-r-md"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;