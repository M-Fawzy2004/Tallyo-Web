import React from 'react';
import { Wallet, QrCode, MessageSquare, RefreshCw } from 'lucide-react';

export const AuthVisualShowcase: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-emerald-950 text-white p-8 sm:p-10 flex flex-col justify-between shadow-2xl border border-indigo-800/30 min-h-full">
      {/* Decorative ambient gradients */}
      <div className="absolute -top-24 -start-24 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -end-24 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Value Statement */}
      <div className="relative z-10">
        <span className="inline-block text-xs font-mono font-bold tracking-wider uppercase text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-4">
          نظام Tallyo الميداني
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug mb-3">
          التحصيل المالي والحضور الذكي،
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-sky-200 to-emerald-300">
            بأسهل طريقة ممكنة في السنتر.
          </span>
        </h2>
      </div>

      {/* Floating UI Preview Card */}
      <div className="relative z-10 my-8">
        <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
          {/* Header of preview card */}
          <div className="flex items-center justify-between text-xs text-slate-300 pb-2 border-b border-white/10">
            <span className="font-bold text-white">الصف الثالث الإعدادي (مجموعة أ)</span>
            <div className="flex items-center gap-1 font-mono text-emerald-400">
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span>QR: 20s</span>
            </div>
          </div>

          {/* Student Status Row */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">
                أ
              </div>
              <div>
                <div className="text-xs font-bold text-white">أحمد محمود إبراهيم</div>
                <div className="text-[10px] text-slate-400">حاضر اليوم • 4:05 م</div>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              خالص المصاريف
            </span>
          </div>

          {/* Another Student Row (Debtor Warning) */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center text-xs">
                م
              </div>
              <div>
                <div className="text-xs font-bold text-white">مريم طارق عبد الله</div>
                <div className="text-[10px] text-slate-400">متأخر في مصاريف الشهر</div>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
              متبقي 150 ج.م
            </span>
          </div>
        </div>
      </div>

      {/* 3 Value Highlights in Arabic */}
      <div className="relative z-10 space-y-2.5 pt-4 border-t border-white/10 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Wallet className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>متابعة دقيقة لكل مليم: مين دفع ومين متأخر بضغطة زر واحدة.</span>
        </div>
        <div className="flex items-center gap-2">
          <QrCode className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>حضور ذكي بالـ QR المتغير كل 20 ثانية لمنع التحايل.</span>
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-sky-400 shrink-0" />
          <span>روابط شخصية سريعة لولي الأمر بدون أي تطبيقات.</span>
        </div>
      </div>
    </div>
  );
};
