import React, { useState } from 'react';
import { LegalModal, type LegalDocType } from './LegalModal';

interface WelcomeFooterProps {
  onAssistantLogin: () => void;
}

export const WelcomeFooter: React.FC<WelcomeFooterProps> = ({ onAssistantLogin }) => {
  const [legalDoc, setLegalDoc] = useState<LegalDocType>(null);

  return (
    <>
      <footer className="py-12 px-4 bg-white border border-zinc-200 max-w-5xl mx-auto mb-6 rounded-3xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#181818] text-white font-mono font-bold text-sm flex items-center justify-center">
              T
            </span>
            <div>
              <span className="font-mono title-3 text-[#181818]">Tallyo</span>
              <span className="caption-5 text-zinc-500 block">نظام إدارة الدروس الخصوصية والسناتر في مصر</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 caption-4 text-zinc-600">
            <button
              type="button"
              onClick={onAssistantLogin}
              className="hover:text-[#181818] motion-color focus-ring rounded px-2 py-1 cursor-pointer"
            >
              دخول الأسستنت
            </button>
            <button
              type="button"
              onClick={() => setLegalDoc('privacy')}
              className="hover:text-[#181818] motion-color focus-ring rounded px-2 py-1 cursor-pointer"
            >
              سياسة الخصوصية
            </button>
            <button
              type="button"
              onClick={() => setLegalDoc('terms')}
              className="hover:text-[#181818] motion-color focus-ring rounded px-2 py-1 cursor-pointer"
            >
              شروط الاستخدام
            </button>
          </div>

          <p className="caption-5 font-mono text-zinc-500">
            &copy; 2026 Tallyo
          </p>
        </div>
      </footer>

      <LegalModal docType={legalDoc} onClose={() => setLegalDoc(null)} />
    </>
  );
};
