import React, { useState } from 'react';
import { AuthRightPanel } from './components/AuthRightPanel';
import { AuthLeftShowcase } from './components/AuthLeftShowcase';

export const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('جاري تسجيل الدخول بحساب Google السحابي للمدرس...');
    }, 600);
  };

  const handleAssistantSignIn = (identifier: string, pin: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(`دخول ناجح للمساعد بكود: ${identifier} ورمز PIN: ${pin}`);
    }, 600);
  };

  return (
    <div
      className="h-screen max-h-[100dvh] w-full grid grid-cols-1 lg:grid-cols-2 bg-white overflow-hidden antialiased selection:bg-indigo-600 selection:text-white"
      dir="rtl"
    >
      {/* Right Half: Pure White Auth Section */}
      <div className="w-full h-full overflow-y-auto lg:overflow-hidden flex flex-col">
        <AuthRightPanel
          onGoogleSignIn={handleGoogleSignIn}
          onAssistantSignIn={handleAssistantSignIn}
          isLoading={isLoading}
        />
      </div>

      {/* Left Half: Dark Slate Visual Showcase (Desktop only, 0-scroll) */}
      <div className="hidden lg:flex w-full h-full overflow-hidden">
        <AuthLeftShowcase />
      </div>
    </div>
  );
};
