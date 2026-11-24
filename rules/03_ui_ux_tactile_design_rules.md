# 03. UI/UX Tactile & QR Attendance Rules

> **Standards for High-Speed Field Operations, Tactile Feedback, and Anti-Fraud Verification**  
> Engineered specifically for the fast-paced Egyptian center environment: instant visual clarity, anti-cheating measures, and rapid interaction.

---

## 1. Privacy Shield Mode

In tutoring centers, students constantly gather around the teacher's desk to ask questions or review homework.
1. **The Eye Privacy Toggle:**
   - A persistent eye icon button is anchored in the top navigation bar of all teacher screens.
   - Single tap (or keyboard shortcut `Shift + P`) instantly masks all revenue metrics:
     - Monthly earnings, collected totals, outstanding debts, and group pricing.
   - Masked numbers display as `•••• EGP` or apply a blur filter: `filter: blur(8px)`.
   - The state is persisted in `sessionStorage` and remains active until deliberately unlocked.
2. **Zero Revenue Metrics on Assistant Screens:**
   - The assistant UI must not include any components or code paths displaying the teacher's aggregated earnings or financial totals.

---

## 2. Dynamic Anti-Fraud QR Engine

To prevent students from taking photos of the attendance code and sharing it via WhatsApp or Telegram groups with absent peers:
1. **20-Second Token Rotation:**
   - The QR code displayed on the teacher's laptop or projector automatically regenerates every **20 seconds** via a time-based rotating cryptographic token (TOTP / Rotating Nonce).
   - An animated circular progress indicator displays the remaining seconds before the next token rotation.
   - Expired tokens are rejected immediately after a 5-second network grace window.
2. **The 2-Meter Visual Verification Screen:**
   - When a student scans the QR code with their mobile camera, the resulting verification screen is designed to be inspected from 2 meters away by the assistant at the door:
     - **State A: Fees Paid in Full:**
       - High-visibility emerald background (`bg-emerald-600`) with bold white text: **"Fees Paid - Welcome to Class"**.
       - Full student name and class name in prominent typography.
       - A live, ticking digital clock showing seconds to prevent using pre-recorded video or static screenshots.
     - **State B: Outstanding Fees / Late:**
       - High-visibility warning rose background (`bg-rose-600`) with bold white text: **"Payment Due - Please Visit Desk"**.
       - Prominent remaining amount: **"Remaining: 200 EGP for November"**.
       - Live ticking digital clock with seconds.

---

## 3. One-Tap Manual Attendance

For students without smartphones or with depleted data plans:
1. **Tactile List Interface:**
   - Each student row displays high-contrast state indicators:
     - Green: **Present**
     - Orange: **Late**
     - Red / Muted: **Absent**
2. **Segmented Button Tap:**
   - Status switches immediately in a single tap without confirmation dialogs.
   - Tactile feedback: Subtle scale compression on click (`active:scale-95 transition-transform`).
   - Hardware haptic vibration on supported mobile devices via `navigator.vibrate?.(15)`.
3. **Debtor Alert Badge:**
   - Any student with overdue monthly fees displays a prominent red warning pill (`Payment Due`) next to their name, prompting the assistant to collect dues at the door.

---

## 4. One-Click WhatsApp Engine

1. **Zero-Friction Outreach:**
   - Beside every debtor student, a dedicated WhatsApp button styled in official green (`#25D366`) is available.
   - Clicking opens WhatsApp or WhatsApp Web directly, pre-populated with a polite Egyptian Arabic template:
     ```
     السلام عليكم ولي أمر الطالب [اسم الطالب] المحترم،
     نود تذكير سيادتكم باشتراك شهر [اسم الشهر] لمادة [اسم المادة] (مجموعة [اسم الصف]).
     المبلغ المطلوب سداده: [المبلغ المتبقي] ج.م.
     شاكرين جداً لتعاونكم وحرصكم الدائم.
     - سنتر [اسم السنتر / المدرس]
     ```
2. **Egyptian Phone Number Sanitizer:**
   - Input numbers formatted locally (`010...`, `011...`, `012...`, `015...`) automatically convert to clean international format without leading zeros, plus signs, or spaces:
     - `01012345678` $\longrightarrow$ `201012345678`.
   - URL encoding via `https://wa.me/201012345678?text=...` using standard `encodeURIComponent`.
