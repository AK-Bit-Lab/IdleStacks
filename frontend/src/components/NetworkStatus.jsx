import React from 'react';
import { APP_NETWORK } from '../utils/constants';

const NetworkStatus = () => {
  const isMainnet = APP_NETWORK.isMainnet();
  
  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
      <div className={`w-2 h-2 rounded-full animate-pulse ${isMainnet ? 'bg-orange-500' : 'bg-blue-500'}`} />
      <span className="text-xs text-slate-300 font-medium tracking-wide">
        {isMainnet ? 'Mainnet' : 'Testnet'}
      </span>
    </div>
  );
};

export default NetworkStatus;
