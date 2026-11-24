# 04. API, Supabase, Security & Offline Rules

> **Backend Architecture, Triple-Tier Authentication, Database Hardening, and Offline Resilience**  
> Covers role isolation, Row Level Security (RLS) policies, and network tolerance for crowded Egyptian centers.

---

## 1. Triple-Tier Authentication Architecture

Tallyo enforces three distinct access boundaries tailored to each user type:

```
                      ┌───────────────────────────────────────────────┐
                      │              Tallyo Security Gate             │
                      └───────┬───────────────┬───────────────┬───────┘
                              │               │               │
                              ▼               ▼               ▼
                     [Teacher / Owner]   [Assistant]    [Student / Parent]
                      Google OAuth        Teacher Code   Tokenized Link
                      (Full Admin)        + 4-Digit PIN  (Public Read-Only)
```

1. **Teacher Authentication:**
   - Handled via **Google OAuth** powered by Supabase Auth.
   - Bound to `auth.users.id`. All teacher resources enforce foreign keys `teacher_id UUID NOT NULL REFERENCES auth.users(id)`.
2. **Assistant PIN Authentication:**
   - Accessed via dedicated route (`/assistant/login`) using **Teacher Code** (e.g., `MOHAMED2026`) + **4-Digit Numeric PIN** (e.g., `4821`).
   - Assistants never receive the teacher's Google credentials or personal email.
   - Authenticated via a scoped session JWT with strict permissions limited to door operations (attendance insertion and payment logging).
3. **Student & Parent Access:**
   - Zero login or account creation required.
   - Accessible via a unique, collision-resistant token (UUIDv4 / NanoID): `/p/:token`.
   - Data fetched through a secured database function (RPC / Security Definer view) returning only the individual student's records.

---

## 2. Row Level Security (RLS) Policies

1. **100% RLS Coverage:**
   - Every single table in the Supabase schema must have RLS enabled:  
     `ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;`.
2. **Strict Teacher Isolation:**
   - Tutors are isolated from one another via tenant policies:
     ```sql
     CREATE POLICY "Teachers can only access their own data"
     ON classrooms
     FOR ALL
     USING (auth.uid() = teacher_id);
     ```
3. **Assistant Financial Shielding:**
   - Financial summaries and total revenue views are inaccessible to assistant role tokens; assistants are restricted to inserting individual payment receipts.
4. **Deletion Prohibition:**
   - Assistants cannot execute `DELETE` queries on any entity (students, payments, or attendance logs). Deletion is strictly reserved for authenticated teachers.

---

## 3. Offline Resilience & Sync Engine

Educational center basements and crowded classrooms frequently experience weak cellular signals and throttled connections.
1. **Local-First Mutation Queue:**
   - When marking attendance or logging a payment:
     1. Mutation is immediately committed locally in `IndexedDB` or `LocalStorage` with status `PENDING_SYNC`.
     2. UI updates optimistically in under 30ms.
     3. An asynchronous worker attempts synchronization with Supabase.
2. **Automatic Reconnection Flush:**
   - The application monitors browser connectivity via `navigator.onLine` and `window.addEventListener('online')`.
   - On connection restoration, the pending queue flushes sequentially in exact chronological order.
3. **Conflict Resolution Strategy:**
   - **Attendance:** Last-Write-Wins (LWW) based on client timestamp.
   - **Payments:** Additive ledger pattern to guarantee that cash collected at the door is never overwritten or lost.

---

## 4. WhatsApp Deep-Linking Architecture

1. **Client-Side Direct Links:**
   - Outreach relies entirely on direct `https://wa.me/` URLs initiated from the user's browser or WhatsApp desktop app.
   - **Key Advantages:**
     - Zero recurring server costs (no expensive WhatsApp Business API fees).
     - Zero risk of number bans, as messages originate from the teacher's known personal/business number.
     - Parents reply directly into the teacher's existing WhatsApp thread.
