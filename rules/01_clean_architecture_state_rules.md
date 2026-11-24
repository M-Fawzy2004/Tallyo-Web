# 01. Clean Architecture & State Management Rules

> **Strict Architectural Standards for Code Organization and Separation of Concerns**  
> Ensures the codebase remains testable, decoupled, and maintainable, isolating the UI from database schemas and external vendors.

---

## 1. Directory Structure

All application code under `src/` must strictly adhere to this four-tier architecture:

```
src/
├── core/                         # Cross-cutting concerns & shared utilities
│   ├── config/                   # Environment config and app-wide constants
│   ├── constants/                # Routes, status codes, system strings
│   ├── errors/                   # Standard domain and application error classes
│   └── utils/                    # Pure utility functions (formatting, dates, math)
│
├── domain/                       # Pure Business Logic (Zero dependencies on React/Supabase)
│   ├── student/                  # Student entities, value objects, repository interfaces
│   │   ├── entities/             # Student, StudentContact
│   │   ├── value-objects/        # PhoneNumber, StudentCode
│   │   └── repositories/         # IStudentRepository (Interface only)
│   ├── classroom/                # Groups, classes, and schedules
│   │   ├── entities/             # Classroom, Schedule, PricingPlan
│   │   └── repositories/         # IClassroomRepository
│   ├── attendance/               # Attendance records and QR sessions
│   │   ├── entities/             # AttendanceRecord, QrSessionToken
│   │   ├── value-objects/        # AttendanceStatus (PRESENT, LATE, ABSENT)
│   │   └── repositories/         # IAttendanceRepository
│   ├── finance/                  # Payments, monthly fees, balance sheets
│   │   ├── entities/             # Payment, MonthlySubscription, BalanceSheet
│   │   ├── value-objects/        # Money, PaymentStatus (PAID, PARTIAL, UNPAID)
│   │   └── repositories/         # IFinanceRepository
│   └── notification/             # Announcements, study files, WhatsApp templates
│       ├── entities/             # Announcement, StudyMaterial, WhatsAppTemplate
│       └── repositories/         # INotificationRepository
│
├── application/                  # Use Cases & Application Services
│   ├── student/                  # UseCases: AddStudent, ApproveStudentJoin, GetStudentPortal
│   ├── attendance/               # UseCases: MarkAttendance, VerifyDynamicQr, GetClassAttendanceSheet
│   ├── finance/                  # UseCases: RecordPayment, CalculateMonthlyDues, GenerateDebtorsReport
│   ├── whatsapp/                 # UseCases: ComposePaymentReminderUrl
│   └── common/                   # DTOs, UseCase Interfaces, Result Pattern
│
├── infrastructure/               # External Implementations & Vendors
│   ├── supabase/                 # Supabase client instance, generated database types
│   │   ├── client.ts
│   │   └── models/               # Supabase row schema mappings
│   ├── repositories/             # Concrete implementations (e.g., SupabaseStudentRepository)
│   ├── storage/                  # File storage implementations (Supabase Storage)
│   └── security/                 # QR hashing, token crypto, PIN session management
│
└── presentation/                 # UI Layer (React 19, Tailwind CSS)
    ├── components/               # Atomic reusable UI elements
    │   ├── ui/                   # Button, Input, Modal, Card, Badge, Toggle
    │   └── feedback/             # Skeletons, Spinners, Toast notifications
    ├── features/                 # Feature-sliced modules
    │   ├── attendance/           # DynamicQrScanner, ManualAttendanceList
    │   ├── finance/              # PaymentModal, QuickCollectBar, DebtorsTable
    │   ├── students/             # StudentForm, StudentCard, PortalView
    │   ├── classes/              # ClassCard, SchedulePicker
    │   └── assistant/            # Assistant PIN Login & Door Panel
    ├── hooks/                    # Custom React hooks binding use cases to UI
    ├── layouts/                  # TeacherLayout, AssistantLayout, PortalLayout
    ├── pages/                    # Route-level components
    └── state/                    # Global stores & Context providers
```

---

## 2. Layer Boundaries & Dependency Rules

1. **The Dependency Rule:**
   - Inner layers (`domain`) know nothing about outer layers (`application`, `infrastructure`, `presentation`).
   - Domain files must never import React, hooks, browser APIs, or Supabase.
2. **No Direct Supabase in UI Components:**
   - Calling `supabase.from('students').select(...)` inside any `.tsx` component is a severe violation.
   - Components only interact with custom hooks (e.g., `useRecordPayment()`), which invoke application use cases backed by repository interfaces.
3. **The Result Pattern:**
   - Use cases must return structured results rather than throwing unhandled exceptions:
     ```typescript
     type Result<T, E = DomainError> = 
       | { success: true; data: T }
       | { success: false; error: E };
     ```

---

## 3. State Management & Optimistic Updates

### A. State Classification:
1. **Server State:** Managed via dedicated cached hooks with automated invalidation.
2. **Local Component State:** Reserved strictly for ephemeral UI state (dropdown open/close, active modal).
3. **Privacy State:** Global session state controlling the masking of sensitive revenue metrics, persisted in `sessionStorage`.

### B. Mandatory Optimistic Updates:
- In a center environment, an assistant processes up to 100 students in 10 minutes. Network latency must never block the user.
- Marking attendance or recording payments must:
  1. Update the UI state immediately (<30ms).
  2. Dispatch the network mutation in the background.
  3. Revert smoothly (rollback) with a subtle toast if the operation fails, queuing the request for automatic retry.

### C. Financial Calculation Purity:
- Calculating remaining balance, debt status, or monthly totals **must never be done ad-hoc inside JSX**.
- All calculations belong exclusively to the `MonthlySubscription` entity or a Domain Service to ensure 100% parity across teacher reports, assistant screens, and student links.
