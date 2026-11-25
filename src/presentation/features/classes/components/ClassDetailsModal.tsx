import React, { useState } from 'react';
import { X, Copy, Check, WhatsappLogo, QrCode, DeviceMobile, Users } from '@phosphor-icons/react';
import type { ClassItem } from '../../dashboard/types/dashboardTypes';
import { useDashboard } from '../../../state/useDashboard';

interface ClassDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  classItem: ClassItem | null;
}

export const ClassDetailsModal: React.FC<ClassDetailsModalProps> = ({ isOpen, onClose, classItem }) => {
  const { setActiveTab, showToast } = useDashboard();
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  if (!isOpen || !classItem) return null;

  const teacherHandle = classItem.teacherHandle || '@mr_ahmed';
  const classCode = classItem.joinCode;
  const directLink = `https://tallyo.app/join/${classCode}`;

  const copyText = (text: string, type: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(type);
    showToast(`تم نسخ ${label}`);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const scheduleText = classItem.scheduleSlots?.map((s) => `${s.day} (${s.time})`).join(' • ') || classItem.schedule;
  const waShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `أهلاً بكم طلاب ${classItem.name}\nكود المجموعة: ${classCode}\nالمواعيد: ${scheduleText}\nمعرف المدرس: ${teacherHandle}\nالرابط المباشر: ${directLink}`
  )}`;

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/70 backdrop-blur-xs select-none">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 border border-zinc-200 relative max-h-[92vh] overflow-y-auto text-right space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="heading-6 text-[#181818]">{classItem.name}</h3>
              <span className="caption-3 text-teal-800 bg-teal-50 border border-teal-200 px-3 py-0.5 rounded-full">
                {classItem.subject || 'رياضيات'}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {classItem.scheduleSlots ? (
                classItem.scheduleSlots.map((s, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200 caption-4">
                    <b className="text-teal-800">{s.day}</b>
                    <span className="font-mono text-[#181818]">{s.time}</span>
                  </span>
                ))
              ) : (
                <span className="caption-4 text-zinc-500">{classItem.schedule}</span>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="w-10 h-10 rounded-lg border border-zinc-200 text-zinc-500 hover:bg-zinc-100 flex items-center justify-center focus-ring cursor-pointer"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
            <span className="caption-4 text-zinc-500 block mb-1">كود انضمام الصف</span>
            <div className="flex items-center justify-between gap-2">
              <span className="heading-6 font-mono text-teal-800 tracking-wider">{classCode}</span>
              <button
                type="button"
                onClick={() => copyText(classCode, 'code', 'كود الانضمام')}
                className="px-3 py-1 rounded-lg bg-white border border-zinc-200 caption-3 flex items-center gap-1 focus-ring cursor-pointer"
              >
                {copiedItem === 'code' ? <Check size={14} weight="bold" className="text-emerald-700" /> : <Copy size={14} weight="bold" className="text-zinc-400" />}
                <span>{copiedItem === 'code' ? 'تم' : 'نسخ'}</span>
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
            <span className="caption-4 text-zinc-500 block mb-1">معرف المدرس والصف</span>
            <div className="flex items-center justify-between gap-2">
              <span className="caption-3 font-mono text-[#181818]" dir="ltr">
                {teacherHandle}/{classItem.classUsername || 'class'}
              </span>
              <button
                type="button"
                onClick={() => copyText(`${teacherHandle}/${classItem.classUsername || 'class'}`, 'handle', 'معرف الصف')}
                className="px-3 py-1 rounded-lg bg-white border border-zinc-200 caption-3 flex items-center gap-1 focus-ring cursor-pointer"
              >
                {copiedItem === 'handle' ? <Check size={14} weight="bold" className="text-emerald-700" /> : <Copy size={14} weight="bold" className="text-zinc-400" />}
                <span>{copiedItem === 'handle' ? 'تم' : 'نسخ'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#181818] text-white border border-[#272727] space-y-2">
          <div className="flex items-center justify-between caption-4">
            <span className="inline-flex items-center gap-2 text-emerald-400">
              <DeviceMobile size={16} weight="duotone" />
              <span>معاينة شاشة الموبايل للطالب</span>
            </span>
            <span className="text-zinc-400 font-mono">Tallyo Student Web</span>
          </div>
          <p className="caption-4 text-zinc-300">
            الطالب يفتح الرابط ويكتب كود الصف <b className="text-amber-400 font-mono">{classCode}</b> واسمه ورقم ولي الأمر:
          </p>
          <div className="p-3 rounded-lg bg-[#1F1F1F] border border-[#272727] caption-5 text-zinc-300 flex items-center justify-between">
            <span>طلب انضمام: <b>أحمد محمود (01012345678)</b></span>
            <span className="text-emerald-400 font-semibold">بانتظار موافقتك</span>
          </div>
        </div>

        <a
          href={waShareUrl}
          target="_blank"
          rel="noreferrer"
          className="w-full py-3 px-4 rounded-xl bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.98] text-white button-sm flex items-center justify-center gap-2 motion-base focus-ring cursor-pointer"
        >
          <WhatsappLogo size={18} weight="fill" />
          <span>مشاركة بيانات الانضمام على جروب واتساب</span>
        </a>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => { onClose(); setActiveTab('attendance'); }}
            className="py-2 px-3 rounded-lg bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-[#181818] button-xsm flex items-center justify-center gap-2 min-h-[44px] focus-ring cursor-pointer"
          >
            <QrCode size={16} weight="bold" className="text-teal-700" />
            <span>بدء حضور الصف</span>
          </button>
          <button
            type="button"
            onClick={() => { onClose(); setActiveTab('payments'); }}
            className="py-2 px-3 rounded-lg bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-[#181818] button-xsm flex items-center justify-center gap-2 min-h-[44px] focus-ring cursor-pointer"
          >
            <Users size={16} weight="bold" className="text-[#181818]" />
            <span>مصاريف الصف</span>
          </button>
        </div>
      </div>
    </div>
  );
};
