import React from 'react';
import { useHSE } from '../../context/HSEContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useHSE();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        let Icon = Info;
        let borderClass = 'border-blue-400 bg-white text-gray-800';
        let iconColor = 'text-blue-500';

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          borderClass = 'border-emerald-500 bg-white text-gray-800';
          iconColor = 'text-emerald-600';
        } else if (toast.type === 'error') {
          Icon = AlertCircle;
          borderClass = 'border-red-500 bg-white text-gray-800';
          iconColor = 'text-red-600';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          borderClass = 'border-amber-500 bg-white text-gray-800';
          iconColor = 'text-amber-500';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg shadow-xl border-l-4 ${borderClass} animate-in slide-in-from-bottom-2 duration-200 transition-all`}
          >
            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 leading-tight">{toast.title}</h4>
              {toast.message && (
                <p className="text-xs text-gray-600 mt-1 leading-relaxed break-words">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
