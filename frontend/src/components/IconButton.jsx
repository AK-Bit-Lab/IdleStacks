/**
 * Size mappings for IconButton padding
 * @type {Record<string, string>}
 */
const ICON_BUTTON_SIZES = {
  sm: 'p-1',
  md: 'p-2',
  lg: 'p-3',
};

/**
 * IconButton component for icon-only interactive elements
 *
 * @param {Object} props
 * @param {React.ReactNode} props.icon - Icon element
 * @param {function} props.onClick - Click handler
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {string} [props.title] - Hover title
 * @param {string} [props.size='md'] - Padding size variant
 * @returns {JSX.Element}
 */
const IconButton = ({ icon, onClick, className = '', disabled = false, title, size = 'md' }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`${ICON_BUTTON_SIZES[size] || ICON_BUTTON_SIZES.md} rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center ${className}`}
    >
      {icon}
    </button>
  );
};

export default IconButton;
