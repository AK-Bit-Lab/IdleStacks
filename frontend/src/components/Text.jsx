import React from 'react';

/**
 * Polymorphic text component with variant, color, alignment, and truncation support.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.variant='body'] - Typography variant
 * @param {string} [props.color='default'] - Text colour token
 * @param {string} [props.className='']
 * @param {string} [props.as='p'] - HTML element to render
 * @param {boolean} [props.truncate=false] - Clamp to a single line with ellipsis
 * @param {('left'|'center'|'right')} [props.align] - Text alignment
 */
const Text = ({
  children,
  variant = 'body',
  color = 'default',
  className = '',
  as = 'p',
  truncate = false,
  align,
}) => {
  const Component = as;

  const variants = {
    h1: 'text-3xl sm:text-4xl font-extrabold tracking-tight',
    h2: 'text-2xl sm:text-3xl font-bold tracking-tight',
    h3: 'text-xl sm:text-2xl font-bold',
    h4: 'text-lg sm:text-xl font-semibold',
    subtitle: 'text-base sm:text-lg font-medium',
    body: 'text-base',
    small: 'text-sm',
    caption: 'text-xs',
  };

  const colors = {
    default: 'text-gray-300',
    muted: 'text-gray-500',
    primary: 'text-white',
    brand: 'text-indigo-400',
    danger: 'text-red-400',
    success: 'text-green-400',
  };

  const alignClass = align ? `text-${align}` : '';

  return (
    <Component
      className={`${
        variants[variant] || variants.body
      } ${colors[color] || colors.default} ${alignClass} ${
        truncate ? 'truncate' : ''
      } ${className}`}
    >
      {children}
    </Component>
  );
};

export default Text;
