import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { AssistantAuthPanel } from './AssistantAuthPanel';

interface AuthRightPanelProps {
  onGoogleSignIn: () => void;
  onAssistantSignIn: (identifier: string, pin: string) => void;
  isLoading: boolean;
}

export const AuthRightPanel: React.FC<AuthRightPanelProps> = ({
  onGoogleSignIn,
  onAssistantSignIn,
  isLoading,
}) => {
  const [isAssistantMode, setIsAssistantMode] = useState(false);

  return (
    <div className="w-full h-full max-h-[100dvh] flex flex-col justify-between py-6 sm:py-8 lg:py-10 px-6 sm:px-8 max-w-md mx-auto bg-white text-right">
      {/* Brand Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-mono font-bold text-lg flex items-center justify-center shadow-xs">
          T
        </div>
        <span className="font-mono font-bold text-xl tracking-tight text-slate-900">
          Tallyo
        </span>
      </div>

      {/* Main Centered Content */}
      <div className="my-auto py-4">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
          أهلاً بك في تاليو
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
          أدِر مجموعاتك، تابع مصاريف طلابك، وسجّل الحضور بالـ QR في ثوانٍ — من غير ورق ولا لخبطة.
        </p>

        {!isAssistantMode ? (
          <div>
            {/* Google Sign-In Button */}
            <button
              type="button"
              onClick={onGoogleSignIn}
              disabled={isLoading}
              className="h-12 w-full rounded-xl border border-slate-200 bg-white shadow-xs hover:bg-slate-50 active:bg-slate-100 font-semibold text-slate-700 text-sm flex items-center justify-center gap-3 transition-all min-h-[48px] cursor-pointer disabled:opacity-60"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{isLoading ? 'جاري التحقق...' : 'المتابعة باستخدام Google'}</span>
            </button>

            <p className="text-xs text-slate-600 mt-2.5 text-center">
              دخول آمن بضغطة واحدة • بيانات طلابك وحساباتك خاصة بك تماماً.
            </p>

            {/* 2 Focused Trust Pills (Removed the 30-student limit pill) */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="bg-slate-50 border border-slate-200/80 text-slate-600 text-xs rounded-full px-3 py-1">
                تذكير واتساب بضغطة
              </span>
              <span className="bg-slate-50 border border-slate-200/80 text-slate-600 text-xs rounded-full px-3 py-1">
                يعمل على الموبايل والكمبيوتر
              </span>
            </div>

            {/* Assistant Login Link */}
            <div className="border-t border-slate-100 mt-6 pt-4 text-center">
              <button
                type="button"
                onClick={() => setIsAssistantMode(true)}
                className="text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
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
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 inline-flex items-center gap-1 cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                <span>العودة لدخول المدرس (Google)</span>
              </button>
            </div>
          </div>
        )}

        {/* Student Note */}
        <p className="text-xs text-slate-500 mt-4 text-center leading-relaxed">
          للطلاب: افتح الرابط الشخصي المرسل إليك على واتساب مباشرة.
        </p>
      </div>

      {/* Footer */}
      <div className="text-xs text-slate-400 font-mono">
        Tallyo &copy; 2026
      </div>
    </div>
  );
};
