import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import AuthLayout from '../layouts/AuthLayout';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    fullName: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.1) resolve();
          else reject(new Error("Authentication failed. Please try again."));
        }, 1500);
      });

      const userData = {
        email: formData.email,
        username: formData.username,
        fullName: formData.fullName
      };
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/dashboard');

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title={isLogin ? 'Welcome Back' : 'Create Account'}
      subtitle={isLogin ? 'Sign in to access your dashboard' : 'Join us to start your health journey'}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {!isLogin && (
          <div className="space-y-5 animate-in slide-in-from-left-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                  placeholder="John Doe"
                  required={!isLogin}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                  placeholder="johndoe"
                  required={!isLogin}
                />
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              placeholder="name@example.com"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-12 pr-12 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {!isLogin && (
          <div className="space-y-2 animate-in slide-in-from-left-2">
            <label className="text-sm font-medium text-slate-700">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                placeholder="••••••••"
                required={!isLogin}
              />
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium animate-in shake">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-red-200 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        <div className="text-center pt-4">
          <p className="text-slate-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-red-600 font-bold hover:underline"
            >
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default AuthPage;