import React from 'react';

/**
 * Accessible spinner component.
 *
 * @param {Object} props
 * @param {('sm'|'md'|'lg'|'xl')} [props.size='md'] - Spinner size
 * @param {string} [props.className=''] - Additional wrapper classes
 * @param {string} [props.label='Loading…'] - Screen-reader label
 */
const Spinner = ({ size = 'md', className = '', label = 'Loading\u2026' }) => {
  const sizes = {
    sm: 'w-3 h-3 border-2',
    md: 'w-5 h-5 border-2',
    lg: 'w-8 h-8 border-3',
    xl: 'w-12 h-12 border-4',
  };

  return (
    <div
      className={`flex justify-center items-center ${className}`}
      role="status"
      aria-label={label}
    >
      <div
        className={`animate-spin rounded-full border-t-indigo-500 border-r-indigo-500/30 border-b-indigo-500/10 border-l-indigo-500/50 ${sizes[size]}`}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
};

export default Spinner;
