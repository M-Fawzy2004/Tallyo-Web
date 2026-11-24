import React from 'react';
import { Sparkles, Shield, CheckCircle } from 'lucide-react';
import { GoogleAuthButton } from '../../auth/components/GoogleAuthButton';

interface WelcomeHeroProps {
  onGoogleSignIn: () => void;
  isLoading?: boolean;
}

export const WelcomeHero: React.FC<WelcomeHeroProps> = ({ onGoogleSignIn, isLoading = false }) => {
  return (
    <section className="text-center pt-8 sm:pt-14 pb-8 max-w-3xl mx-auto px-4 relative">
      {/* Eye-catching badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold mb-6 shadow-2xs">
        <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
        <span>المنصة الأحدث لمدرسي الدروس الخصوصية والسناتر في مصر</span>
      </div>

      {/* Main Punchy Title */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6">
        وداعاً لكشاكيل الحسابات،
        <br />
        أهلاً بنظام <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 font-mono">Tallyo</span>
      </h1>

      {/* Sub-headline */}
      <p className="text-sm sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8 font-medium">
        تابع بدقة <b>مين دفع ومين متأخر</b>، وسجّل حضور الطلاب بالـ QR المتغير، وابعث تذكير واتساب لولي الأمر بضغطة زر واحدة بدون أي برامج معقدة.
      </p>

      {/* Primary Google Auth Call-to-Action */}
      <div className="max-w-xs sm:max-w-sm mx-auto mb-6">
        <GoogleAuthButton onClick={onGoogleSignIn} isLoading={isLoading} />
      </div>

      {/* Trust Micro-pills */}
      <div className="flex items-center justify-center flex-wrap gap-4 text-xs text-slate-500 font-medium">
        <span className="flex items-center gap-1.5">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
          حساب سحابي مستقل لكل مدرس
        </span>
        <span className="flex items-center gap-1.5">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
          مجاني للبدء والتجربة
        </span>
        <span className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-indigo-600" />
          تشفير وأمان 100%
        </span>
      </div>
    </section>
  );
};
