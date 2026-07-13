// import removed as unused

/**
 * Semantic style mappings for Alert variants
 * @type {Record<string, string>}
 */
const ALERT_VARIANTS = {
  info: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  success: 'bg-green-500/10 border-green-500/30 text-green-400',
  warning: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
  error: 'bg-red-500/10 border-red-500/30 text-red-400',
};

/**
 * Alert component for displaying semantic messages and notifications.
 *
 * @param {Object} props - Alert props
 * @param {React.ReactNode} props.children - Alert body content
 * @param {('info'|'success'|'warning'|'error')} [props.variant='info'] - Semantic variant
 * @param {string} [props.title] - Optional alert title
 * @param {React.ReactNode} [props.icon] - Optional leading icon
 * @param {Function} [props.onClose] - If provided, renders a dismiss button that calls this handler
 * @returns {JSX.Element} Alert component
 */
const Alert = ({ children, variant = 'info', title, icon, onClose }) => {
  return (
    <div
      className={`p-4 rounded-lg border flex gap-3 ${ALERT_VARIANTS[variant] || ALERT_VARIANTS.info}`}
      role="alert"
    >
      {icon && <div className="mt-0.5 shrink-0 opacity-80">{icon}</div>}
      <div className="flex-1 min-w-0">
        {title && <h4 className="text-sm font-bold mb-1 opacity-90">{title}</h4>}
        <div className="text-sm opacity-80 whitespace-pre-wrap">{children}</div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="ml-auto shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Dismiss alert"
        >
          &#x2715;
        </button>
      )}
    </div>
  );
};

export default Alert;
