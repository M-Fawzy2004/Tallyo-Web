import React from 'react';
import { ShieldCheck, QrCode, Wallet, Users, Sparkles } from 'lucide-react';

export const AuthHeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 flex flex-col justify-between shadow-2xl border border-indigo-800/40 min-h-full">
      {/* Decorative Light Glows */}
      <div className="absolute -top-24 -start-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -end-24 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Branding */}
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-indigo-200 text-xs font-bold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>منصة إدارة السناتر والدروس الخصوصية في مصر</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
          نظّم شغلك، حصّل اشتراكاتك، وارتاح مع <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-200 to-white font-mono">Tallyo</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg">
          لكل مدرس حسابه السحابي الخاص والمستقل بالكامل. تحكم شامل في المجموعات، الحضور اللحظي، ومتابعة دقيقة لكل مليم.
        </p>
      </div>

      {/* Core Value Pillars */}
      <div className="relative z-10 space-y-4 my-8">
        <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">متابعة دقيقة للتحصيل المالي</h3>
            <p className="text-xs text-slate-300 mt-0.5">مين دفع ومين متأخر، مع تذكير واتساب لولي الأمر بضغطة زر واحدة.</p>
          </div>
        </div>

        <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">حضور بالـ QR المتغير كل 20 ثانية</h3>
            <p className="text-xs text-slate-300 mt-0.5">منع تام لتصوير الكود أو تبادله بين الطلاب خارج القاعة.</p>
          </div>
        </div>

        <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">بوابة الأسستنت برمز PIN سري</h3>
            <p className="text-xs text-slate-300 mt-0.5">المساعد يدخل بكود المدرس والـ PIN للتحضير على الباب دون رؤية أرباحك.</p>
          </div>
        </div>
      </div>

      {/* Social Proof Metric in English digits */}
      <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-emerald-400" />
          <span>أكثر من <b className="text-white font-mono font-bold text-sm">4,500+</b> طالب مدار عبر المنصة</span>
        </div>
        <span className="font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
          99.9% جاهزية
        </span>
      </div>
    </div>
  );
};
