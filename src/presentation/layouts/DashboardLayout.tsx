import React, { useState } from 'react';
import { DesktopSidebar } from './components/DesktopSidebar';
import { MobileHeader } from './components/MobileHeader';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MoreDrawer } from './components/MoreDrawer';
import { useDashboard } from '../state/useDashboard';

interface DashboardLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, onLogout }) => {
  const { activeTab } = useDashboard();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const tabTitles: Record<string, string> = {
    dashboard: 'الرئيسية',
    payments: 'المصاريف والتحصيل',
    attendance: 'دفتر الحضور',
    students: 'دليل الطلاب',
    classes: 'الصفوف والمجموعات',
    announcements: 'الإشعارات والملفات',
  };

  return (
    <div className="min-h-[100dvh] bg-[#FAFAFA] text-[#181818] flex antialiased" dir="rtl">
      <div className="hidden lg:block shrink-0 w-72">
        <DesktopSidebar onLogout={onLogout} />
      </div>

      <div className="flex-1 flex flex-col min-w-0 w-full">
        <MobileHeader title={tabTitles[activeTab] || 'لوحة التحكم'} />

        <main id="dashboard-main" className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12">
          {children}
        </main>

        <MobileBottomNav onOpenMore={() => setIsMoreOpen(true)} />
        <MoreDrawer isOpen={isMoreOpen} onClose={() => setIsMoreOpen(false)} onLogout={onLogout} />
      </div>
    </div>
  );
};
