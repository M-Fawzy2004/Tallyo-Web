import React from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { DashboardTab } from '../features/dashboard/DashboardTab';
import { FinanceTab } from '../features/finance/FinanceTab';
import { AttendanceTab } from '../features/attendance/AttendanceTab';
import { StudentsTab } from '../features/students/StudentsTab';
import { ClassesTab } from '../features/classes/ClassesTab';
import { AnnouncementsTab } from '../features/announcements/AnnouncementsTab';
import { SettingsModal } from '../features/settings/SettingsModal';
import { ToastBanner } from '../components/feedback/ToastBanner';
import { useDashboard } from '../state/useDashboard';

export const DashboardContainer: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const { activeTab, toastMessage, clearToast } = useDashboard();

  return (
    <DashboardLayout onLogout={onLogout}>
      {activeTab === 'dashboard' && <DashboardTab />}
      {activeTab === 'payments' && <FinanceTab />}
      {activeTab === 'attendance' && <AttendanceTab />}
      {activeTab === 'students' && <StudentsTab />}
      {activeTab === 'classes' && <ClassesTab />}
      {activeTab === 'announcements' && <AnnouncementsTab />}

      <SettingsModal />
      <ToastBanner message={toastMessage} onDismiss={clearToast} />
    </DashboardLayout>
  );
};
