import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface WelcomeNavbarProps {
  onSignIn: () => void;
}

export const WelcomeNavbar: React.FC<WelcomeNavbarProps> = ({ onSignIn }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white font-black text-xl font-mono shadow-md shadow-indigo-600/25">
            T
          </div>
          <div className="flex items-center gap-2">
            <span className="font-black text-xl text-slate-900 font-mono tracking-tight">Tallyo</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              إصدار 1.0
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSignIn}
            className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm active:scale-95 transition-all shadow-xs min-h-[42px] cursor-pointer"
          >
            <span>دخول بحساب Google</span>
            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </header>
  );
};
