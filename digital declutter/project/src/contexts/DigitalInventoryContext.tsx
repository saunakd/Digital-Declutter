import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, DigitalItem, HealthCheck } from '../lib/supabase';
import { useAuth } from './AuthContext';

type DigitalInventoryContextType = {
  items: DigitalItem[];
  healthChecks: HealthCheck[];
  loading: boolean;
  error: string | null;
  addItem: (item: Omit<DigitalItem, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => Promise<void>;
  updateItem: (id: string, updates: Partial<DigitalItem>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  getItemById: (id: string) => DigitalItem | undefined;
  createHealthCheck: () => Promise<HealthCheck | null>;
  getLatestHealthCheck: () => HealthCheck | null;
  refreshItems: () => Promise<void>;
  getAnalytics: () => {
    totalItems: number;
    unusedItems: number;
    categoryCounts: Record<string, number>;
    typeCounts: Record<string, number>;
    usageFrequency: Record<string, number>;
    recentItems: DigitalItem[];
    healthScore: number;
  };
};

const DigitalInventoryContext = createContext<DigitalInventoryContextType | undefined>(undefined);

export const useDigitalInventory = () => {
  const context = useContext(DigitalInventoryContext);
  if (context === undefined) {
    throw new Error('useDigitalInventory must be used within a DigitalInventoryProvider');
  }
  return context;
};

export const DigitalInventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<DigitalItem[]>([]);
  const [healthChecks, setHealthChecks] = useState<HealthCheck[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchItems();
      fetchHealthChecks();
    } else {
      setItems([]);
      setHealthChecks([]);
      setLoading(false);
    }
  }, [user]);

  const fetchItems = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('digital_items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching items:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const fetchHealthChecks = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('health_checks')
        .select('*')
        .eq('user_id', user.id)
        .order('check_date', { ascending: false });
      
      if (error) throw error;
      
      setHealthChecks(data || []);
    } catch (error) {
      console.error('Error fetching health checks:', error);
    }
  };

  const addItem = async (item: Omit<DigitalItem, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('digital_items')
        .insert([{ ...item, user_id: user.id }])
        .select()
        .single();
      
      if (error) throw error;
      
      if (data) {
        setItems(prev => [data, ...prev]);
      }
    } catch (error) {
      console.error('Error adding item:', error);
      setError(error instanceof Error ? error.message : 'Failed to add item');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id: string, updates: Partial<DigitalItem>) => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('digital_items')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();
      
      if (error) throw error;
      
      if (data) {
        setItems(prev => prev.map(item => item.id === id ? data : item));
      }
    } catch (error) {
      console.error('Error updating item:', error);
      setError(error instanceof Error ? error.message : 'Failed to update item');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase
        .from('digital_items')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete item');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getItemById = (id: string) => {
    return items.find(item => item.id === id);
  };

  const createHealthCheck = async (): Promise<HealthCheck | null> => {
    if (!user) return null;
    
    try {
      const analytics = getAnalytics();
      const recommendations = [];
      
      if (analytics.unusedItems > 0) {
        recommendations.push(`Consider removing ${analytics.unusedItems} unused apps or subscriptions`);
      }
      
      for (const [category, count] of Object.entries(analytics.categoryCounts)) {
        if (count > 2) {
          recommendations.push(`You have ${count} items in ${category}. Consider consolidating.`);
        }
      }
      
      if (recommendations.length === 0) {
        recommendations.push('Your digital footprint looks well-managed!');
      }
      
      const { data, error } = await supabase
        .from('health_checks')
        .insert([{
          user_id: user.id,
          check_date: new Date().toISOString(),
          total_items: analytics.totalItems,
          unused_items: analytics.unusedItems,
          recommendations,
        }])
        .select()
        .single();
      
      if (error) throw error;
      
      if (data) {
        setHealthChecks(prev => [data, ...prev]);
        return data;
      }
      
      return null;
    } catch (error) {
      console.error('Error creating health check:', error);
      return null;
    }
  };

  const getLatestHealthCheck = (): HealthCheck | null => {
    if (healthChecks.length === 0) return null;
    
    return healthChecks.reduce((latest, check) => {
      return new Date(check.check_date) > new Date(latest.check_date) ? check : latest;
    }, healthChecks[0]);
  };

  const getAnalytics = () => {
    const totalItems = items.length;
    const unusedItems = items.filter(
      item => item.usage_frequency === 'rarely' || item.usage_frequency === 'never'
    ).length;

    // Calculate category counts
    const categoryCounts = items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Calculate type counts
    const typeCounts = items.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Calculate usage frequency
    const usageFrequency = items.reduce((acc, item) => {
      acc[item.usage_frequency] = (acc[item.usage_frequency] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Get recent items
    const recentItems = [...items]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5);

    // Calculate health score (0-100)
    const healthScore = totalItems === 0 ? 100 : Math.round(((totalItems - unusedItems) / totalItems) * 100);

    return {
      totalItems,
      unusedItems,
      categoryCounts,
      typeCounts,
      usageFrequency,
      recentItems,
      healthScore,
    };
  };

  const refreshItems = async () => {
    await fetchItems();
  };

  const value = {
    items,
    healthChecks,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    getItemById,
    createHealthCheck,
    getLatestHealthCheck,
    refreshItems,
    getAnalytics,
  };

  return (
    <DigitalInventoryContext.Provider value={value}>
      {children}
    </DigitalInventoryContext.Provider>
  );
};