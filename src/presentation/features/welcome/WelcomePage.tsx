import React, { useState } from 'react';
import { WelcomeNavbar } from './components/WelcomeNavbar';
import { WelcomeHero } from './components/WelcomeHero';
import { InteractiveLiveDemo } from './components/InteractiveLiveDemo';
import { BentoFeatures } from './components/BentoFeatures';
import { WelcomeFooter } from './components/WelcomeFooter';
import { GoogleAuthButton } from '../auth/components/GoogleAuthButton';

interface WelcomePageProps {
  onEnterDashboard: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onEnterDashboard }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onEnterDashboard();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white flex flex-col justify-between antialiased relative overflow-hidden">
      {/* Background Soft Ambient Lights */}
      <div className="absolute top-0 inset-x-0 h-[32rem] bg-gradient-to-b from-indigo-100/60 via-slate-50/50 to-transparent pointer-events-none" />
      <div className="absolute top-10 start-1/2 -translate-x-1/2 w-[42rem] h-[26rem] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div>
        {/* Modern Glass Navbar */}
        <WelcomeNavbar onSignIn={handleGoogleSignIn} />

        {/* Hero Section */}
        <WelcomeHero onGoogleSignIn={handleGoogleSignIn} isLoading={isLoading} />

        {/* Real Interactive Live Product Demo */}
        <InteractiveLiveDemo />

        {/* 3-Card Bento Highlights */}
        <BentoFeatures />

        {/* Final Conversion CTA Section */}
        <section className="max-w-4xl mx-auto px-4 py-12 text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-indigo-900 via-indigo-950 to-slate-900 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-4xl font-black mb-3">
                جاهز توفر ساعات من وجع الدماغ وتضمن فلوسك؟
              </h2>
              <p className="text-xs sm:text-sm text-indigo-200 mb-8 max-w-lg mx-auto">
                ابدأ الآن في أقل من دقيقة. تسجيل فوري بحساب Google بدون أي تعقيدات.
              </p>
              <div className="max-w-xs mx-auto">
                <GoogleAuthButton onClick={handleGoogleSignIn} isLoading={isLoading} />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Clean Footer */}
      <WelcomeFooter />
    </div>
  );
};
