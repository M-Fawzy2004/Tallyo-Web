import React from 'react';
import { UserPlus, QrCode } from '@phosphor-icons/react';
import { DashboardKpiCards } from './components/DashboardKpiCards';
import { TodaySessionsCard } from './components/TodaySessionsCard';
import { JoinRequestsCard } from './components/JoinRequestsCard';
import { AddStudentModal } from '../students/components/AddStudentModal';
import { useDashboard } from '../../state/useDashboard';

export const DashboardTab: React.FC = () => {
  const { setActiveTab, isAddStudentOpen, setIsAddStudentOpen } = useDashboard();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="heading-4 text-[#181818]">نظرة عامة على شغلك</h2>
          <p className="body-6 text-zinc-600 mt-1">متابعة سريعة للمجموعات والتحصيل وحصص اليوم</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('attendance')}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3 py-2 bg-[#181818] hover:bg-[#272727] text-white button-sm rounded-xl min-h-[44px] motion-base active:scale-[0.98] focus-ring cursor-pointer"
          >
            <QrCode size={18} weight="bold" className="text-emerald-400" />
            <span>بدء الحضور</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAddStudentOpen(true)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3 py-2 bg-[#0F766E] hover:bg-[#115E59] text-white button-sm rounded-xl min-h-[44px] motion-base active:scale-[0.98] focus-ring cursor-pointer"
          >
            <UserPlus size={18} weight="bold" />
            <span>إضافة طالب</span>
          </button>
        </div>
      </div>

      <DashboardKpiCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <TodaySessionsCard />
        <JoinRequestsCard />
      </div>

      <AddStudentModal isOpen={isAddStudentOpen} onClose={() => setIsAddStudentOpen(false)} />
    </div>
  );
};
