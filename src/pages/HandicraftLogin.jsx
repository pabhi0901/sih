import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Lock, Palette, Star, Sparkles } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations on component mount
    setIsLoaded(true);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    console.log('Login attempt:', formData);
    
    // Simulate login API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, you'd validate credentials and redirect
    alert('Login successful! Redirecting to dashboard...');
    setIsSubmitting(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Floating Elements Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-20 w-4 h-4 bg-amber-300 rounded-full animate-bounce opacity-20" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-orange-400 rounded-full animate-pulse opacity-30" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-40 w-5 h-5 bg-red-300 rounded-full animate-bounce opacity-25" style={{animationDelay: '2s', animationDuration: '4s'}}></div>
        <div className="absolute bottom-20 right-60 w-2 h-2 bg-amber-400 rounded-full animate-ping opacity-20" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative z-10">
        <div className={`max-w-md w-full space-y-8 transform transition-all duration-1000 ${
          isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}>
          {/* Header */}
          <div className="text-center">
            <div className={`mx-auto h-16 w-16 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center mb-6 shadow-lg transform transition-all duration-700 ${
              isLoaded ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
            } hover:scale-110 hover:shadow-2xl`} style={{animationDelay: '0.2s'}}>
              <Palette className="h-8 w-8 text-white animate-pulse" />
            </div>
            <h2 className={`text-3xl font-bold text-gray-900 mb-2 transform transition-all duration-700 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`} style={{animationDelay: '0.4s'}}>
              Welcome Back
            </h2>
            <p className={`text-gray-600 transform transition-all duration-700 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`} style={{animationDelay: '0.6s'}}>
              Jharkhand Handicrafts Admin Panel
            </p>
            <div className={`flex items-center justify-center mt-2 text-amber-600 transform transition-all duration-700 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`} style={{animationDelay: '0.8s'}}>
              <Star className="h-4 w-4 mr-1 animate-spin" style={{animationDuration: '3s'}} />
              <span className="text-sm font-medium">Preserving Traditional Art</span>
              <Star className="h-4 w-4 ml-1 animate-spin" style={{animationDuration: '3s', animationDirection: 'reverse'}} />
            </div>
          </div>

          {/* Login Form */}
          <div className={`mt-8 space-y-6 transform transition-all duration-700 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{animationDelay: '1s'}}>
            <div className="space-y-4">
              {/* Email Field */}
              <div className="group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-200 group-focus-within:text-amber-600">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200">
                    <User className={`h-5 w-5 transition-colors duration-200 ${formData.email ? 'text-amber-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`appearance-none relative block w-full px-10 py-3 border ${
                      errors.email ? 'border-red-300 animate-shake' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 transform hover:scale-105 focus:scale-105`}
                    placeholder="Enter your email"
                  />
                  {formData.email && (
                    <div className="absolute inset-y-0 right-3 flex items-center">
                      <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" />
                    </div>
                  )}
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 animate-fadeIn">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="group">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-200 group-focus-within:text-amber-600">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className={`h-5 w-5 transition-colors duration-200 ${formData.password ? 'text-amber-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`appearance-none relative block w-full px-10 py-3 border ${
                      errors.password ? 'border-red-300 animate-shake' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 transform hover:scale-105 focus:scale-105`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center transition-transform duration-200 hover:scale-110"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                    )}
                  </button>
                  {formData.password && (
                    <div className="absolute inset-y-0 right-10 flex items-center">
                      <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" />
                    </div>
                  )}
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600 animate-fadeIn">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center group">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded transition-transform duration-200 hover:scale-110"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 transition-colors duration-200 group-hover:text-amber-600">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-sm text-amber-600 hover:text-amber-500 font-medium transition-all duration-200 hover:scale-105 relative overflow-hidden group"
                onClick={() => alert('Forgot password functionality would be implemented here')}
              >
                <span className="relative z-10">Forgot password?</span>
                <span className="absolute inset-0 bg-amber-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
              </button>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white overflow-hidden ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl`}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-amber-700 to-orange-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                <span className="relative z-10 flex items-center">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      <span className="animate-pulse">Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span className="transform transition-transform duration-200 group-hover:translate-x-1">Sign in to Dashboard</span>
                      <div className="ml-2 transform transition-transform duration-200 group-hover:translate-x-1">
                        <div className="w-0 h-0 border-l-4 border-l-white border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                      </div>
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className={`text-center text-sm text-gray-600 transform transition-all duration-700 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`} style={{animationDelay: '1.2s'}}>
            
          </div>
        </div>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className={`absolute top-20 left-20 w-32 h-32 bg-white rounded-full transition-all duration-1000 ${
            isLoaded ? 'scale-100 opacity-20' : 'scale-0 opacity-0'
          } animate-pulse`} style={{animationDelay: '0.5s', animationDuration: '4s'}}></div>
          <div className={`absolute top-40 right-32 w-24 h-24 bg-white rounded-full transition-all duration-1000 ${
            isLoaded ? 'scale-100 opacity-20' : 'scale-0 opacity-0'
          } animate-bounce`} style={{animationDelay: '1s', animationDuration: '3s'}}></div>
          <div className={`absolute bottom-32 left-32 w-40 h-40 bg-white rounded-full transition-all duration-1000 ${
            isLoaded ? 'scale-100 opacity-20' : 'scale-0 opacity-0'
          } animate-pulse`} style={{animationDelay: '1.5s', animationDuration: '5s'}}></div>
          <div className={`absolute bottom-20 right-20 w-28 h-28 bg-white rounded-full transition-all duration-1000 ${
            isLoaded ? 'scale-100 opacity-20' : 'scale-0 opacity-0'
          } animate-bounce`} style={{animationDelay: '2s', animationDuration: '3.5s'}}></div>
        </div>

        {/* Traditional Pattern Overlay */}
        <div className="absolute inset-0 animate-pulse" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          animationDuration: '8s'
        }}></div>

        {/* Main Content */}
        <div className={`relative z-10 flex flex-col items-center justify-center text-white p-12 text-center transform transition-all duration-1000 ${
          isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}>
          <div className="mb-8">
            <h1 className={`text-4xl font-bold mb-4 transform transition-all duration-700 ${
              isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
            } animate-pulse`} style={{animationDelay: '0.3s', animationDuration: '3s'}}>
              Jharkhand Handicrafts
            </h1>
            <p className={`text-xl mb-6 opacity-90 transform transition-all duration-700 ${
              isLoaded ? 'translate-y-0 opacity-90' : '-translate-y-4 opacity-0'
            }`} style={{animationDelay: '0.5s'}}>
              Admin Dashboard
            </p>
            <div className={`w-24 h-1 bg-white mx-auto mb-8 transform transition-all duration-700 ${
              isLoaded ? 'scale-x-100' : 'scale-x-0'
            }`} style={{animationDelay: '0.7s'}}></div>
          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-2 gap-8 mb-12">
            <div className={`text-center transform transition-all duration-700 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            } hover:scale-110`} style={{animationDelay: '0.9s'}}>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm animate-bounce hover:animate-spin transition-all duration-300" style={{animationDuration: '2s'}}>
                <Palette className="h-8 w-8" />
              </div>
              <p className="text-sm opacity-90">Artisan Management</p>
            </div>
            <div className={`text-center transform transition-all duration-700 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            } hover:scale-110`} style={{animationDelay: '1.1s'}}>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm animate-pulse hover:animate-spin transition-all duration-300" style={{animationDuration: '3s'}}>
                <Star className="h-8 w-8" />
              </div>
              <p className="text-sm opacity-90">Product Showcase</p>
            </div>
          </div>

          {/* Testimonial */}
          <blockquote className={`text-lg italic opacity-90 max-w-md transform transition-all duration-700 ${
            isLoaded ? 'translate-y-0 opacity-90' : 'translate-y-4 opacity-0'
          } animate-fadeIn`} style={{animationDelay: '1.3s'}}>
            "Empowering traditional artisans through digital innovation and preserving Jharkhand's rich cultural heritage."
          </blockquote>

          {/* Animated Craft Elements */}
          <div className="absolute top-1/4 left-10 animate-float">
            <div className="w-8 h-8 bg-white/30 rounded-full animate-pulse"></div>
          </div>
          <div className="absolute top-1/3 right-16 animate-float-delayed">
            <div className="w-6 h-6 bg-white/30 rotate-45 animate-spin" style={{animationDuration: '8s'}}></div>
          </div>
          <div className="absolute bottom-1/4 left-20 animate-float">
            <div className="w-10 h-10 bg-white/30 rounded-full animate-bounce" style={{animationDuration: '4s'}}></div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent animate-pulse" style={{animationDuration: '6s'}}></div>
      </div>

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;