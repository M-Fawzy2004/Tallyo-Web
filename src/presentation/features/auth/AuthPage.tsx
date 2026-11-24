import React, { useState } from 'react';

export const AuthPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('جاري تسجيل الدخول بحساب Google...');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col justify-between items-center px-4 py-12 text-slate-800 antialiased selection:bg-slate-200">
      <div />

      {/* Main Plain Card */}
      <main className="w-full max-w-sm text-center">
        {/* Simple Brand Mark */}
        <div className="w-12 h-12 mx-auto mb-5 rounded-xl bg-slate-900 text-white font-mono font-bold text-xl flex items-center justify-center shadow-xs">
          T
        </div>

        {/* Plain Typography */}
        <h1 className="text-2xl font-bold font-mono text-slate-900 tracking-tight mb-2">
          Tallyo
        </h1>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          نظام بسيط لإدارة المجموعات، الحضور، ومتابعة مصاريف الطلاب بدقة.
        </p>

        {/* Clean Box */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 font-medium text-sm rounded-xl border border-slate-300 shadow-2xs transition-all min-h-[48px] cursor-pointer disabled:opacity-60"
          >
            {/* Google G Icon */}
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{isLoading ? 'جاري التحقق...' : 'المتابعة باستخدام Google'}</span>
          </button>

          <p className="text-xs text-slate-400 mt-4 leading-normal">
            تسجيل الدخول مخصص للمدرس. يتم إنشاء مساحة عمل خاصة ومستقلة لحسابك.
          </p>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="text-xs text-slate-400 font-mono text-center">
        Tallyo &copy; 2026
      </footer>
    </div>
  );
};
