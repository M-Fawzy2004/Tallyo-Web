import React from 'react';
import { XCircle, CheckCircle } from '@phosphor-icons/react';
import { RevealSection } from '../../../components/feedback/RevealSection';

const COMPARISONS = [
  {
    pain: 'كشاكيل ورقية تضيع مع ضغط دخول المجموعات وصعوبة مراجعة المتأخرين.',
    gain: 'سجل إلكتروني لحظي يوضح المدفوع والمتبقي لكل طالب بلمسة واحدة.',
  },
  {
    pain: 'تصوير الطلاب لكود الحضور وإرساله للغائبين على مجموعات المحادثة.',
    gain: 'كود QR يتغير كل 20 ثانية مع ساعة حية على شاشة دخول الطالب.',
  },
  {
    pain: 'حرج انكشاف إجمالي أرباح الدرس أمام الطلاب عند الوقوف بجانب المكتب.',
    gain: 'زر إخفاء الأرباح وحجب كل الأرقام المالية عند تفعيل حساب الأسستنت.',
  },
];

export const ProblemSolutionSection: React.FC = () => {
  return (
    <RevealSection className="max-w-5xl mx-auto px-4 py-16">
      <div className="max-w-[680px] mx-auto text-center mb-12">
        <h2 className="heading-3 text-[#181818] mb-3">
          وداعاً لفوضى الورق ومراجعة الدفاتر بعد كل حصة
        </h2>
        <p className="body-3 text-zinc-600">
          الفرق بين إدارة السنتر بالكشاكيل الورقية وإدارته عبر Tallyo في كل حصة يومية
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <article className="p-6 rounded-3xl bg-white border border-zinc-200 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 caption-3 text-rose-800">
            <XCircle size={16} weight="fill" />
            <span>الوضع التقليدي بالورق</span>
          </div>
          <ul className="space-y-3">
            {COMPARISONS.map((item, idx) => (
              <li key={idx} className="p-4 rounded-lg bg-zinc-50 border border-zinc-200 body-6 text-zinc-700 flex items-start gap-3">
                <XCircle size={20} weight="duotone" className="text-rose-600 shrink-0 mt-0.5" />
                <span>{item.pain}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="p-6 rounded-3xl bg-[#181818] text-white border border-[#272727] space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#272727] border border-[#313131] caption-3 text-emerald-400">
            <CheckCircle size={16} weight="fill" />
            <span>مع نظام Tallyo</span>
          </div>
          <ul className="space-y-3">
            {COMPARISONS.map((item, idx) => (
              <li key={idx} className="p-4 rounded-lg bg-[#1F1F1F] border border-[#272727] body-6 text-zinc-200 flex items-start gap-3">
                <CheckCircle size={20} weight="fill" className="text-emerald-400 shrink-0 mt-0.5" />
                <span>{item.gain}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </RevealSection>
  );
};
