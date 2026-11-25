import type {
  ClassItem,
  StudentRecord,
  JoinRequest,
  TodaySession,
  AnnouncementItem,
} from './dashboardTypes';

export const initialClasses: ClassItem[] = [
  {
    id: 'c1',
    name: 'الأول الإعدادي',
    subject: 'رياضيات',
    centerName: 'سنتر الأوائل بالهرم',
    schedule: 'السبت 4:15 م • الثلاثاء 5:45 م',
    scheduleSlots: [
      { day: 'السبت', time: '4:15 م' },
      { day: 'الثلاثاء', time: '5:45 م' },
    ],
    monthlyFee: 260,
    sessionPrice: 65,
    studentCount: 37,
    joinCode: 'MATH1A7K',
    teacherHandle: '@mr_ahmed',
    classUsername: 'math_prep1',
  },
  {
    id: 'c2',
    name: 'الثاني الإعدادي',
    subject: 'رياضيات',
    centerName: 'سنتر الأوائل بالهرم',
    schedule: 'الأحد 5:00 م • الأربعاء 6:15 م',
    scheduleSlots: [
      { day: 'الأحد', time: '5:00 م' },
      { day: 'الأربعاء', time: '6:15 م' },
    ],
    monthlyFee: 300,
    sessionPrice: 75,
    studentCount: 43,
    joinCode: 'MATH2B3Q',
    teacherHandle: '@mr_ahmed',
    classUsername: 'math_prep2',
  },
  {
    id: 'c3',
    name: 'الثالث الإعدادي',
    subject: 'رياضيات',
    centerName: 'سنتر الأوائل بالهرم',
    schedule: 'الإثنين 4:30 م • الخميس 6:00 م',
    scheduleSlots: [
      { day: 'الإثنين', time: '4:30 م' },
      { day: 'الخميس', time: '6:00 م' },
    ],
    monthlyFee: 340,
    sessionPrice: 85,
    studentCount: 49,
    joinCode: 'MATH3C9X',
    teacherHandle: '@mr_ahmed',
    classUsername: 'math_prep3',
  },
];

export const initialStudents: StudentRecord[] = [
  { id: 's1', name: 'أحمد محمود إبراهيم', classId: 'c1', className: 'الأول الإعدادي', parentPhone: '01012345678', paidAmount: 0, totalDue: 260, remainingAmount: 260, status: 'UNPAID', attendanceToday: 'PRESENT', joinToken: 'tk_ahmed_101' },
  { id: 's2', name: 'مريم طارق عبد الله', classId: 'c1', className: 'الأول الإعدادي', parentPhone: '01198765432', paidAmount: 130, totalDue: 260, remainingAmount: 130, status: 'PARTIAL', attendanceToday: 'LATE', joinToken: 'tk_mariam_102' },
  { id: 's3', name: 'عمر خالد مصطفى', classId: 'c1', className: 'الأول الإعدادي', parentPhone: '01233445566', paidAmount: 260, totalDue: 260, remainingAmount: 0, status: 'PAID', attendanceToday: 'PRESENT', joinToken: 'tk_omar_103' },
  { id: 's4', name: 'نوران حسام حسن', classId: 'c2', className: 'الثاني الإعدادي', parentPhone: '01511223344', paidAmount: 300, totalDue: 300, remainingAmount: 0, status: 'PAID', attendanceToday: 'UNMARKED', joinToken: 'tk_nouran_201' },
  { id: 's5', name: 'يوسف حسام كمال', classId: 'c2', className: 'الثاني الإعدادي', parentPhone: '01099887766', paidAmount: 115, totalDue: 300, remainingAmount: 185, status: 'PARTIAL', attendanceToday: 'ABSENT', joinToken: 'tk_youssef_202' },
];

export const initialJoinRequests: JoinRequest[] = [
  { id: 'j1', studentName: 'كريم أشرف سمير', className: 'الأول الإعدادي', parentPhone: '01022334455', requestedAt: 'منذ 14 دقيقة' },
  { id: 'j2', studentName: 'حبيبة وائل فؤاد', className: 'الثاني الإعدادي', parentPhone: '01144556677', requestedAt: 'منذ ساعتين' },
];

export const initialTodaySessions: TodaySession[] = [
  { id: 'ts1', className: 'الأول الإعدادي', centerName: 'سنتر الأوائل بالهرم', time: 'من 4:15 م إلى 5:45 م', enrolledCount: 37, attendedCount: 34 },
  { id: 'ts2', className: 'الثاني الإعدادي', centerName: 'سنتر النور بالدقي', time: 'من 5:45 م إلى 7:15 م', enrolledCount: 43, attendedCount: 19 },
];

export const initialAnnouncements: AnnouncementItem[] = [
  { id: 'a1', className: 'الأول الإعدادي', type: 'EXAM', title: 'امتحان شامل على الوحدة الأولى', content: 'يرجى مراجعة مسائل الهندسة قبل الحصة، الامتحان يبدأ في الدقائق العشر الأولى من موعد المجموعة.', date: 'اليوم 10:14 ص' },
  { id: 'a2', className: 'كل الصفوف', type: 'NOTICE', title: 'تعديل موعد حصة الجمعة القادمة', content: 'تم تقديم مواعيد حصص يوم الجمعة بمقدار نصف ساعة فقط لأعمال صيانة القاعة.', date: 'أمس 6:42 م' },
];
