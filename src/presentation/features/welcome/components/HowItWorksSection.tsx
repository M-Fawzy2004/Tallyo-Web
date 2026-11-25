import React from 'react';
import { RevealSection } from '../../../components/feedback/RevealSection';

const STEPS = [
  {
    number: '01',
    title: 'ادخل بحساب Google وأنشئ صفوفك',
    description: 'سجّل بضغطة واحدة، وحدد اسم كل صف وسعر الحصة ومواعيد كل يوم على حدة ليتم توليد كود الانضمام تلقائياً.',
  },
  {
    number: '02',
    title: 'شارك كود الصف مع الطلاب على واتساب',
    description: 'ينضم الطالب بالكود في ثوانٍ بدون إنشاء كلمة مرور، ويصل طلبه في قائمة الموافقات لتقبله أو ترفضه.',
  },
  {
    number: '03',
    title: 'شغّل حضور الـ QR وتابع التحصيل يومياً',
    description: 'اعرض كود الحضور المتغير على الشاشة أو حضّر يدوياً من الهاتف، وأرسل تذكير المصاريف لولي الأمر مباشرة.',
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <RevealSection id="how-it-works" className="max-w-5xl mx-auto px-4 py-16">
      <div className="max-w-[680px] mx-auto text-center mb-12">
        <h2 className="heading-3 text-[#181818] mb-3">كيف تبدأ العمل في ثلاث خطوات</h2>
        <p className="body-3 text-zinc-600">
          إعداد كامل لمجموعاتك في أقل من دقيقتين دون الحاجة لخبرة تقنية
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STEPS.map((step) => (
          <article
            key={step.number}
            className="p-6 rounded-3xl bg-white border border-zinc-200 flex flex-col justify-between gap-4"
          >
            <div>
              <span className="inline-block px-3 py-1 rounded-lg bg-[#181818] text-white font-mono caption-3 mb-4">
                {step.number}
              </span>
              <h3 className="heading-6 text-[#181818] mb-2">{step.title}</h3>
              <p className="body-6 text-zinc-600 leading-relaxed">{step.description}</p>
            </div>
          </article>
        ))}
      </div>
    </RevealSection>
  );
};
