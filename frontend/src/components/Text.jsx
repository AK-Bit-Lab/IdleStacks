import React from 'react';

const Text = ({ children, variant = 'body', color = 'default', className = '', as = 'p' }) => {
  const Component = as;
  
  const variants = {
    h1: 'text-3xl sm:text-4xl font-extrabold tracking-tight',
    h2: 'text-2xl sm:text-3xl font-bold tracking-tight',
    h3: 'text-xl sm:text-2xl font-bold',
    h4: 'text-lg sm:text-xl font-semibold',
    subtitle: 'text-base sm:text-lg font-medium',
    body: 'text-base',
    small: 'text-sm',
    caption: 'text-xs',
  };

  const colors = {
    default: 'text-gray-300',
    muted: 'text-gray-500',
    primary: 'text-white',
    brand: 'text-indigo-400',
    danger: 'text-red-400',
    success: 'text-green-400'
  };

  return (
    <Component className={`${variants[variant]} ${colors[color]} ${className}`}>
      {children}
    </Component>
  );
};

export default Text;
