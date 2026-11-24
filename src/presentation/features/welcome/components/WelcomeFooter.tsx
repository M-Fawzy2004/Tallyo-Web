import React from 'react';

export const WelcomeFooter: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/80 py-8 bg-white/60 text-center text-xs text-slate-500">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-mono font-black text-xs flex items-center justify-center">
            T
          </div>
          <span className="font-mono font-bold text-slate-800 text-sm">Tallyo</span>
          <span>• نظام إدارة الدروس والسناتر في مصر</span>
        </div>
        <p className="text-[11px] font-mono text-slate-400">
          جميع الحقوق محفوظة &copy; 2026 Tallyo.app
        </p>
      </div>
    </footer>
  );
};
