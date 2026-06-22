import React, { forwardRef } from 'react';

const Input = forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className="flex flex-col w-full">
      {label && <label className="mb-1 text-sm font-medium text-gray-300">{label}</label>}
      <input
        ref={ref}
        className={`bg-black/40 border ${error ? 'border-red-500' : 'border-gray-600'} rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow ${className}`}
        {...props}
      />
      {error && <span className="mt-1 text-xs text-red-400">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
