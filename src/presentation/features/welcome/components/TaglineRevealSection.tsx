import React, { useEffect, useRef, useState } from 'react';

const LINES = [
  'كل طالب ليه كود،',
  'وكل ميعاد يوم متسجل لوحده،',
  'وكل جنيه معروف مكانه قبل ما الحصة تخلص.',
];

const ALL_WORDS = LINES.flatMap((line, lineIdx) =>
  line.split(' ').map((word, wordIdx, arr) => ({
    word,
    isLineEnd: wordIdx === arr.length - 1 && lineIdx < LINES.length - 1,
  }))
);

export const TaglineRevealSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeCount, setActiveCount] = useState(() => {
    if (typeof window === 'undefined') return ALL_WORDS.length;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? ALL_WORDS.length : 0;
  });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let rafId = 0;

    const updateProgress = () => {
      rafId = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const start = vh * 0.85;
      const end = vh * 0.25;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      setActiveCount(Math.round(progress * ALL_WORDS.length));
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="الرسالة الأساسية"
      className="bg-[#181818] text-white py-20 px-4 my-8"
    >
      <div className="max-w-[680px] mx-auto text-center">
        <p className="heading-2 leading-snug [text-wrap:balance]">
          {ALL_WORDS.map((item, idx) => {
            const isRevealed = idx < activeCount;
            return (
              <React.Fragment key={idx}>
                <span
                  className={`inline-block transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:opacity-100 ${
                    isRevealed ? 'opacity-100 text-white' : 'opacity-30 text-white'
                  }`}
                >
                  {item.word}
                </span>{' '}
                {item.isLineEnd && <br />}
              </React.Fragment>
            );
          })}
        </p>
      </div>
    </section>
  );
};
