import React from 'react';
import { useNotification } from '../context/NotificationContext';

const NotificationManager = () => {
  const { notifications, removeNotification } = useNotification();

  const getColors = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/10 border-green-500 text-green-400';
      case 'error':
        return 'bg-red-500/10 border-red-500 text-red-400';
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500 text-yellow-400';
      default:
        return 'bg-blue-500/10 border-blue-500 text-blue-400';
    }
  };

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
      aria-relevant="additions removals"
    >
      {notifications.map(({ id, message, type }) => (
        <div
          key={id}
          className={`pointer-events-auto flex items-center justify-between min-w-[200px] max-w-sm p-4 border rounded shadow-lg backdrop-blur-md animate-slide-up ${getColors(type)}`}
          role={type === 'error' ? 'alert' : 'status'}
        >
          <p className="text-sm mr-4">{message}</p>
          <button
            type="button"
            onClick={() => removeNotification(id)}
            className="opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationManager;
