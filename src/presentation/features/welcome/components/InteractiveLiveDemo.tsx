import React, { useState, useEffect } from 'react';
import { Wallet, QrCode, CheckCircle2, MessageSquare, RefreshCw, Clock } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export const InteractiveLiveDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'finance' | 'qr'>('finance');
  const [isPaid, setIsPaid] = useState(false);
  const [qrSeconds, setQrSeconds] = useState(20);

  useEffect(() => {
    if (activeTab !== 'qr') return;
    const interval = setInterval(() => {
      setQrSeconds((prev) => (prev <= 1 ? 20 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <div className="max-w-4xl mx-auto px-4 my-8">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl shadow-indigo-500/10 p-5 sm:p-7 relative overflow-hidden">
        {/* Widget Top Tab Switcher */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100 flex-wrap gap-2">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl">
            <button
              type="button"
              onClick={() => setActiveTab('finance')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[38px] cursor-pointer ${
                activeTab === 'finance' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Wallet className="w-4 h-4 text-emerald-600" />
              <span>تجربة: تحصيل المصاريف اللحظي</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('qr')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[38px] cursor-pointer ${
                activeTab === 'qr' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <QrCode className="w-4 h-4 text-indigo-600" />
              <span>تجربة: QR الحضور المتغير</span>
            </button>
          </div>
          <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
            ⚡ تجربة تفاعلية حية
          </span>
        </div>

        {/* TAB 1: Finance Simulation */}
        {activeTab === 'finance' && (
          <div className="space-y-4">
            <div className="p-4 sm:p-5 rounded-2xl border border-slate-200/80 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-base ${isPaid ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  أ
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-base text-slate-900">أحمد محمود إبراهيم</h4>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {isPaid ? 'خالص المصاريف (250 ج.م)' : 'متأخر في مصاريف الشهر'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">الصف الثالث الإعدادي (مجموعة أ) • سنتر الأوائل</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsPaid(!isPaid)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all min-h-[42px] cursor-pointer active:scale-95 shadow-xs flex items-center gap-1.5 ${
                    isPaid ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isPaid ? 'إلغاء الدفعة (تجربة)' : 'تسجيل دفع 250 ج.م بلمسة'}</span>
                </button>

                {!isPaid && (
                  <button
                    type="button"
                    onClick={() => alert('محاكاة: يتم فتح محادثة واتساب لولي الأمر برسالة مهذبة ومكتملة البيانات فوراً!')}
                    className="flex items-center gap-1.5 px-3.5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold rounded-xl min-h-[42px] shadow-xs active:scale-95 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>تذكير واتساب</span>
                  </button>
                )}
              </div>
            </div>
            <p className="text-xs text-slate-400 text-center">
              اضغط على الأزرار بالأعلى لتجربة التحديث التفاؤلي الفوري في أقل من 30ms.
            </p>
          </div>
        )}

        {/* TAB 2: Dynamic Anti-fraud QR Simulation */}
        {activeTab === 'qr' && (
          <div className="flex flex-col md:flex-row items-center justify-around gap-6 py-2">
            <div className="text-center flex flex-col items-center">
              <div className="p-3 bg-white border-2 border-slate-900 rounded-2xl shadow-sm mb-3">
                <QRCodeSVG value={`https://tallyo.app/session-${qrSeconds}`} size={140} level="M" />
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-lg">
                <RefreshCw className={`w-3.5 h-3.5 ${qrSeconds <= 3 ? 'animate-spin' : ''}`} />
                <span>يتغير الكود بعد: {qrSeconds}s</span>
              </div>
            </div>

            {/* Simulated Student Phone Screen */}
            <div className="w-full max-w-xs p-4 rounded-2xl bg-emerald-600 text-white text-center shadow-lg">
              <div className="inline-flex items-center gap-1 text-[11px] font-bold bg-white/20 px-2 py-0.5 rounded-full mb-2">
                <Clock className="w-3 h-3" />
                <span>شاشة دخول الطالب على الباب</span>
              </div>
              <h5 className="font-extrabold text-base mb-0.5">خالص المصاريف - ادخل</h5>
              <p className="text-xs text-emerald-100 mb-2">أحمد محمود • الصف الثالث الإعدادي</p>
              <div className="bg-white/10 rounded-xl py-1.5 text-xs font-mono font-bold tracking-widest">
                ساعة حية نشطة لمنع لقطات الشاشة
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
