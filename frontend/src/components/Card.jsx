import React from 'react';

/**
 * Base styles for the Card component
 * @type {string}
 */
const BASE_CARD_STYLES = 'bg-gray-800/80 border border-gray-700 rounded-xl overflow-hidden shadow-sm backdrop-blur-sm';

/**
 * Hover transformation styles for the Card component
 * @type {string}
 */
const HOVER_CARD_STYLES = 'transition-transform hover:-translate-y-1 hover:shadow-md';

/**
 * Card component for encapsulating related content.
 *
 * @param {Object} props - Card props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {boolean} [props.hover=false] - Whether to apply hover transform effects
 * @returns {JSX.Element} Card component
 */
const Card = ({ children, className = '', hover = false }) => {
  return (
    <div
      className={`${BASE_CARD_STYLES} ${hover ? HOVER_CARD_STYLES : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
