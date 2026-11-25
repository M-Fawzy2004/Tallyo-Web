import React, { useState } from 'react';
import { PaperPlaneTilt, UploadSimple, FileText, Warning, BookOpen, Bell, WarningCircle } from '@phosphor-icons/react';
import { useDashboard } from '../../../state/useDashboard';
import { CustomSelect } from '../../../components/ui/CustomSelect';
import type { AnnouncementItem } from '../../dashboard/types/dashboardTypes';

export const CreateAnnouncementCard: React.FC = () => {
  const { classes, addNewAnnouncement } = useDashboard();
  const [className, setClassName] = useState('كل الصفوف');
  const [type, setType] = useState<AnnouncementItem['type']>('NOTICE');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [attachmentName, setAttachmentName] = useState<string | undefined>(undefined);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setErrorMsg('يرجى إدخال عنوان التنبيه وتفاصيله قبل النشر');
      return;
    }
    setErrorMsg('');
    addNewAnnouncement({ className, type, title: title.trim(), content: content.trim(), attachmentName });
    setTitle('');
    setContent('');
    setAttachmentName(undefined);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="p-6 rounded-2xl bg-white border border-zinc-200 space-y-4 text-right">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="title-2 text-[#181818]">نشر تنبيه أو ملزمة جديدة للطلاب</h3>
        <CustomSelect
          value={className}
          onChange={setClassName}
          size="md"
          className="w-full sm:w-52"
          ariaLabel="اختر الصف"
          options={[
            { value: 'كل الصفوف', label: 'كل الصفوف' },
            ...classes.map((c) => ({ value: c.name, label: c.name })),
          ]}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { id: 'NOTICE', label: 'إعلان عام', icon: Bell },
          { id: 'EXAM', label: 'موعد امتحان', icon: Warning },
          { id: 'HOMEWORK', label: 'واجب منزلي', icon: FileText },
          { id: 'STUDY_MATERIAL', label: 'ملزمة أو PDF', icon: BookOpen },
        ].map((t) => {
          const Icon = t.icon;
          const isSelected = type === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setType(t.id as AnnouncementItem['type'])}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg border button-xsm min-h-[44px] motion-base focus-ring cursor-pointer ${
                isSelected ? 'border-[#181818] bg-[#181818] text-white' : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100'
              }`}
            >
              <Icon size={16} weight="duotone" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      <input
        type="text"
        placeholder="عنوان التنبيه أو اسم الملف"
        value={title}
        onChange={(e) => { setTitle(e.target.value); setErrorMsg(''); }}
        className="w-full px-3 py-2 text-base sm:text-sm bg-zinc-50 rounded-xl border border-zinc-200 min-h-[48px] focus-ring"
      />

      <textarea
        placeholder="اكتب تفاصيل التنبيه هنا لتظهر في صفحة الطالب وولي الأمر فوراً"
        value={content}
        onChange={(e) => { setContent(e.target.value); setErrorMsg(''); }}
        rows={3}
        className="w-full px-3 py-3 text-base sm:text-sm bg-zinc-50 rounded-xl border border-zinc-200 resize-none focus-ring"
      />

      {errorMsg && (
        <div role="alert" className="p-3 rounded-lg bg-rose-50 border border-rose-200 caption-3 text-rose-700 flex items-center gap-2">
          <WarningCircle size={16} weight="fill" className="shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setAttachmentName('ملخص_الوحدة_الأولى.pdf')}
          className="flex items-center justify-center gap-2 caption-3 text-zinc-600 hover:text-[#181818] border border-dashed border-zinc-300 px-3 py-2 rounded-xl min-h-[44px] focus-ring cursor-pointer"
        >
          <UploadSimple size={16} weight="bold" />
          <span>{attachmentName ? `مرفق: ${attachmentName}` : 'إرفاق ملف أو صورة PDF'}</span>
        </button>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#181818] hover:bg-[#272727] text-white button-sm rounded-xl min-h-[44px] motion-base active:scale-[0.98] focus-ring cursor-pointer"
        >
          <PaperPlaneTilt size={16} weight="bold" />
          <span>نشر للطلاب الآن</span>
        </button>
      </div>
    </form>
  );
};
