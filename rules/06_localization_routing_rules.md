# 06. Localization, RTL & Routing Rules

> **Standards for RTL Layouts, Egyptian Tutoring Lexicon, and URL Architecture**  
> Tallyo is built natively around Egyptian tutoring terminology to feel intuitive and natural to teachers, students, and parents.

---

## 1. RTL Layout Architecture & CSS Logical Properties

1. **Root HTML Configuration:**
   - The document root must always specify Arabic direction: `<html dir="rtl" lang="ar">`.
2. **Mandatory CSS Logical Properties:**
   - **Strictly Prohibited:** Physical directional utilities like `ml-`, `mr-`, `pl-`, `pr-`, `left-`, `right-`.
   - **Mandatory Tailwind Logical Replacements:**
     - `ms-*` (Margin Start - right side in RTL).
     - `me-*` (Margin End - left side in RTL).
     - `ps-*` and `pe-*` for internal padding.
     - `start-*` and `end-*` for absolute positioning.
     - `border-s-*` and `border-e-*` for directional borders.
3. **Directional Icon Flipping:**
   - Navigation and arrow icons (next, back, breadcrumbs) must mirror automatically for RTL (`rtl:rotate-180`).

---

## 2. Approved Egyptian Tutoring Lexicon

All Arabic user-facing strings must adhere to authentic Egyptian center terminology:

| Prohibited Formal Term | Approved Egyptian Term | English Equivalent | Context |
| :--- | :--- | :--- | :--- |
| محاضرة / جلسة تدريبية | **حصة** | Class Session | Schedule and attendance logging |
| دورة تدريبية / فئة | **مجموعة / صف** | Class / Group | Student rosters and groups |
| مستحقات / رسوم دراسية | **المصاريف / الاشتراك** | Monthly Fees | Financial collections |
| مسدد بالكامل | **خالص المصاريف** | Fully Paid | Attendance badge |
| متخلف عن السداد | **متأخر في المصاريف** | Payment Overdue | Debtor alert badge |
| مواد تعليمية / مرفقات | **مذكرات وملخصات** | Study Materials | PDF and summary uploads |
| ولي أمر الطالب | **ولي الأمر** | Parent / Guardian | WhatsApp messages & contacts |
| قاعة المحاضرات | **السنتر / القاعة** | Center / Hall | Group location and join codes |
| القائم بالتسجيل | **الأسستنت / المساعد** | Assistant | PIN login & door operations |

---

## 3. Currency, Numbers & Timezone Standards

1. **Official Currency:**
   - Formatted as `ج.م` or `EGP`.
   - Centrally formatted using `Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' })` or clean utility string `${amount} ج.م`.
2. **Official Timezone:**
   - All server operations and timestamps enforce the Egyptian timezone: **`Africa/Cairo`**.
   - Monthly billing cycles follow the Gregorian calendar customary in Egyptian schools and centers (October, November, etc.).

---

## 4. Routing Architecture

```
/                                   # Landing page or automatic redirect to dashboard
│
├── /auth/login                     # Teacher login (Google OAuth / Magic Link)
│
├── /assistant/login                # Assistant PIN login (Teacher Code + 4-digit PIN)
├── /assistant/dashboard            # Fast door operations (Manual attendance + Quick Collect)
│
├── /dashboard                      # Teacher central command dashboard
├── /classes                        # Manage groups, classes, and schedules
├── /classes/:classId               # Class roster, attendance sheet, and notices
│
├── /students                       # Student directory, search, and filtering
├── /students/debtors               # Overdue fees management & batch WhatsApp reminders
│
├── /finance                        # Financial center and revenue (Shielded by Privacy Toggle)
│
├── /attendance/qr-display          # Rotating 20s QR code display screen (Projector/Laptop)
├── /attendance/scan                # Camera scan page for students
│
├── /p/:studentToken                # Public student & parent portal (Zero login - Secure token)
└── /join/:classCode                # Student class join request page
```

- **Route Guards:**
  - Teacher routes are guarded by `RequireTeacherAuth`.
  - Assistant routes are guarded by `RequireAssistantAuth`.
  - The public portal route `/p/:studentToken` requires no authentication.
