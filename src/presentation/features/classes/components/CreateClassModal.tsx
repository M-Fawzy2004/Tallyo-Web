import React, { useState } from 'react';
import { X, Check, WarningCircle } from '@phosphor-icons/react';
import { useDashboard } from '../../../state/useDashboard';

interface CreateClassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateClassModal: React.FC<CreateClassModalProps> = ({ isOpen, onClose }) => {
  const { addNewClass } = useDashboard();
  const [name, setName] = useState('');
  const [centerName, setCenterName] = useState('');
  const [schedule, setSchedule] = useState('');
  const [monthlyFee, setMonthlyFee] = useState<string>('260');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !centerName.trim()) {
      setErrorMsg('يرجى إدخال اسم الصف واسم السنتر أو القاعة');
      return;
    }
    const fee = Number(monthlyFee) || 260;
    const finalSchedule = schedule.trim() || 'السبت 4:15 م • الثلاثاء 5:45 م';
    const parsedSlots = finalSchedule.split('•').map((item) => {
      const parts = item.trim().split(' ');
      return { day: parts[0] || 'السبت', time: parts.slice(1).join(' ') || '4:15 م' };
    });

    setErrorMsg('');
    addNewClass({
      name: name.trim(),
      subject: 'رياضيات',
      centerName: centerName.trim(),
      schedule: finalSchedule,
      scheduleSlots: parsedSlots,
      monthlyFee: fee,
      sessionPrice: Math.round(fee / 4),
      teacherHandle: '@mr_ahmed',
      classUsername: `class_${Date.now().toString().slice(-4)}`,
    });
    setName('');
    setCenterName('');
    setSchedule('');
    onClose();
  };

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 border border-zinc-200 relative text-right space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="heading-6 text-[#181818]">إضافة صف أو مجموعة</h3>
            <p className="caption-5 text-zinc-500 mt-1">يتولد كود انضمام فوري للطلاب</p>
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
            <label htmlFor="m-cls-name" className="block caption-3 text-[#181818] mb-2">اسم الصف والمجموعة</label>
            <input
              id="m-cls-name"
              type="text"
              placeholder="مثال: الثاني الثانوي، مجموعة ب"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrorMsg(''); }}
              className="w-full px-3 py-2 text-base sm:text-sm bg-zinc-50 rounded-xl border border-zinc-200 min-h-[48px] focus-ring"
            />
          </div>

          <div>
            <label htmlFor="m-cls-center" className="block caption-3 text-[#181818] mb-2">اسم السنتر أو القاعة</label>
            <input
              id="m-cls-center"
              type="text"
              placeholder="مثال: سنتر الأوائل بالهرم"
              value={centerName}
              onChange={(e) => { setCenterName(e.target.value); setErrorMsg(''); }}
              className="w-full px-3 py-2 text-base sm:text-sm bg-zinc-50 rounded-xl border border-zinc-200 min-h-[48px] focus-ring"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="m-cls-fee" className="block caption-3 text-[#181818] mb-2">الاشتراك (ج.م)</label>
              <input
                id="m-cls-fee"
                type="number"
                min={0}
                value={monthlyFee}
                onChange={(e) => setMonthlyFee(e.target.value)}
                className="w-full px-3 py-2 text-base sm:text-sm font-mono font-semibold bg-zinc-50 rounded-xl border border-zinc-200 min-h-[48px] focus-ring"
              />
            </div>
            <div>
              <label htmlFor="m-cls-sched" className="block caption-3 text-[#181818] mb-2">المواعيد</label>
              <input
                id="m-cls-sched"
                type="text"
                placeholder="السبت 4:15 م • الثلاثاء 5:45 م"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                className="w-full px-3 py-2 text-base sm:text-sm bg-zinc-50 rounded-xl border border-zinc-200 min-h-[48px] focus-ring"
              />
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
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#181818] hover:bg-[#272727] active:scale-[0.98] text-white button-md rounded-xl min-h-[48px] motion-base focus-ring cursor-pointer"
          >
            <Check size={18} weight="bold" />
            <span>حفظ المجموعة وإنشاء الكود</span>
          </button>
        </form>
      </div>
    </div>
  );
};
