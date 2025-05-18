import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { HealthCheck } from '../../lib/supabase';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface HealthCheckSummaryProps {
  healthCheck: HealthCheck;
  onRunNew: () => void;
}

const HealthCheckSummary: React.FC<HealthCheckSummaryProps> = ({ healthCheck, onRunNew }) => {
  // Calculate days since check
  const daysSinceCheck = () => {
    const checkDate = new Date(healthCheck.check_date);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - checkDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Calculate health score (0-100)
  const calculateHealthScore = () => {
    if (healthCheck.total_items === 0) return 100;
    const unusedPercentage = (healthCheck.unused_items / healthCheck.total_items) * 100;
    const score = 100 - unusedPercentage;
    return Math.round(score);
  };

  const score = calculateHealthScore();

  // Get score color
  const getScoreColor = () => {
    if (score >= 80) return 'text-success-500';
    if (score >= 60) return 'text-warning-500';
    return 'text-error-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-neutral-800">
            Your Digital Health Check
          </h2>
          <p className="text-neutral-500 mt-1">
            Last checked {daysSinceCheck()} days ago on {formatDate(healthCheck.check_date)}
          </p>
        </div>
        <Button onClick={onRunNew}>Run new check</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-neutral-700">Digital Health Score</h3>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={`text-5xl font-bold mt-2 ${getScoreColor()}`}
              >
                {score}
              </motion.div>
              <p className="text-sm text-neutral-500 mt-2">
                Based on your digital footprint of {healthCheck.total_items} items
              </p>
            </div>
            
            <div className="bg-neutral-100 p-4 rounded-lg">
              <div className="text-center">
                <div className="text-xl font-semibold text-neutral-800">
                  {healthCheck.unused_items}
                </div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider mt-1">
                  Unused Items
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="text-sm font-medium text-neutral-700 uppercase tracking-wider">
              Progress Tracker
            </h4>
            <div className="h-4 w-full bg-neutral-200 rounded-full mt-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`h-full rounded-full ${
                  score >= 80 ? 'bg-success-500' :
                  score >= 60 ? 'bg-warning-500' :
                  'bg-error-500'
                }`}
              />
            </div>
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>Needs attention</span>
              <span>Well managed</span>
            </div>
          </div>
        </Card>
        
        <Card>
          <h3 className="text-lg font-medium text-neutral-700">Recommendations</h3>
          <ul className="mt-4 space-y-3">
            {healthCheck.recommendations.map((recommendation, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start"
              >
                <CheckCircle size={16} className="text-primary-500 mt-1 flex-shrink-0" />
                <span className="ml-2 text-neutral-600">{recommendation}</span>
              </motion.li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-neutral-100">
            <a href="#" className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center">
              View detailed report <ArrowRight size={14} className="ml-1" />
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HealthCheckSummary;