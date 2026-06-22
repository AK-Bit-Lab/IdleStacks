import React from 'react';

const FlexCol = ({ children, justify = 'start', align = 'stretch', gap = 4, className = '' }) => {
  const justifyClasses = {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    between: 'justify-between'
  };

  const alignClasses = {
    start: 'items-start',
    end: 'items-end',
    center: 'items-center',
    stretch: 'items-stretch'
  };

  return (
    <div className={`flex flex-col ${justifyClasses[justify]} ${alignClasses[align]} gap-${gap} ${className}`}>
      {children}
    </div>
  );
};

export default FlexCol;
