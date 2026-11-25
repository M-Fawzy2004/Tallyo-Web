import React, { useState, useEffect, useCallback } from 'react';
import type {
  DashboardTab,
  UserRole,
  StudentRecord,
  JoinRequest,
  TodaySession,
  ClassItem,
  AnnouncementItem,
} from '../features/dashboard/types/dashboardTypes';
import {
  initialClasses,
  initialStudents,
  initialJoinRequests,
  initialTodaySessions,
  initialAnnouncements,
} from '../features/dashboard/types/initialData';
import { DashboardContext } from './useDashboard';

export const DashboardProvider: React.FC<{ children: React.ReactNode; initialRole?: UserRole }> = ({
  children,
  initialRole = 'teacher',
}) => {
  const [role, setRole] = useState<UserRole>(initialRole);
  const [activeTab, setActiveTab] = useState<DashboardTab>(initialRole === 'assistant' ? 'attendance' : 'dashboard');
  const [isPrivacyMode, setIsPrivacyMode] = useState<boolean>(() => sessionStorage.getItem('tallyo_privacy_mode') === 'true');
  const [assistantPin, setAssistantPin] = useState('4821');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [classes, setClasses] = useState<ClassItem[]>(initialClasses);
  const [students, setStudents] = useState<StudentRecord[]>(initialStudents);
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>(initialJoinRequests);
  const [todaySessions] = useState<TodaySession[]>(initialTodaySessions);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(initialAnnouncements);

  const showToast = useCallback((msg: string) => setToastMessage(msg), []);
  const clearToast = useCallback(() => setToastMessage(null), []);

  useEffect(() => {
    if (!toastMessage) return;
    const t = setTimeout(() => setToastMessage(null), 3200);
    return () => clearTimeout(t);
  }, [toastMessage]);

  useEffect(() => {
    sessionStorage.setItem('tallyo_privacy_mode', String(isPrivacyMode));
  }, [isPrivacyMode]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === 'p' && role === 'teacher') {
        setIsPrivacyMode((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [role]);

  const togglePrivacyMode = () => setIsPrivacyMode((prev) => !prev);

  const approveJoinRequest = (id: string) => {
    const req = joinRequests.find((r) => r.id === id);
    if (!req) return;
    const cls = classes.find((c) => c.name === req.className) || classes[0];
    setStudents((prev) => [{
      id: `s_${Date.now()}`, name: req.studentName, classId: cls.id, className: cls.name,
      parentPhone: req.parentPhone, paidAmount: 0, totalDue: cls.monthlyFee,
      remainingAmount: cls.monthlyFee, status: 'UNPAID', attendanceToday: 'UNMARKED',
      joinToken: `tk_${Math.random().toString(36).substring(7)}`,
    }, ...prev]);
    setJoinRequests((prev) => prev.filter((r) => r.id !== id));
    showToast(`تم قبول انضمام ${req.studentName} في ${cls.name}`);
  };

  const rejectJoinRequest = (id: string) => {
    setJoinRequests((prev) => prev.filter((r) => r.id !== id));
    showToast('تم رفض طلب الانضمام');
  };

  const recordPayment = (studentId: string, amount: number) => {
    setStudents((prev) => prev.map((s) => {
      if (s.id !== studentId) return s;
      const newPaid = s.paidAmount + amount;
      const newRem = Math.max(0, s.totalDue - newPaid);
      return { ...s, paidAmount: newPaid, remainingAmount: newRem, status: newRem === 0 ? 'PAID' : 'PARTIAL' };
    }));
    showToast(`تم تسجيل سداد مبلغ ${amount} ج.م`);
  };

  const updateAttendance = (studentId: string, status: StudentRecord['attendanceToday']) => {
    navigator.vibrate?.(15);
    setStudents((prev) => prev.map((s) => (s.id === studentId ? { ...s, attendanceToday: status } : s)));
  };

  const addNewStudent = (name: string, classId: string, parentPhone: string) => {
    const cls = classes.find((c) => c.id === classId) || classes[0];
    setStudents((prev) => [{
      id: `s_${Date.now()}`, name, classId: cls.id, className: cls.name, parentPhone,
      paidAmount: 0, totalDue: cls.monthlyFee, remainingAmount: cls.monthlyFee,
      status: 'UNPAID', attendanceToday: 'UNMARKED',
      joinToken: `tk_${Math.random().toString(36).substring(7)}`,
    }, ...prev]);
    setIsAddStudentOpen(false);
    showToast(`تمت إضافة ${name} وتوليد رابطه الشخصي`);
  };

  const addNewClass = (cls: Omit<ClassItem, 'id' | 'studentCount' | 'joinCode'>) => {
    const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const prefix = cls.subject === 'رياضيات' ? 'MATH' : 'TAL';
    const joinCode = `${prefix}${suffix}`;
    setClasses((prev) => [{ ...cls, id: `c_${Date.now()}`, studentCount: 0, joinCode }, ...prev]);
    setIsAddClassOpen(false);
    showToast(`تم إنشاء ${cls.name} بكود ${joinCode}`);
  };

  const addNewAnnouncement = (item: Omit<AnnouncementItem, 'id' | 'date'>) => {
    setAnnouncements((prev) => [{ ...item, id: `a_${Date.now()}`, date: 'الآن' }, ...prev]);
    showToast('تم نشر التنبيه للطلاب بنجاح');
  };

  return (
    <DashboardContext.Provider value={{
      activeTab, setActiveTab, role, setRole, isPrivacyMode, togglePrivacyMode,
      assistantPin, setAssistantPin, students, joinRequests, todaySessions, classes,
      announcements, approveJoinRequest, rejectJoinRequest, recordPayment, updateAttendance,
      addNewStudent, addNewClass, addNewAnnouncement, isSettingsOpen, setIsSettingsOpen,
      isAddStudentOpen, setIsAddStudentOpen, isAddClassOpen, setIsAddClassOpen,
      toastMessage, showToast, clearToast,
    }}>
      {children}
    </DashboardContext.Provider>
  );
};
