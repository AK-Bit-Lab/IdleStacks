import React from 'react';
import { useCopied } from '../hooks/useCopied';
import Tooltip from './Tooltip';

/**
 * CopyButton component for copying specific text to clipboard securely.
 *
 * @param {Object} props - CopyButton props
 * @param {string} props.text - The text string to copy
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {JSX.Element} CopyButton component
 */
const CopyButton = ({ text, className = '' }) => {
  const [isCopied, copy] = useCopied();

  return (
    <Tooltip text={isCopied ? 'Copied!' : 'Copy to clipboard'}>
      <button
        onClick={() => copy(text)}
        className={`p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors ${className}`}
        aria-label="Copy to clipboard"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isCopied ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          )}
        </svg>
      </button>
    </Tooltip>
  );
};

export default CopyButton;
