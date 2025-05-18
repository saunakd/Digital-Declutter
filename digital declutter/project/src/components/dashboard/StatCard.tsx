import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';
import Card from '../ui/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  color: 'primary' | 'secondary' | 'accent' | 'success' | 'warning';
  change?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  color,
  change,
}) => {
  const colorClasses = {
    primary: 'bg-primary-100 text-primary-600',
    secondary: 'bg-secondary-100 text-secondary-600',
    accent: 'bg-accent-100 text-accent-600',
    success: 'bg-success-100 text-success-600',
    warning: 'bg-warning-100 text-warning-600',
  };

  return (
    <Card className="h-full">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${colorClasses[color]}`}>
          <Icon size={24} strokeWidth={2} />
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-neutral-500">{title}</h3>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-2xl font-semibold block mt-1">{value}</span>
          </motion.div>
          {description && (
            <p className="text-xs text-neutral-500 mt-1">{description}</p>
          )}
          {change && (
            <div className="flex items-center mt-1">
              <span className={`text-xs ${change.isPositive ? 'text-success-500' : 'text-error-500'}`}>
                {change.isPositive ? '↑' : '↓'} {Math.abs(change.value)}%
              </span>
              <span className="text-xs text-neutral-500 ml-1">vs last week</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;