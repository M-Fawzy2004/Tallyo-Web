import React, { useState, useRef, useEffect } from 'react';
import { CaretDown, Check } from '@phosphor-icons/react';

export interface SelectOption {
  value: string;
  label: string;
  meta?: string;
}

interface CustomSelectProps {
  id?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  ariaLabel?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  id,
  options,
  value,
  onChange,
  placeholder = 'اختر',
  size = 'md',
  className = '',
  ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [isOpen]);

  const selected = options.find((opt) => opt.value === value);

  const sizeClass =
    size === 'sm'
      ? 'min-h-[36px] px-2 py-1 caption-3 rounded-lg'
      : size === 'lg'
      ? 'min-h-[48px] px-3 py-2 body-5 rounded-xl'
      : 'min-h-[44px] px-3 py-2 body-5 rounded-lg';

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between gap-2 bg-zinc-50 hover:bg-white border border-zinc-200 text-[#181818] motion-base active:scale-[0.99] focus-ring cursor-pointer ${
          isOpen ? 'bg-white border-[#181818]' : ''
        } ${sizeClass}`}
      >
        <span className="truncate">{selected ? selected.label : placeholder}</span>
        <CaretDown
          size={size === 'sm' ? 14 : 16}
          weight="bold"
          className={`text-zinc-500 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isOpen ? 'rotate-180 text-[#181818]' : 'rotate-0'
          }`}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-labelledby={id}
          className="absolute top-full mt-1 start-0 z-50 min-w-full w-max max-w-[280px] max-h-60 overflow-y-auto p-1 rounded-xl bg-white border border-zinc-200 shadow-lg space-y-1 text-right"
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <li key={opt.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-right body-5 motion-color cursor-pointer ${
                    isSelected
                      ? 'bg-[#181818] text-white'
                      : 'text-[#181818] hover:bg-zinc-100'
                  }`}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && <Check size={16} weight="bold" className="text-emerald-400 shrink-0" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
