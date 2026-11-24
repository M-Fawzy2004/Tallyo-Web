import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import type { AuthMode, TeacherAuthCredentials } from '../types';

interface EmailAuthFormProps {
  mode: AuthMode;
  onModeChange: (newMode: AuthMode) => void;
  onSubmit: (credentials: TeacherAuthCredentials) => void;
  isLoading?: boolean;
}

export const EmailAuthForm: React.FC<EmailAuthFormProps> = ({
  mode,
  onModeChange,
  onSubmit,
  isLoading = false,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    onSubmit({ email, password, rememberMe });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-start">
      {/* Email Input */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">البريد الإلكتروني للمدرس</label>
        <div className="relative">
          <Mail className="w-4 h-4 text-slate-400 absolute top-3.5 start-3.5" />
          <input
            type="email"
            placeholder="teacher@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full ps-10 pe-4 py-3 text-sm bg-slate-50 focus:bg-white rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all min-h-[48px] font-mono text-start"
            dir="ltr"
            required
          />
        </div>
      </div>

      {/* Password Input */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-bold text-slate-700">كلمة المرور</label>
          {mode === 'login' && (
            <button
              type="button"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              نسيت كلمة المرور؟
            </button>
          )}
        </div>
        <div className="relative">
          <Lock className="w-4 h-4 text-slate-400 absolute top-3.5 start-3.5" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full ps-10 pe-11 py-3 text-sm bg-slate-50 focus:bg-white rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all min-h-[48px] font-mono text-start"
            dir="ltr"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-2.5 end-2 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Remember Me Checkbox */}
      <div className="flex items-center justify-between pt-1">
        <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-600 select-none">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500"
          />
          <span>تذكر هذا الجهاز دائماً</span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-md shadow-indigo-600/20 transition-all min-h-[50px] cursor-pointer disabled:opacity-60"
      >
        <span>{mode === 'login' ? 'دخول حساب المدرس' : 'إنشاء حساب جديد للمدرس'}</span>
        <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
      </button>

      {/* Toggle Mode */}
      <div className="text-center pt-2">
        {mode === 'login' ? (
          <p className="text-xs text-slate-500">
            ليس لديك حساب مدرس بعد؟{' '}
            <button
              type="button"
              onClick={() => onModeChange('register')}
              className="font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
            >
              أنشئ حسابك مجاناً
            </button>
          </p>
        ) : (
          <p className="text-xs text-slate-500">
            لديك حساب بالفعل؟{' '}
            <button
              type="button"
              onClick={() => onModeChange('login')}
              className="font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
            >
              سجل دخولك الآن
            </button>
          </p>
        )}
      </div>
    </form>
  );
};
