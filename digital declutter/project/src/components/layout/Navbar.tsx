import React from 'react';
import { Menu, Bell, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { user, signOut } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  
  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <header className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow-sm">
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex items-center">
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 focus:outline-none"
            onClick={onMenuClick}
          >
            <Menu size={24} />
          </button>
          
          <h1 className="hidden md:block text-lg font-semibold text-primary-600 ml-2">
            Digital Declutter
          </h1>
        </div>
        
        <div className="ml-4 flex items-center md:ml-6">
          {/* Notification button */}
          <button
            type="button"
            className="p-2 rounded-full text-neutral-600 hover:text-neutral-900 focus:outline-none"
          >
            <Bell size={20} />
          </button>
          
          {/* Profile dropdown */}
          <div className="ml-3 relative">
            <div>
              <button
                type="button"
                className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none"
                onClick={toggleProfileMenu}
              >
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                  <User size={18} />
                </div>
              </button>
            </div>
            
            {showProfileMenu && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <span className="block px-4 py-2 text-sm text-neutral-700 border-b">
                    {user?.email}
                  </span>
                  
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    Your Profile
                  </Link>
                  
                  <button
                    onClick={() => {
                      signOut();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;