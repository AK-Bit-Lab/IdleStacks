import React, { forwardRef } from 'react';

const Select = forwardRef(({ label, options, error, className = '', ...props }, ref) => {
  return (
    <div className="flex flex-col w-full">
      {label && <label className="mb-1 text-sm font-medium text-gray-300">{label}</label>}
      <select
        ref={ref}
        className={`bg-black/40 border ${error ? 'border-red-500' : 'border-gray-600'} rounded-lg px-4 py-2 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow ${className}`}
        {...props}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value || option}>{option.label || option}</option>
        ))}
      </select>
      {error && <span className="mt-1 text-xs text-red-400">{error}</span>}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
