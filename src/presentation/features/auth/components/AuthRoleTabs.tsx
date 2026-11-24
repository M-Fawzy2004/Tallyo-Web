import React from 'react';
import { GraduationCap, KeyRound } from 'lucide-react';
import type { AuthRole } from '../types';

interface AuthRoleTabsProps {
  activeRole: AuthRole;
  onRoleChange: (role: AuthRole) => void;
}

export const AuthRoleTabs: React.FC<AuthRoleTabsProps> = ({
  activeRole,
  onRoleChange,
}) => {
  return (
    <div className="flex items-center p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80 mb-6">
      <button
        type="button"
        onClick={() => onRoleChange('teacher')}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[42px] cursor-pointer ${
          activeRole === 'teacher'
            ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/60'
            : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        <GraduationCap className="w-4 h-4 text-indigo-600" />
        <span>دخول المدرس</span>
      </button>

      <button
        type="button"
        onClick={() => onRoleChange('assistant')}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[42px] cursor-pointer ${
          activeRole === 'assistant'
            ? 'bg-white text-emerald-800 shadow-xs border border-slate-200/60'
            : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        <KeyRound className="w-4 h-4 text-emerald-600" />
        <span>دخول الأسستنت</span>
      </button>
    </div>
  );
};
