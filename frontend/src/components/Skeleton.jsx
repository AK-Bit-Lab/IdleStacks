import React from 'react';

const Skeleton = ({ width = '100%', height = '20px', className = '', rounded = 'rounded' }) => {
  return (
    <div 
      className={`animate-pulse bg-gray-700/50 ${rounded} ${className}`}
      style={{ width, height }}
    />
  );
};

export default Skeleton;
