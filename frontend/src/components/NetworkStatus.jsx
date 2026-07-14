import { APP_NETWORK } from '../utils/constants';

const NetworkStatus = ({ showLabel = true }) => {
  const isMainnet = APP_NETWORK.isMainnet();
  const label = isMainnet ? 'Mainnet' : 'Testnet';

  return (
    <div
      className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10"
      role="status"
      aria-label={`Connected to ${label}`}
    >
      <div
        className={`w-2 h-2 rounded-full animate-pulse ${isMainnet ? 'bg-orange-500' : 'bg-blue-500'}`}
        aria-hidden="true"
      />
      {showLabel && (
        <span className="text-xs text-slate-300 font-medium tracking-wide">{label}</span>
      )}
    </div>
  );
};

export default NetworkStatus;
