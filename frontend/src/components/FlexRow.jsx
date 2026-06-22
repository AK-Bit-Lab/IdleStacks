import React from 'react';

const FlexRow = ({ children, justify = 'start', align = 'center', gap = 4, className = '', wrap = false }) => {
  const justifyClasses = {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around'
  };

  const alignClasses = {
    start: 'items-start',
    end: 'items-end',
    center: 'items-center',
    stretch: 'items-stretch'
  };

  return (
    <div className={`flex ${justifyClasses[justify]} ${alignClasses[align]} gap-${gap} ${wrap ? 'flex-wrap' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default FlexRow;
