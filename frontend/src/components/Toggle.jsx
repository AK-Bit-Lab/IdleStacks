import React from 'react';

/**
 * Toggle component for binary settings (Switch)
 * 
 * @param {Object} props
 * @param {boolean} props.checked - Active state
 * @param {function} props.onChange - State change handler
 * @param {string} [props.label] - Optional descriptive label
 * @param {boolean} [props.disabled=false] - Disabled state
 * @returns {JSX.Element}
 */
const Toggle = ({ checked, onChange, label, disabled = false }) => {
  return (
    <label
      className={`flex items-center cursor-pointer ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <div className="relative">
        <input
          type="checkbox"
          role="switch"
          aria-checked={checked}
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        <div
          className={`block w-10 h-6 rounded-full transition-colors ${checked ? 'bg-indigo-500' : 'bg-gray-700'}`}
        ></div>
        <div
          className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${checked ? 'transform translate-x-4' : ''}`}
        ></div>
      </div>
      {label && <div className="ml-3 text-sm font-medium text-gray-300">{label}</div>}
    </label>
  );
};

export default Toggle;
