import React, { useState } from 'react';
import { Hash, Key, ArrowLeft, WarningCircle } from '@phosphor-icons/react';
import type { AssistantCredentials } from '../types';

interface AssistantAuthPanelProps {
  onSubmit: (creds: AssistantCredentials) => void;
  isLoading: boolean;
}

export const AssistantAuthPanel: React.FC<AssistantAuthPanelProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [teacherIdentifier, setTeacherIdentifier] = useState('TAL2026');
  const [pin, setPin] = useState('4821');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherIdentifier.trim()) {
      setErrorMsg('يرجى إدخال كود المدرس أو بريده الإلكتروني');
      return;
    }
    if (pin.length < 4) {
      setErrorMsg('الرقم السري يجب أن يتكون من 4 أرقام');
      return;
    }
    setErrorMsg('');
    onSubmit({ teacherIdentifier: teacherIdentifier.trim(), pin });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4 text-start">
      <div>
        <label htmlFor="teacher-id" className="block title-4 text-[#181818] mb-2">
          كود أو بريد المدرس
        </label>
        <div className="relative">
          <Hash size={18} weight="bold" className="text-zinc-400 absolute top-3.5 start-3" />
          <input
            id="teacher-id"
            type="text"
            placeholder="مثال: TAL2026 أو بريد المدرس"
            value={teacherIdentifier}
            onChange={(e) => { setTeacherIdentifier(e.target.value); setErrorMsg(''); }}
            className="w-full ps-10 pe-4 py-2 text-base bg-zinc-50 focus:bg-white rounded-xl border border-zinc-200 focus-ring min-h-[48px]"
          />
        </div>
      </div>

      <div>
        <label htmlFor="assistant-pin" className="block title-4 text-[#181818] mb-2">
          الرقم السري (4 أرقام)
        </label>
        <div className="relative">
          <Key size={18} weight="bold" className="text-zinc-400 absolute top-3.5 start-3" />
          <input
            id="assistant-pin"
            type="password"
            inputMode="numeric"
            maxLength={4}
            placeholder="••••"
            value={pin}
            onChange={(e) => { setPin(e.target.value.replace(/\D/g, '')); setErrorMsg(''); }}
            className="w-full ps-10 pe-4 py-2 text-base font-mono font-semibold tracking-widest text-center bg-zinc-50 focus:bg-white rounded-xl border border-zinc-200 focus-ring min-h-[48px]"
          />
        </div>
      </div>

      {errorMsg && (
        <div role="alert" className="p-3 rounded-xl bg-rose-50 border border-rose-200 caption-3 text-rose-700 flex items-center gap-2">
          <WarningCircle size={18} weight="fill" className="shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#047857] hover:bg-[#065F46] active:scale-[0.98] text-white button-md rounded-xl min-h-[48px] motion-base focus-ring cursor-pointer disabled:opacity-70"
      >
        {isLoading ? (
          <span className="h-4 w-32 rounded bg-white/30 animate-pulse" />
        ) : (
          <>
            <span>دخول كـ أسستنت</span>
            <ArrowLeft size={18} weight="bold" />
          </>
        )}
      </button>

      <p className="caption-5 text-zinc-500 text-center">
        صلاحيات محدودة للتحضير السريع على الباب وتسجيل الدفعات فقط.
      </p>
    </form>
  );
};
