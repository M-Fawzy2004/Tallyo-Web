import React from 'react';
import { X, GraduationCap, Bell, GearSix, SignOut } from '@phosphor-icons/react';
import { useDashboard } from '../../state/useDashboard';

interface MoreDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const MoreDrawer: React.FC<MoreDrawerProps> = ({ isOpen, onClose, onLogout }) => {
  const { setActiveTab, setIsSettingsOpen } = useDashboard();

  if (!isOpen) return null;

  const navigateTo = (tab: 'classes' | 'announcements') => {
    setActiveTab(tab);
    onClose();
  };

  return (
    <div className="lg:hidden fixed inset-0 z-50 bg-[#000000]/60 backdrop-blur-xs flex flex-col justify-end p-4">
      <div className="bg-white rounded-3xl p-6 border border-zinc-200 space-y-4">
        <div className="flex items-center justify-between pb-2">
          <span className="title-2 text-[#181818]">المزيد من الأقسام</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="w-10 h-10 rounded-lg border border-zinc-200 flex items-center justify-center text-zinc-600 focus-ring cursor-pointer"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => navigateTo('classes')}
            className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-[#181818] flex flex-col items-center gap-2 button-xsm focus-ring cursor-pointer"
          >
            <GraduationCap size={24} weight="duotone" className="text-teal-700" />
            <span>الصفوف والمجموعات</span>
          </button>

          <button
            type="button"
            onClick={() => navigateTo('announcements')}
            className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-[#181818] flex flex-col items-center gap-2 button-xsm focus-ring cursor-pointer"
          >
            <Bell size={24} weight="duotone" className="text-teal-700" />
            <span>الإشعارات والملفات</span>
          </button>
        </div>

        <div className="space-y-2">
          <button
            type="button"
            onClick={() => { setIsSettingsOpen(true); onClose(); }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-100 border border-zinc-200 text-[#181818] button-sm min-h-[44px] focus-ring cursor-pointer"
          >
            <GearSix size={18} weight="bold" />
            <span>الإعدادات ورمز PIN المساعد</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-rose-700 hover:bg-rose-50 button-sm min-h-[44px] focus-ring cursor-pointer"
          >
            <SignOut size={18} weight="bold" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </div>
    </div>
  );
};
