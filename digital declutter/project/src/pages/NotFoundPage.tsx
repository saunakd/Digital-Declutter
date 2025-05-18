import React from 'react';
import { Link } from 'react-router-dom';
import { Frown, Home, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Frown size={64} className="text-neutral-300 mb-6" />
      <h1 className="text-4xl font-bold text-neutral-900 mb-2">404</h1>
      <p className="text-xl text-neutral-600 mb-8">Page not found</p>
      <p className="text-neutral-500 max-w-md text-center mb-8">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button as={Link} to="/" variant="outline">
          <Home size={16} className="mr-2" />
          Go to Homepage
        </Button>
        <Button as="button" onClick={() => window.history.back()}>
          <ArrowLeft size={16} className="mr-2" />
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;