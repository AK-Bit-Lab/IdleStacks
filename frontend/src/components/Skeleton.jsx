import React from 'react';

const SHAPE_CLASSES = {
  text: 'rounded',
  circle: 'rounded-full',
  block: 'rounded-lg',
};

/**
 * Reusable skeleton placeholder for loading states.
 *
 * @param {Object} props
 * @param {string|number} [props.width='100%']
 * @param {string|number} [props.height='20px']
 * @param {string} [props.className='']
 * @param {string} [props.rounded] - Explicit rounding class
 * @param {('text'|'circle'|'block')} [props.shape='text'] - Preset shape
 */
const Skeleton = ({ width = '100%', height = '20px', className = '', rounded, shape = 'text' }) => {
  const roundedClass = rounded || SHAPE_CLASSES[shape] || SHAPE_CLASSES.text;

  return (
    <div
      className={`animate-pulse bg-gray-700/50 ${roundedClass} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
};

export default Skeleton;
