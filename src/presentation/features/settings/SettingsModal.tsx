import React, { useState } from 'react';
import { X, Key, ShieldCheck, Check, ArrowsLeftRight, WarningCircle } from '@phosphor-icons/react';
import { useDashboard } from '../../state/useDashboard';

export const SettingsModal: React.FC = () => {
  const { isSettingsOpen, setIsSettingsOpen, assistantPin, setAssistantPin, role, setRole, setActiveTab, showToast } = useDashboard();
  const [pinInput, setPinInput] = useState(assistantPin);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isSettingsOpen) return null;

  const handleSavePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.length !== 4) {
      setErrorMsg('يجب أن يتكون رمز الأسستنت من 4 أرقام');
      return;
    }
    setErrorMsg('');
    setAssistantPin(pinInput);
    setSavedSuccess(true);
    showToast('تم تحديث رمز الأسستنت بنجاح');
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleSwitchRole = () => {
    const nextRole = role === 'teacher' ? 'assistant' : 'teacher';
    setRole(nextRole);
    setActiveTab(nextRole === 'assistant' ? 'attendance' : 'dashboard');
    setIsSettingsOpen(false);
    showToast(nextRole === 'assistant' ? 'تم التبديل إلى وضع الأسستنت' : 'تم الرجوع إلى حساب المدرس');
  };

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 border border-zinc-200 relative text-right space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="heading-6 text-[#181818]">الإعدادات ورمز الأسستنت</h3>
            <p className="caption-5 text-zinc-500 mt-1">تحكم في رمز الدخول على الباب وتفاصيل الحساب</p>
          </div>
          <button
            type="button"
            onClick={() => setIsSettingsOpen(false)}
            aria-label="إغلاق"
            className="w-10 h-10 rounded-lg border border-zinc-200 text-zinc-500 hover:bg-zinc-100 flex items-center justify-center focus-ring cursor-pointer"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 caption-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">اسم المدرس</span>
            <span className="font-semibold text-[#181818]">أ. محمد فوزي</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">كود المدرس</span>
            <span className="font-mono font-semibold text-teal-800">TAL2026</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">البريد الإلكتروني</span>
            <span className="font-mono text-zinc-700">fawzy.edu@gmail.com</span>
          </div>
        </div>

        <form onSubmit={handleSavePin} noValidate className="space-y-3">
          <label htmlFor="pin-setting" className="block caption-3 text-[#181818]">
            الرمز السري لدخول الأسستنت (4 أرقام)
          </label>
          <div className="relative">
            <Key size={18} weight="bold" className="text-zinc-400 absolute top-3.5 start-3" />
            <input
              id="pin-setting"
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={pinInput}
              onChange={(e) => { setPinInput(e.target.value.replace(/\D/g, '')); setErrorMsg(''); }}
              className="w-full ps-10 pe-3 py-2 text-base font-mono font-semibold tracking-widest text-center bg-zinc-50 rounded-xl border border-zinc-200 min-h-[48px] focus-ring"
            />
          </div>

          {errorMsg && (
            <div role="alert" className="p-3 rounded-lg bg-rose-50 border border-rose-200 caption-3 text-rose-700 flex items-center gap-2">
              <WarningCircle size={16} weight="fill" className="shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 px-3 bg-[#181818] hover:bg-[#272727] text-white button-sm rounded-xl flex items-center justify-center gap-2 min-h-[44px] motion-base focus-ring cursor-pointer"
          >
            {savedSuccess ? <Check size={16} weight="bold" className="text-emerald-400" /> : <ShieldCheck size={16} weight="bold" />}
            <span>{savedSuccess ? 'تم حفظ الرمز بنجاح' : 'تحديث رمز الأسستنت'}</span>
          </button>
        </form>

        <button
          type="button"
          onClick={handleSwitchRole}
          className="w-full py-2 px-3 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-[#181818] button-xsm flex items-center justify-center gap-2 min-h-[44px] motion-color focus-ring cursor-pointer"
        >
          <ArrowsLeftRight size={16} weight="bold" />
          <span>
            {role === 'teacher' ? 'تبديل لوضع الأسستنت لمعاينة الباب' : 'الرجوع لحساب المدرس بالكامل'}
          </span>
        </button>
      </div>
    </div>
  );
};
