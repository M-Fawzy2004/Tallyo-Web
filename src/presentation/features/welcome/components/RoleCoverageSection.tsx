import React from 'react';
import { ChalkboardTeacher, UserCheck, Student } from '@phosphor-icons/react';
import { RevealSection } from '../../../components/feedback/RevealSection';

const ROLES = [
  {
    icon: ChalkboardTeacher,
    title: 'لوحة المدرس الكاملة',
    subtitle: 'التحكم الكامل والميزانية',
    points: [
      'إنشاء الصفوف وتحديد سعر الحصة والمواعيد',
      'متابعة صافي التحصيل والمديونيات مع زر إخفاء الخصوصية',
      'إدارة رمز PIN الخاص بالأسستنت ونشر المذكرات والتنبيهات',
    ],
  },
  {
    icon: UserCheck,
    title: 'واجهة الأسستنت على الباب',
    subtitle: 'سرعة عالية بصلاحيات محددة',
    points: [
      'الدخول بكود المدرس ورقم PIN مكون من 4 أرقام',
      'تشغيل شاشة الـ QR والتحضير اليدوي السريع بيد واحدة',
      'استلام دفعات الطلاب وإرسال تذكير واتساب دون رؤية أرباح المدرس',
    ],
  },
  {
    icon: Student,
    title: 'بوابة الطالب وولي الأمر',
    subtitle: 'رابط مباشر بدون تطبيقات',
    points: [
      'الانضمام لمجموعة المدرس عبر كود الصف الفريد',
      'متابعة سجل الحضور وحالة اشتراك الشهر لحظة بلحظة',
      'تنزيل المذكرات والواجبات ومواعيد الامتحانات من المتصفح',
    ],
  },
];

export const RoleCoverageSection: React.FC = () => {
  return (
    <RevealSection className="max-w-5xl mx-auto px-4 py-16">
      <div className="max-w-[680px] mx-auto text-center mb-12">
        <h2 className="heading-3 text-[#181818] mb-3">مصمم لكل دور داخل السنتر</h2>
        <p className="body-3 text-zinc-600">
          صلاحيات واضحة تفصل بين حساب المدرس وعمل الأسستنت ومتابعة ولي الأمر
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ROLES.map((role) => {
          const Icon = role.icon;
          return (
            <article key={role.title} className="p-6 rounded-3xl bg-white border border-zinc-200 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-[#181818]">
                  <Icon size={24} weight="duotone" />
                </div>
                <div>
                  <h3 className="title-3 text-[#181818]">{role.title}</h3>
                  <span className="caption-4 text-zinc-500">{role.subtitle}</span>
                </div>
              </div>
              <ul className="space-y-2">
                {role.points.map((pt) => (
                  <li key={pt} className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 caption-2 text-zinc-700">
                    {pt}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </RevealSection>
  );
};
