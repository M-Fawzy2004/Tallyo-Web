import React from 'react';
import { WhatsappLogo, Copy, Check } from '@phosphor-icons/react';
import type { StudentRecord } from '../../dashboard/types/dashboardTypes';

interface StudentRecordRowProps {
  student: StudentRecord;
  copiedToken: string | null;
  onCopyLink: (token: string, name: string) => void;
}

export const StudentRecordRow: React.FC<StudentRecordRowProps> = ({
  student,
  copiedToken,
  onCopyLink,
}) => {
  const isCopied = copiedToken === student.joinToken;
  const sanitized = student.parentPhone.replace(/\D/g, '');
  const intlPhone = sanitized.startsWith('0') ? `2${sanitized}` : `20${sanitized}`;
  const waUrl = `https://wa.me/${intlPhone}?text=${encodeURIComponent(
    `السلام عليكم ولي أمر الطالب ${student.name}، هذا الرابط الشخصي لمتابعة الحضور والمصاريف والمذكرات: https://tallyo.app/p/${student.joinToken}`
  )}`;

  return (
    <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-50 motion-color">
      <div>
        <h4 className="title-3 text-[#181818]">{student.name}</h4>
        <p className="caption-5 text-zinc-600 mt-1">
          {student.className} • ولي الأمر: <b className="font-mono text-[#181818]">{student.parentPhone}</b>
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto">
        <button
          type="button"
          onClick={() => onCopyLink(student.joinToken, student.name)}
          className="flex items-center gap-2 px-3 py-2 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-[#181818] button-xsm rounded-lg min-h-[44px] motion-base active:scale-[0.98] focus-ring cursor-pointer"
        >
          {isCopied ? <Check size={16} weight="bold" className="text-emerald-700" /> : <Copy size={16} weight="bold" className="text-zinc-500" />}
          <span>{isCopied ? 'تم النسخ' : 'رابط الطالب'}</span>
        </button>

        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-3 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white button-xsm rounded-lg min-h-[44px] motion-base active:scale-[0.98] focus-ring"
        >
          <WhatsappLogo size={16} weight="fill" />
          <span>مراسلة واتساب</span>
        </a>
      </div>
    </div>
  );
};
