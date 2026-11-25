import React from 'react';
import { RevealSection } from '../../../components/feedback/RevealSection';
import { GoogleAuthButton } from '../../auth/components/GoogleAuthButton';

interface FinalCtaSectionProps {
  onGoogleSignIn: () => void;
  onAssistantLogin: () => void;
  isLoading: boolean;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onGoogleSignIn,
  onAssistantLogin,
  isLoading,
}) => {
  return (
    <RevealSection className="max-w-5xl mx-auto px-4 py-16">
      <div className="p-8 sm:p-12 rounded-3xl bg-[#181818] text-white border border-[#272727] text-center">
        <div className="max-w-[680px] mx-auto space-y-6">
          <h2 className="heading-3 bg-gradient-to-r from-[#FFFFFF] to-[#9B9B9B] bg-clip-text text-transparent">
            ابدأ تنظيم مجموعاتك وحصصك اليوم
          </h2>
          <p className="body-3 text-zinc-300 leading-relaxed">
            لا يتطلب بطاقة بنكية ولا تثبيت برامج. سجّل بحساب Google وأنشئ صفك الأول مع مواعيد كل يوم خلال دقيقة واحدة.
          </p>
          <div className="max-w-xs mx-auto space-y-3">
            <GoogleAuthButton onClick={onGoogleSignIn} isLoading={isLoading} variant="dark" />
            <button
              type="button"
              onClick={onAssistantLogin}
              className="caption-4 text-zinc-400 hover:text-white underline underline-offset-4 motion-color focus-ring rounded cursor-pointer"
            >
              أو سجل الدخول كـ أسستنت بكود المدرس
            </button>
          </div>
        </div>
      </div>
    </RevealSection>
  );
};
