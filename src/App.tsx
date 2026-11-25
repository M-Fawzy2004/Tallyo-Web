import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { WelcomePage } from './presentation/features/welcome/WelcomePage';
import { LoginPage } from './presentation/features/auth/LoginPage';
import { DashboardProvider } from './presentation/state/DashboardContext';
import { DashboardContainer } from './presentation/pages/DashboardContainer';
import { NotFoundPage } from './presentation/pages/NotFoundPage';
import type { UserRole } from './presentation/features/dashboard/types/dashboardTypes';

function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('teacher');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsAuthenticated(true);
    navigate('/dashboard', { replace: true });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/', { replace: true });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <WelcomePage
              onLoginSuccess={handleLogin}
              onGoToAssistantLogin={() => navigate('/login?mode=assistant')}
            />
          )
        }
      />

      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LoginPage
              onLoginSuccess={handleLogin}
              onBackHome={() => navigate('/')}
              defaultAssistantMode={searchParams.get('mode') === 'assistant'}
            />
          )
        }
      />

      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <DashboardProvider initialRole={userRole}>
              <DashboardContainer onLogout={handleLogout} />
            </DashboardProvider>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route path="*" element={<NotFoundPage onBackHome={() => navigate('/')} />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
