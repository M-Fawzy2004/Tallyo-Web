import React from 'react';
import { Users, Check, X } from '@phosphor-icons/react';
import type { JoinRequest } from '../../dashboard/types/dashboardTypes';

interface JoinRequestsListProps {
  requests: JoinRequest[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export const JoinRequestsList: React.FC<JoinRequestsListProps> = ({
  requests,
  onApprove,
  onReject,
}) => {
  if (requests.length === 0) {
    return (
      <div className="p-8 rounded-2xl bg-white border border-zinc-200 text-center space-y-2">
        <Users size={28} weight="duotone" className="text-zinc-400 mx-auto" />
        <h4 className="title-3 text-[#181818]">لا توجد طلبات انضمام جديدة</h4>
        <p className="body-6 text-zinc-500">عندما يدخل الطالب كود صفه سيظهر طلبه هنا للمراجعة.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 divide-y divide-zinc-200 overflow-hidden">
      {requests.map((r) => (
        <div key={r.id} className="p-4 flex items-center justify-between gap-3">
          <div>
            <h4 className="title-3 text-[#181818]">{r.studentName}</h4>
            <p className="caption-5 text-zinc-600 mt-1">{r.className} • {r.parentPhone}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onApprove(r.id)}
              className="px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg button-xsm min-h-[40px] flex items-center gap-1 focus-ring cursor-pointer"
            >
              <Check size={14} weight="bold" />
              <span>قبول</span>
            </button>
            <button
              type="button"
              onClick={() => onReject(r.id)}
              className="px-3 py-2 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-700 rounded-lg button-xsm min-h-[40px] flex items-center gap-1 focus-ring cursor-pointer"
            >
              <X size={14} weight="bold" />
              <span>رفض</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
