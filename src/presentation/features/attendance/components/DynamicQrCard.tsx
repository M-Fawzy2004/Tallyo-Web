import React, { useState, useEffect } from 'react';
import { ArrowsOut, ArrowsClockwise, Clock, ShieldCheck } from '@phosphor-icons/react';
import { QRCodeSVG } from 'qrcode.react';

interface DynamicQrCardProps {
  classNameTitle: string;
  onFullScreen: () => void;
}

export const DynamicQrCard: React.FC<DynamicQrCardProps> = ({ classNameTitle, onFullScreen }) => {
  const [secondsLeft, setSecondsLeft] = useState(20);
  const [sessionNonce, setSessionNonce] = useState(() => 'QR' + Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setSessionNonce('QR' + Date.now());
          return 20;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scaleRatio = secondsLeft / 20;

  return (
    <div className="p-6 rounded-2xl bg-white border border-zinc-200 flex flex-col justify-between text-center space-y-4">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-1 caption-3 text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-lg">
          <ShieldCheck size={16} weight="duotone" />
          <span>كود QR متغير ضد الغش</span>
        </div>

        <button
          type="button"
          onClick={onFullScreen}
          aria-label="تكبير على كامل الشاشة"
          className="w-10 h-10 rounded-lg border border-zinc-200 text-zinc-600 hover:text-[#181818] hover:bg-zinc-50 flex items-center justify-center motion-color focus-ring cursor-pointer"
        >
          <ArrowsOut size={18} weight="bold" />
        </button>
      </div>

      <div>
        <h3 className="heading-6 text-[#181818] mb-1">{classNameTitle}</h3>
        <p className="caption-5 text-zinc-500">امسح الكود بكاميرا الموبايل لتسجيل حضورك في ثانية</p>
      </div>

      <div className="p-4 bg-white border border-zinc-300 rounded-xl inline-block mx-auto">
        <QRCodeSVG value={`https://tallyo.app/att/${sessionNonce}`} size={160} level="M" />
      </div>

      <div className="space-y-2 max-w-xs mx-auto w-full">
        <div className="w-full h-2 rounded-full bg-zinc-100 overflow-hidden">
          <div
            className={`h-full origin-right transition-transform duration-1000 ease-linear ${
              secondsLeft <= 4 ? 'bg-rose-600' : 'bg-emerald-600'
            }`}
            style={{ transform: `scaleX(${scaleRatio})` }}
          />
        </div>
        <div className="flex items-center justify-between caption-3 font-mono text-zinc-600">
          <span className="inline-flex items-center gap-1">
            <Clock size={14} weight="bold" className="text-zinc-400" />
            <span>الصلاحية:</span>
          </span>
          <span className="inline-flex items-center gap-1 text-[#181818]">
            <ArrowsClockwise size={14} weight="bold" className={secondsLeft <= 3 ? 'text-rose-600' : 'text-teal-700'} />
            <span>{secondsLeft} ثانية</span>
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onFullScreen}
        className="w-full py-2 px-3 bg-[#181818] hover:bg-[#272727] text-white button-sm rounded-xl min-h-[44px] flex items-center justify-center gap-2 motion-base active:scale-[0.98] focus-ring cursor-pointer"
      >
        <ArrowsOut size={16} weight="bold" />
        <span>عرض موسع لشاشة القاعة</span>
      </button>
    </div>
  );
};
