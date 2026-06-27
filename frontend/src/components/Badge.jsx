import React from 'react';

/**
 * Visual style mappings for Badge variants
 * @type {Record<string, string>}
 */
const BADGE_VARIANTS = {
  primary: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  success: 'bg-green-500/10 text-green-400 border border-green-500/20',
  warning: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
  danger: 'bg-red-500/10 text-red-400 border border-red-500/20',
  neutral: 'bg-gray-500/10 text-gray-400 border border-gray-500/20',
};

/**
 * Size mappings for Badge component
 * @type {Record<string, string>}
 */
const BADGE_SIZES = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
  lg: 'text-base px-3 py-1.5',
};

/**
 * Badge component for displaying dynamic status labels.
 *
 * @param {Object} props - Badge props
 * @param {React.ReactNode} props.children - Badge content
 * @param {('primary'|'success'|'warning'|'danger'|'neutral')} [props.variant='primary'] - Visual style variant
 * @param {('sm'|'md'|'lg')} [props.size='md'] - Size variant
 * @param {boolean} [props.dot=false] - Show a leading status dot instead of text content
 * @param {React.ReactNode} [props.icon] - Optional icon rendered before children
 * @returns {JSX.Element} Badge component
 */
const Badge = ({ children, variant = 'primary', size = 'md', dot = false, icon }) => {
  if (dot) {
    return (
      <span
        className={`inline-block w-2 h-2 rounded-full ${BADGE_VARIANTS[variant] || BADGE_VARIANTS.primary}`}
        role="status"
        aria-label={typeof children === 'string' ? children : variant}
      />
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 justify-center font-medium rounded-full ${BADGE_VARIANTS[variant] || BADGE_VARIANTS.primary} ${BADGE_SIZES[size] || BADGE_SIZES.md}`}
    >
      {icon && (
        <span className="shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
};

export default Badge;
