import React, { useState, useEffect } from 'react';
import { Wallet, QrCode, CheckCircle, WhatsappLogo, ArrowsClockwise, Clock } from '@phosphor-icons/react';
import { QRCodeSVG } from 'qrcode.react';

export const InteractiveLiveDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'finance' | 'qr'>('finance');
  const [isPaid, setIsPaid] = useState(false);
  const [waPreviewShown, setWaPreviewShown] = useState(false);
  const [qrSeconds, setQrSeconds] = useState(20);
  const [liveTime, setLiveTime] = useState(() => new Date().toLocaleTimeString('en-GB', { hour12: false }));

  useEffect(() => {
    if (activeTab !== 'qr') return;
    const timer = setInterval(() => {
      setQrSeconds((prev) => (prev <= 1 ? 20 : prev - 1));
      setLiveTime(new Date().toLocaleTimeString('en-GB', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, [activeTab]);

  return (
    <div className="max-w-4xl mx-auto px-4 my-8">
      <div className="bg-white rounded-3xl border border-zinc-200 p-4 sm:p-6 shadow-sm">
        {/* Top Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-1 p-1 bg-zinc-100 rounded-xl border border-zinc-200">
            <button
              type="button"
              onClick={() => setActiveTab('finance')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg button-sm motion-base focus-ring cursor-pointer ${
                activeTab === 'finance' ? 'bg-white text-[#181818] shadow-xs' : 'text-zinc-600 hover:text-[#181818]'
              }`}
            >
              <Wallet size={16} weight="duotone" className="text-emerald-700" />
              <span>تحصيل المصاريف اللحظي</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('qr')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg button-sm motion-base focus-ring cursor-pointer ${
                activeTab === 'qr' ? 'bg-white text-[#181818] shadow-xs' : 'text-zinc-600 hover:text-[#181818]'
              }`}
            >
              <QrCode size={16} weight="duotone" className="text-teal-700" />
              <span>QR الحضور المتغير</span>
            </button>
          </div>
          <span className="caption-3 text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
            معاينة تفاعلية حية
          </span>
        </div>

        {/* Tab 1: Finance Simulation */}
        {activeTab === 'finance' && (
          <div className="space-y-3">
            <div className="p-4 rounded-2xl border border-zinc-200 bg-zinc-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center title-2 ${isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                  أ
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="title-3 text-[#181818]">أحمد محمود إبراهيم</h4>
                    <span className={`caption-3 px-2 py-1 rounded-lg ${isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {isPaid ? 'خالص المصاريف (260 ج.م)' : 'متأخر بمبلغ 130 ج.م'}
                    </span>
                  </div>
                  <p className="caption-5 text-zinc-600 mt-1">الأول الإعدادي، رياضيات • سنتر الأوائل بالهرم</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => { setIsPaid(!isPaid); setWaPreviewShown(false); }}
                  className={`px-3 py-2 rounded-lg button-sm motion-base active:scale-[0.98] focus-ring cursor-pointer min-h-[44px] flex items-center gap-2 ${
                    isPaid ? 'bg-white border border-zinc-300 text-[#181818]' : 'bg-[#181818] text-white hover:bg-[#272727]'
                  }`}
                >
                  <CheckCircle size={18} weight="bold" />
                  <span>{isPaid ? 'إرجاع الحالة للتجربة' : 'تسجيل سداد 130 ج.م'}</span>
                </button>

                {!isPaid && (
                  <button
                    type="button"
                    onClick={() => setWaPreviewShown((prev) => !prev)}
                    className="flex items-center gap-2 px-3 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white button-sm rounded-lg min-h-[44px] motion-base active:scale-[0.98] focus-ring cursor-pointer"
                  >
                    <WhatsappLogo size={18} weight="fill" />
                    <span>تذكير واتساب</span>
                  </button>
                )}
              </div>
            </div>

            {waPreviewShown && !isPaid && (
              <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50 caption-4 text-emerald-950">
                نص التذكير الجاهز لولي الأمر: السلام عليكم ولي أمر الطالب أحمد محمود إبراهيم، متبقي اشتراك الشهر 130 ج.م لمجموعة الأول الإعدادي.
              </div>
            )}
          </div>
        )}

        {/* Tab 2: QR Simulation */}
        {activeTab === 'qr' && (
          <div className="flex flex-col md:flex-row items-center justify-around gap-6 p-4 rounded-2xl border border-zinc-200 bg-zinc-50">
            <div className="text-center flex flex-col items-center gap-3">
              <div className="p-3 bg-white border border-zinc-300 rounded-2xl">
                <QRCodeSVG value={`https://tallyo.app/att/demo-${qrSeconds}`} size={136} level="M" />
              </div>
              <div className="w-40 h-2 rounded-full bg-zinc-200 overflow-hidden">
                <div
                  className={`h-full origin-right transition-transform duration-1000 ease-linear ${qrSeconds <= 4 ? 'bg-rose-600' : 'bg-emerald-600'}`}
                  style={{ transform: `scaleX(${qrSeconds / 20})` }}
                />
              </div>
              <div className="inline-flex items-center gap-2 caption-3 font-mono text-[#181818] bg-white border border-zinc-200 px-3 py-1 rounded-lg">
                <ArrowsClockwise size={14} weight="bold" />
                <span>يتغير الرمز بعد {qrSeconds} ثانية</span>
              </div>
            </div>

            <div className="w-full max-w-xs p-6 rounded-2xl bg-[#047857] text-white text-center border border-[#065F46]">
              <div className="inline-flex items-center gap-1 caption-4 bg-white/15 px-3 py-1 rounded-full mb-3">
                <Clock size={14} weight="bold" />
                <span>شاشة التحقق على الباب</span>
              </div>
              <h4 className="heading-6 mb-1">خالص المصاريف، تفضل بالدخول</h4>
              <p className="caption-4 text-emerald-100 mb-3">أحمد محمود • الأول الإعدادي</p>
              <div className="bg-[#064E3B] rounded-lg py-2 px-3 caption-3 font-mono tracking-wider">
                {liveTime} • توقيت حي لمنع الصور
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
