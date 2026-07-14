/**
 * Base styling for the Chip component
 * @type {string}
 */
const CHIP_BASE_STYLES =
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold';

const CHIP_VARIANTS = {
  default: 'bg-gray-700 text-gray-200',
  info: 'bg-blue-500/10 text-blue-300',
  success: 'bg-green-500/10 text-green-300',
  warning: 'bg-yellow-500/10 text-yellow-300',
};

/**
 * Chip component to represent compact data elements or tags.
 *
 * @param {Object} props - Chip props
 * @param {string|React.ReactNode} props.label - Text or content to display
 * @param {function} [props.onDelete] - Optional callback when the delete button is clicked
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {('default'|'info'|'success'|'warning')} [props.variant='default'] - Visual variant
 * @param {string} [props.title] - Optional tooltip/title attribute
 * @returns {JSX.Element} Chip component
 */
const Chip = ({ label, onDelete, className = '', variant = 'default', title }) => {
  return (
    <div
      className={`${CHIP_BASE_STYLES} ${CHIP_VARIANTS[variant] || CHIP_VARIANTS.default} ${className}`}
      title={title}
    >
      {label}
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="ml-1.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-600 hover:text-gray-200 focus:bg-gray-600 focus:text-white focus:outline-none"
        >
          <span className="sr-only">Remove</span>
          <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
            <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Chip;
