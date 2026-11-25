import React from 'react';
import { CheckCircle, X } from '@phosphor-icons/react';

interface ToastBannerProps {
  message: string | null;
  onDismiss: () => void;
}

export const ToastBanner: React.FC<ToastBannerProps> = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 lg:bottom-6 start-4 end-4 sm:start-auto sm:end-6 z-50 max-w-sm"
    >
      <div className="p-3 rounded-xl bg-[#181818] text-white border border-[#272727] shadow-lg flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <CheckCircle size={18} weight="fill" className="text-emerald-400 shrink-0" />
          <span className="caption-3">{message}</span>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="إغلاق الإشعار"
          className="p-1 rounded-md text-zinc-400 hover:text-white focus-ring cursor-pointer"
        >
          <X size={16} weight="bold" />
        </button>
      </div>
    </div>
  );
};
