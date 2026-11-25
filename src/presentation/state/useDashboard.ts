import { createContext, useContext } from 'react';
import type { DashboardContextType } from '../features/dashboard/types/dashboardTypes';

export const DashboardContext = createContext<DashboardContextType | null>(null);

export const useDashboard = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error('useDashboard must be used within a DashboardProvider');
  return ctx;
};
