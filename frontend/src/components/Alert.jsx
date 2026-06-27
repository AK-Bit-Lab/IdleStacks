import React from 'react';

/**
 * Alert component for displaying semantic messages and notifications.
 *
 * @param {Object} props - Alert props
 * @param {React.ReactNode} props.children - Alert body content
 * @param {('info'|'success'|'warning'|'error')} [props.variant='info'] - Semantic variant
 * @param {string} [props.title] - Optional alert title
 * @param {React.ReactNode} [props.icon] - Optional leading icon
 * @returns {JSX.Element} Alert component
 */
const Alert = ({ children, variant = 'info', title, icon }) => {
  const variants = {
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    success: 'bg-green-500/10 border-green-500/30 text-green-400',
    warning: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
    error: 'bg-red-500/10 border-red-500/30 text-red-400',
  };

  return (
    <div className={`p-4 rounded-lg border ${variants[variant]} flex gap-3`}>
      {icon && <div className="mt-0.5 shrink-0 opacity-80">{icon}</div>}
      <div>
        {title && <h4 className="text-sm font-bold mb-1 opacity-90">{title}</h4>}
        <div className="text-sm opacity-80 whitespace-pre-wrap">{children}</div>
      </div>
    </div>
  );
};

export default Alert;
