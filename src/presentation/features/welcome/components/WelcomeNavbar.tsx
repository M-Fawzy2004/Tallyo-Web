import React, { useState, useEffect } from 'react';
import { List, X, ArrowLeft } from '@phosphor-icons/react';

interface WelcomeNavbarProps {
  onGoogleSignIn: () => void;
  onAssistantLogin: () => void;
  isLoading: boolean;
}

const NAV_LINKS = [
  { href: '#benefits', label: 'المميزات' },
  { href: '#how-it-works', label: 'كيف يعمل' },
  { href: '#faq', label: 'الأسئلة الشائعة' },
];

export const WelcomeNavbar: React.FC<WelcomeNavbarProps> = ({
  onGoogleSignIn,
  onAssistantLogin,
  isLoading,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed top-4 inset-x-0 z-40 px-4">
        <nav
          aria-label="التنقل الرئيسي"
          className="max-w-5xl mx-auto rounded-2xl bg-white/85 backdrop-blur-md border border-zinc-200 px-3 py-2 flex items-center justify-between gap-4 shadow-xs"
        >
          <a href="#top" className="flex items-center gap-2 focus-ring rounded-lg p-1">
            <span className="w-8 h-8 rounded-lg bg-[#181818] text-white font-mono font-bold text-base flex items-center justify-center">
              T
            </span>
            <span className="font-mono title-2 text-[#181818] tracking-tight">Tallyo</span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="title-4 text-zinc-600 hover:text-[#181818] motion-color focus-ring rounded-md px-2 py-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={onAssistantLogin}
              className="button-sm text-zinc-700 hover:text-[#181818] hover:bg-zinc-100 px-3 py-2 rounded-lg motion-color focus-ring cursor-pointer"
            >
              دخول الأسستنت
            </button>
            <button
              type="button"
              onClick={onGoogleSignIn}
              disabled={isLoading}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#181818] hover:bg-[#272727] text-white button-sm motion-base active:scale-[0.98] focus-ring cursor-pointer disabled:opacity-70"
            >
              <span>ابدأ بحساب Google</span>
              <ArrowLeft size={16} weight="bold" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            className="md:hidden w-10 h-10 rounded-lg border border-zinc-200 flex items-center justify-center text-[#181818] hover:bg-zinc-100 motion-base focus-ring cursor-pointer relative"
          >
            <List
              size={20}
              weight="bold"
              className={`absolute transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                menuOpen ? 'opacity-0 scale-75 rotate-45' : 'opacity-100 scale-100 rotate-0'
              }`}
            />
            <X
              size={20}
              weight="bold"
              className={`absolute transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                menuOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-45'
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Full-Height Mobile Drawer (B7 Navigation) */}
      <div
        className={`md:hidden fixed inset-0 z-30 bg-white/95 backdrop-blur-xl pt-24 px-6 pb-8 flex flex-col justify-between transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-4">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{ transitionDelay: menuOpen ? `${index * 60}ms` : '0ms' }}
              className={`heading-5 text-[#181818] p-3 rounded-xl bg-zinc-50 border border-zinc-200 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div
          style={{ transitionDelay: menuOpen ? '240ms' : '0ms' }}
          className={`flex flex-col gap-3 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <button
            type="button"
            onClick={() => { setMenuOpen(false); onGoogleSignIn(); }}
            className="w-full py-3 px-4 rounded-xl bg-[#181818] text-white button-md active:scale-[0.98] cursor-pointer"
          >
            المتابعة باستخدام Google
          </button>
          <button
            type="button"
            onClick={() => { setMenuOpen(false); onAssistantLogin(); }}
            className="w-full py-3 px-4 rounded-xl bg-zinc-100 text-[#181818] border border-zinc-200 button-md active:scale-[0.98] cursor-pointer"
          >
            دخول الأسستنت بالكود
          </button>
        </div>
      </div>
    </>
  );
};
