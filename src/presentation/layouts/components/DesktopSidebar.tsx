import React from 'react';
import {
  SquaresFour,
  Wallet,
  CalendarCheck,
  Users,
  GraduationCap,
  Bell,
  GearSix,
  SignOut,
  ShieldCheck,
  Eye,
  EyeSlash,
} from '@phosphor-icons/react';
import { useDashboard } from '../../state/useDashboard';
import type { DashboardTab } from '../../features/dashboard/types/dashboardTypes';

export const DesktopSidebar: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const {
    activeTab,
    setActiveTab,
    role,
    isPrivacyMode,
    togglePrivacyMode,
    setIsSettingsOpen,
  } = useDashboard();

  const allNavItems: { id: DashboardTab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'الرئيسية', icon: SquaresFour },
    { id: 'payments', label: 'المصاريف والتحصيل', icon: Wallet },
    { id: 'attendance', label: 'حضور الطلاب', icon: CalendarCheck },
    { id: 'students', label: 'دليل الطلاب', icon: Users },
    { id: 'classes', label: 'الصفوف والمجموعات', icon: GraduationCap },
    { id: 'announcements', label: 'الإشعارات والملفات', icon: Bell },
  ];

  const navItems =
    role === 'assistant'
      ? allNavItems.filter((i) => i.id === 'attendance' || i.id === 'payments')
      : allNavItems;

  return (
    <aside
      aria-label="القائمة الجانبية"
      className="w-64 bg-white border border-zinc-200 rounded-2xl flex flex-col justify-between p-4 fixed top-4 bottom-4 start-4 z-30 select-none"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 border border-zinc-200">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#181818] text-white font-mono font-bold text-base flex items-center justify-center">
              T
            </span>
            <div>
              <span className="font-mono title-3 text-[#181818] block">Tallyo</span>
              <span className="caption-5 text-zinc-500 block">إدارة المدرس والسنتر</span>
            </div>
          </div>

          {role === 'teacher' && (
            <button
              type="button"
              onClick={togglePrivacyMode}
              title={isPrivacyMode ? 'إظهار الأرقام' : 'إخفاء الأرقام للخصوصية'}
              aria-label={isPrivacyMode ? 'إظهار الأرقام' : 'إخفاء الأرقام'}
              className={`w-10 h-10 rounded-lg flex items-center justify-center motion-base focus-ring cursor-pointer ${
                isPrivacyMode ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'text-zinc-500 hover:text-[#181818] hover:bg-white'
              }`}
            >
              {isPrivacyMode ? <EyeSlash size={18} weight="bold" /> : <Eye size={18} weight="bold" />}
            </button>
          )}
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg button-sm motion-base active:scale-[0.98] focus-ring min-h-[44px] cursor-pointer ${
                  isActive
                    ? 'bg-[#181818] text-white'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-[#181818]'
                }`}
              >
                <Icon size={18} weight={isActive ? 'fill' : 'duotone'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="space-y-2">
        <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-8 h-8 rounded-full bg-[#181818] text-white caption-3 flex items-center justify-center shrink-0">
              {role === 'teacher' ? 'م' : 'أ'}
            </span>
            <div className="min-w-0">
              <span className="block caption-3 text-[#181818] truncate">
                {role === 'teacher' ? 'أ. محمد فوزي' : 'المساعد على الباب'}
              </span>
              <span className="inline-flex items-center gap-1 caption-5 text-zinc-500">
                <ShieldCheck size={12} weight="fill" className="text-emerald-700" />
                <span>{role === 'teacher' ? 'حساب المدرس' : 'كود TAL2026'}</span>
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            aria-label="الإعدادات"
            className="w-10 h-10 text-zinc-500 hover:text-[#181818] rounded-lg hover:bg-white flex items-center justify-center motion-color focus-ring cursor-pointer shrink-0"
          >
            <GearSix size={18} weight="bold" />
          </button>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 button-xsm text-rose-700 hover:bg-rose-50 rounded-lg border border-transparent hover:border-rose-200 motion-base focus-ring min-h-[40px] cursor-pointer"
        >
          <SignOut size={16} weight="bold" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
};
