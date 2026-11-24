import React from 'react';
import { EyeOff, Smartphone, Zap } from 'lucide-react';

export const BentoFeatures: React.FC = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
          كل ما يحتاجه المدرس في شاشة واحدة
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          صُمم بأسلوب بسيط وسريع يناسب ضغط العمل الحقيقي في السناتر المصرية
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Bento Card 1 */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <EyeOff className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 mb-2">
              حماية خصوصية أرباحك
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              زر إخفاء الأرقام بضغطة واحدة يحجب دخل السنتر والأرباح الإجمالية فوراً أثناء وقوف الطلاب حول مكتبك.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-100 text-xs font-mono font-bold text-amber-700">
            حماية كاملة 100%
          </div>
        </div>

        {/* Bento Card 2 */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 mb-2">
              رابط للطالب بدون تطبيقات
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              مش محتاجين ينزلوا تطبيقات. كل طالب ليه رابط ويب شخصي يفتحه يشوف الحضور والدرجات والمذكرات.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-100 text-xs font-mono font-bold text-indigo-700">
            Zero Install Architecture
          </div>
        </div>

        {/* Bento Card 3 */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 mb-2">
              سرعة فائقة ولمسة واحدة
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              أي عملية تحضير أو تسجيل دفعة تتم في أقل من 30ms مع استجابة فيزيائية وتحديث تفاؤلي سريع.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-100 text-xs font-mono font-bold text-emerald-700">
            &lt; 30ms UI Response
          </div>
        </div>
      </div>
    </section>
  );
};
