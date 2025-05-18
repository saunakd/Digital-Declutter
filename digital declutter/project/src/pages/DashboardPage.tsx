import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Globe, CreditCard, Clock, Bolt, BarChart2 } from 'lucide-react';
import Card from '../components/ui/Card';
import StatCard from '../components/dashboard/StatCard';
import { useDigitalInventory } from '../contexts/DigitalInventoryContext';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { DigitalItem } from '../lib/supabase';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { healthChecks, loading, createHealthCheck, getAnalytics } = useDigitalInventory();
  const [runningCheck, setRunningCheck] = React.useState(false);
  const [showAnalytics, setShowAnalytics] = React.useState(true);
  
  const latestHealthCheck = healthChecks.length > 0 
    ? healthChecks.sort((a, b) => new Date(b.check_date).getTime() - new Date(a.check_date).getTime())[0]
    : null;
  
  const runHealthCheck = async () => {
    setRunningCheck(true);
    await createHealthCheck();
    setRunningCheck(false);
  };

  const analytics = getAnalytics();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full py-20">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Welcome back, {user?.email?.split('@')[0]}</h1>
          <p className="text-neutral-500 mt-1">Here's an overview of your digital footprint</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          {latestHealthCheck ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-neutral-600">
                Last health check: {new Date(latestHealthCheck.check_date).toLocaleDateString()}
              </span>
              <Button
                size="sm"
                variant="secondary"
                onClick={runHealthCheck}
                isLoading={runningCheck}
              >
                Run check
              </Button>
            </div>
          ) : (
            <Button
              variant="secondary"
              onClick={runHealthCheck}
              isLoading={runningCheck}
            >
              Run your first health check
            </Button>
          )}
        </div>
      </div>
      
      {latestHealthCheck && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center">
                  <Bolt size={24} className="mr-2" />
                  <h2 className="text-xl font-semibold">Digital Health Score</h2>
                </div>
                <p className="mt-1 text-primary-100">
                  Based on your {analytics.totalItems} digital items
                </p>
              </div>
              
              <div className="flex items-center">
                <div className="text-4xl font-bold">
                  {analytics.healthScore}%
                </div>
                <div className="ml-4">
                  <Link to="/health-check">
                    <Button size="sm" className="bg-white text-primary-700 hover:bg-primary-50">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="h-2 bg-primary-500 bg-opacity-30 rounded-full">
                <div 
                  className="h-2 bg-white rounded-full" 
                  style={{ width: `${analytics.healthScore}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between mt-2 text-sm text-primary-100">
                <span>Needs attention</span>
                <span>Optimized</span>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Apps"
          value={analytics.typeCounts['app'] || 0}
          icon={Globe}
          color="primary"
        />
        <StatCard
          title="Accounts"
          value={analytics.typeCounts['account'] || 0}
          icon={Globe}
          color="secondary"
        />
        <StatCard
          title="Subscriptions"
          value={analytics.typeCounts['subscription'] || 0}
          icon={CreditCard}
          color="accent"
        />
        <StatCard
          title="Devices"
          value={analytics.typeCounts['device'] || 0}
          icon={Smartphone}
          color="success"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-neutral-800">Usage Overview</h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowAnalytics(!showAnalytics)}
                  className={`text-sm font-medium transition-colors ${
                    showAnalytics ? 'text-primary-600' : 'text-neutral-500'
                  }`}
                >
                  {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
                </button>
                <Link to="/inventory" className="text-sm text-primary-600 hover:text-primary-700">
                  View all
                </Link>
              </div>
            </div>
            
            {showAnalytics && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                  <UsageItem label="Daily" count={analytics.usageFrequency['daily'] || 0} color="success" />
                  <UsageItem label="Weekly" count={analytics.usageFrequency['weekly'] || 0} color="primary" />
                  <UsageItem label="Monthly" count={analytics.usageFrequency['monthly'] || 0} color="secondary" />
                  <UsageItem label="Rarely" count={analytics.usageFrequency['rarely'] || 0} color="warning" />
                  <UsageItem label="Never" count={analytics.usageFrequency['never'] || 0} color="error" />
                </div>
              </motion.div>
            )}
            
            <div className="mt-6 pt-4 border-t border-neutral-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-500">
                  Unused or rarely used items: {analytics.unusedItems}
                </span>
                <Link to="/inventory" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                  Review items
                </Link>
              </div>
            </div>
          </Card>
        </div>
        
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-neutral-800">Recent Activity</h2>
            <Button size="sm" variant="outline" as={Link} to="/inventory">
              Add New
            </Button>
          </div>
          
          <div className="space-y-4">
            {analytics.recentItems.length > 0 ? (
              analytics.recentItems.map((item: DigitalItem) => (
                <Link key={item.id} to={`/inventory/${item.id}`}>
                  <div className="flex items-start p-3 hover:bg-neutral-50 rounded-md transition-colors">
                    <div className="h-8 w-8 rounded-md bg-primary-100 text-primary-600 flex items-center justify-center mr-3">
                      {item.type === 'app' && <Globe size={16} />}
                      {item.type === 'account' && <Globe size={16} />}
                      {item.type === 'device' && <Smartphone size={16} />}
                      {item.type === 'subscription' && <CreditCard size={16} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-neutral-900 truncate">{item.name}</p>
                        <div className={`text-xs px-2 py-0.5 rounded-full ${
                          item.usage_frequency === 'daily' ? 'bg-success-100 text-success-700' :
                          item.usage_frequency === 'weekly' ? 'bg-primary-100 text-primary-700' :
                          item.usage_frequency === 'monthly' ? 'bg-secondary-100 text-secondary-700' :
                          'bg-neutral-100 text-neutral-700'
                        }`}>
                          {item.usage_frequency}
                        </div>
                      </div>
                      <p className="text-xs text-neutral-500 mt-1">
                        Added on {new Date(item.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-8">
                <Globe className="mx-auto h-12 w-12 text-neutral-300" />
                <p className="mt-2 text-neutral-500">No items added yet</p>
                <div className="mt-4">
                  <Link to="/inventory">
                    <Button size="sm">Add your first item</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
      
      <Card className="bg-gradient-to-r from-accent-100 to-neutral-100 border-none">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-neutral-900">Ready for a deeper analysis?</h3>
            <p className="text-neutral-600">
              Get personalized insights about your digital footprint.
            </p>
          </div>
          <Button as={Link} to="/health-check">
            Run Health Check
          </Button>
        </div>
      </Card>
    </div>
  );
};

interface UsageItemProps {
  label: string;
  count: number;
  color: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
}

const UsageItem: React.FC<UsageItemProps> = ({ label, count, color }) => {
  const colorClasses = {
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-secondary-100 text-secondary-800',
    accent: 'bg-accent-100 text-accent-800',
    success: 'bg-success-100 text-success-800',
    warning: 'bg-warning-100 text-warning-800',
    error: 'bg-error-100 text-error-800',
  };
  
  return (
    <div className={`p-4 rounded-lg ${colorClasses[color]} text-center`}>
      <div className="text-2xl font-bold">{count}</div>
      <div className="text-sm mt-1">{label}</div>
    </div>
  );
};

export default DashboardPage;