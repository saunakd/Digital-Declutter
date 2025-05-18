import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layers, BarChart2, Sparkles, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Layers,
      title: 'Visual Inventory',
      description: 'Track all your digital accounts, apps, and devices in one organized dashboard.'
    },
    {
      icon: Sparkles,
      title: 'Digital Health Check',
      description: 'Get weekly reports on your digital footprint and personalized recommendations.'
    },
    {
      icon: BarChart2,
      title: 'Usage Analytics',
      description: 'Visualize your digital habits and identify opportunities to simplify.'
    },
    {
      icon: CheckCircle,
      title: 'Action Plans',
      description: 'Follow guided steps to declutter your digital life and regain focus.'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col"
    >
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Layers className="text-primary-600 h-6 w-6 mr-2" />
            <span className="text-xl font-semibold text-neutral-900">Digital Declutter</span>
          </div>
          <div>
            {user ? (
              <Link to="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/signin">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button>Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Simplify Your Digital Life
              </h1>
              <p className="mt-6 text-lg text-primary-100 leading-relaxed">
                Discover, organize, and declutter your digital footprint. Track your apps, accounts, 
                and devices in one place and get personalized recommendations to simplify your online life.
              </p>
              <div className="mt-8">
                <Link to={user ? '/dashboard' : '/signup'}>
                  <Button size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
                    {user ? 'Go to Dashboard' : 'Start Decluttering Now'}
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="hidden md:block"
            >
              {/* Placeholder for hero image - in a real app, this would be an actual image */}
              <div className="bg-primary-500 bg-opacity-30 rounded-lg h-96 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600 opacity-20"></div>
                <div className="relative flex flex-col items-center p-8">
                  <div className="w-72 h-48 bg-white rounded-lg shadow-lg mb-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-10 bg-neutral-100 border-b flex items-center px-3">
                      <div className="flex space-x-1.5">
                        <div className="w-3 h-3 rounded-full bg-error-500"></div>
                        <div className="w-3 h-3 rounded-full bg-warning-500"></div>
                        <div className="w-3 h-3 rounded-full bg-success-500"></div>
                      </div>
                    </div>
                    <div className="pt-12 px-4 grid grid-cols-3 gap-2">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-16 bg-primary-100 rounded-md"></div>
                      ))}
                    </div>
                  </div>
                  <div className="w-48 h-28 bg-white rounded-lg shadow-lg transform -rotate-6 absolute bottom-12 -right-4"></div>
                  <div className="w-32 h-40 bg-white rounded-lg shadow-lg transform rotate-12 absolute -left-2 top-24"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900">Why Digital Declutter?</h2>
            <p className="mt-4 text-lg text-neutral-600 max-w-3xl mx-auto">
              Regain control of your digital life with tools designed to help you understand,
              organize, and optimize your online presence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="rounded-full bg-primary-100 w-12 h-12 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Ready to simplify your digital life?</h2>
          <p className="mt-4 text-secondary-100 max-w-xl mx-auto">
            Join thousands of users who have decluttered their digital footprint and reclaimed
            their focus and peace of mind.
          </p>
          <div className="mt-8">
            <Link to={user ? '/dashboard' : '/signup'}>
              <Button 
                size="lg"
                className="bg-white text-secondary-700 hover:bg-secondary-50"
              >
                {user ? 'Go to Dashboard' : 'Get Started for Free'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center text-white mb-4">
                <Layers className="h-6 w-6 mr-2" />
                <span className="text-xl font-semibold">Digital Declutter</span>
              </div>
              <p className="text-sm">
                Your companion for a simpler, more intentional digital life.
              </p>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-medium mb-4">Features</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Visual Inventory</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Digital Health Check</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Usage Analytics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Action Plans</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-medium mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guides</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neutral-800 mt-12 pt-8 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} Digital Declutter. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default HomePage;