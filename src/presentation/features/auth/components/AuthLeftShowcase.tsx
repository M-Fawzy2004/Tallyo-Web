import React from 'react';
import { QrCode, MessageSquare } from 'lucide-react';

export const AuthLeftShowcase: React.FC = () => {
  return (
    <div className="w-full h-full max-h-[100dvh] bg-slate-950 relative overflow-hidden flex flex-col justify-center items-center p-6 lg:p-10 text-right select-none">
      {/* Background glow and subtle grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.22),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute -bottom-24 -start-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415512_1px,transparent_1px),linear-gradient(to_bottom,#33415512_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md relative z-10 space-y-4">
        <div>
          <span className="inline-block text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-0.5 rounded-full border border-emerald-500/20 mb-2">
            نظام إدارة الدروس الخصوصية والسناتر
          </span>
          <h2 className="text-2xl lg:text-3xl font-black text-white leading-tight">
            تابع كل مليم، وحضّر طلابك في ثوانٍ.
          </h2>
        </div>

        {/* Upgraded Compact Glassmorphic UI Preview Card */}
        <div className="bg-slate-900/85 backdrop-blur-md border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-2.5">
          {/* Card Header */}
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-800/80">
            <span className="font-bold text-xs sm:text-sm text-white">الصف الثالث الإعدادي — مجموعة أ</span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-bold">
              <QrCode className="w-3 h-3" />
              <span>QR نشط • يتجدد كل ٢٠ ثانية</span>
            </div>
          </div>

          {/* Mini Summary Strip */}
          <div className="grid grid-cols-2 gap-2 p-2 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px]">تحصيل الشهر:</span>
              <span className="text-emerald-400 font-semibold font-mono text-xs">١٢,٤٠٠ ج.م</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">حضور اليوم:</span>
              <span className="text-white font-semibold font-mono text-xs">٤٢ / ٤٥ طالب</span>
            </div>
          </div>

          {/* Student Row 1 */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/50 border border-slate-800/60">
            <div>
              <div className="text-xs font-bold text-white">أحمد محمود إبراهيم</div>
              <div className="text-[10px] text-slate-400">حضر بالـ QR • ٤:٠٥ م</div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              خالص
            </span>
          </div>

          {/* Student Row 2 (Partial with WhatsApp reminder pill) */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/50 border border-slate-800/60">
            <div>
              <div className="text-xs font-bold text-white">مريم طارق عبد الله</div>
              <div className="text-[10px] text-slate-400">متبقي ١٥٠ ج.م</div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                دفع جزئي
              </span>
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 text-[9px] font-bold">
                <MessageSquare className="w-2.5 h-2.5" />
                <span>تذكير</span>
              </span>
            </div>
          </div>

          {/* Student Row 3 */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/50 border border-slate-800/60">
            <div>
              <div className="text-xs font-bold text-white">يوسف خالد حسن</div>
              <div className="text-[10px] text-slate-400">حضر بالـ QR • ٤:٠٧ م</div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              خالص
            </span>
          </div>
        </div>

        {/* 3-Column Executive Micro-Feature Strip (Compact & Zero Scroll) */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-center">
            <span className="block text-white font-bold text-xs mb-0.5">متابعة مالية</span>
            <span className="block text-[11px] text-slate-400 leading-tight">مين دفع ومين متأخر</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-center">
            <span className="block text-white font-bold text-xs mb-0.5">حضور بالـ QR</span>
            <span className="block text-[11px] text-slate-400 leading-tight">متغير ضد الغش</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-center">
            <span className="block text-white font-bold text-xs mb-0.5">رابط للطالب</span>
            <span className="block text-[11px] text-slate-400 leading-tight">متابعة بدون تطبيق</span>
          </div>
        </div>
      </div>
    </div>
  );
};
