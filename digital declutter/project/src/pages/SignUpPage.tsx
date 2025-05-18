import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layers, ArrowRight, Mail, Lock, User, Check } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      const { error } = await signUp(email, password);
      
      if (error) {
        setError(error.message || 'Failed to sign up');
        setIsSubmitting(false);
        return;
      }
      
      navigate('/dashboard');
    } catch (err) {
      setError('An unexpected error occurred');
      setIsSubmitting(false);
    }
  };
  
  const features = [
    'Track all your apps, accounts, and devices',
    'Get weekly health checks and insights',
    'Identify unused services and subscriptions',
    'Personalized decluttering recommendations',
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex">
        {/* Left side - Image */}
        <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-secondary-500 to-secondary-700 relative">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="flex flex-col justify-center items-center h-full p-12 text-white relative z-10">
            <div className="max-w-md">
              <Layers className="h-16 w-16 mb-8 text-white opacity-90" />
              <h2 className="text-3xl font-bold mb-6">Begin Your Digital Decluttering Journey</h2>
              <p className="text-lg text-secondary-100 mb-8">
                Join thousands of users who have simplified their digital lives and reclaimed their time and focus.
              </p>
              
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                      <Check size={14} className="text-white" />
                    </div>
                    <span className="ml-3">{feature}</span>
                  </motion.li>
                ))}
              </ul>
              
              <div className="mt-10 p-6 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm">
                <blockquote className="italic text-secondary-100">
                  "Digital Declutter helped me identify 12 unused subscriptions, saving me over $200 per month and reducing my digital stress!"
                </blockquote>
                <div className="mt-4 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-secondary-300 flex items-center justify-center text-secondary-800">
                    <User size={20} />
                  </div>
                  <div className="ml-3">
                    <div className="text-white font-medium">Sarah J.</div>
                    <div className="text-secondary-200 text-sm">Product Designer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-4 sm:p-8 lg:p-12">
          <div className="max-w-md w-full mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link to="/" className="flex items-center mb-12">
                <Layers className="h-8 w-8 text-primary-600" />
                <span className="ml-2 text-2xl font-semibold text-neutral-900">Digital Declutter</span>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h1 className="text-3xl font-bold text-neutral-900">Create your account</h1>
              <p className="mt-3 text-neutral-600">
                Start tracking and decluttering your digital footprint.
              </p>
            </motion.div>
            
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 bg-error-50 text-error-700 p-3 rounded-md border border-error-200"
              >
                {error}
              </motion.div>
            )}
            
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="mt-6 space-y-6"
            >
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-neutral-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-neutral-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="••••••••"
                  />
                </div>
                <p className="mt-1 text-sm text-neutral-500">
                  Must be at least 8 characters
                </p>
              </div>
              
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-neutral-700">
                  I agree to the{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-500">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-500">
                    Privacy Policy
                  </a>
                </label>
              </div>
              
              <Button
                type="submit"
                isLoading={isSubmitting}
                fullWidth
                size="lg"
              >
                Create account
              </Button>
              
              <div className="text-center">
                <span className="text-neutral-600">Already have an account?</span>
                <Link 
                  to="/signin" 
                  className="ml-1 font-medium text-primary-600 hover:text-primary-500 inline-flex items-center"
                >
                  Sign in <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;