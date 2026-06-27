import React, { forwardRef, useId } from 'react';

/**
 * Accessible Select component with labeling, helper text, and error handling.
 *
 * @param {Object} props
 * @param {string} [props.label] - Field label text
 * @param {Array<{label: string, value: any}|string>} props.options - Dropdown options
 * @param {string} [props.placeholder] - Placeholder option shown when no value is selected
 * @param {string} [props.helper] - Helper text shown below the select
 * @param {string} [props.error] - Validation error message
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref for the select element
 * @returns {JSX.Element}
 */
const Select = forwardRef(
  ({ label, options, placeholder, helper, error, className = '', ...props }, ref) => {
    const generatedId = useId();
    const selectId = props.id || generatedId;
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;

    return (
      <div className="flex flex-col w-full">
        {label && (
          <label htmlFor={selectId} className="mb-1 text-sm font-medium text-gray-300">
            {label}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helper ? helperId : undefined}
          className={`bg-black/40 border ${
            error ? 'border-red-500' : 'border-gray-600'
          } rounded-lg px-4 py-2 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option, index) => (
            <option key={index} value={option.value ?? option}>
              {option.label ?? option}
            </option>
          ))}
        </select>
        {helper && !error && (
          <span id={helperId} className="mt-1 text-xs text-gray-500">
            {helper}
          </span>
        )}
        {error && (
          <span id={errorId} className="mt-1 text-xs text-red-400">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
