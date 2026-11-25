import React, { useState } from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { useDashboard } from '../../state/useDashboard';
import { CustomSelect } from '../../components/ui/CustomSelect';
import { DynamicQrCard } from './components/DynamicQrCard';
import { ManualCheckInList } from './components/ManualCheckInList';
import { FullScreenQrModal } from './components/FullScreenQrModal';

export const AttendanceTab: React.FC = () => {
  const { students, classes, updateAttendance } = useDashboard();
  const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || 'c1');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);

  const selectedClass = classes.find((c) => c.id === selectedClassId) || classes[0];
  const classStudents = students.filter(
    (s) => s.classId === selectedClassId && (s.name.includes(searchQuery) || s.parentPhone.includes(searchQuery))
  );

  const presentCount = classStudents.filter((s) => s.attendanceToday === 'PRESENT').length;
  const lateCount = classStudents.filter((s) => s.attendanceToday === 'LATE').length;
  const absentCount = classStudents.filter((s) => s.attendanceToday === 'ABSENT').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-zinc-200">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label htmlFor="att-class" className="caption-3 text-zinc-600 whitespace-nowrap">الصف:</label>
          <CustomSelect
            id="att-class"
            value={selectedClassId}
            onChange={setSelectedClassId}
            className="flex-1 sm:w-60"
            options={classes.map((c) => ({ value: c.id, label: c.name }))}
          />
        </div>

        <div className="flex items-center gap-2 caption-3 w-full sm:w-auto justify-end">
          <span className="px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono">
            حاضر: {presentCount}
          </span>
          <span className="px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 font-mono">
            متأخر: {lateCount}
          </span>
          <span className="px-3 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 font-mono">
            غائب: {absentCount}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5">
          <DynamicQrCard
            classNameTitle={selectedClass?.name || 'الصف الدراسي'}
            onFullScreen={() => setIsFullScreenOpen(true)}
          />
        </div>

        <div className="lg:col-span-7 space-y-3">
          <div className="relative">
            <MagnifyingGlass size={18} weight="bold" className="text-zinc-400 absolute top-3.5 start-3" />
            <input
              type="text"
              placeholder="ابحث عن طالب في هذا الصف"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full ps-10 pe-3 py-2 text-base sm:text-sm bg-white rounded-xl border border-zinc-200 min-h-[48px] focus-ring"
            />
          </div>

          <ManualCheckInList students={classStudents} onUpdateStatus={updateAttendance} />
        </div>
      </div>

      <FullScreenQrModal
        isOpen={isFullScreenOpen}
        onClose={() => setIsFullScreenOpen(false)}
        classNameTitle={selectedClass?.name || 'حصة اليوم'}
      />
    </div>
  );
};
