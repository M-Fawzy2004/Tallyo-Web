import React from 'react';
import { WarningCircle, Users } from '@phosphor-icons/react';
import type { StudentRecord } from '../../dashboard/types/dashboardTypes';

interface ManualCheckInListProps {
  students: StudentRecord[];
  onUpdateStatus: (id: string, status: StudentRecord['attendanceToday']) => void;
}

export const ManualCheckInList: React.FC<ManualCheckInListProps> = ({
  students,
  onUpdateStatus,
}) => {
  if (students.length === 0) {
    return (
      <div className="p-8 rounded-2xl bg-white border border-zinc-200 text-center space-y-2">
        <Users size={28} weight="duotone" className="text-zinc-400 mx-auto" />
        <h4 className="title-3 text-[#181818]">لا يوجد طلاب في هذا العرض</h4>
        <p className="body-6 text-zinc-500">اختر صفاً آخر أو أضف طلاباً لبدء تسجيل الحضور.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 divide-y divide-zinc-200 overflow-hidden">
      {students.map((s) => (
        <div
          key={s.id}
          className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-50 motion-color"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="title-3 text-[#181818]">{s.name}</span>
            {s.status !== 'PAID' && (
              <span className="inline-flex items-center gap-1 caption-3 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                <WarningCircle size={12} weight="fill" />
                <span>مطلوب {s.remainingAmount} ج.م</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onUpdateStatus(s.id, 'PRESENT')}
              className={`px-3 py-2 rounded-lg button-xsm min-h-[48px] sm:min-h-[40px] motion-base active:scale-[0.98] focus-ring cursor-pointer ${
                s.attendanceToday === 'PRESENT'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              حاضر
            </button>
            <button
              type="button"
              onClick={() => onUpdateStatus(s.id, 'LATE')}
              className={`px-3 py-2 rounded-lg button-xsm min-h-[48px] sm:min-h-[40px] motion-base active:scale-[0.98] focus-ring cursor-pointer ${
                s.attendanceToday === 'LATE'
                  ? 'bg-amber-600 text-white'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              متأخر
            </button>
            <button
              type="button"
              onClick={() => onUpdateStatus(s.id, 'ABSENT')}
              className={`px-3 py-2 rounded-lg button-xsm min-h-[48px] sm:min-h-[40px] motion-base active:scale-[0.98] focus-ring cursor-pointer ${
                s.attendanceToday === 'ABSENT'
                  ? 'bg-rose-600 text-white'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              غائب
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
