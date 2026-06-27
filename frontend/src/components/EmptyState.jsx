import React from 'react';

/**
 * EmptyState component for displaying when no data is available.
 * 
 * @param {Object} props - EmptyState props
 * @param {string} props.title - Main title message
 * @param {string} props.description - Detailed description message
 * @param {React.ReactNode} [props.icon] - Optional SVG icon
 * @param {React.ReactNode} [props.action] - Optional action button or element
 * @returns {JSX.Element} EmptyState component
 */
const EmptyState = ({ title, description, icon, action }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed border-gray-700/50 rounded-xl bg-gray-800/20">
      {icon && <div className="text-gray-500 mb-4 text-4xl [&>svg]:block [&>svg]:mx-auto will-change-transform contain-layout">{icon}</div>}
      <h3 className="text-lg font-medium text-gray-200 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mb-4">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
