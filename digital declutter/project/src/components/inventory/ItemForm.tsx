import React, { useState } from 'react';
import { DigitalItem } from '../../lib/supabase';
import Button from '../ui/Button';

interface ItemFormProps {
  initialData?: Partial<DigitalItem>;
  onSubmit: (formData: Omit<DigitalItem, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const ItemForm: React.FC<ItemFormProps> = ({
  initialData = {},
  onSubmit,
  onCancel,
  isSubmitting,
}) => {
  const [formData, setFormData] = useState<Omit<DigitalItem, 'id' | 'created_at' | 'updated_at' | 'user_id'>>({
    name: initialData.name || '',
    type: initialData.type || 'app',
    category: initialData.category || '',
    last_used_date: initialData.last_used_date || new Date().toISOString().split('T')[0],
    usage_frequency: initialData.usage_frequency || 'daily',
    importance: initialData.importance || 'medium',
    platform: initialData.platform || '',
    notes: initialData.notes || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const categoryOptions = [
    'Entertainment', 'Productivity', 'Social Media', 'Shopping',
    'Finance', 'Health', 'Education', 'Gaming', 'Professional', 'Other'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          placeholder="e.g., Netflix, Gmail, iPhone 13"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-neutral-700">
            Type *
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="app">App</option>
            <option value="account">Account</option>
            <option value="device">Device</option>
            <option value="subscription">Subscription</option>
          </select>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-neutral-700">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="" disabled>Select a category</option>
            {categoryOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="last_used_date" className="block text-sm font-medium text-neutral-700">
            Last Used Date
          </label>
          <input
            type="date"
            id="last_used_date"
            name="last_used_date"
            value={formData.last_used_date ? formData.last_used_date.toString().split('T')[0] : ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label htmlFor="usage_frequency" className="block text-sm font-medium text-neutral-700">
            Usage Frequency *
          </label>
          <select
            id="usage_frequency"
            name="usage_frequency"
            value={formData.usage_frequency}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="rarely">Rarely</option>
            <option value="never">Never</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="importance" className="block text-sm font-medium text-neutral-700">
            Importance *
          </label>
          <select
            id="importance"
            name="importance"
            value={formData.importance}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div>
          <label htmlFor="platform" className="block text-sm font-medium text-neutral-700">
            Platform
          </label>
          <input
            type="text"
            id="platform"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            placeholder="e.g., iOS, Android, Web"
          />
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-neutral-700">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          value={formData.notes}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          placeholder="Additional details about this item..."
        />
      </div>

      <div className="flex justify-end space-x-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          isLoading={isSubmitting}
        >
          {initialData.id ? 'Update' : 'Add'} Item
        </Button>
      </div>
    </form>
  );
};

export default ItemForm;