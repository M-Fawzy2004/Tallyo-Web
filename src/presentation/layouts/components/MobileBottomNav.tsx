import React from 'react';
import { SquaresFour, Wallet, CalendarCheck, Users, DotsThree } from '@phosphor-icons/react';
import { useDashboard } from '../../state/useDashboard';
import type { DashboardTab } from '../../features/dashboard/types/dashboardTypes';

interface MobileBottomNavProps {
  onOpenMore: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenMore }) => {
  const { activeTab, setActiveTab, role } = useDashboard();

  if (role === 'assistant') {
    return (
      <nav
        aria-label="التنقل السريع"
        className="lg:hidden fixed bottom-3 inset-x-4 z-30 h-16 rounded-2xl bg-white/95 backdrop-blur-md border border-zinc-200 flex items-center justify-around px-2 shadow-md select-none"
      >
        <button
          type="button"
          onClick={() => setActiveTab('attendance')}
          className={`flex-1 flex flex-col items-center justify-center py-1 caption-3 min-h-[48px] rounded-lg motion-color focus-ring ${
            activeTab === 'attendance' ? 'text-[#181818]' : 'text-zinc-400'
          }`}
        >
          <CalendarCheck size={20} weight={activeTab === 'attendance' ? 'fill' : 'regular'} />
          <span>الحضور</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('payments')}
          className={`flex-1 flex flex-col items-center justify-center py-1 caption-3 min-h-[48px] rounded-lg motion-color focus-ring ${
            activeTab === 'payments' ? 'text-[#181818]' : 'text-zinc-400'
          }`}
        >
          <Wallet size={20} weight={activeTab === 'payments' ? 'fill' : 'regular'} />
          <span>المصاريف</span>
        </button>
      </nav>
    );
  }

  const items: { id: DashboardTab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'الرئيسية', icon: SquaresFour },
    { id: 'payments', label: 'المصاريف', icon: Wallet },
    { id: 'attendance', label: 'الحضور', icon: CalendarCheck },
    { id: 'students', label: 'الطلاب', icon: Users },
  ];

  return (
    <nav
      aria-label="التنقل السفلي"
      className="lg:hidden fixed bottom-3 inset-x-4 z-30 h-16 rounded-2xl bg-white/95 backdrop-blur-md border border-zinc-200 flex items-center justify-around px-2 shadow-md select-none"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            aria-current={isActive ? 'page' : undefined}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2 caption-3 min-h-[48px] rounded-lg motion-color focus-ring ${
              isActive ? 'text-[#181818]' : 'text-zinc-400 hover:text-zinc-700'
            }`}
          >
            <Icon size={20} weight={isActive ? 'fill' : 'regular'} />
            <span>{item.label}</span>
          </button>
        );
      })}

      <button
        type="button"
        onClick={onOpenMore}
        className="flex flex-col items-center justify-center py-1 px-2 caption-4 text-zinc-400 hover:text-zinc-700 min-h-[48px] rounded-lg motion-color focus-ring"
      >
        <DotsThree size={20} weight="bold" />
        <span>المزيد</span>
      </button>
    </nav>
  );
};
