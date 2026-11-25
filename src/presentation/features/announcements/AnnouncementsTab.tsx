import React from 'react';
import { BookOpen, FileText, Warning, DownloadSimple, Calendar, Bell } from '@phosphor-icons/react';
import { useDashboard } from '../../state/useDashboard';
import { CreateAnnouncementCard } from './components/CreateAnnouncementCard';

export const AnnouncementsTab: React.FC = () => {
  const { announcements, showToast } = useDashboard();

  const getBadge = (type: string) => {
    switch (type) {
      case 'EXAM': return { label: 'امتحان', color: 'bg-rose-50 text-rose-700 border-rose-200', icon: Warning };
      case 'HOMEWORK': return { label: 'واجب', color: 'bg-amber-50 text-amber-800 border-amber-200', icon: FileText };
      case 'STUDY_MATERIAL': return { label: 'ملف دراسي', color: 'bg-emerald-50 text-emerald-800 border-emerald-200', icon: BookOpen };
      default: return { label: 'إعلان عام', color: 'bg-zinc-100 text-[#181818] border-zinc-200', icon: Bell };
    }
  };

  return (
    <div className="space-y-6">
      <CreateAnnouncementCard />

      <div className="space-y-4">
        <h3 className="title-2 text-[#181818]">سجل التنبيهات المنشورة</h3>

        <div className="space-y-3">
          {announcements.map((a) => {
            const badge = getBadge(a.type);
            const Icon = badge.icon;
            return (
              <article
                key={a.id}
                className="p-6 rounded-2xl bg-white border border-zinc-200 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 caption-3 px-3 py-1 rounded-full border ${badge.color}`}>
                      <Icon size={14} weight="duotone" />
                      <span>{badge.label}</span>
                    </span>
                    <span className="caption-3 text-zinc-600">{a.className}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 caption-5 text-zinc-500">
                    <Calendar size={14} weight="bold" />
                    <span>{a.date}</span>
                  </span>
                </div>

                <h4 className="title-3 text-[#181818]">{a.title}</h4>
                <p className="body-6 text-zinc-600 leading-relaxed">{a.content}</p>

                {a.attachmentName && (
                  <div>
                    <button
                      type="button"
                      onClick={() => showToast(`جاري تنزيل الملف ${a.attachmentName}`)}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-200 caption-3 font-mono text-[#181818] hover:bg-zinc-100 focus-ring cursor-pointer"
                    >
                      <DownloadSimple size={16} weight="bold" className="text-teal-700" />
                      <span>{a.attachmentName}</span>
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
