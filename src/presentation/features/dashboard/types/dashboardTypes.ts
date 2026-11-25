export type DashboardTab =
  | 'dashboard'
  | 'payments'
  | 'attendance'
  | 'students'
  | 'classes'
  | 'announcements';

export type UserRole = 'teacher' | 'assistant';

export interface StudentRecord {
  id: string;
  name: string;
  classId: string;
  className: string;
  parentPhone: string;
  paidAmount: number;
  totalDue: number;
  remainingAmount: number;
  status: 'PAID' | 'PARTIAL' | 'UNPAID';
  attendanceToday: 'PRESENT' | 'LATE' | 'ABSENT' | 'UNMARKED';
  joinToken: string;
}

export interface JoinRequest {
  id: string;
  studentName: string;
  className: string;
  parentPhone: string;
  requestedAt: string;
}

export interface TodaySession {
  id: string;
  className: string;
  centerName: string;
  time: string;
  enrolledCount: number;
  attendedCount: number;
}

export interface ScheduleSlot {
  day: string;
  time: string;
}

export interface ClassItem {
  id: string;
  name: string;
  subject?: string;
  centerName: string;
  schedule: string;
  scheduleSlots?: ScheduleSlot[];
  monthlyFee: number;
  sessionPrice?: number;
  studentCount: number;
  joinCode: string;
  teacherHandle?: string;
  classUsername?: string;
}

export interface AnnouncementItem {
  id: string;
  className: string;
  type: 'EXAM' | 'HOMEWORK' | 'STUDY_MATERIAL' | 'NOTICE';
  title: string;
  content: string;
  date: string;
  attachmentName?: string;
}

export interface DashboardContextType {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  isPrivacyMode: boolean;
  togglePrivacyMode: () => void;
  assistantPin: string;
  setAssistantPin: (pin: string) => void;
  students: StudentRecord[];
  joinRequests: JoinRequest[];
  todaySessions: TodaySession[];
  classes: ClassItem[];
  announcements: AnnouncementItem[];
  approveJoinRequest: (id: string) => void;
  rejectJoinRequest: (id: string) => void;
  recordPayment: (studentId: string, amount: number) => void;
  updateAttendance: (studentId: string, status: StudentRecord['attendanceToday']) => void;
  addNewStudent: (name: string, classId: string, parentPhone: string) => void;
  addNewClass: (cls: Omit<ClassItem, 'id' | 'studentCount' | 'joinCode'>) => void;
  addNewAnnouncement: (item: Omit<AnnouncementItem, 'id' | 'date'>) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  isAddStudentOpen: boolean;
  setIsAddStudentOpen: (open: boolean) => void;
  isAddClassOpen: boolean;
  setIsAddClassOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  clearToast: () => void;
}
