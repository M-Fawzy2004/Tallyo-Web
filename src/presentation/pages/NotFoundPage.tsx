import React from 'react';
import { ArrowRight, Compass } from '@phosphor-icons/react';

interface NotFoundPageProps {
  onBackHome: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onBackHome }) => {
  return (
    <main
      dir="rtl"
      className="min-h-[100dvh] bg-[#FAFAFA] text-[#181818] flex items-center justify-center p-6 text-center"
    >
      <div className="max-w-md w-full p-8 rounded-3xl bg-white border border-zinc-200 space-y-6">
        <div className="w-12 h-12 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center mx-auto text-[#181818]">
          <Compass size={24} weight="duotone" />
        </div>

        <div className="space-y-2">
          <span className="caption-3 font-mono text-zinc-500 block">404</span>
          <h1 className="heading-4 text-[#181818]">الصفحة غير موجودة</h1>
          <p className="body-6 text-zinc-600">
            الرابط الذي فتحته غير متاح أو تم نقله. يمكنك العودة إلى الصفحة الرئيسية لمتابعة شغلك.
          </p>
        </div>

        <button
          type="button"
          onClick={onBackHome}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 min-h-[44px] rounded-xl bg-[#181818] hover:bg-[#272727] text-white button-md motion-base active:scale-[0.98] focus-ring cursor-pointer"
        >
          <ArrowRight size={18} weight="bold" />
          <span>العودة إلى الرئيسية</span>
        </button>
      </div>
    </main>
  );
};
