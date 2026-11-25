import React from 'react';
import { Check, X, Clock, UserPlus } from '@phosphor-icons/react';
import { useDashboard } from '../../../state/useDashboard';

export const JoinRequestsCard: React.FC = () => {
  const { joinRequests, approveJoinRequest, rejectJoinRequest, setActiveTab } = useDashboard();

  return (
    <div className="p-6 rounded-2xl bg-white border border-zinc-200 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="title-3 text-[#181818]">طلبات الانضمام الجديدة</h3>
          {joinRequests.length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 caption-3 font-mono">
              {joinRequests.length}
            </span>
          )}
        </div>
      </div>

      {joinRequests.length === 0 ? (
        <div className="p-6 rounded-lg bg-zinc-50 border border-zinc-200 text-center space-y-2">
          <UserPlus size={24} weight="duotone" className="text-zinc-400 mx-auto" />
          <p className="body-5 text-zinc-600">لا توجد طلبات انضمام معلقة حالياً</p>
          <button
            type="button"
            onClick={() => setActiveTab('classes')}
            className="caption-3 text-teal-700 hover:underline focus-ring rounded cursor-pointer"
          >
            شارك كود الصف ليظهر طلابك هنا
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {joinRequests.map((req) => (
            <div
              key={req.id}
              className="p-3 rounded-lg border border-zinc-200 bg-zinc-50 flex items-center justify-between gap-3"
            >
              <div>
                <h4 className="title-4 text-[#181818]">{req.studentName}</h4>
                <div className="flex flex-wrap items-center gap-2 caption-5 text-zinc-600 mt-1">
                  <span>{req.className}</span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} weight="bold" className="text-zinc-400" />
                    <span>{req.requestedAt}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => approveJoinRequest(req.id)}
                  className="px-3 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white button-xsm min-h-[38px] flex items-center gap-1 motion-base active:scale-[0.98] focus-ring cursor-pointer"
                >
                  <Check size={14} weight="bold" />
                  <span>قبول</span>
                </button>
                <button
                  type="button"
                  onClick={() => rejectJoinRequest(req.id)}
                  aria-label="رفض الطلب"
                  className="w-10 h-10 rounded-lg border border-zinc-200 bg-white text-zinc-500 hover:text-rose-700 hover:bg-rose-50 flex items-center justify-center motion-color focus-ring cursor-pointer"
                >
                  <X size={16} weight="bold" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
