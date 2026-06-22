import React from 'react';

const Toggle = ({ checked, onChange, label, disabled = false }) => {
  return (
    <label className={`flex items-center cursor-pointer ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <div className="relative">
        <input 
          type="checkbox" 
          className="sr-only" 
          checked={checked} 
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        <div className={`block w-10 h-6 rounded-full transition-colors ${checked ? 'bg-indigo-500' : 'bg-gray-700'}`}></div>
        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${checked ? 'transform translate-x-4' : ''}`}></div>
      </div>
      {label && <div className="ml-3 text-sm font-medium text-gray-300">{label}</div>}
    </label>
  );
};

export default Toggle;
