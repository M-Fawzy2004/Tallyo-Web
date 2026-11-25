import React, { useState } from 'react';
import { AuthRightPanel } from './components/AuthRightPanel';
import { AuthLeftShowcase } from './components/AuthLeftShowcase';
import type { UserRole } from '../dashboard/types/dashboardTypes';

interface LoginPageProps {
  onLoginSuccess: (role: UserRole) => void;
  onBackHome: () => void;
  defaultAssistantMode?: boolean;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onBackHome,
  defaultAssistantMode = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess('teacher');
    }, 450);
  };

  const handleAssistantSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess('assistant');
    }, 450);
  };

  return (
    <div
      className="h-[100dvh] max-h-[100dvh] w-full grid grid-cols-1 lg:grid-cols-2 bg-white overflow-hidden antialiased selection:bg-[#181818] selection:text-white"
      dir="rtl"
    >
      <div className="w-full h-full overflow-y-auto lg:overflow-hidden flex flex-col">
        <AuthRightPanel
          key={String(defaultAssistantMode)}
          onGoogleSignIn={handleGoogleSignIn}
          onAssistantSignIn={handleAssistantSignIn}
          onBackHome={onBackHome}
          defaultAssistantMode={defaultAssistantMode}
          isLoading={isLoading}
        />
      </div>

      <div className="hidden lg:flex w-full h-full overflow-hidden">
        <AuthLeftShowcase />
      </div>
    </div>
  );
};
