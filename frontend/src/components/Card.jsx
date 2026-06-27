import React from 'react';

/**
 * Base styles for the Card component
 * @type {string}
 */
const BASE_CARD_STYLES =
  'bg-gray-800/80 border border-gray-700 rounded-xl overflow-hidden shadow-sm backdrop-blur-sm';

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
 * @param {boolean} [props.padded=false] - Add internal padding to the card
 * @param {boolean} [props.bordered=true] - Whether to show the border
 * @returns {JSX.Element} Card component
 */
const Card = ({ children, className = '', hover = false, padded = false, bordered = true }) => {
  return (
    <div
      className={`bg-gray-800/80 ${
        bordered ? 'border border-gray-700' : ''
      } rounded-xl overflow-hidden shadow-sm backdrop-blur-sm ${
        hover ? HOVER_CARD_STYLES : ''
      } ${padded ? 'p-4' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
