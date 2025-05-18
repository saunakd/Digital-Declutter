import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Edit, Trash2, Calendar, Clock, Star, Smartphone, Globe, CreditCard, ArrowLeft } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useDigitalInventory } from '../contexts/DigitalInventoryContext';
import ItemForm from '../components/inventory/ItemForm';

const ItemDetailPage: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const { getItemById, updateItem, deleteItem } = useDigitalInventory();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const item = getItemById(itemId || '');
  
  if (!item) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl text-neutral-300 mb-4">404</div>
        <h2 className="text-xl font-semibold text-neutral-800 mb-2">Item Not Found</h2>
        <p className="text-neutral-600 mb-6">The item you're looking for doesn't exist or has been removed.</p>
        <Link to="/inventory">
          <Button variant="outline">
            <ArrowLeft size={16} className="mr-2" />
            Back to Inventory
          </Button>
        </Link>
      </div>
    );
  }
  
  const handleUpdateItem = async (formData: any) => {
    setIsSubmitting(true);
    await updateItem(item.id, formData);
    setIsSubmitting(false);
    setIsEditing(false);
  };
  
  const handleDeleteItem = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await deleteItem(item.id);
      navigate('/inventory');
    }
  };
  
  // Get icon based on item type
  const getItemIcon = () => {
    switch (item.type) {
      case 'app':
        return <Globe size={24} />;
      case 'account':
        return <Globe size={24} />;
      case 'device':
        return <Smartphone size={24} />;
      case 'subscription':
        return <CreditCard size={24} />;
      default:
        return <Globe size={24} />;
    }
  };
  
  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  // Get importance stars
  const renderImportanceStars = () => {
    const starsTotal = 3;
    const filledStars = 
      item.importance === 'high' ? 3 : 
      item.importance === 'medium' ? 2 : 1;
    
    return Array(starsTotal).fill(0).map((_, index) => (
      <Star 
        key={index}
        size={16}
        fill={index < filledStars ? 'currentColor' : 'none'}
        className={index < filledStars ? 'text-warning-500' : 'text-neutral-300'}
      />
    ));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate('/inventory')}
          className="mr-4"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-neutral-900">{item.name}</h1>
      </div>
      
      {isEditing ? (
        <Card>
          <h2 className="text-xl font-semibold mb-4">Edit Item</h2>
          <ItemForm
            initialData={item}
            onSubmit={handleUpdateItem}
            onCancel={() => setIsEditing(false)}
            isSubmitting={isSubmitting}
          />
        </Card>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card>
            <div className="flex justify-between items-start">
              <div className="flex">
                <div className={`p-3 rounded-md bg-${item.type === 'subscription' ? 'accent' : 'primary'}-100 text-${item.type === 'subscription' ? 'accent' : 'primary'}-600`}>
                  {getItemIcon()}
                </div>
                <div className="ml-4">
                  <div className="flex items-center">
                    <h2 className="text-2xl font-semibold text-neutral-900">{item.name}</h2>
                    <div className={`ml-3 text-xs px-2 py-0.5 rounded-full ${
                      item.usage_frequency === 'daily' ? 'bg-success-100 text-success-700' :
                      item.usage_frequency === 'weekly' ? 'bg-primary-100 text-primary-700' :
                      item.usage_frequency === 'monthly' ? 'bg-secondary-100 text-secondary-700' :
                      'bg-neutral-100 text-neutral-700'
                    }`}>
                      {item.usage_frequency}
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-2 text-neutral-500">
                    <span className="capitalize">{item.type}</span>
                    <span className="mx-2">•</span>
                    <span>{item.category}</span>
                    {item.platform && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{item.platform}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsEditing(true)}
                >
                  <Edit size={16} className="mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-error-600 hover:bg-error-50 hover:border-error-300"
                  onClick={handleDeleteItem}
                >
                  <Trash2 size={16} className="mr-1" />
                  Delete
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                    Last Used
                  </h3>
                  <div className="mt-1 flex items-center">
                    <Calendar size={16} className="text-neutral-400 mr-2" />
                    <span className="text-neutral-900">
                      {formatDate(item.last_used_date)}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                    Usage Frequency
                  </h3>
                  <div className="mt-1 flex items-center">
                    <Clock size={16} className="text-neutral-400 mr-2" />
                    <span className="text-neutral-900 capitalize">
                      {item.usage_frequency}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                    Importance
                  </h3>
                  <div className="mt-1 flex items-center">
                    <div className="flex">
                      {renderImportanceStars()}
                    </div>
                    <span className="ml-2 text-neutral-900 capitalize">
                      {item.importance}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                  Notes
                </h3>
                <div className="mt-2 p-4 bg-neutral-50 rounded-md min-h-[120px]">
                  {item.notes || 'No additional notes.'}
                </div>
                
                <div className="mt-4 text-sm text-neutral-500">
                  <div>Added on {formatDate(item.created_at)}</div>
                  <div>Last updated on {formatDate(item.updated_at)}</div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
      
      <Card className="bg-neutral-50">
        <h3 className="font-medium text-neutral-800">Usage Insights</h3>
        <p className="text-neutral-600 mt-2">
          This section will show usage patterns, recommendations, and related digital items.
          {item.usage_frequency === 'rarely' || item.usage_frequency === 'never' ? (
            <span className="block mt-2 text-error-600">
              This item is used {item.usage_frequency}. Consider removing it to simplify your digital footprint.
            </span>
          ) : null}
        </p>
      </Card>
    </div>
  );
};

export default ItemDetailPage;