import React, { useState } from 'react';
import { X, CheckCircle, CurrencyDollar, WarningCircle } from '@phosphor-icons/react';
import type { StudentRecord } from '../../dashboard/types/dashboardTypes';

interface PaymentRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentRecord | null;
  onSubmit: (studentId: string, amount: number) => void;
}

export const PaymentRecordModal: React.FC<PaymentRecordModalProps> = ({
  isOpen,
  onClose,
  student,
  onSubmit,
}) => {
  const [amount, setAmount] = useState<string>(() => String(student?.remainingAmount || 260));
  const [method, setMethod] = useState<'كاش' | 'فودافون كاش' | 'إنستاباي'>('كاش');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !student) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numeric = Number(amount);
    if (!numeric || numeric <= 0) {
      setErrorMsg('يرجى إدخال مبلغ صحيح أكبر من الصفر');
      return;
    }
    if (numeric > student.remainingAmount) {
      setErrorMsg(`المبلغ أكبر من المتبقي على الطالب (${student.remainingAmount} ج.م)`);
      return;
    }
    onSubmit(student.id, numeric);
    onClose();
  };

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 border border-zinc-200 relative text-right space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="heading-6 text-[#181818]">تسجيل دفعة مصاريف</h3>
            <p className="caption-5 text-zinc-600 mt-1">
              للطالب: <b className="text-[#181818]">{student.name}</b> ({student.className})
            </p>
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

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="pay-amount" className="block caption-3 text-[#181818] mb-2">
              المبلغ المطلوب تحصيله (ج.م)
            </label>
            <div className="relative">
              <CurrencyDollar size={18} weight="bold" className="text-zinc-400 absolute top-3.5 start-3" />
              <input
                id="pay-amount"
                type="number"
                min={1}
                value={amount}
                onChange={(e) => { setAmount(e.target.value); setErrorMsg(''); }}
                className="w-full ps-10 pe-3 py-2 text-base font-semibold font-mono bg-zinc-50 rounded-xl border border-zinc-200 focus-ring min-h-[48px]"
              />
            </div>
            <span className="caption-5 text-rose-600 mt-1 block">
              المتبقي على الطالب: {student.remainingAmount} ج.م
            </span>
          </div>

          <div>
            <span className="block caption-3 text-[#181818] mb-2">طريقة السداد</span>
            <div className="grid grid-cols-3 gap-2">
              {(['كاش', 'فودافون كاش', 'إنستاباي'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMethod(m)}
                  className={`py-2 px-2 caption-3 rounded-lg border min-h-[44px] motion-base focus-ring cursor-pointer ${
                    method === m ? 'border-[#181818] bg-[#181818] text-white' : 'border-zinc-200 bg-zinc-50 text-zinc-700'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {errorMsg && (
            <div role="alert" className="p-3 rounded-lg bg-rose-50 border border-rose-200 caption-3 text-rose-700 flex items-center gap-2">
              <WarningCircle size={16} weight="fill" className="shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#047857] hover:bg-[#065F46] active:scale-[0.98] text-white button-md rounded-xl min-h-[48px] motion-base focus-ring cursor-pointer"
          >
            <CheckCircle size={18} weight="bold" />
            <span>تأكيد استلام الدفعة</span>
          </button>
        </form>
      </div>
    </div>
  );
};
