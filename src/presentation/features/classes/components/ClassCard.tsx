import React, { useState } from 'react';
import { Copy, Check, ArrowLeft, Clock } from '@phosphor-icons/react';
import type { ClassItem } from '../../dashboard/types/dashboardTypes';
import { useDashboard } from '../../../state/useDashboard';

interface ClassCardProps {
  classItem: ClassItem;
  onSelect: (classItem: ClassItem) => void;
}

export const ClassCard: React.FC<ClassCardProps> = ({ classItem, onSelect }) => {
  const { showToast } = useDashboard();
  const [copied, setCopied] = useState(false);

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(classItem.joinCode);
    setCopied(true);
    showToast(`تم نسخ كود الانضمام ${classItem.joinCode}`);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasSlots = classItem.scheduleSlots && classItem.scheduleSlots.length > 0;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(classItem)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(classItem); } }}
      className="p-6 rounded-2xl bg-white border border-zinc-200 flex flex-col justify-between gap-4 hover:border-teal-600 motion-base cursor-pointer group active:scale-[0.98] focus-ring select-none text-right"
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="title-2 text-[#181818] group-hover:text-teal-800 motion-color">
              {classItem.name}
            </h3>
            <span className="caption-4 text-zinc-500 block mt-1">
              {classItem.subject || 'عام'}
            </span>
          </div>

          <span className="px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-[#181818] caption-3 font-mono shrink-0">
            {classItem.studentCount} طالب
          </span>
        </div>

        <div className="space-y-2 p-3 rounded-lg bg-zinc-50 border border-zinc-200">
          <div className="flex items-center gap-1 caption-4 text-zinc-500">
            <Clock size={14} weight="bold" className="text-teal-700" />
            <span>مواعيد الحصص</span>
          </div>
          {hasSlots ? (
            <div className="flex flex-wrap gap-2">
              {classItem.scheduleSlots!.map((slot, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white border border-zinc-200 caption-4"
                >
                  <b className="text-teal-800">{slot.day}</b>
                  <span className="font-mono text-[#181818]">{slot.time}</span>
                </span>
              ))}
            </div>
          ) : (
            <span className="caption-3 text-[#181818] block">{classItem.schedule}</span>
          )}
        </div>

        <div className="flex items-center justify-between caption-4">
          <span className="text-zinc-500">سعر الحصة</span>
          <span className="title-4 text-[#181818] font-mono">
            {classItem.sessionPrice ? `${classItem.sessionPrice} جنيه` : `${Math.round(classItem.monthlyFee / 4)} جنيه`}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={handleCopyCode}
          className="flex-1 py-2 px-3 rounded-lg border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 flex items-center justify-between caption-4 motion-color focus-ring cursor-pointer min-h-[44px]"
          title="نسخ كود انضمام الطلاب"
        >
          <span className="text-zinc-500">كود الانضمام</span>
          <div className="flex items-center gap-2 font-mono font-semibold text-teal-800">
            <span>{classItem.joinCode}</span>
            {copied ? <Check size={16} weight="bold" className="text-emerald-700" /> : <Copy size={16} weight="bold" className="text-zinc-400" />}
          </div>
        </button>

        <span className="w-11 h-11 rounded-lg bg-zinc-100 group-hover:bg-[#181818] group-hover:text-white text-[#181818] flex items-center justify-center motion-base shrink-0">
          <ArrowLeft size={16} weight="bold" />
        </span>
      </div>
    </div>
  );
};
