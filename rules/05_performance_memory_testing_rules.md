# 05. Performance, Memory & Testing Rules

> **Engineering Standards for Ultra-Fast UI Latency, Leak Prevention, and Automated Verification**  
> In high-pressure center environments, every millisecond and megabyte directly impacts user satisfaction and door throughput.

---

## 1. Core Web Vitals Targets

| Metric | Target | Technical Mechanism in Tallyo |
| :--- | :--- | :--- |
| **LCP (Largest Contentful Paint)** | `< 1.2s` | Lazy loading heavy components, WOFF2 Arabic font subsetting. |
| **INP (Interaction to Next Paint)** | `< 50ms` | Optimistic local updates; offloading computations from main thread. |
| **CLS (Cumulative Layout Shift)** | `< 0.02` | Fixed dimensions for student cards, QR containers, and skeleton screens. |
| **Initial JS Bundle** | `< 150 KB gzipped` | Route-based code splitting using `React.lazy` and dynamic imports. |

---

## 2. Memory Leak Prevention

1. **Interval & Timer Cleanup:**
   - The 20-second dynamic QR rotation timer and the live ticking clock must be explicitly cleared in the `useEffect` cleanup return:
     ```typescript
     useEffect(() => {
       const timer = setInterval(rotateQrToken, 20000);
       return () => clearInterval(timer);
     }, []);
     ```
2. **Supabase Realtime Channel Teardown:**
   - Any active Realtime subscription listening for attendance scans must unsubscribe upon component unmount:
     ```typescript
     useEffect(() => {
       const channel = supabase.channel('class-attendance')
         .on(...)
         .subscribe();
       return () => {
         supabase.removeChannel(channel);
       };
     }, [classId]);
     ```
3. **Camera Hardware Release:**
   - Camera streams used for scanning must release tracks (`stream.getTracks().forEach(t => t.stop())`) immediately when closing the scanner to preserve battery and prevent hardware locking.

---

## 3. Large Roster Rendering & Virtualization

In large centers, a single grade or group may contain 100 to 500 students:
1. **Preventing Redundant Re-renders:**
   - Memoize student row cards (`React.memo(StudentRowCard)`) and wrap action callbacks (`onMarkAttendance`, `onCollectPayment`) in `useCallback`.
2. **Virtual Scrolling:**
   - Lists exceeding 100 students must utilize virtual list rendering to render only DOM nodes currently in the viewport, preventing lag on budget mobile devices.

---

## 4. Automated Testing Strategy

1. **Domain Unit Tests:**
   - 100% test coverage for financial dues calculations, partial payment ledgers, and discount models.
   - Validation of QR time-window hashing algorithms and expiration checks.
2. **Integration Smoke Tests:**
   - 1-tap manual attendance workflow with optimistic rollback verification.
   - Payment collection and remaining balance updates.
   - Egyptian telephone number sanitizer (`010...` $\rightarrow$ `2010...`) and WhatsApp deep-link generator.
