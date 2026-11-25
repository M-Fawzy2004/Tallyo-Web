import React from 'react';
import { X } from '@phosphor-icons/react';

export type LegalDocType = 'privacy' | 'terms' | null;

interface LegalModalProps {
  docType: LegalDocType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ docType, onClose }) => {
  if (!docType) return null;

  const isPrivacy = docType === 'privacy';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/70 backdrop-blur-xs"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-zinc-200 space-y-4 text-right">
        <div className="flex items-center justify-between">
          <h3 className="heading-6 text-[#181818]">
            {isPrivacy ? 'سياسة الخصوصية وحماية البيانات' : 'شروط استخدام منصة Tallyo'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="w-10 h-10 rounded-lg border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-zinc-100 focus-ring cursor-pointer"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        {isPrivacy ? (
          <div className="space-y-3 body-6 text-zinc-600 leading-relaxed">
            <p>
              بيانات الطلاب، أرقام هواتف أولياء الأمور، وسجلات التحصيل الخاصة بكل مدرس محفوظة بشكل معزول تماماً ولا يمكن لأي حساب آخر الاطلاع عليها.
            </p>
            <p>
              عند تفعيل حساب الأسستنت، يتم إخفاء إجمالي الأرباح والإعدادات الحساسة تلقائياً، ولا يتم مشاركة أي بيانات مع أطراف خارجية.
            </p>
          </div>
        ) : (
          <div className="space-y-3 body-6 text-zinc-600 leading-relaxed">
            <p>
              توفر منصة Tallyo أدوات تنظيم الحضور، التحصيل المالي، والتواصل مع أولياء الأمور للمدرسين والسناتر التعليمية.
            </p>
            <p>
              يتحمل صاحب الحساب مسؤولية الحفاظ على سرية رمز الأسستنت المكون من 4 أرقام وإدارة طلبات انضمام الطلاب إلى صفوفه.
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2 px-3 min-h-[44px] rounded-xl bg-[#181818] text-white button-sm hover:bg-[#272727] motion-base focus-ring cursor-pointer"
        >
          فهمت
        </button>
      </div>
    </div>
  );
};
