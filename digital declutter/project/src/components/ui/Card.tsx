import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'small' | 'normal' | 'large';
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'normal',
  hoverable = false,
}) => {
  const paddingClasses = {
    none: 'p-0',
    small: 'p-3',
    normal: 'p-5',
    large: 'p-6',
  };

  const hoverClasses = hoverable 
    ? 'transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg' 
    : '';

  return (
    <div 
      className={`
        bg-white rounded-lg shadow-card border border-neutral-100
        ${paddingClasses[padding]}
        ${hoverClasses}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;