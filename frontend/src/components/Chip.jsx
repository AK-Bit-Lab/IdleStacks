import React from 'react';

const Chip = ({ label, onDelete, className = '' }) => {
  return (
    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-gray-700 text-gray-200 ${className}`}>
      {label}
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="ml-1.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-600 hover:text-gray-200 focus:bg-gray-600 focus:text-white focus:outline-none"
        >
          <span className="sr-only">Remove</span>
          <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
            <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Chip;
