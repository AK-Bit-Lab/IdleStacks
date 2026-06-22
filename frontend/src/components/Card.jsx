import React from 'react';

const Card = ({ children, className = '', hover = false }) => {
  return (
    <div className={`bg-gray-800/80 border border-gray-700 rounded-xl overflow-hidden shadow-sm backdrop-blur-sm ${hover ? 'transition-transform hover:-translate-y-1 hover:shadow-md' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
