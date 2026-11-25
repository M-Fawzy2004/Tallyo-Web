import React, { useState } from 'react';
import { MagnifyingGlass, Wallet, WarningCircle, Eye, EyeSlash } from '@phosphor-icons/react';
import { useDashboard } from '../../state/useDashboard';
import { CustomSelect } from '../../components/ui/CustomSelect';
import { PaymentRecordModal } from './components/PaymentRecordModal';
import { FinanceStudentRow } from './components/FinanceStudentRow';
import type { StudentRecord } from '../dashboard/types/dashboardTypes';

export const FinanceTab: React.FC = () => {
  const { students, classes, isPrivacyMode, togglePrivacyMode, recordPayment, role } = useDashboard();
  const [selectedClassId, setSelectedClassId] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'UNPAID' | 'PARTIAL' | 'PAID'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentForPay, setSelectedStudentForPay] = useState<StudentRecord | null>(null);

  const filteredStudents = students.filter((s) => {
    const matchClass = selectedClassId === 'all' || s.classId === selectedClassId;
    const matchStatus = statusFilter === 'all' || s.status === statusFilter;
    const matchSearch = s.name.includes(searchQuery) || s.parentPhone.includes(searchQuery);
    return matchClass && matchStatus && matchSearch;
  });

  const totalCollected = filteredStudents.reduce((acc, s) => acc + s.paidAmount, 0);
  const totalRemaining = filteredStudents.reduce((acc, s) => acc + s.remainingAmount, 0);

  const formatMoney = (val: number) => (isPrivacyMode ? '•••• ج.م' : `${val.toLocaleString('en-US')} ج.م`);

  return (
    <div className="space-y-6">
      {role === 'teacher' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-white border border-zinc-200 flex items-center justify-between">
            <div>
              <span className="caption-3 text-zinc-600 block mb-1">المحصل للشهر الحالي</span>
              <span className={`heading-4 text-emerald-700 font-mono block ${isPrivacyMode ? 'blur-sm select-none' : ''}`}>
                {formatMoney(totalCollected)}
              </span>
            </div>
            <div className="w-12 h-12 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
              <Wallet size={24} weight="duotone" />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-zinc-200 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="caption-3 text-zinc-600">المتبقي في ذمة الطلاب</span>
                <button
                  type="button"
                  onClick={togglePrivacyMode}
                  aria-label="إخفاء أو إظهار المبالغ"
                  className="p-1 rounded-md text-zinc-500 hover:text-[#181818] focus-ring cursor-pointer"
                >
                  {isPrivacyMode ? <EyeSlash size={16} weight="bold" className="text-amber-600" /> : <Eye size={16} weight="bold" />}
                </button>
              </div>
              <span className={`heading-4 text-rose-600 font-mono block ${isPrivacyMode ? 'blur-sm select-none' : ''}`}>
                {formatMoney(totalRemaining)}
              </span>
            </div>
            <div className="w-12 h-12 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center">
              <WarningCircle size={24} weight="duotone" />
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-zinc-200">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <CustomSelect
            value={selectedClassId}
            onChange={setSelectedClassId}
            className="w-full sm:w-52"
            ariaLabel="تصفية حسب الصف"
            options={[
              { value: 'all', label: 'كل الصفوف' },
              ...classes.map((c) => ({ value: c.id, label: c.name })),
            ]}
          />

          <div className="relative flex-1 sm:w-64">
            <MagnifyingGlass size={18} weight="bold" className="text-zinc-400 absolute top-3.5 start-3" />
            <input
              type="text"
              placeholder="بحث بالاسم أو الهاتف"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full ps-10 pe-3 py-2 text-base sm:text-sm bg-zinc-50 rounded-lg border border-zinc-200 min-h-[44px] focus-ring"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'UNPAID', label: 'لم يدفع' },
            { id: 'PARTIAL', label: 'دفع جزئي' },
            { id: 'PAID', label: 'خالص' },
          ].map((pill) => (
            <button
              key={pill.id}
              type="button"
              onClick={() => setStatusFilter(pill.id as 'all' | 'UNPAID' | 'PARTIAL' | 'PAID')}
              className={`px-3 py-2 rounded-lg button-xsm motion-base whitespace-nowrap min-h-[40px] focus-ring cursor-pointer ${
                statusFilter === pill.id ? 'bg-[#181818] text-white' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {filteredStudents.length === 0 ? (
        <div className="p-8 rounded-2xl bg-white border border-zinc-200 text-center space-y-2">
          <Wallet size={28} weight="duotone" className="text-zinc-400 mx-auto" />
          <h4 className="title-3 text-[#181818]">لا توجد نتائج مطابقة للبحث</h4>
          <p className="body-6 text-zinc-500">جرّب تغيير الصف أو إزالة كلمة البحث لعرض جميع الطلاب.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-zinc-200 divide-y divide-zinc-200 overflow-hidden">
          {filteredStudents.map((s) => (
            <FinanceStudentRow
              key={s.id}
              student={s}
              onRecordPaymentClick={setSelectedStudentForPay}
            />
          ))}
        </div>
      )}

      <PaymentRecordModal
        key={selectedStudentForPay?.id || 'closed'}
        isOpen={!!selectedStudentForPay}
        onClose={() => setSelectedStudentForPay(null)}
        student={selectedStudentForPay}
        onSubmit={recordPayment}
      />
    </div>
  );
};
