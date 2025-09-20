import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Lock, Home, MapPin, Heart, Mountain, Trees, Sun, } from 'lucide-react';
import Spline from '@splinetool/react-spline';
import { useNavigate } from 'react-router-dom';

const HomestaysLoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate()
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
    
    // if (!validateForm()) return;
    
    setIsSubmitting(true);
    console.log('Login attempt:', formData);
    
    // Simulate login API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, you'd validate credentials and redirect
    navigate("/homestaysadmin")
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
        <div className="absolute top-32 left-16 w-6 h-6 bg-emerald-300 rounded-full animate-bounce opacity-20" style={{animationDelay: '0s', animationDuration: '4s'}}></div>
        <div className="absolute top-20 right-40 w-4 h-4 bg-teal-400 rounded-full animate-pulse opacity-30" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-40 left-32 w-5 h-5 bg-green-300 rounded-full animate-bounce opacity-25" style={{animationDelay: '2.5s', animationDuration: '3s'}}></div>
        <div className="absolute bottom-32 right-64 w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-20" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-24 w-2 h-2 bg-teal-300 rounded-full animate-pulse opacity-25" style={{animationDelay: '3s'}}></div>
      </div>

      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 relative z-10">
        <div className={`max-w-md w-full space-y-8 transform transition-all duration-1000 ${
          isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}>
          {/* Header */}
          <div className="text-center">
            <div className={`mx-auto h-16 w-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mb-6 shadow-lg transform transition-all duration-700 ${
              isLoaded ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
            } hover:scale-110 hover:shadow-2xl hover:rotate-12`} style={{animationDelay: '0.2s'}}>
              <Home className="h-8 w-8 text-white animate-pulse" />
            </div>
            <h2 className={`text-3xl font-bold text-gray-900 mb-2 transform transition-all duration-700 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`} style={{animationDelay: '0.4s'}}>
              Welcome Home
            </h2>
            <p className={`text-gray-600 transform transition-all duration-700 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`} style={{animationDelay: '0.6s'}}>
              Homestays Admin Dashboard
            </p>
            <div className={`flex items-center justify-center mt-2 text-emerald-600 transform transition-all duration-700 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`} style={{animationDelay: '0.8s'}}>
              <Heart className="h-4 w-4 mr-1 animate-pulse text-red-500" style={{animationDuration: '2s'}} />
              <span className="text-sm font-medium">Creating Memorable Experiences</span>
              <Mountain className="h-4 w-4 ml-1 animate-bounce" style={{animationDuration: '3s'}} />
            </div>
          </div>

          {/* Login Form */}
          <div className={`mt-8 space-y-6 transform transition-all duration-700 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{animationDelay: '1s'}}>
            <div className="space-y-4">
              {/* Email Field */}
              <div className="group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-200 group-focus-within:text-emerald-600">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200">
                    <User className={`h-5 w-5 transition-colors duration-200 ${formData.email ? 'text-emerald-500' : 'text-gray-400'}`} />
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
                    } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 transform hover:scale-105 focus:scale-105 hover:shadow-lg`}
                    placeholder="Enter your email"
                  />
                  {formData.email && (
                    <div className="absolute inset-y-0 right-3 flex items-center">
                      <Trees className="h-4 w-4 text-emerald-500 animate-pulse" />
                    </div>
                  )}
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 animate-fadeIn">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="group">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-200 group-focus-within:text-emerald-600">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className={`h-5 w-5 transition-colors duration-200 ${formData.password ? 'text-emerald-500' : 'text-gray-400'}`} />
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
                    } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 transform hover:scale-105 focus:scale-105 hover:shadow-lg`}
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
                      <Trees className="h-4 w-4 text-emerald-500 animate-pulse" />
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
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded transition-transform duration-200 hover:scale-110"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 transition-colors duration-200 group-hover:text-emerald-600">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-sm text-emerald-600 hover:text-emerald-500 font-medium transition-all duration-200 hover:scale-105 relative overflow-hidden group"
                onClick={() => alert('Forgot password functionality would be implemented here')}
              >
                <span className="relative z-10">Forgot password?</span>
                <span className="absolute inset-0 bg-emerald-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
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
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl`}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                <span className="relative z-10 flex items-center">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      <span className="animate-pulse">Signing in...</span>
                    </>
                  ) : (
                    <>
                      <Home className="h-4 w-4 mr-2 transform transition-transform duration-200 group-hover:rotate-12" />
                      <span className="transform transition-transform duration-200 group-hover:translate-x-1">Access Dashboard</span>
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
            <p className="animate-fadeIn">Need assistance? Contact support at</p>
            <a href="mailto:support@homestays.com" className="text-emerald-600 hover:text-emerald-500 font-medium transition-all duration-200 hover:scale-105 inline-block">
              support@homestays.com
            </a>
          </div>
        </div>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-emerald-600 via-teal-600 to-green-600 relative overflow-hidden">
        {/* Mountain Silhouette SVG Background */}
        <div className="absolute bottom-0 left-0 w-full h-64 opacity-30">
          <svg viewBox="0 0 1200 320" className="w-full h-full">
            <path d="M0,320L40,298.7C80,277,160,235,240,208C320,181,400,171,480,181.3C560,192,640,224,720,224C800,224,880,192,960,181.3C1040,171,1120,181,1160,186.7L1200,192L1200,320L1160,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z" fill="rgba(255,255,255,0.2)" className="animate-pulse" style={{animationDuration: '6s'}}/>
          </svg>
        </div>

        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className={`absolute top-20 left-20 w-32 h-32 bg-white rounded-full transition-all duration-1000 ${
            isLoaded ? 'scale-100 opacity-20' : 'scale-0 opacity-0'
          } animate-float`} style={{animationDelay: '0.5s'}}></div>
          <div className={`absolute top-40 right-32 w-24 h-24 bg-white rounded-full transition-all duration-1000 ${
            isLoaded ? 'scale-100 opacity-20' : 'scale-0 opacity-0'
          } animate-float-delayed`} style={{animationDelay: '1s'}}></div>
          <div className={`absolute bottom-40 left-32 w-40 h-40 bg-white rounded-full transition-all duration-1000 ${
            isLoaded ? 'scale-100 opacity-20' : 'scale-0 opacity-0'
          } animate-float`} style={{animationDelay: '1.5s'}}></div>
          <div className={`absolute bottom-32 right-20 w-28 h-28 bg-white rounded-full transition-all duration-1000 ${
            isLoaded ? 'scale-100 opacity-20' : 'scale-0 opacity-0'
          } animate-float-delayed`} style={{animationDelay: '2s'}}></div>
        </div>

        {/* Nature Pattern Overlay */}
        <div className="absolute inset-0 animate-pulse opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M20 20c0-8.837 7.163-16 16-16s16 7.163 16 16-7.163 16-16 16-16-7.163-16-16zm16 0c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          animationDuration: '10s'
        }}></div>

        {/* Sun Animation */}
        <div className="absolute top-16 right-16">
          <Sun className={`h-12 w-12 text-yellow-200 animate-spin opacity-70 ${
            isLoaded ? 'scale-100' : 'scale-0'
          } transition-all duration-1000`} style={{animationDuration: '20s', animationDelay: '1s'}} />
        </div>

        {/* Main Content */}
        <div className={`relative z-10 flex flex-col items-center justify-center text-white p-12 text-center transform transition-all duration-1000 ${
          isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}>
          <div className="mb-8">
            <h1 className={`text-4xl font-bold mb-4 transform transition-all duration-700 ${
              isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
            } animate-pulse`} style={{animationDelay: '0.3s', animationDuration: '4s'}}>
              Homestays Hub
            </h1>
            <p className={`text-xl mb-6 opacity-90 transform transition-all duration-700 ${
              isLoaded ? 'translate-y-0 opacity-90' : '-translate-y-4 opacity-0'
            }`} style={{animationDelay: '0.5s'}}>
              Admin Control Center
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
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm animate-float hover:animate-bounce transition-all duration-300">
                <Home className="h-8 w-8" />
              </div>
              <p className="text-sm opacity-90">Property Management</p>
            </div>
            <div className={`text-center transform transition-all duration-700 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            } hover:scale-110`} style={{animationDelay: '1.1s'}}>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm animate-float-delayed hover:animate-pulse transition-all duration-300">
                <MapPin className="h-8 w-8" />
              </div>
              <p className="text-sm opacity-90">Location Services</p>
            </div>
          </div>

          {/* Testimonial */}
          <blockquote className={`text-lg italic opacity-90 max-w-md transform transition-all duration-700 ${
            isLoaded ? 'translate-y-0 opacity-90' : 'translate-y-4 opacity-0'
          } animate-fadeIn`} style={{animationDelay: '1.3s'}}>
            "Connecting travelers with authentic local experiences and creating home away from home."
          </blockquote>

          {/* Animated Nature Elements */}
          <div className="absolute top-1/4 left-10 animate-sway">
            <Trees className="h-8 w-8 text-white/40" />
          </div>
          <div className="absolute top-1/3 right-20 animate-sway-delayed">
            <Mountain className="h-10 w-10 text-white/30" />
          </div>
          <div className="absolute bottom-1/4 left-16 animate-pulse">
            <Heart className="h-6 w-6 text-red-300/60" style={{animationDuration: '2s'}} />
          </div>
          <div className="absolute bottom-1/3 right-12 animate-float">
            <Home className="h-7 w-7 text-white/40" />
          </div>
        </div>

        {/* Cloud-like Decorative Elements */}
        <div className="absolute top-20 left-1/4 w-20 h-12 bg-white/10 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-32 right-1/4 w-16 h-8 bg-white/10 rounded-full animate-float-delayed opacity-50"></div>
        <div className="absolute bottom-1/2 left-1/3 w-24 h-10 bg-white/10 rounded-full animate-float opacity-40"></div>

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/30 to-transparent animate-pulse" style={{animationDuration: '8s'}}></div>
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
          50% { transform: translateY(-12px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes sway {
          0%, 100% { transform: rotate(0deg) translateY(0px); }
          25% { transform: rotate(2deg) translateY(-3px); }
          75% { transform: rotate(-2deg) translateY(-3px); }
        }
        
        @keyframes sway-delayed {
          0%, 100% { transform: rotate(0deg) translateY(0px); }
          25% { transform: rotate(-3deg) translateY(-5px); }
          75% { transform: rotate(3deg) translateY(-5px); }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        
        .animate-sway {
          animation: sway 6s ease-in-out infinite;
        }
        
        .animate-sway-delayed {
          animation: sway-delayed 7s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default HomestaysLoginPage;