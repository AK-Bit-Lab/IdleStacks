import React, { forwardRef, useId } from 'react';

/**
 * Accessible Select component with labeling and error handling
 * 
 * @param {Object} props
 * @param {string} [props.label] - Field label text
 * @param {Array<{label: string, value: any}|string>} props.options - Dropdown options
 * @param {string} [props.error] - Validation error message
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref for the select element
 * @returns {JSX.Element}
 */
const Select = forwardRef(({ label, options, error, className = '', ...props }, ref) => {
  const generatedId = useId();
  const selectId = props.id || generatedId;
  const errorId = `${selectId}-error`;

  return (
    <div className="flex flex-col w-full">
      {label && <label htmlFor={selectId} className="mb-1 text-sm font-medium text-gray-300">{label}</label>}
      <select
        id={selectId}
        ref={ref}
        aria-invalid={!!error}
        aria-errormessage={error ? errorId : undefined}
        className={`bg-black/40 border ${error ? 'border-red-500' : 'border-gray-600'} rounded-lg px-4 py-2 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow ${className}`}
        {...props}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
      {error && <span id={errorId} className="mt-1 text-xs text-red-400">{error}</span>}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
