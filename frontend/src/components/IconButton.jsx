import React from 'react';

const IconButton = ({ icon, onClick, className = '', disabled = false, title }) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center ${className}`}
    >
      {icon}
    </button>
  );
};

export default IconButton;
