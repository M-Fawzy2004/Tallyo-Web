import React from 'react';
import { Users, Wallet, WarningCircle, CalendarCheck, Eye, EyeSlash } from '@phosphor-icons/react';
import { useDashboard } from '../../../state/useDashboard';
import type { StudentRecord } from '../types/dashboardTypes';

export const DashboardKpiCards: React.FC = () => {
  const { students, isPrivacyMode, togglePrivacyMode, role } = useDashboard();

  const totalStudents = students.length;
  const overdueCount = students.filter((s: StudentRecord) => s.status !== 'PAID').length;
  const collectedTotal = students.reduce((acc: number, s: StudentRecord) => acc + s.paidAmount, 0);
  const presentToday = students.filter((s: StudentRecord) => s.attendanceToday === 'PRESENT').length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <div className="p-4 rounded-2xl bg-white border border-zinc-200 flex flex-col justify-between gap-3">
        <div className="flex items-center justify-between text-zinc-600">
          <span className="caption-3">إجمالي الطلاب</span>
          <Users size={18} weight="duotone" className="text-[#181818]" />
        </div>
        <div>
          <span className="heading-4 font-mono text-[#181818]">{totalStudents}</span>
          <span className="caption-5 text-zinc-500 block mt-1">طالب مسجل</span>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-zinc-200 flex flex-col justify-between gap-3">
        <div className="flex items-center justify-between text-zinc-600">
          <span className="caption-3">تحصيل الشهر</span>
          <div className="flex items-center gap-1">
            {role === 'teacher' && (
              <button
                type="button"
                onClick={togglePrivacyMode}
                aria-label="إخفاء أو إظهار التحصيل"
                className="p-1 rounded-md text-zinc-500 hover:text-[#181818] focus-ring cursor-pointer"
              >
                {isPrivacyMode ? <EyeSlash size={16} weight="bold" className="text-amber-600" /> : <Eye size={16} weight="bold" />}
              </button>
            )}
            <Wallet size={18} weight="duotone" className="text-emerald-700" />
          </div>
        </div>
        <div>
          <span className={`heading-4 font-mono text-emerald-700 block ${isPrivacyMode ? 'blur-sm select-none' : ''}`}>
            {isPrivacyMode ? '•••• ج.م' : `${collectedTotal.toLocaleString('en-US')} ج.م`}
          </span>
          <span className="caption-5 text-zinc-500 block mt-1">محصل حتى الآن</span>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-zinc-200 flex flex-col justify-between gap-3">
        <div className="flex items-center justify-between text-zinc-600">
          <span className="caption-3">متأخرين في الدفع</span>
          <WarningCircle size={18} weight="duotone" className="text-rose-600" />
        </div>
        <div>
          <span className="heading-4 font-mono text-rose-600">{overdueCount}</span>
          <span className="caption-5 text-zinc-500 block mt-1">طالب مطلوب سداده</span>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-zinc-200 flex flex-col justify-between gap-3">
        <div className="flex items-center justify-between text-zinc-600">
          <span className="caption-3">حضور اليوم</span>
          <CalendarCheck size={18} weight="duotone" className="text-teal-700" />
        </div>
        <div>
          <span className="heading-4 font-mono text-[#181818]">{presentToday}</span>
          <span className="caption-5 text-zinc-500 block mt-1">حضروا اليوم</span>
        </div>
      </div>
    </div>
  );
};
