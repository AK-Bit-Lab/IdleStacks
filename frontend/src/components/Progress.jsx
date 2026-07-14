/**
 * Progress bar component with optional animated stripe and ARIA support.
 *
 * @param {Object} props
 * @param {number} [props.value=0] - Current value
 * @param {number} [props.max=100] - Maximum value
 * @param {string} [props.label] - Optional label shown above the bar
 * @param {boolean} [props.showValue=false] - Show percentage text
 * @param {('indigo'|'blue'|'green'|'red'|'yellow')} [props.color='indigo'] - Bar colour
 * @param {boolean} [props.animated=false] - Apply a CSS stripe animation
 */
const Progress = ({
  value = 0,
  max = 100,
  label,
  showValue = false,
  color = 'indigo',
  animated = false,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const colors = {
    indigo: 'bg-indigo-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
  };

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1 text-xs font-medium text-gray-400">
          {label && <span>{label}</span>}
          {showValue && <span>{Math.round(percentage)}%</span>}
        </div>
      )}
      <div
        className="w-full bg-gray-700 rounded-full h-2 overflow-hidden shadow-inner"
        role="progressbar"
        aria-valuenow={Math.round(percentage)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={`${
            colors[color] || colors.indigo
          } h-2 rounded-full transition-all duration-500 ease-out${
            animated ? ' animate-pulse' : ''
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default Progress;
