import React from 'react';

/**
 * Base styling for Link component
 * @type {string}
 */
const LINK_BASE_STYLES = 'text-blue-400 hover:text-blue-300 underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded transition-colors';

/**
 * Enhanced Link component with safe external linking defaults
 * 
 * @param {Object} props
 * @param {string} props.href - Destination URL
 * @param {React.ReactNode} props.children - Link content
 * @param {boolean} [props.isExternal=false] - Safely handles target & rel
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {JSX.Element}
 */
const Link = ({ href, children, isExternal = false, className = '' }) => {
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`${LINK_BASE_STYLES} ${className}`}
    >
      {children}
    </a>
  );
};

export default Link;
