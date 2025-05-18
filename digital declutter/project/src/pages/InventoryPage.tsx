import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, X, SlidersHorizontal } from 'lucide-react';
import { useDigitalInventory } from '../contexts/DigitalInventoryContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import DigitalItemCard from '../components/inventory/DigitalItemCard';
import ItemForm from '../components/inventory/ItemForm';
import { DigitalItem } from '../lib/supabase';

const InventoryPage: React.FC = () => {
  const { items, loading, addItem, updateItem, deleteItem } = useDigitalInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filters, setFilters] = useState({
    types: [] as string[],
    categories: [] as string[],
    importance: [] as string[],
    usageFrequency: [] as string[],
  });
  const [showFilters, setShowFilters] = useState(false);

  // Handle adding a new item
  const handleAddItem = async (formData: Omit<DigitalItem, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    setIsSubmitting(true);
    await addItem(formData);
    setIsSubmitting(false);
    setShowAddForm(false);
  };

  // Handle updating an item
  const handleUpdateItem = async (id: string, formData: Partial<DigitalItem>) => {
    setIsSubmitting(true);
    await updateItem(id, formData);
    setIsSubmitting(false);
    setEditingItem(null);
  };

  // Handle editing an item
  const handleEditItem = (id: string) => {
    setEditingItem(id);
    setShowAddForm(false);
  };

  // Handle deleting an item
  const handleDeleteItem = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await deleteItem(id);
    }
  };

  // Get unique categories, types, and importance levels for filtering
  const getUniqueValues = () => {
    const categories = new Set<string>();
    const types = new Set<string>();
    const importance = new Set<string>();
    const usageFrequency = new Set<string>();
    
    items.forEach(item => {
      if (item.category) categories.add(item.category);
      if (item.type) types.add(item.type);
      if (item.importance) importance.add(item.importance);
      if (item.usage_frequency) usageFrequency.add(item.usage_frequency);
    });
    
    return {
      categories: Array.from(categories),
      types: Array.from(types),
      importance: Array.from(importance),
      usageFrequency: Array.from(usageFrequency),
    };
  };

  // Toggle a filter value
  const toggleFilter = (filterType: 'types' | 'categories' | 'importance' | 'usageFrequency', value: string) => {
    setFilters(prev => {
      const currentFilters = [...prev[filterType]];
      const index = currentFilters.indexOf(value);
      
      if (index >= 0) {
        currentFilters.splice(index, 1);
      } else {
        currentFilters.push(value);
      }
      
      return {
        ...prev,
        [filterType]: currentFilters,
      };
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      types: [],
      categories: [],
      importance: [],
      usageFrequency: [],
    });
    setSearchTerm('');
  };

  // Filter and search items
  const filteredItems = items.filter(item => {
    // Search term filter
    const matchesSearch = searchTerm === '' || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.notes.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Type filter
    const matchesType = filters.types.length === 0 || filters.types.includes(item.type);
    
    // Category filter
    const matchesCategory = filters.categories.length === 0 || filters.categories.includes(item.category);
    
    // Importance filter
    const matchesImportance = filters.importance.length === 0 || filters.importance.includes(item.importance);
    
    // Usage frequency filter
    const matchesUsage = filters.usageFrequency.length === 0 || filters.usageFrequency.includes(item.usage_frequency);
    
    return matchesSearch && matchesType && matchesCategory && matchesImportance && matchesUsage;
  });

  const uniqueValues = getUniqueValues();
  const hasActiveFilters = Object.values(filters).some(filterArr => filterArr.length > 0) || searchTerm !== '';

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full py-20">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-neutral-900">Digital Inventory</h1>
        <Button onClick={() => {
          setShowAddForm(true);
          setEditingItem(null);
        }}>
          <Plus size={16} className="mr-1" /> Add Item
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-neutral-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name, category, or notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X size={16} className="text-neutral-400 hover:text-neutral-600" />
            </button>
          )}
        </div>
        
        <Button 
          variant="outline" 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center"
        >
          <SlidersHorizontal size={16} className="mr-1" />
          Filters
          {hasActiveFilters && (
            <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-primary-100 text-primary-700 rounded-full">
              {Object.values(filters).reduce((acc, curr) => acc + curr.length, 0) + (searchTerm ? 1 : 0)}
            </span>
          )}
        </Button>
      </div>
      
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-neutral-800">Filter Items</h3>
                <Button size="sm" variant="outline" onClick={resetFilters}>
                  Reset filters
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-neutral-700 mb-2">Type</h4>
                  <div className="space-y-1">
                    {uniqueValues.types.map(type => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.types.includes(type)}
                          onChange={() => toggleFilter('types', type)}
                          className="rounded text-primary-600 focus:ring-primary-500 mr-2"
                        />
                        <span className="text-sm capitalize">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-neutral-700 mb-2">Category</h4>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {uniqueValues.categories.map(category => (
                      <label key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.categories.includes(category)}
                          onChange={() => toggleFilter('categories', category)}
                          className="rounded text-primary-600 focus:ring-primary-500 mr-2"
                        />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-neutral-700 mb-2">Importance</h4>
                  <div className="space-y-1">
                    {uniqueValues.importance.map(imp => (
                      <label key={imp} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.importance.includes(imp)}
                          onChange={() => toggleFilter('importance', imp)}
                          className="rounded text-primary-600 focus:ring-primary-500 mr-2"
                        />
                        <span className="text-sm capitalize">{imp}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-neutral-700 mb-2">Usage Frequency</h4>
                  <div className="space-y-1">
                    {uniqueValues.usageFrequency.map(usage => (
                      <label key={usage} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.usageFrequency.includes(usage)}
                          onChange={() => toggleFilter('usageFrequency', usage)}
                          className="rounded text-primary-600 focus:ring-primary-500 mr-2"
                        />
                        <span className="text-sm capitalize">{usage}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {(showAddForm || editingItem) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <h2 className="text-xl font-semibold mb-4">
                {editingItem ? 'Edit Item' : 'Add New Digital Item'}
              </h2>
              <ItemForm
                initialData={editingItem ? items.find(item => item.id === editingItem) || {} : {}}
                onSubmit={editingItem 
                  ? (data) => handleUpdateItem(editingItem, data)
                  : handleAddItem
                }
                onCancel={() => {
                  setShowAddForm(false);
                  setEditingItem(null);
                }}
                isSubmitting={isSubmitting}
              />
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredItems.map(item => (
            <DigitalItemCard
              key={item.id}
              item={item}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Filter className="mx-auto h-12 w-12 text-neutral-300" />
          <h3 className="mt-4 text-lg font-medium text-neutral-900">No items found</h3>
          <p className="mt-1 text-neutral-500">
            {items.length === 0
              ? "You haven't added any digital items yet. Get started by adding your first item."
              : "No items match your current search or filters. Try adjusting your criteria."}
          </p>
          <div className="mt-6">
            {items.length === 0 ? (
              <Button onClick={() => setShowAddForm(true)}>
                <Plus size={16} className="mr-1" /> Add Your First Item
              </Button>
            ) : (
              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;