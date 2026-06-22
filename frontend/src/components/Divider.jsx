import React from 'react';

const Divider = ({ className = '', vertical = false }) => {
  if (vertical) {
    return <div className={`w-[1px] bg-gray-700/50 ${className}`} />;
  }
  return <div className={`h-[1px] w-full bg-gray-700/50 ${className}`} />;
};

export default Divider;
