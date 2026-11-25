import React, { useState } from 'react';
import { MagnifyingGlass, UserPlus, Users } from '@phosphor-icons/react';
import { useDashboard } from '../../state/useDashboard';
import { CustomSelect } from '../../components/ui/CustomSelect';
import { AddStudentModal } from './components/AddStudentModal';
import { StudentRecordRow } from './components/StudentRecordRow';
import { JoinRequestsList } from './components/JoinRequestsList';

export const StudentsTab: React.FC = () => {
  const {
    students, classes, joinRequests, approveJoinRequest, rejectJoinRequest,
    isAddStudentOpen, setIsAddStudentOpen, showToast,
  } = useDashboard();
  const [activeSubTab, setActiveSubTab] = useState<'active' | 'requests'>('active');
  const [selectedClassId, setSelectedClassId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const filteredStudents = students.filter((s) => {
    const matchClass = selectedClassId === 'all' || s.classId === selectedClassId;
    const matchSearch = s.name.includes(searchQuery) || s.parentPhone.includes(searchQuery);
    return matchClass && matchSearch;
  });

  const handleCopyLink = (token: string, name: string) => {
    navigator.clipboard.writeText(`https://tallyo.app/p/${token}`);
    setCopiedToken(token);
    showToast(`تم نسخ رابط المتابعة للطالب ${name}`);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1 p-1 bg-zinc-100 border border-zinc-200 rounded-xl w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveSubTab('active')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg button-xsm motion-base min-h-[40px] focus-ring cursor-pointer ${
              activeSubTab === 'active' ? 'bg-white text-[#181818] shadow-xs' : 'text-zinc-600'
            }`}
          >
            الطلاب النشطين ({students.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('requests')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg button-xsm motion-base min-h-[40px] flex items-center justify-center gap-2 focus-ring cursor-pointer ${
              activeSubTab === 'requests' ? 'bg-white text-[#181818] shadow-xs' : 'text-zinc-600'
            }`}
          >
            <span>طلبات الانضمام</span>
            {joinRequests.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white caption-3 font-mono">
                {joinRequests.length}
              </span>
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsAddStudentOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[#0F766E] hover:bg-[#115E59] text-white button-sm rounded-xl min-h-[44px] motion-base active:scale-[0.98] focus-ring cursor-pointer"
        >
          <UserPlus size={18} weight="bold" />
          <span>إضافة طالب جديد</span>
        </button>
      </div>

      {activeSubTab === 'active' ? (
        <>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white p-4 rounded-2xl border border-zinc-200">
            <CustomSelect
              value={selectedClassId}
              onChange={setSelectedClassId}
              className="w-full sm:w-56"
              ariaLabel="تصفية حسب الصف"
              options={[
                { value: 'all', label: 'كل الصفوف' },
                ...classes.map((c) => ({ value: c.id, label: c.name })),
              ]}
            />

            <div className="relative flex-1 w-full">
              <MagnifyingGlass size={18} weight="bold" className="text-zinc-400 absolute top-3.5 start-3" />
              <input
                type="text"
                placeholder="ابحث باسم الطالب أو رقم الهاتف"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full ps-10 pe-3 py-2 text-base sm:text-sm bg-zinc-50 rounded-lg border border-zinc-200 min-h-[44px] focus-ring"
              />
            </div>
          </div>

          {filteredStudents.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white border border-zinc-200 text-center space-y-2">
              <Users size={28} weight="duotone" className="text-zinc-400 mx-auto" />
              <h4 className="title-3 text-[#181818]">لا يوجد طلاب مطابقون للبحث</h4>
              <p className="body-6 text-zinc-500">يمكنك إضافة طالب جديد يدوياً أو تعديل البحث.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-zinc-200 divide-y divide-zinc-200 overflow-hidden">
              {filteredStudents.map((s) => (
                <StudentRecordRow key={s.id} student={s} copiedToken={copiedToken} onCopyLink={handleCopyLink} />
              ))}
            </div>
          )}
        </>
      ) : (
        <JoinRequestsList requests={joinRequests} onApprove={approveJoinRequest} onReject={rejectJoinRequest} />
      )}

      <AddStudentModal isOpen={isAddStudentOpen} onClose={() => setIsAddStudentOpen(false)} />
    </div>
  );
};
