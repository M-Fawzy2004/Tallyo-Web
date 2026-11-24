# 00. Master Prompt & Engineering Constitution

> **Mandatory & Strict Engineering Standards for Developers and AI Agents**  
> **Project Code:** `Tallyo-Web`  
> **Application Scope:** Management system for private tutors, educational centers, and teaching assistants in Egypt.

---

## 1. Core Identity & Scope
**Tallyo** is a high-performance web platform designed for the Egyptian tutoring and educational center ecosystem (teachers, teaching assistants, centers, students, and parents).  
The core mission: **Solve the chaotic financial collection and monthly dues tracking problem with absolute accuracy, provide frictionless 1-tap attendance, and deliver instant WhatsApp communications to parents without friction or mandatory mobile app installs.**

### The Non-Negotiable Pillars:
1. **Speed & Zero Friction:** Any attendance check or payment collection must execute in a single tap (under 100ms UI response).
2. **Teacher Privacy First:** Protect the teacher's financial confidentiality in crowded classrooms via an instant privacy toggle.
3. **Zero-Install for Students & Parents:** Lightweight, secure tokenized web links deliver real-time data without accounts or passwords.
4. **Resilience to Egyptian Network Conditions:** Handle spotty 4G and classroom basement connections with local-first optimistic updates and synchronization queues.

---

## 2. Strict AI Agent Execution Protocol
Any AI agent working on this codebase must strictly adhere to the following directives:

### A. Pre-Flight Rule Check
- You must review all relevant guideline files in `rules/` before authoring or modifying code.
- Never provide fragmented, hacky, or monolithic code. All code must integrate with the existing Clean Architecture layers.

### B. No Monolithic Code (Max 150 Lines per UI File)
- React component files must not exceed **150 lines**. If a component exceeds this threshold, decompose it immediately into:
  - Custom Hook for state and business logic (`useFeatureName.ts`).
  - Sub-components for atomic elements.
  - Constants and types in dedicated files.

### C. Strict TypeScript Zero-Tolerance
- `any` and unvalidated `unknown` types are strictly forbidden.
- All domain models, DTOs, and event payloads must have explicit TypeScript interfaces.
- The TypeScript compiler must remain on `strict: true` with zero build or lint warnings.

### D. Clean Architecture Enforcement
- UI components **must never import or call the Supabase client directly**.
- The mandatory unidirectional data flow:
  $$\text{UI Component} \longrightarrow \text{Custom Hook / Controller} \longrightarrow \text{Use Case} \longrightarrow \text{Repository Interface} \longrightarrow \text{Supabase / API}$$

---

## 3. Role-Based Access Matrix

| User Role | Authentication Method | Capabilities | Strict Restrictions |
| :--- | :--- | :--- | :--- |
| **Teacher (Owner)** | Google OAuth / Magic Link | Complete control: create classes, set pricing, view financial analytics & net revenue, delete students, export records. | None. |
| **Assistant (Door Operator)** | Teacher Code + 4-Digit Numeric PIN | Fast door operations: 1-tap attendance, dynamic QR screen, record student payments, send WhatsApp reminders, approve join requests. | **Strictly Forbidden:** Viewing total teacher revenue, altering class pricing, deleting student records, accessing account settings. |
| **Student / Parent** | Tokenized Public URL (`/p/:studentToken`) | View student card, current month fee status (Paid / Partial / Unpaid), attendance history, announcements, and study PDFs. | Read-only access restricted strictly to the single student linked to that secure token. |

---

## 4. Definition of Done (DoD) Checklist
Before marking any feature or task as complete, verify:
- [ ] Code strictly follows Clean Architecture and is placed in its designated layer.
- [ ] UI is fully responsive, mobile-first, and natively supports right-to-left (RTL).
- [ ] Financial calculations use central domain entities/services (no ad-hoc math in JSX).
- [ ] Fast operations (attendance, payments) implement optimistic updates (<30ms feedback).
- [ ] Zero TypeScript errors, zero lint warnings, and clean `npm run build` execution.
- [ ] Standard Egyptian educational lexicon is respected across UI strings.
