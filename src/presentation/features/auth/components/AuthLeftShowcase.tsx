import React from 'react';
import { QrCode, WhatsappLogo } from '@phosphor-icons/react';

export const AuthLeftShowcase: React.FC = () => {
  return (
    <div className="w-full h-full max-h-[100dvh] bg-[#000000] overflow-hidden flex flex-col justify-center items-center p-8 text-right select-none">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-3">
          <span className="inline-block caption-3 text-emerald-400 bg-[#181818] px-3 py-1 rounded-full border border-[#272727]">
            نظام إدارة الدروس الخصوصية والسناتر
          </span>
          <h2 className="heading-4 bg-gradient-to-r from-[#FFFFFF] to-[#9B9B9B] bg-clip-text text-transparent">
            تابع كل مليم، وحضّر طلابك في ثوانٍ.
          </h2>
        </div>

        {/* High-Contrast Dark Preview Card (#181818 / #1F1F1F / #272727) */}
        <div className="bg-[#181818] border border-[#272727] rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between gap-2 pb-2">
            <span className="title-4 text-white">الأول الإعدادي، مجموعة أ</span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[#1F1F1F] border border-[#313131] text-emerald-400 caption-4">
              <QrCode size={14} weight="bold" />
              <span>QR يتجدد كل 20 ثانية</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-[#1F1F1F] border border-[#272727]">
            <div>
              <span className="text-zinc-400 block caption-5">تحصيل الشهر</span>
              <span className="text-emerald-400 title-4 font-mono">12,480 ج.م</span>
            </div>
            <div>
              <span className="text-zinc-400 block caption-5">حضور اليوم</span>
              <span className="text-white title-4 font-mono">37 / 41 طالب</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#1F1F1F] border border-[#272727]">
              <div>
                <div className="caption-3 text-white">أحمد محمود إبراهيم</div>
                <div className="caption-5 text-zinc-400">حضر بالـ QR الساعة 4:05 م</div>
              </div>
              <span className="caption-3 px-2 py-1 rounded-full bg-[#272727] text-emerald-400 border border-[#313131]">
                خالص
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-[#1F1F1F] border border-[#272727]">
              <div>
                <div className="caption-3 text-white">مريم طارق عبد الله</div>
                <div className="caption-5 text-zinc-400">متبقي 130 ج.م</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="caption-3 px-2 py-1 rounded-full bg-[#272727] text-amber-400 border border-[#313131]">
                  دفع جزئي
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#16A34A] text-white caption-3">
                  <WhatsappLogo size={12} weight="fill" />
                  <span>تذكير</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Column Micro-Feature Cards */}
        <div className="grid grid-cols-3 gap-2">
          <div className="p-3 rounded-xl bg-[#181818] border border-[#272727] text-center">
            <span className="block text-white caption-3 mb-1">متابعة مالية</span>
            <span className="block caption-5 text-zinc-400">مين دفع ومين متأخر</span>
          </div>
          <div className="p-3 rounded-xl bg-[#181818] border border-[#272727] text-center">
            <span className="block text-white caption-3 mb-1">حضور بالـ QR</span>
            <span className="block caption-5 text-zinc-400">متغير ضد الغش</span>
          </div>
          <div className="p-3 rounded-xl bg-[#181818] border border-[#272727] text-center">
            <span className="block text-white caption-3 mb-1">رابط للطالب</span>
            <span className="block caption-5 text-zinc-400">متابعة بدون تطبيق</span>
          </div>
        </div>
      </div>
    </div>
  );
};
