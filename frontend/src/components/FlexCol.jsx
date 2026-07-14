const FlexCol = ({ children, justify = 'start', align = 'stretch', gap = 4, className = '' }) => {
  const justifyClasses = {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    between: 'justify-between',
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
      className={`flex flex-col ${justifyClasses[justify] || justifyClasses.start} ${alignClasses[align] || alignClasses.stretch} ${gapClasses[gap] || gapClasses[4]} ${className}`}
    >
      {children}
    </div>
  );
};

export default FlexCol;
