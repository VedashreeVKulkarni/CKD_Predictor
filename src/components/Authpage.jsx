import React, { useState } from 'react';
import './Authpage.css';
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Authpage = () => {
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
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // ✅ Password match validation (only for signup)
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random success (90% success rate)
          if (Math.random() > 0.1) {
            resolve();
          } else {
            reject(new Error(isLogin ? "Login failed. Please try again." : "Signup failed. Please try again."));
          }
        }, 1500);
      });

      // Save user data to localStorage
      const userData = {
        email: formData.email,
        username: formData.username,
        fullName: formData.fullName
      };
      localStorage.setItem('user', JSON.stringify(userData));

      // Success - redirect to dashboard
      navigate('/dashboard');
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

const handleMenuToggle = () => {
  setIsMobileMenuOpen((prev) => !prev);
};

const handleMenuNavigate = (path) => {
  setIsMobileMenuOpen(false);
  navigate(path);
};

  return (
    <div className={`auth-container ${isLogin ? 'login-bg' : 'signup-bg'}`}>
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">
            {isLogin ? (
              <div className="icon-container login-icon">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            ) : (
              <div className="icon-container signup-icon">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
            )}
          </div>

          <h2 className="auth-title">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="auth-subtitle">
            {isLogin ? 'Sign in to your account' : 'Join us today to get started'}
          </p>
        </div>

        

        {/* Dynamic Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <div className="form-input-container">
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your full name"
                    required={!isLogin}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <div className="form-input-container">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Choose a username"
                    required={!isLogin}
                  />
                </div>
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <div className="form-input-container">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="form-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your password"
                required
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={0}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </span>
            </div>
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <div className="form-input-container">
                <input
                  type={showConfirm ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Confirm your password"
                  required={!isLogin}
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  tabIndex={0}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                </span>
              </div>
            </div>
          )}

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          {isLogin && (
            <div className="form-options">
              <div className="remember-container">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="remember-checkbox"
                />
                <label htmlFor="remember-me" className="remember-label">
                  Remember me
                </label>
              </div>
              <a href="#" className="forgot-link">
                Forgot password?
              </a>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="auth-button"
          >
            {isLoading ? (
              <div className="loading-content">
                <div className="loading-spinner"></div>
                {isLogin ? 'Signing in...' : 'Creating account...'}
              </div>
            ) : (
              isLogin ? 'Login' : 'Create Account'
            )}
          </button>
        </form>

        {/* Divider for Social Login */}
        <div className="divider-container">
          <div className="divider-line"></div>
          <div className="divider-text">
            <span>Or continue with</span>
          </div>
        </div>

        {/* Google Sign In Button */}
        <div className="google-signin-container">
          <button className="google-signin-btn">
            <div className="google-icon"></div>
            <span className="google-text">
              Continue with Google
            </span>
          </button>
        </div>

        {/* Toggle Footer */}
        <div className="auth-footer">
          <p className="toggle-text">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              type="button"
              className="toggle-link"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Authpage;