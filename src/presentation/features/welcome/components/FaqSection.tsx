import React, { useState } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import { RevealSection } from '../../../components/feedback/RevealSection';

const FAQS = [
  {
    q: 'هل يحتاج الطالب لتنزيل تطبيق على الهاتف للدخول؟',
    a: 'لا يحتاج الطالب أو ولي الأمر لتثبيت أي تطبيق. يحصل كل طالب على رابط مباشر يفتح من متصفح الهاتف لمتابعة الحضور والمصاريف والمذكرات.',
  },
  {
    q: 'كيف يمنع النظام الطالب من تصوير كود الحضور وإرساله لصديقه؟',
    a: 'يتجدد كود الـ QR تلقائياً كل 20 ثانية، كما تعرض شاشة الدخول ساعة رقمية حية بالثواني ليتمكن الأسستنت من التأكد بصرياً على الباب.',
  },
  {
    q: 'ماذا يستطيع الأسستنت رؤيته عند تسجيل الدخول؟',
    a: 'تقتصر شاشة الأسستنت على التحضير السريع واستلام دفعات الطلاب وإرسال تذكير واتساب فقط، مع حجب إجمالي أرباح المدرس وإعدادات الحساب بالكامل.',
  },
  {
    q: 'هل يمكن تحديد ميعاد مختلف لكل يوم داخل نفس الصف؟',
    a: 'نعم. أثناء إنشاء أو تعديل الصف يمكنك إضافة كل يوم بوقته المستقل مثل السبت الساعة 4:15 مساءً والثلاثاء الساعة 5:45 مساءً.',
  },
  {
    q: 'كيف ينضم الطلاب الجدد إلى الصف لأول مرة؟',
    a: 'لكل صف كود انضمام فريد ورابط مباشر ترسله على مجموعة واتساب. يكتب الطالب اسمه ورقم ولي الأمر، ويظهر في قائمة طلبات الانضمام لتوافق عليه بضغطة.',
  },
  {
    q: 'هل تعمل الواجهة بشكل مريح على الهاتف أثناء الوقوف في السنتر؟',
    a: 'نعم، جميع أزرار التحضير والسداد مصممة بمقاسات لمس واضحة تناسب الاستخدام بيد واحدة على الهاتف في الممرات وقاعات السناتر.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <RevealSection id="faq" className="max-w-3xl mx-auto px-4 py-16">
      <div className="max-w-[680px] mx-auto text-center mb-12">
        <h2 className="heading-3 text-[#181818] mb-3">أسئلة شائعة</h2>
        <p className="body-3 text-zinc-600">إجابات مباشرة حول تشغيل Tallyo في المجموعات والسناتر</p>
      </div>

      <div className="space-y-3">
        {FAQS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={item.q} className="rounded-2xl bg-white border border-zinc-200 overflow-hidden">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-4 sm:p-6 text-right flex items-center justify-between gap-4 hover:bg-zinc-50 motion-color focus-ring cursor-pointer"
              >
                <span className="title-3 text-[#181818]">{item.q}</span>
                <CaretDown
                  size={18}
                  weight="bold"
                  className={`text-zinc-500 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 sm:px-6 pb-6 body-6 text-zinc-600 leading-relaxed">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </RevealSection>
  );
};
