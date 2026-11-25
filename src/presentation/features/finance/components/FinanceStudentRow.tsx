import React from 'react';
import { WhatsappLogo, CheckCircle } from '@phosphor-icons/react';
import type { StudentRecord } from '../../dashboard/types/dashboardTypes';

interface FinanceStudentRowProps {
  student: StudentRecord;
  onRecordPaymentClick: (student: StudentRecord) => void;
}

export const FinanceStudentRow: React.FC<FinanceStudentRowProps> = ({
  student,
  onRecordPaymentClick,
}) => {
  const sanitized = student.parentPhone.replace(/\D/g, '');
  const intlPhone = sanitized.startsWith('0') ? `2${sanitized}` : `20${sanitized}`;
  const waUrl = `https://wa.me/${intlPhone}?text=${encodeURIComponent(
    `السلام عليكم ولي أمر الطالب ${student.name}، نود تذكيركم بمتبقي اشتراك الشهر (${student.remainingAmount} ج.م). سنتر تاليو`
  )}`;

  const badgeClass =
    student.status === 'PAID'
      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
      : student.status === 'PARTIAL'
      ? 'bg-amber-50 text-amber-800 border-amber-200'
      : 'bg-rose-50 text-rose-800 border-rose-200';

  const statusText =
    student.status === 'PAID' ? 'خالص المصاريف' : student.status === 'PARTIAL' ? 'دفع جزئي' : 'لم يسدد';

  return (
    <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-50 motion-color">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="title-3 text-[#181818]">{student.name}</h4>
          <span className={`caption-3 px-2 py-0.5 rounded-full border ${badgeClass}`}>
            {statusText}
          </span>
        </div>
        <p className="caption-5 text-zinc-600 mt-1">
          {student.className} • مسدد: <b className="font-mono text-[#181818]">{student.paidAmount} ج.م</b> • متبقي:{' '}
          <b className="font-mono text-rose-600">{student.remainingAmount} ج.م</b>
        </p>
      </div>

      {student.remainingAmount > 0 && (
        <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto">
          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white button-xsm rounded-lg min-h-[44px] motion-base active:scale-[0.98] focus-ring"
          >
            <WhatsappLogo size={16} weight="fill" />
            <span>تذكير واتساب</span>
          </a>

          <button
            type="button"
            onClick={() => onRecordPaymentClick(student)}
            className="flex items-center gap-2 px-3 py-2 bg-[#181818] hover:bg-[#272727] text-white button-xsm rounded-lg min-h-[44px] motion-base active:scale-[0.98] focus-ring cursor-pointer"
          >
            <CheckCircle size={16} weight="bold" />
            <span>تسجيل دفعة</span>
          </button>
        </div>
      )}
    </div>
  );
};
