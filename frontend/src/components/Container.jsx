import React from 'react';

/**
 * Default container styling classes
 * @type {string}
 */
const CONTAINER_BASE_STYLES = 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';

/**
 * Container layout component to constrain content width.
 *
 * @param {Object} props - Container props
 * @param {React.ReactNode} props.children - Children to contain
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {JSX.Element} Container component
 */
const Container = ({ children, className = '' }) => {
  return <div className={`${CONTAINER_BASE_STYLES} ${className}`}>{children}</div>;
};

export default Container;
