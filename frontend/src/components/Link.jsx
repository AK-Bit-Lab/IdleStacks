import React from 'react';

const Link = ({ href, children, isExternal = false, className = '' }) => {
  if (isExternal) {
    return (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-blue-400 hover:text-blue-300 underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded transition-colors ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <a 
      href={href}
      className={`text-blue-400 hover:text-blue-300 underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded transition-colors ${className}`}
    >
      {children}
    </a>
  );
};

export default Link;
