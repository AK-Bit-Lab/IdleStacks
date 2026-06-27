import React from 'react';

const FlexRow = ({
  children,
  justify = 'start',
  align = 'center',
  gap = 4,
  className = '',
  wrap = false,
}) => {
  const justifyClasses = {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around',
  };

  const alignClasses = {
    start: 'items-start',
    end: 'items-end',
    center: 'items-center',
    stretch: 'items-stretch',
  };

  const gapClasses = {
    0: 'gap-0',
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
  };

  return (
    <div
      className={`flex ${justifyClasses[justify] || justifyClasses.start} ${alignClasses[align] || alignClasses.center} ${gapClasses[gap] || gapClasses[4]} ${wrap ? 'flex-wrap' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default FlexRow;
