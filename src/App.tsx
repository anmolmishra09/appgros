import { useState, useEffect } from 'react';
import { AuthProvider, CartProvider, OrderProvider } from './utils/contexts';
import { useAuth } from './utils/hooks';
import { LoginScreen } from './screens/LoginScreen';
import { SignupScreen } from './screens/SignupScreen';
import { ForgotPasswordScreen } from './screens/ForgotPasswordScreen';
import { HomeScreen } from './screens/HomeScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { OrdersScreen } from './screens/OrdersScreen';
import { OrderSuccessScreen } from './screens/OrderSuccessScreen';

type Screen = 'login' | 'signup' | 'forgot-password' | 'home' | 'profile' | 'orders' | 'order-success';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');

  // Reset to home when authenticated, or login when not
  useEffect(() => {
    if (isAuthenticated) {
      setCurrentScreen('home');
    } else {
      setCurrentScreen('login');
    }
  }, [isAuthenticated]);

  // Not authenticated screens
  if (!isAuthenticated) {
    switch (currentScreen) {
      case 'signup':
        return <SignupScreen onSwitchToLogin={() => setCurrentScreen('login')} />;
      case 'forgot-password':
        return <ForgotPasswordScreen onBack={() => setCurrentScreen('login')} />;
      default:
        return (
          <LoginScreen
            onSwitchToSignup={() => setCurrentScreen('signup')}
            onForgotPassword={() => setCurrentScreen('forgot-password')}
          />
        );
    }
  }

  // Authenticated screens
  switch (currentScreen) {
    case 'profile':
      return <ProfileScreen onBack={() => setCurrentScreen('home')} />;
    case 'orders':
      return <OrdersScreen onBack={() => setCurrentScreen('home')} />;
    case 'order-success':
      return (
        <OrderSuccessScreen
          onGoHome={() => setCurrentScreen('home')}
          onViewOrders={() => setCurrentScreen('orders')}
        />
      );
    default:
      return (
        <HomeScreen
          onProfileClick={() => setCurrentScreen('profile')}
          onOrdersClick={() => setCurrentScreen('orders')}
          onOrderSuccess={() => setCurrentScreen('order-success')}
        />
      );
  }
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <AppContent />
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}