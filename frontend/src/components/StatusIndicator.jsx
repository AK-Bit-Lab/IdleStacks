import React from 'react';

const DOT_SIZES = {
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
};

/**
 * Compact status indicator with optional label.
 *
 * @param {Object} props
 * @param {('idle'|'active'|'error'|'warning'|'pending')} [props.status='idle']
 * @param {string} [props.text] - Optional visible label
 * @param {('sm'|'md'|'lg')} [props.size='md'] - Dot size
 */
const StatusIndicator = ({ status = 'idle', text, size = 'md' }) => {
  const colors = {
    idle: 'bg-gray-500',
    active: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    pending: 'bg-blue-500 animate-pulse',
  };

  return (
    <div className="flex items-center gap-2" role="status" aria-label={text || status}>
      <div
        className={`${DOT_SIZES[size] || DOT_SIZES.md} rounded-full ${colors[status] || colors.idle}`}
      />
      {text && <span className="text-sm font-medium text-gray-300">{text}</span>}
    </div>
  );
};

export default StatusIndicator;
