import React from 'react';

const StatBox = ({ label, value, icon, trend }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col items-center justify-center text-center">
      {icon && <div className="text-gray-400 mb-2">{icon}</div>}
      <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
        {value}
      </div>
      <div className="text-xs text-slate-400 mt-1 font-medium tracking-wide uppercase">
        {label}
      </div>
      {trend && (
        <div className={`text-xs mt-2 ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </div>
      )}
    </div>
  );
};

export default StatBox;
