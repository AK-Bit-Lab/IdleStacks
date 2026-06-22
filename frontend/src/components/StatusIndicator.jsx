import React from 'react';

const StatusIndicator = ({ status = 'idle', text }) => {
  const colors = {
    idle: 'bg-gray-500',
    active: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    pending: 'bg-blue-500 animate-pulse'
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2.5 h-2.5 rounded-full ${colors[status]}`} />
      {text && <span className="text-sm font-medium text-gray-300">{text}</span>}
    </div>
  );
};

export default StatusIndicator;
