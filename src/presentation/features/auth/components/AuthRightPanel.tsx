import React, { useState } from 'react';
import { ArrowRight } from '@phosphor-icons/react';
import { AssistantAuthPanel } from './AssistantAuthPanel';
import { GoogleAuthButton } from './GoogleAuthButton';

interface AuthRightPanelProps {
  onGoogleSignIn: () => void;
  onAssistantSignIn: (identifier: string, pin: string) => void;
  onBackHome: () => void;
  defaultAssistantMode?: boolean;
  isLoading: boolean;
}

export const AuthRightPanel: React.FC<AuthRightPanelProps> = ({
  onGoogleSignIn,
  onAssistantSignIn,
  onBackHome,
  defaultAssistantMode = false,
  isLoading,
}) => {
  const [isAssistantMode, setIsAssistantMode] = useState(defaultAssistantMode);

  return (
    <div className="w-full h-full max-h-[100dvh] flex flex-col justify-between py-6 sm:py-8 lg:py-10 px-6 sm:px-8 max-w-md mx-auto bg-white text-right">
      {/* Top Bar: Brand + Back Home */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-9 h-9 rounded-lg bg-[#181818] text-white font-mono font-bold text-lg flex items-center justify-center">
            T
          </span>
          <span className="font-mono title-2 text-[#181818] tracking-tight">Tallyo</span>
        </div>

        <button
          type="button"
          onClick={onBackHome}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 caption-3 text-zinc-700 motion-color focus-ring cursor-pointer"
        >
          <ArrowRight size={14} weight="bold" />
          <span>العودة للرئيسية</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="my-auto py-4">
        <h1 className="heading-4 text-[#181818] mb-2">
          {isAssistantMode ? 'دخول الأسستنت على الباب' : 'أهلاً بك في تاليو'}
        </h1>
        <p className="body-6 text-zinc-600 mb-6 leading-relaxed">
          {isAssistantMode
            ? 'أدخل كود المدرس والرمز السري لتسجيل الحضور واستلام دفعات الطلاب.'
            : 'أدِر مجموعاتك، تابع مصاريف طلابك، وسجّل الحضور بالـ QR في ثوانٍ من غير ورق.'}
        </p>

        {!isAssistantMode ? (
          <div className="space-y-4">
            <GoogleAuthButton onClick={onGoogleSignIn} isLoading={isLoading} />

            <p className="caption-4 text-zinc-600 text-center">
              دخول آمن بضغطة واحدة • بيانات طلابك وحساباتك خاصة بك تماماً.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="bg-zinc-50 border border-zinc-200 text-zinc-600 caption-4 rounded-full px-3 py-1">
                تذكير واتساب بضغطة
              </span>
              <span className="bg-zinc-50 border border-zinc-200 text-zinc-600 caption-4 rounded-full px-3 py-1">
                يعمل على الموبايل والكمبيوتر
              </span>
            </div>

            <div className="pt-4 text-center">
              <button
                type="button"
                onClick={() => setIsAssistantMode(true)}
                className="caption-3 text-teal-800 hover:text-teal-950 underline underline-offset-4 motion-color focus-ring rounded cursor-pointer"
              >
                تعمل كـ أسستنت؟ تسجيل الدخول بالكود
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <AssistantAuthPanel
              onSubmit={(creds) => onAssistantSignIn(creds.teacherIdentifier, creds.pin)}
              isLoading={isLoading}
            />

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setIsAssistantMode(false)}
                className="caption-3 text-zinc-600 hover:text-[#181818] inline-flex items-center gap-1 focus-ring rounded cursor-pointer"
              >
                <ArrowRight size={14} weight="bold" />
                <span>العودة لدخول المدرس (Google)</span>
              </button>
            </div>
          </div>
        )}

        <p className="caption-5 text-zinc-500 mt-6 text-center">
          للطلاب: افتح الرابط الشخصي المرسل إليك على واتساب مباشرة.
        </p>
      </div>

      <div className="caption-5 text-zinc-400 font-mono">
        Tallyo &copy; 2026
      </div>
    </div>
  );
};
