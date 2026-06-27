import React, { forwardRef, useId } from 'react';

/**
 * Accessible Input component with built-in labeling, helper text, and error handling.
 *
 * @param {Object} props
 * @param {string} [props.label] - Field label text
 * @param {string} [props.helper] - Helper hint shown below the input when there is no error
 * @param {string} [props.error] - Validation error message
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {React.Ref} ref - Forwarded ref for the input element
 * @returns {JSX.Element}
 */
const Input = forwardRef(({ label, helper, error, className = '', ...props }, ref) => {
  const generatedId = useId();
  const inputId = props.id || generatedId;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1 text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <input
        id={inputId}
        ref={ref}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : helper ? helperId : undefined}
        className={`bg-black/40 border ${
          error ? 'border-red-500' : 'border-gray-600'
        } rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow ${className}`}
        {...props}
      />
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
});

Input.displayName = 'Input';
export default Input;
