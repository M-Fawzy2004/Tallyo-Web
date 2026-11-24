import React, { useState } from 'react';
import { Hash, KeyRound, ArrowLeft } from 'lucide-react';
import type { AssistantCredentials } from '../types';

interface AssistantAuthPanelProps {
  onSubmit: (creds: AssistantCredentials) => void;
  isLoading: boolean;
}

export const AssistantAuthPanel: React.FC<AssistantAuthPanelProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [teacherIdentifier, setTeacherIdentifier] = useState('');
  const [pin, setPin] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherIdentifier || pin.length < 4) return;
    onSubmit({ teacherIdentifier, pin });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-start">
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">كود أو إيميل المدرس</label>
        <div className="relative">
          <Hash className="w-4 h-4 text-slate-400 absolute top-3.5 start-3.5" />
          <input
            type="text"
            placeholder="مثال: TAL-2026 أو إيميل المدرس"
            value={teacherIdentifier}
            onChange={(e) => setTeacherIdentifier(e.target.value)}
            className="w-full ps-10 pe-4 py-3 text-sm bg-slate-50 focus:bg-white rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all min-h-[48px]"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">الرقم السري (4 أرقام PIN)</label>
        <div className="relative">
          <KeyRound className="w-4 h-4 text-slate-400 absolute top-3.5 start-3.5" />
          <input
            type="password"
            maxLength={4}
            placeholder="••••"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
            className="w-full ps-10 pe-4 py-3 text-base font-mono font-bold tracking-widest text-center bg-slate-50 focus:bg-white rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all min-h-[48px]"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || pin.length < 4}
        className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-sm sm:text-base rounded-2xl shadow-xs transition-all min-h-[50px] cursor-pointer disabled:opacity-60"
      >
        <span>{isLoading ? 'جاري الدخول...' : 'دخول كـ أسستنت'}</span>
        <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
      </button>

      <p className="text-[11px] text-slate-400 text-center leading-normal">
        صلاحيات محدودة للتحضير السريع على الباب وتسجيل الدفعات فقط.
      </p>
    </form>
  );
};
