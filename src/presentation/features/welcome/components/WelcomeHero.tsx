import React from 'react';
import { CheckCircle, ShieldCheck } from '@phosphor-icons/react';
import { GoogleAuthButton } from '../../auth/components/GoogleAuthButton';

interface WelcomeHeroProps {
  onGoogleSignIn: () => void;
  onAssistantLogin: () => void;
  isLoading: boolean;
}

export const WelcomeHero: React.FC<WelcomeHeroProps> = ({
  onGoogleSignIn,
  onAssistantLogin,
  isLoading,
}) => {
  return (
    <section id="top" className="pt-28 sm:pt-36 pb-8 px-4 text-center">
      <div className="max-w-[680px] mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 caption-4 text-zinc-700 mb-6">
          <ShieldCheck size={16} weight="duotone" className="text-emerald-700" />
          <span>نظام إدارة الحصص والمصاريف للمدرسين والسناتر في مصر</span>
        </div>

        <h1 className="heading-1 bg-gradient-to-r from-[#000000] to-[#666666] bg-clip-text text-transparent pb-2 mb-4">
          حسابات طلابك وحضور الحصص
          <br />
          في مكان واحد من غير ورق
        </h1>

        <p className="body-2 text-zinc-600 leading-relaxed mb-8">
          سجّل حضور الطلاب بكود QR يتجدد كل 20 ثانية، وتابع السداد لحظة بلحظة، وأرسل تذكير واتساب لولي الأمر بضغطة واحدة.
        </p>

        <div className="max-w-xs mx-auto space-y-3 mb-6">
          <GoogleAuthButton onClick={onGoogleSignIn} isLoading={isLoading} />
          <button
            type="button"
            onClick={onAssistantLogin}
            className="caption-4 text-zinc-600 hover:text-[#181818] underline underline-offset-4 motion-color focus-ring rounded cursor-pointer"
          >
            تعمل كـ أسستنت على الباب؟ سجل الدخول بكود المدرس
          </button>
        </div>

        <div className="flex items-center justify-center flex-wrap gap-4 caption-4 text-zinc-500">
          <span className="inline-flex items-center gap-1">
            <CheckCircle size={16} weight="fill" className="text-emerald-700" />
            <span>حساب سحابي مستقل لكل مدرس</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <CheckCircle size={16} weight="fill" className="text-emerald-700" />
            <span>يعمل على الهاتف والكمبيوتر بدون تثبيت</span>
          </span>
        </div>
      </div>
    </section>
  );
};
