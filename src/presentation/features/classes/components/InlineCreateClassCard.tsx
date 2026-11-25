import React, { useState } from 'react';
import { Sparkle, Plus, Trash, Clock, WarningCircle } from '@phosphor-icons/react';
import { useDashboard } from '../../../state/useDashboard';
import { CustomSelect } from '../../../components/ui/CustomSelect';
import type { ScheduleSlot } from '../../dashboard/types/dashboardTypes';

const WEEK_DAYS = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];

export const InlineCreateClassCard: React.FC = () => {
  const { addNewClass } = useDashboard();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [slots, setSlots] = useState<ScheduleSlot[]>([
    { day: 'السبت', time: '4:15 م' },
    { day: 'الثلاثاء', time: '5:45 م' },
  ]);

  const updateSlot = (idx: number, field: keyof ScheduleSlot, val: string) => {
    setSlots((prev) => prev.map((s, i) => (i === idx ? { ...s, [field]: val } : s)));
    setErrorMsg('');
  };

  const addSlot = () => {
    const used = slots.map((s) => s.day);
    const nextDay = WEEK_DAYS.find((d) => !used.includes(d)) || 'الخميس';
    setSlots((prev) => [...prev, { day: nextDay, time: '6:00 م' }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setErrorMsg('يرجى كتابة اسم الصف الدراسي');
    const sessionCost = Number(price);
    if (!sessionCost || sessionCost <= 0) return setErrorMsg('يرجى إدخال سعر الحصة بالجنيه');
    if (slots.some((s) => !s.time.trim())) return setErrorMsg('يرجى تحديد الوقت لكل يوم مضاف');

    setErrorMsg('');
    addNewClass({
      name: name.trim(), subject: 'رياضيات', centerName: 'السنتر الخاص بي',
      schedule: slots.map((s) => `${s.day} ${s.time}`).join(' • '),
      scheduleSlots: slots, monthlyFee: sessionCost * slots.length * 4,
      sessionPrice: sessionCost, teacherHandle: '@mr_ahmed',
      classUsername: `class_${Date.now().toString().slice(-4)}`,
    });
    setName('');
    setPrice('');
  };

  return (
    <div className="p-6 rounded-2xl bg-white border border-zinc-200 text-right space-y-4">
      <div>
        <h3 className="heading-6 text-[#181818]">إضافة صف جديد</h3>
        <p className="caption-5 text-zinc-500 mt-1">بعد الإنشاء يولّد النظام كود الانضمام تلقائياً</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="inline-cls-name" className="block caption-3 text-[#181818] mb-2">الصف</label>
            <input
              id="inline-cls-name" type="text" placeholder="مثال: الأول الإعدادي" value={name}
              onChange={(e) => { setName(e.target.value); setErrorMsg(''); }}
              className="w-full px-3 py-2 text-base sm:text-sm bg-zinc-50 rounded-xl border border-zinc-200 min-h-[48px] focus-ring"
            />
          </div>
          <div>
            <label htmlFor="inline-cls-price" className="block caption-3 text-[#181818] mb-2">سعر الحصة (جنيه)</label>
            <input
              id="inline-cls-price" type="number" placeholder="مثال: 65" min={1} value={price}
              onChange={(e) => { setPrice(e.target.value); setErrorMsg(''); }}
              className="w-full px-3 py-2 text-base sm:text-sm font-mono font-semibold bg-zinc-50 rounded-xl border border-zinc-200 min-h-[48px] focus-ring"
            />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="caption-3 text-[#181818] inline-flex items-center gap-2">
              <Clock size={16} weight="bold" className="text-teal-700" />
              <span>مواعيد الحصص (حدد كل يوم بوقته المختلف)</span>
            </span>
            <button type="button" onClick={addSlot} className="caption-3 text-teal-800 hover:text-teal-950 inline-flex items-center gap-1 focus-ring rounded px-2 py-1 cursor-pointer">
              <Plus size={14} weight="bold" /><span>إضافة ميعاد ليوم آخر</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {slots.map((slot, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-zinc-200">
                <CustomSelect
                  size="sm"
                  value={slot.day}
                  onChange={(val) => updateSlot(index, 'day', val)}
                  className="w-28 shrink-0"
                  ariaLabel="اليوم"
                  options={WEEK_DAYS.map((d) => ({ value: d, label: d }))}
                />
                <input type="text" placeholder="4:15 م" value={slot.time} onChange={(e) => updateSlot(index, 'time', e.target.value)} className="flex-1 min-w-0 py-1 px-2 text-base sm:text-xs bg-zinc-50 rounded border border-zinc-200 min-h-[36px] focus-ring" />
                {slots.length > 1 && (
                  <button type="button" aria-label="حذف هذا الميعاد" onClick={() => setSlots((p) => p.filter((_, i) => i !== index))} className="p-2 text-rose-600 hover:bg-rose-50 rounded focus-ring cursor-pointer">
                    <Trash size={14} weight="bold" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {errorMsg && (
          <div role="alert" className="p-3 rounded-lg bg-rose-50 border border-rose-200 caption-3 text-rose-700 flex items-center gap-2">
            <WarningCircle size={16} weight="fill" className="shrink-0" /><span>{errorMsg}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="caption-5 text-zinc-500 order-2 sm:order-1">أي طالب يكتب الكود سيظهر عندك في طلبات الانضمام للموافقة أو الرفض.</p>
          <button type="submit" className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[#0F766E] hover:bg-[#115E59] active:scale-[0.98] text-white button-sm rounded-xl min-h-[44px] motion-base focus-ring cursor-pointer order-1 sm:order-2">
            <Sparkle size={16} weight="fill" className="text-amber-300" /><span>إنشاء الصف وتوليد الكود</span>
          </button>
        </div>
      </form>
    </div>
  );
};
