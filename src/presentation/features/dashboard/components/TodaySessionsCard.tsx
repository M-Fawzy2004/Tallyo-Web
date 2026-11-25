import React from 'react';
import { Clock, Users, ArrowUpLeft } from '@phosphor-icons/react';
import { useDashboard } from '../../../state/useDashboard';

export const TodaySessionsCard: React.FC = () => {
  const { todaySessions, setActiveTab } = useDashboard();

  return (
    <div className="p-6 rounded-2xl bg-white border border-zinc-200 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="title-3 text-[#181818]">حصص ومجموعات اليوم</h3>
        <button
          type="button"
          onClick={() => setActiveTab('classes')}
          className="caption-3 text-teal-700 hover:text-teal-900 flex items-center gap-1 focus-ring rounded cursor-pointer"
        >
          <span>كل الصفوف</span>
          <ArrowUpLeft size={14} weight="bold" />
        </button>
      </div>

      <div className="space-y-3">
        {todaySessions.map((session) => (
          <div
            key={session.id}
            className="p-3 rounded-lg border border-zinc-200 bg-zinc-50 flex items-center justify-between gap-3"
          >
            <div>
              <h4 className="title-4 text-[#181818]">{session.className}</h4>
              <div className="flex flex-wrap items-center gap-2 caption-5 text-zinc-600 mt-1">
                <span>{session.centerName}</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1 font-mono">
                  <Clock size={14} weight="bold" className="text-amber-600" />
                  <span>{session.time}</span>
                </span>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white border border-zinc-200 text-[#181818] caption-3 font-mono shrink-0">
              <Users size={14} weight="bold" className="text-teal-700" />
              <span>{session.attendedCount} / {session.enrolledCount}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
