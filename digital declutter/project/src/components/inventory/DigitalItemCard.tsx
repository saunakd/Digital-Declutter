import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Globe, CreditCard, Computer, Calendar, Star, Trash2, Edit, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { DigitalItem } from '../../lib/supabase';

interface DigitalItemCardProps {
  item: DigitalItem;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const DigitalItemCard: React.FC<DigitalItemCardProps> = ({ item, onEdit, onDelete }) => {
  // Get icon based on item type
  const getItemIcon = () => {
    switch (item.type) {
      case 'app':
        return <Globe size={20} />;
      case 'account':
        return <Globe size={20} />;
      case 'device':
        return <Smartphone size={20} />;
      case 'subscription':
        return <CreditCard size={20} />;
      default:
        return <Computer size={20} />;
    }
  };

  // Get status color based on usage frequency
  const getStatusColor = () => {
    switch (item.usage_frequency) {
      case 'daily':
        return 'bg-success-500';
      case 'weekly':
        return 'bg-primary-500';
      case 'monthly':
        return 'bg-warning-500';
      case 'rarely':
      case 'never':
        return 'bg-error-500';
      default:
        return 'bg-neutral-500';
    }
  };

  // Get importance stars
  const getImportanceStars = () => {
    const starsTotal = 3;
    const filledStars = 
      item.importance === 'high' ? 3 : 
      item.importance === 'medium' ? 2 : 1;
    
    return Array(starsTotal).fill(0).map((_, index) => (
      <Star 
        key={index}
        size={14}
        fill={index < filledStars ? 'currentColor' : 'none'}
        className={index < filledStars ? 'text-warning-500' : 'text-neutral-300'}
      />
    ));
  };

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-card border border-neutral-100 overflow-hidden"
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className={`p-2 rounded-md bg-${item.type === 'subscription' ? 'accent' : 'primary'}-100 text-${item.type === 'subscription' ? 'accent' : 'primary'}-600`}>
              {getItemIcon()}
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-neutral-900">{item.name}</h3>
              <div className="flex items-center mt-1">
                <span className="text-sm text-neutral-500 capitalize">{item.type}</span>
                <span className="mx-2 text-neutral-300">•</span>
                <span className="text-sm text-neutral-500">{item.category}</span>
                <span className="mx-2 text-neutral-300">•</span>
                <div className="flex items-center">
                  {getImportanceStars()}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-1">
            <button 
              onClick={() => onEdit(item.id)}
              className="p-1.5 rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 transition-colors"
            >
              <Edit size={16} />
            </button>
            <button 
              onClick={() => onDelete(item.id)}
              className="p-1.5 rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-error-600 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center text-neutral-600">
            <Calendar size={14} className="mr-1.5" />
            <span className="text-neutral-500">Last used:</span>
            <span className="ml-1 font-medium">{formatDate(item.last_used_date)}</span>
          </div>
          <div className="flex items-center">
            <span className="relative flex h-3 w-3 mr-1.5">
              <span className={`animate-pulse absolute inline-flex h-full w-full rounded-full ${getStatusColor()} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${getStatusColor()}`}></span>
            </span>
            <span className="capitalize">{item.usage_frequency}</span>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-neutral-600 line-clamp-2">
          {item.notes || 'No additional notes.'}
        </div>
      </div>
      
      <div className="border-t border-neutral-100 px-5 py-3 bg-neutral-50">
        <Link
          to={`/inventory/${item.id}`}
          className="text-sm text-primary-600 hover:text-primary-800 font-medium flex items-center"
        >
          View details <ExternalLink size={14} className="ml-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default DigitalItemCard;