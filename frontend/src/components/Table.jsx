import React from 'react';

const Table = ({ headers, data, renderRow, emptyMessage = "No data available", className = '' }) => {
  return (
    <div className={`w-full overflow-x-auto rounded-lg border border-gray-700/50 bg-gray-800/20 ${className}`}>
      <table className="w-full text-left text-sm text-gray-300">
        <thead className="bg-gray-800/80 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-700/50">
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} scope="col" className="px-6 py-3">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700/50">
          {!data || data.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="px-6 py-8 text-center text-gray-500 italic">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition-colors">
                {renderRow(item, idx)}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
