import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useDigitalInventory } from '../contexts/DigitalInventoryContext';
import HealthCheckSummary from '../components/health-check/HealthCheckSummary';

const HealthCheckPage: React.FC = () => {
  const { healthChecks, createHealthCheck, loading } = useDigitalInventory();
  const [isRunningCheck, setIsRunningCheck] = useState(false);
  const [checkInProgress, setCheckInProgress] = useState(false);
  const [progressStage, setProgressStage] = useState(0);
  
  const latestHealthCheck = healthChecks.length > 0 
    ? healthChecks.sort((a, b) => new Date(b.check_date).getTime() - new Date(a.check_date).getTime())[0]
    : null;
    
  const runNewHealthCheck = async () => {
    setIsRunningCheck(true);
    setCheckInProgress(true);
    setProgressStage(0);
    
    // Simulate check progress for visual feedback
    const stages = 5;
    for (let i = 1; i <= stages; i++) {
      await new Promise(resolve => setTimeout(resolve, 700));
      setProgressStage(i);
    }
    
    await createHealthCheck();
    setIsRunningCheck(false);
    setCheckInProgress(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full py-20">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Digital Health Check</h1>
        <p className="text-neutral-500 mt-1">
          Analyze your digital footprint and get personalized recommendations
        </p>
      </div>
      
      {checkInProgress ? (
        <Card>
          <div className="py-10 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <Sparkles size={48} className="text-primary-500 animate-pulse-slow" />
                <span className="absolute -top-2 -right-2 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-primary-500"></span>
                </span>
              </div>
            </motion.div>
            
            <h2 className="text-xl font-semibold mt-6 text-neutral-800">
              Running Digital Health Check
            </h2>
            
            <p className="text-neutral-500 mt-2 text-center max-w-md">
              Analyzing your digital items, usage patterns, and identifying optimization opportunities...
            </p>
            
            <div className="w-full max-w-md mt-8 px-4">
              <div className="h-2 w-full bg-neutral-200 rounded-full">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(progressStage / 5) * 100}%` }}
                  className="h-2 bg-primary-500 rounded-full"
                  transition={{ duration: 0.5 }}
                ></motion.div>
              </div>
              
              <div className="mt-6 space-y-3">
                <CheckStage
                  stage={1}
                  currentStage={progressStage}
                  label="Scanning digital items"
                />
                <CheckStage
                  stage={2}
                  currentStage={progressStage}
                  label="Analyzing usage patterns"
                />
                <CheckStage
                  stage={3}
                  currentStage={progressStage}
                  label="Identifying redundancies"
                />
                <CheckStage
                  stage={4}
                  currentStage={progressStage}
                  label="Generating recommendations"
                />
                <CheckStage
                  stage={5}
                  currentStage={progressStage}
                  label="Finalizing report"
                />
              </div>
            </div>
          </div>
        </Card>
      ) : latestHealthCheck ? (
        <HealthCheckSummary
          healthCheck={latestHealthCheck}
          onRunNew={runNewHealthCheck}
        />
      ) : (
        <Card>
          <div className="py-10 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles size={48} className="text-primary-500" />
            </motion.div>
            
            <h2 className="text-xl font-semibold mt-6 text-neutral-800">
              No Health Checks Yet
            </h2>
            
            <p className="text-neutral-500 mt-2 text-center max-w-md">
              Run your first digital health check to analyze your digital footprint and get personalized recommendations for decluttering.
            </p>
            
            <div className="mt-8">
              <Button
                size="lg"
                onClick={runNewHealthCheck}
                isLoading={isRunningCheck}
              >
                <Sparkles size={16} className="mr-2" />
                Run Health Check
              </Button>
            </div>
          </div>
        </Card>
      )}
      
      <Card className="bg-neutral-50">
        <h2 className="text-lg font-semibold text-neutral-800">What is a Digital Health Check?</h2>
        <div className="mt-4 space-y-4 text-neutral-600">
          <p>
            A Digital Health Check provides insights into your digital footprint, helping you identify unused apps, redundant accounts, and unnecessary subscriptions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white p-4 rounded-lg shadow-soft">
              <div className="text-primary-500 mb-2">
                <Sparkles size={24} />
              </div>
              <h3 className="font-medium text-neutral-800">Identify Unused Items</h3>
              <p className="text-sm mt-1">
                Spot apps and accounts you haven't used in months and might want to reconsider.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-soft">
              <div className="text-secondary-500 mb-2">
                <Clock size={24} />
              </div>
              <h3 className="font-medium text-neutral-800">Streamline Services</h3>
              <p className="text-sm mt-1">
                Find overlap in paid subscriptions and similar services to reduce costs.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-soft">
              <div className="text-accent-500 mb-2">
                <Sparkles size={24} />
              </div>
              <h3 className="font-medium text-neutral-800">Personalized Tips</h3>
              <p className="text-sm mt-1">
                Get actionable recommendations tailored to your specific digital habits.
              </p>
            </div>
          </div>
          
          <p className="text-sm text-neutral-500 mt-6">
            Health checks are recommended once per week to maintain an organized digital life.
          </p>
        </div>
      </Card>
    </div>
  );
};

interface CheckStageProps {
  stage: number;
  currentStage: number;
  label: string;
}

const CheckStage: React.FC<CheckStageProps> = ({ stage, currentStage, label }) => {
  const isComplete = currentStage >= stage;
  const isActive = currentStage === stage;
  
  return (
    <motion.div 
      className="flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: (stage - 1) * 0.2 }}
    >
      <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
        isComplete ? 'bg-primary-100 text-primary-500' : 'bg-neutral-100 text-neutral-400'
      }`}>
        {isComplete ? (
          <motion.svg
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </motion.svg>
        ) : (
          <span className="text-xs">{stage}</span>
        )}
      </div>
      <span className={`ml-3 ${
        isActive ? 'text-primary-600 font-medium' : 
        isComplete ? 'text-neutral-800' : 'text-neutral-500'
      }`}>
        {label}
        {isActive && <span className="ml-2 animate-pulse">...</span>}
      </span>
    </motion.div>
  );
};

export default HealthCheckPage;