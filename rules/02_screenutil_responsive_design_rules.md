# 02. Screen & Responsive Design Rules

> **Standards for Mobile-First Ergonomics and Adaptive Interfaces**  
> Primary real-world use case: an assistant standing at the classroom door operating a mobile phone with one hand, while the teacher alternates between phone and laptop.

---

## 1. Mobile-First Philosophy

1. **Default to Mobile Styling:**
   - Write standard CSS/Tailwind classes for small screens first (`< 640px`), appending responsive breakpoints (`sm:`, `md:`, `lg:`, `xl:`) only as screen real-estate expands.
   - Approved pattern: `className="flex flex-col md:flex-row"`
   - Prohibited pattern: Desktop-first styles scaled down with overrides.
2. **The One-Thumb Reach Zone:**
   - Critical door-operation actions (mark attendance, scan QR, record payment, send WhatsApp) must be placed in the lower 50% of the mobile viewport.
   - The interactive bottom action bar is the standard container for primary triggers on mobile.

---

## 2. Touch Targets & Ergonomic Sizing

| UI Element | Minimum Dimension | Minimum Gap | Operational Requirement |
| :--- | :--- | :--- | :--- |
| **Attendance Buttons (Present / Late / Absent)** | `48px × 48px` (or `h-12 w-full`) | $\ge 8\text{px}$ | Prevents mis-taps when rapid-clicking through student lines. |
| **Payment & Collection Buttons** | Height $\ge 44\text{px}$ | $12\text{px}$ | High visual contrast with tactile tap feedback. |
| **Search & Text Inputs** | Height `48px` (`h-12`) | $16\text{px}$ margin | Font size must be $\ge 16\text{px}$ to prevent iOS Safari auto-zoom. |
| **Action Icons & Toolbars** | Tap box $\ge 44\text{px} \times 44\text{px}$ | $8\text{px}$ | Even if the icon is 20px, the clickable wrapper must span at least 44px. |

---

## 3. Dynamic Viewport Height & dvh/svh

1. **Safe Viewport Heights:**
   - Mobile browsers (Safari iOS and Chrome Android) collapse and expand top and bottom address bars dynamically, breaking fixed `100vh` layouts.
   - Use `h-[100dvh]` or `min-h-[100dvh]` (or `svh`) to ensure bottom action buttons are never obscured.
2. **Preventing iOS Safari Auto-Zoom:**
   - Every `<input>`, `<select>`, and `<textarea>` must maintain a minimum font-size of `16px` (`text-base` in Tailwind) on mobile viewports.

---

## 4. Adaptive Transformation: Data Tables vs Tactile Cards

For student directories, attendance sheets, and payment ledgers:
1. **On Tablet & Desktop (`>= 768px` / `md`):**
   - Render structured data tables: student name, group code, monthly fee status, paid amount, remaining balance, last attendance, and action shortcuts.
2. **On Mobile (`< 768px`):**
   - **Horizontal scrolling of wide data tables is strictly forbidden.**
   - The table seamlessly adapts into **Tactile Student Cards**:
     - Line 1: Student name (bold) + payment badge (Green = Paid / Red = Unpaid).
     - Line 2: Remaining balance in warning tone + last attendance date.
     - Line 3: 3 prominent ergonomic action buttons (Attendance, Collect, WhatsApp).

---

## 5. Approved Breakpoints & Containers

```javascript
// tailwind.config.js - Breakpoint Standards
screens: {
  'xs': '420px',    // Compact smartphones & narrow iOS screens
  'sm': '640px',    // Standard mobile devices
  'md': '768px',    // Tablets and iPad displays
  'lg': '1024px',   // Laptops and desktop screens
  'xl': '1280px',   // Classroom projectors and large monitors
}
```

- Primary teacher dashboard container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- Public student & parent portal (`/p/:token`): Constrained to mobile layout (`max-w-md mx-auto`) across all devices for consistent readability.
