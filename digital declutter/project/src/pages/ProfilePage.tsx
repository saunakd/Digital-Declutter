import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Download, LogOut, Bell } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { useDigitalInventory } from '../contexts/DigitalInventoryContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { user, signOut } = useAuth();
  const { items } = useDigitalInventory();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  
  const exportData = () => {
    const exportData = {
      user: {
        email: user?.email,
        createdAt: user?.created_at,
      },
      items,
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'digital-declutter-export.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Account Settings</h1>
        <p className="text-neutral-500 mt-1">
          Manage your account and preferences
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card className="overflow-hidden">
            <nav className="space-y-1">
              <NavItem
                icon={User}
                label="Profile"
                isActive={activeTab === 'profile'}
                onClick={() => setActiveTab('profile')}
              />
              <NavItem
                icon={Shield}
                label="Security"
                isActive={activeTab === 'security'}
                onClick={() => setActiveTab('security')}
              />
              <NavItem
                icon={Bell}
                label="Notifications"
                isActive={activeTab === 'notifications'}
                onClick={() => setActiveTab('notifications')}
              />
              <NavItem
                icon={Download}
                label="Data Export"
                isActive={activeTab === 'export'}
                onClick={() => setActiveTab('export')}
              />
            </nav>
          </Card>
          
          <div className="mt-6">
            <Button 
              variant="outline" 
              fullWidth
              className="justify-start text-error-600 hover:bg-error-50 hover:border-error-300"
              onClick={handleSignOut}
            >
              <LogOut size={16} className="mr-2" />
              Sign out
            </Button>
          </div>
        </div>
        
        {/* Main content */}
        <div className="md:col-span-3">
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <h2 className="text-lg font-semibold text-neutral-800 mb-6">Profile Information</h2>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                      Email address
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <div className="relative flex items-stretch flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail size={16} className="text-neutral-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          value={user?.email || ''}
                          disabled
                          className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-neutral-300 rounded-md bg-neutral-50"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
                      Display name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="name"
                        defaultValue={user?.email?.split('@')[0] || ''}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-neutral-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button>Save changes</Button>
                  </div>
                </div>
              </Card>
              
              <Card className="mt-6">
                <h2 className="text-lg font-semibold text-neutral-800 mb-6">Account Statistics</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-neutral-900">{items.length}</div>
                    <div className="text-sm text-neutral-500">Digital items</div>
                  </div>
                  
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-neutral-900">
                      {new Date(user?.created_at || '').toLocaleDateString()}
                    </div>
                    <div className="text-sm text-neutral-500">Member since</div>
                  </div>
                  
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-neutral-900">
                      {items.filter(item => item.usage_frequency === 'rarely' || item.usage_frequency === 'never').length}
                    </div>
                    <div className="text-sm text-neutral-500">Unused items</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
          
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <h2 className="text-lg font-semibold text-neutral-800 mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-medium text-neutral-800">Change password</h3>
                    <p className="text-sm text-neutral-500 mt-1 mb-4">
                      Update your password to keep your account secure.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="current-password" className="block text-sm font-medium text-neutral-700">
                          Current password
                        </label>
                        <input
                          type="password"
                          id="current-password"
                          className="mt-1 shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-neutral-300 rounded-md"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="new-password" className="block text-sm font-medium text-neutral-700">
                          New password
                        </label>
                        <input
                          type="password"
                          id="new-password"
                          className="mt-1 shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-neutral-300 rounded-md"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-neutral-700">
                          Confirm new password
                        </label>
                        <input
                          type="password"
                          id="confirm-password"
                          className="mt-1 shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-neutral-300 rounded-md"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Button>Update password</Button>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-neutral-200">
                    <h3 className="text-base font-medium text-neutral-800">Two-factor authentication</h3>
                    <p className="text-sm text-neutral-500 mt-1 mb-4">
                      Add an extra layer of security to your account.
                    </p>
                    
                    <Button variant="outline">Enable two-factor authentication</Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
          
          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <h2 className="text-lg font-semibold text-neutral-800 mb-6">Notification Preferences</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-medium text-neutral-800">Email notifications</h3>
                    <p className="text-sm text-neutral-500 mt-1 mb-4">
                      Choose what types of email notifications you'd like to receive.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="health-check"
                            name="health-check"
                            type="checkbox"
                            defaultChecked
                            className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-neutral-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="health-check" className="font-medium text-neutral-700">
                            Health check reminders
                          </label>
                          <p className="text-neutral-500">
                            Receive weekly reminders to run your digital health check.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="recommendations"
                            name="recommendations"
                            type="checkbox"
                            defaultChecked
                            className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-neutral-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="recommendations" className="font-medium text-neutral-700">
                            Declutter recommendations
                          </label>
                          <p className="text-neutral-500">
                            Get notified about new recommendations to simplify your digital life.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="newsletter"
                            name="newsletter"
                            type="checkbox"
                            defaultChecked
                            className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-neutral-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="newsletter" className="font-medium text-neutral-700">
                            Product updates
                          </label>
                          <p className="text-neutral-500">
                            Receive updates about new features and improvements.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-neutral-200">
                    <h3 className="text-base font-medium text-neutral-800">Frequency</h3>
                    <p className="text-sm text-neutral-500 mt-1 mb-4">
                      Control how often you receive notifications.
                    </p>
                    
                    <div className="max-w-xs">
                      <select
                        id="frequency"
                        name="frequency"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-neutral-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                        defaultValue="weekly"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button>Save preferences</Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
          
          {activeTab === 'export' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <h2 className="text-lg font-semibold text-neutral-800 mb-6">Data Export</h2>
                
                <div className="space-y-6">
                  <p className="text-neutral-600">
                    Export your digital inventory and account information in JSON format.
                    This will include all your items, categories, and usage data.
                  </p>
                  
                  <div className="bg-neutral-50 p-4 rounded-md border border-neutral-200">
                    <h3 className="text-base font-medium text-neutral-800">Export includes:</h3>
                    <ul className="mt-2 space-y-1 text-sm text-neutral-600 list-disc list-inside">
                      <li>Account information</li>
                      <li>Digital inventory (all items and their details)</li>
                      <li>Health check history</li>
                      <li>Usage statistics</li>
                    </ul>
                  </div>
                  
                  <div className="pt-4">
                    <Button onClick={exportData}>
                      <Download size={16} className="mr-2" />
                      Export data
                    </Button>
                    <p className="mt-2 text-xs text-neutral-500">
                      Your data will be downloaded as a JSON file that you can store or import later.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="mt-6 border-error-100">
                <h2 className="text-lg font-semibold text-error-600 mb-6">Delete Account</h2>
                
                <div className="space-y-4">
                  <p className="text-neutral-600">
                    Permanently delete your account and all of your data. This action cannot be undone.
                  </p>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="confirm-delete"
                        name="confirm-delete"
                        type="checkbox"
                        className="focus:ring-error-500 h-4 w-4 text-error-600 border-neutral-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="confirm-delete" className="font-medium text-neutral-700">
                        I understand this action is permanent
                      </label>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button
                      variant="outline"
                      className="text-error-600 border-error-300 hover:bg-error-50"
                    >
                      Delete my account
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ComponentType<any>;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-3 w-full ${
        isActive 
          ? 'bg-primary-50 text-primary-700' 
          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
      }`}
    >
      <Icon 
        size={18} 
        className={isActive ? 'text-primary-600' : 'text-neutral-500'} 
      />
      <span className="ml-3 font-medium">{label}</span>
      
      {isActive && (
        <div className="ml-auto w-1.5 h-6 bg-primary-600 rounded-full" />
      )}
    </button>
  );
};

export default ProfilePage;