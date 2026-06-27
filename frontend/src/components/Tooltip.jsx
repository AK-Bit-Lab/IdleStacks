import React, { useState, useId } from 'react';

/**
 * Tooltip component with mouse and keyboard (focus) support.
 *
 * @param {Object} props
 * @param {string} props.text - Tooltip content
 * @param {React.ReactNode} props.children - Trigger element
 * @param {('top'|'bottom'|'left'|'right')} [props.position='top'] - Preferred placement
 */
const Tooltip = ({ text, children, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipId = useId();

  const positionClasses = {
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {React.cloneElement(React.Children.only(children), {
        'aria-describedby': isVisible ? tooltipId : undefined,
      })}
      {isVisible && (
        <div
          id={tooltipId}
          role="tooltip"
          className={`absolute z-50 whitespace-nowrap px-2 py-1 bg-gray-900 text-white text-xs rounded shadow-lg pointer-events-none ${positionClasses[position] || positionClasses.top}`}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
