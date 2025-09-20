import React, { useState } from 'react';
import { Eye, EyeOff, Mountain, TreePine, Waves } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate()
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
      alert('Login successful! You would be redirected to dashboard.');
    }, 1500);
  };

  if (isLoggedIn) {
    navigate("/dashBoard")
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Mountains */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1200 400" className="w-full h-auto opacity-20">
            <path d="M0,400 L200,200 L400,300 L600,150 L800,250 L1000,100 L1200,200 L1200,400 Z" 
                  fill="rgba(34, 197, 94, 0.3)"/>
            <path d="M0,400 L150,250 L350,320 L550,180 L750,280 L950,120 L1200,220 L1200,400 Z" 
                  fill="rgba(34, 197, 94, 0.2)"/>
          </svg>
        </div>
        
        {/* Floating Icons */}
        <div className="absolute top-20 left-20 animate-pulse">
          <Mountain className="w-8 h-8 text-green-400 opacity-30" />
        </div>
        <div className="absolute top-40 right-32 animate-bounce" style={{animationDelay: '1s'}}>
          <TreePine className="w-10 h-10 text-emerald-400 opacity-25" />
        </div>
        <div className="absolute bottom-40 left-32 animate-pulse" style={{animationDelay: '2s'}}>
          <Waves className="w-12 h-12 text-teal-400 opacity-20" />
        </div>
        <div className="absolute top-60 left-1/2 animate-bounce" style={{animationDelay: '0.5s'}}>
          <TreePine className="w-6 h-6 text-green-300 opacity-30" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-green-700 px-8 py-10 text-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <Mountain className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  Jharkhand Tourism
                </h1>
                <p className="text-emerald-100 text-sm">
                  Admin Portal
                </p>
                <div className="flex items-center justify-center space-x-2 mt-3">
                  <TreePine className="w-4 h-4 text-emerald-200" />
                  <span className="text-emerald-200 text-xs">Experience Nature's Paradise</span>
                  <Waves className="w-4 h-4 text-emerald-200" />
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-8 space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">Welcome Back</h2>
                <p className="text-gray-500 text-sm">Sign in to manage tourism data</p>
              </div>

              {/* Username Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter your username"
                    required
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    <Mountain className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-50 focus:bg-white pr-12"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 text-gray-600">
                  <input type="checkbox" className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="button"
                onClick={handleLogin}
                disabled={isLoading}
                
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>

            {/* Footer */}
            <div className="px-8 pb-8 text-center">
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Mountain className="w-3 h-3" />
                  <span>Hills & Mountains</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex items-center space-x-1">
                  <Waves className="w-3 h-3" />
                  <span>Rivers & Waterfalls</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex items-center space-x-1">
                  <TreePine className="w-3 h-3" />
                  <span>Wildlife</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                © 2025 Jharkhand Tourism Department
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-6">
            <p className="text-emerald-100 text-sm">
              🌿 Discover the untamed beauty of Jharkhand 🏞️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}