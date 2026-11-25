import React, { useState } from 'react';
import { WelcomeNavbar } from './components/WelcomeNavbar';
import { WelcomeHero } from './components/WelcomeHero';
import { InteractiveLiveDemo } from './components/InteractiveLiveDemo';
import { ProblemSolutionSection } from './components/ProblemSolutionSection';
import { BentoFeatures } from './components/BentoFeatures';
import { TaglineRevealSection } from './components/TaglineRevealSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { RoleCoverageSection } from './components/RoleCoverageSection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { WelcomeFooter } from './components/WelcomeFooter';
import type { UserRole } from '../dashboard/types/dashboardTypes';

interface WelcomePageProps {
  onLoginSuccess: (role: UserRole) => void;
  onGoToAssistantLogin: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({
  onLoginSuccess,
  onGoToAssistantLogin,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess('teacher');
    }, 450);
  };

  return (
    <div className="min-h-[100dvh] bg-[#FAFAFA] text-[#181818] selection:bg-[#181818] selection:text-white antialiased">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#181818] focus:text-white button-sm"
      >
        تخطي إلى المحتوى الرئيسي
      </a>

      <WelcomeNavbar
        onGoogleSignIn={handleGoogleSignIn}
        onAssistantLogin={onGoToAssistantLogin}
        isLoading={isLoading}
      />

      <main id="main-content">
        <WelcomeHero
          onGoogleSignIn={handleGoogleSignIn}
          onAssistantLogin={onGoToAssistantLogin}
          isLoading={isLoading}
        />

        <InteractiveLiveDemo />
        <ProblemSolutionSection />
        <BentoFeatures />
        <TaglineRevealSection />
        <HowItWorksSection />
        <RoleCoverageSection />
        <FaqSection />

        <FinalCtaSection
          onGoogleSignIn={handleGoogleSignIn}
          onAssistantLogin={onGoToAssistantLogin}
          isLoading={isLoading}
        />
      </main>

      <div className="px-4 pb-2">
        <WelcomeFooter onAssistantLogin={onGoToAssistantLogin} />
      </div>
    </div>
  );
};
