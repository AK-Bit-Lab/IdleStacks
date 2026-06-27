import React from 'react';

/**
 * Divider component to display a horizontal or vertical rule with accessibility support.
 *
 * @param {Object} props - Divider props
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {boolean} [props.vertical=false] - Whether to orient vertically
 * @returns {JSX.Element} Divider component
 */
const Divider = ({ className = '', vertical = false, label }) => {
  if (label && !vertical) {
    return (
      <div
        className={`flex items-center gap-3 text-xs uppercase tracking-wide text-gray-500 ${className}`}
      >
        <div
          role="separator"
          aria-orientation="horizontal"
          className="h-[1px] flex-1 bg-gray-700/50"
        />
        <span>{label}</span>
        <div
          role="separator"
          aria-orientation="horizontal"
          className="h-[1px] flex-1 bg-gray-700/50"
        />
      </div>
    );
  }

  if (vertical) {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={`w-[1px] bg-gray-700/50 ${className}`}
      />
    );
  }
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={`h-[1px] w-full bg-gray-700/50 ${className}`}
    />
  );
};

export default Divider;
