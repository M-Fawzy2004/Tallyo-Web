import React from 'react';
import { EyeSlash, QrCode, DeviceMobile, CalendarBlank } from '@phosphor-icons/react';
import { RevealSection } from '../../../components/feedback/RevealSection';

const BENEFITS = [
  {
    icon: EyeSlash,
    color: 'text-amber-700 bg-amber-50 border-amber-200',
    title: 'حماية خصوصية دخلك أمام الطلاب',
    detail: 'إخفاء أرقام التحصيل والأرباح بنقرة واحدة عند وقوف الطلاب حول المكتب، مع حجب الأرقام المالية كلياً في حساب الأسستنت.',
    meta: 'أمان مالي للمدرس',
  },
  {
    icon: QrCode,
    color: 'text-teal-700 bg-teal-50 border-teal-200',
    title: 'تحضير بالـ QR يمنع الغش وتبادل الصور',
    detail: 'يتغير الكود تلقائياً كل 20 ثانية مع شاشة تحقق ملونة للأسستنت على الباب، بالإضافة لتحضير يدوي فوري لمن لا يحمل هاتفاً.',
    meta: 'تجدد كل 20 ثانية',
  },
  {
    icon: DeviceMobile,
    color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    title: 'رابط شخصي للطالب بدون تحميل تطبيقات',
    detail: 'يفتح الطالب وولي الأمر الرابط الشخصي على المتصفح لمتابعة الحضور والمصاريف والمذكرات مباشرة دون تسجيل معقد.',
    meta: 'بدون تثبيت برامج',
  },
  {
    icon: CalendarBlank,
    color: 'text-zinc-800 bg-zinc-100 border-zinc-300',
    title: 'مواعيد مستقلة لكل يوم وكود لكل صف',
    detail: 'حدد لكل يوم ميعاده المختلف داخل المجموعة الواحدة، وولّد كود انضمام خاص ترسله للطلاب عبر واتساب.',
    meta: 'مرونة كاملة للجدول',
  },
];

export const BentoFeatures: React.FC = () => {
  return (
    <RevealSection id="benefits" className="max-w-5xl mx-auto px-4 py-16">
      <div className="max-w-[680px] mx-auto text-center mb-12">
        <h2 className="heading-3 text-[#181818] mb-3">
          أدوات عملية لإدارة السنتر تحت الضغط
        </h2>
        <p className="body-3 text-zinc-600">
          كل ميزة مبنية خصيصاً لسرعة العمل على الباب ومتابعة تحصيل الحصص بدقة
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BENEFITS.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.title}
              className="p-6 rounded-3xl bg-white border border-zinc-200 flex flex-col justify-between gap-6 hover:border-zinc-400 motion-base"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-lg border flex items-center justify-center ${item.color}`}>
                    <Icon size={24} weight="duotone" />
                  </div>
                  <span className="caption-4 text-zinc-600 bg-zinc-100 border border-zinc-200 px-3 py-1 rounded-full">
                    {item.meta}
                  </span>
                </div>
                <h3 className="heading-6 text-[#181818] mb-2">{item.title}</h3>
                <p className="body-6 text-zinc-600 leading-relaxed">{item.detail}</p>
              </div>
            </article>
          );
        })}
      </div>
    </RevealSection>
  );
};
