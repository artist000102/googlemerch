import React from 'react';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto bg-white rounded-2xl p-4 shadow-xl border flex items-start space-x-3 transition-all duration-300 animate-in slide-in-from-bottom-5 ${
              isSuccess
                ? 'border-green-200'
                : isError
                ? 'border-red-200'
                : isWarning
                ? 'border-amber-200'
                : 'border-blue-200'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#34a853]" />}
              {isError && <AlertCircle className="w-5 h-5 text-[#ea4335]" />}
              {isWarning && <AlertTriangle className="w-5 h-5 text-[#fbbc05]" />}
              {!isSuccess && !isError && !isWarning && <Info className="w-5 h-5 text-[#1a73e8]" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-gray-900">{toast.title}</div>
              {toast.description && (
                <div className="text-[11px] text-gray-500 mt-0.5 leading-normal">
                  {toast.description}
                </div>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
