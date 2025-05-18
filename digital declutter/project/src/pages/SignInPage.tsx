import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layers, ArrowRight, Mail, Lock, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<{ code?: string; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        let errorMessage = error.message;
        
        // Provide more user-friendly error messages
        if (error.code === 'email_not_confirmed') {
          errorMessage = 'Please check your email and click the confirmation link to verify your account. Don\'t forget to check your spam folder.';
        } else if (error.code === 'invalid_credentials') {
          errorMessage = 'Invalid email or password. Please check your credentials and try again.';
        }
        
        setError({ code: error.code, message: errorMessage });
        setIsSubmitting(false);
        return;
      }
      
      navigate('/dashboard');
    } catch (err) {
      setError({ message: 'An unexpected error occurred' });
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex">
        {/* Left side - Form */}
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
              <h1 className="text-3xl font-bold text-neutral-900">Welcome back</h1>
              <p className="mt-3 text-neutral-600">
                Sign in to access your digital inventory and health checks.
              </p>
            </motion.div>
            
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 bg-error-50 text-error-700 p-4 rounded-md border border-error-200 flex items-start"
              >
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{error.code === 'email_not_confirmed' ? 'Email Verification Required' : 'Sign In Failed'}</p>
                  <p className="mt-1 text-sm">{error.message}</p>
                </div>
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
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700">
                    Remember me
                  </label>
                </div>
                
                <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                  Forgot password?
                </a>
              </div>
              
              <Button
                type="submit"
                isLoading={isSubmitting}
                fullWidth
                size="lg"
              >
                Sign in
              </Button>
              
              <div className="text-center">
                <span className="text-neutral-600">Don't have an account?</span>
                <Link 
                  to="/signup" 
                  className="ml-1 font-medium text-primary-600 hover:text-primary-500 inline-flex items-center"
                >
                  Sign up now <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
            </motion.form>
          </div>
        </div>
        
        {/* Right side - Image */}
        <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-800 relative">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="flex flex-col justify-center items-center h-full p-12 text-white relative z-10">
            <div className="max-w-md text-center">
              <Layers className="h-16 w-16 mx-auto mb-8 text-white opacity-90" />
              <h2 className="text-3xl font-bold mb-6">Simplify Your Digital Life</h2>
              <p className="text-lg text-primary-100 mb-8">
                Track and manage your digital footprint with our intuitive tools. Declutter your apps, accounts, and devices to regain focus and peace of mind.
              </p>
              
              <div className="flex justify-center space-x-4">
                <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
                  <div className="text-3xl font-bold">200+</div>
                  <div className="text-sm text-primary-100">Apps Analyzed</div>
                </div>
                <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
                  <div className="text-3xl font-bold">40%</div>
                  <div className="text-sm text-primary-100">Less Digital Clutter</div>
                </div>
                <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
                  <div className="text-3xl font-bold">5k+</div>
                  <div className="text-sm text-primary-100">Happy Users</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;