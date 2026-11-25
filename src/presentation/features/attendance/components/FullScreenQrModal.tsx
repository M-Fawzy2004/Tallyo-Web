import React, { useState, useEffect } from 'react';
import { X, ArrowsClockwise, Clock } from '@phosphor-icons/react';
import { QRCodeSVG } from 'qrcode.react';

interface FullScreenQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  classNameTitle: string;
}

export const FullScreenQrModal: React.FC<FullScreenQrModalProps> = ({
  isOpen,
  onClose,
  classNameTitle,
}) => {
  const [seconds, setSeconds] = useState(20);
  const [liveTime, setLiveTime] = useState(() => new Date().toLocaleTimeString('en-GB', { hour12: false }));

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setSeconds((prev) => (prev <= 1 ? 20 : prev - 1));
      setLiveTime(new Date().toLocaleTimeString('en-GB', { hour12: false }));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 bg-[#000000] flex flex-col justify-between items-center p-6 text-white text-center">
      <div className="w-full max-w-2xl flex items-center justify-between gap-4">
        <div className="text-right">
          <h2 className="heading-5 text-white">{classNameTitle}</h2>
          <span className="caption-4 text-emerald-400">شاشة حضور الطلاب المباشرة</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="إغلاق الشاشة الكاملة"
          className="w-12 h-12 rounded-xl bg-[#181818] border border-[#272727] hover:bg-[#272727] text-white flex items-center justify-center focus-ring cursor-pointer"
        >
          <X size={22} weight="bold" />
        </button>
      </div>

      <div className="my-auto flex flex-col items-center gap-6">
        <div className="p-6 bg-white rounded-3xl border border-[#272727]">
          <QRCodeSVG value={`https://tallyo.app/fullscreen/${seconds}`} size={260} level="H" />
        </div>

        <div className="w-64 h-2 rounded-full bg-[#272727] overflow-hidden">
          <div
            className={`h-full origin-right transition-transform duration-1000 ease-linear ${
              seconds <= 4 ? 'bg-rose-500' : 'bg-emerald-500'
            }`}
            style={{ transform: `scaleX(${seconds / 20})` }}
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#181818] border border-[#272727] font-mono caption-3 text-emerald-400">
            <ArrowsClockwise size={16} weight="bold" />
            <span>يتجدد الرمز بعد {seconds} ثانية</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#181818] border border-[#272727] font-mono caption-3 text-zinc-300">
            <Clock size={16} weight="bold" />
            <span>{liveTime}</span>
          </div>
        </div>
      </div>

      <p className="caption-4 text-zinc-400">
        تظهر للطالب شاشة خضراء للخالص أو حمراء للمتأخر ليراها الأسستنت على الباب فور المسح
      </p>
    </div>
  );
};
