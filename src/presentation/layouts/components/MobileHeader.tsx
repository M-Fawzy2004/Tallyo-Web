import React from 'react';
import { Eye, EyeSlash, GearSix } from '@phosphor-icons/react';
import { useDashboard } from '../../state/useDashboard';

interface MobileHeaderProps {
  title: string;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ title }) => {
  const { role, isPrivacyMode, togglePrivacyMode, setIsSettingsOpen } = useDashboard();

  return (
    <header className="lg:hidden sticky top-3 z-30 mx-4 mt-3 rounded-2xl bg-white/95 backdrop-blur-md border border-zinc-200 px-3 py-2 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-2">
        <span className="w-8 h-8 rounded-lg bg-[#181818] text-white font-mono font-bold text-sm flex items-center justify-center">
          T
        </span>
        <div>
          <h1 className="title-4 text-[#181818] leading-tight">{title}</h1>
          <span className="caption-5 text-zinc-500 font-mono block">Tallyo</span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {role === 'teacher' && (
          <button
            type="button"
            onClick={togglePrivacyMode}
            aria-label={isPrivacyMode ? 'إظهار الأرقام' : 'حجب الأرقام'}
            className={`w-11 h-11 rounded-lg flex items-center justify-center motion-base focus-ring cursor-pointer ${
              isPrivacyMode ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            {isPrivacyMode ? <EyeSlash size={18} weight="bold" /> : <Eye size={18} weight="bold" />}
          </button>
        )}

        <button
          type="button"
          onClick={() => setIsSettingsOpen(true)}
          aria-label="الإعدادات"
          className="w-11 h-11 rounded-lg text-zinc-600 hover:bg-zinc-100 flex items-center justify-center motion-color focus-ring cursor-pointer"
        >
          <GearSix size={18} weight="bold" />
        </button>
      </div>
    </header>
  );
};
