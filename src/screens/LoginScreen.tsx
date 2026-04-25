import { useState } from 'react';
import { useAuth } from '../utils/hooks';
import { validateEmail } from '../utils/helpers';
import { Package, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

interface LoginScreenProps {
  onSwitchToSignup: () => void;
  onForgotPassword: () => void;
}

export function LoginScreen({ onSwitchToSignup, onForgotPassword }: LoginScreenProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    if (!result.success) {
      setError(result.error || 'Login failed');
    }
  };

  const fillDemoCredentials = () => {
    setEmail('demo@freshmart.com');
    setPassword('Demo@123');
  };

  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <div className="mx-auto w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center bg-emerald-500 text-white p-4 rounded-2xl mb-4 shadow-lg shadow-emerald-200">
              <Package className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
            <p className="text-gray-500 mt-2">Sign in to continue shopping</p>
          </div>

          {/* Demo Credentials Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <p className="text-amber-800 text-sm font-medium mb-2">🎯 Quick Demo Access</p>
            <div className="flex items-center justify-between">
              <div className="text-xs text-amber-700">
                <p><strong>Email:</strong> demo@freshmart.com</p>
                <p><strong>Password:</strong> Demo@123</p>
              </div>
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
              >
                Auto Fill
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </button>

            <button
              type="button"
              onClick={onForgotPassword}
              className="w-full text-emerald-600 hover:text-emerald-700 text-sm font-medium"
            >
              Forgot Password?
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500">
              Don't have an account?{' '}
              <button onClick={onSwitchToSignup} className="text-emerald-600 hover:text-emerald-700 font-semibold">
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}