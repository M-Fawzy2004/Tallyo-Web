import React, { useState } from 'react';
import { X, ShieldAlert, KeyRound, Hash, ArrowLeft } from 'lucide-react';
import type { AssistantPinCredentials } from '../types';

interface AssistantPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (credentials: AssistantPinCredentials) => void;
}

export const AssistantPinModal: React.FC<AssistantPinModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [teacherCode, setTeacherCode] = useState('');
  const [pin, setPin] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherCode || pin.length < 4) return;
    onSubmit({ teacherCode, pin });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 start-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 min-h-[40px] min-w-[40px] flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 mx-auto border border-amber-200/80">
          <ShieldAlert className="w-6 h-6" />
        </div>

        <h3 className="font-black text-xl text-slate-900 text-center mb-1">
          دخول المساعد (Assistant) على الباب
        </h3>
        <p className="text-xs text-slate-500 text-center mb-6 leading-relaxed">
          أدخل كود المدرس والرمز السري (4 أرقام) للتحضير وتسجيل الدفعات، دون الحاجة لحساب المدرس الشخصي.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-start">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">كود المدرس (Teacher Code)</label>
            <div className="relative">
              <Hash className="w-4 h-4 text-slate-400 absolute top-3.5 start-3.5" />
              <input
                type="text"
                placeholder="مثال: TAL-2026"
                value={teacherCode}
                onChange={(e) => setTeacherCode(e.target.value.toUpperCase())}
                className="w-full ps-10 pe-4 py-3 text-sm font-mono font-bold uppercase bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 min-h-[48px]"
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
                className="w-full ps-10 pe-4 py-3 text-lg font-mono font-black tracking-widest text-center bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 min-h-[48px]"
                required
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block text-center">
              الصلاحيات محدودة للتحضير والتحصيل اليومي فقط (ممنوع رؤية الأرباح)
            </span>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-black text-sm rounded-xl min-h-[48px] shadow-md shadow-amber-600/20 transition-all cursor-pointer"
          >
            <span>فتح شاشة الباب</span>
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          </button>
        </form>
      </div>
    </div>
  );
};
