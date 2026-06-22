import React from 'react';

const Grid = ({ children, cols = 1, gap = 4, className = '' }) => {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${colClasses[cols] || 'grid-cols-1'} gap-${gap} ${className}`}>
      {children}
    </div>
  );
};

export default Grid;
