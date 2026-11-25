import React from 'react';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const RevealSection: React.FC<RevealSectionProps> = ({ children, className = '', id }) => {
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>(0.12);

  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </section>
  );
};
