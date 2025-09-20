import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Users, 
  MapPin, 
  Palette, 
  Home, 
  UserCheck, 
  LogOut,
  Mountain,
  Waves,
  Trees,
  Bird
} from 'lucide-react';

// Navigation Menu Item Component
const NavItem = ({ to, icon: Icon, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  // Color variables based on route
  const isGuideRoute = location.pathname === '/dashBoard/guide';
  const isDestinationRoute = location.pathname === '/dashBoard/destination';
  const isHandicraftRoute = location.pathname === '/dashBoard/handicraft';
  const isTouristRoute = location.pathname === '/dashBoard/tourist';
  const isHomestayRoute = location.pathname === '/dashBoard/homestays';

  const textAndStickerColor = isGuideRoute
    ? 'text-blue-700'
    : isDestinationRoute
      ? 'text-green-600'
      : isHandicraftRoute
        ? 'text-purple-700'
        : isTouristRoute || isHomestayRoute
          ? 'text-teal-700'
          : 'text-gray-600';

  const backgroundGradient = isGuideRoute
    ? 'from-green-600 to-blue-600'
    : isDestinationRoute
      ? 'from-green-500 to-green-600'
      : isHandicraftRoute
        ? 'from-purple-600 to-blue-600'
        : isTouristRoute || isHomestayRoute
          ? 'from-teal-600 to-blue-600'
          : 'from-gray-100 to-gray-200';

  const bgGradient = isGuideRoute
    ? 'from-green-50 to-blue-50'
    : isDestinationRoute
      ? 'from-green-50 to-green-50'
      : isHandicraftRoute
        ? 'from-purple-50 to-blue-50'
        : isTouristRoute || isHomestayRoute
          ? 'from-teal-50 to-blue-50'
          : 'from-gray-50 to-gray-50';

  const borderColorLight = isGuideRoute 
    ? 'border-blue-100' 
    : isDestinationRoute 
      ? 'border-green-100' 
      : isHandicraftRoute 
        ? 'border-purple-100' 
        : isTouristRoute || isHomestayRoute 
          ? 'border-teal-100' 
          : 'border-gray-100';

  const borderColorMedium = isGuideRoute 
    ? 'border-blue-200' 
    : isDestinationRoute 
      ? 'border-green-200' 
      : isHandicraftRoute 
        ? 'border-purple-200' 
        : isTouristRoute || isHomestayRoute 
          ? 'border-teal-200' 
          : 'border-gray-200';

  const borderColorDark = isGuideRoute 
    ? 'border-blue-300' 
    : isDestinationRoute 
      ? 'border-green-300' 
      : isHandicraftRoute 
        ? 'border-purple-300' 
        : isTouristRoute || isHomestayRoute 
          ? 'border-teal-300' 
          : 'border-gray-300';

  const modalHeaderGradient = isGuideRoute 
    ? 'from-green-100 to-blue-100' 
    : isDestinationRoute 
      ? 'from-green-100 to-green-100' 
      : isHandicraftRoute 
        ? 'from-purple-100 to-blue-100' 
        : isTouristRoute || isHomestayRoute 
          ? 'from-teal-100 to-blue-100' 
          : 'from-gray-100 to-gray-100';

  const hoverColor = isGuideRoute 
    ? 'hover:text-blue-800' 
    : isDestinationRoute 
      ? 'hover:text-green-800' 
      : isHandicraftRoute 
        ? 'hover:text-purple-800' 
        : isTouristRoute || isHomestayRoute 
          ? 'hover:text-teal-800' 
          : 'hover:text-gray-800';

  const focusRingColor = isGuideRoute 
    ? 'focus:ring-blue-500' 
    : isDestinationRoute 
      ? 'focus:ring-green-500' 
      : isHandicraftRoute 
        ? 'focus:ring-purple-500' 
        : isTouristRoute || isHomestayRoute 
          ? 'focus:ring-teal-500' 
          : 'focus:ring-gray-500';

  const tableHoverBg = isGuideRoute 
    ? 'hover:bg-blue-50' 
    : isDestinationRoute 
      ? 'hover:bg-green-50' 
      : isHandicraftRoute 
        ? 'hover:bg-purple-50' 
        : isTouristRoute || isHomestayRoute 
          ? 'hover:bg-teal-50' 
          : 'hover:bg-gray-50';

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
        isActive 
          ? `bg-gradient-to-r ${backgroundGradient} text-white shadow-lg` 
          : `text-gray-600 hover:bg-gradient-to-r ${bgGradient} ${hoverColor} hover:shadow-md`
      }`}
    >
      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : `${textAndStickerColor} ${hoverColor}`}`} />
      <span className="font-medium">{children}</span>
    </Link>
  );
};

// Main Dashboard Layout Component
const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Color variables based on route
  const isGuideRoute = location.pathname === '/dashBoard/guide';
  const isDestinationRoute = location.pathname === '/dashBoard/destination';
  const isHandicraftRoute = location.pathname === '/dashBoard/handicraft';
  const isTouristRoute = location.pathname === '/dashBoard/tourist';
  const isHomestayRoute = location.pathname === '/dashBoard/homestays';

  const textAndStickerColor = isGuideRoute
    ? 'text-blue-700'
    : isDestinationRoute
      ? 'text-green-600'
      : isHandicraftRoute
        ? 'text-purple-700'
        : isTouristRoute || isHomestayRoute
          ? 'text-teal-700'
          : 'text-gray-600';

  const backgroundGradient = isGuideRoute
    ? 'from-green-600 to-blue-600'
    : isDestinationRoute
      ? 'from-green-500 to-green-600'
      : isHandicraftRoute
        ? 'from-purple-600 to-blue-600'
        : isTouristRoute || isHomestayRoute
          ? 'from-teal-600 to-blue-600'
          : 'from-gray-100 to-gray-200';

  const bgGradient = isGuideRoute
    ? 'from-green-50 to-blue-50'
    : isDestinationRoute
      ? 'from-green-50 to-green-50'
      : isHandicraftRoute
        ? 'from-purple-50 to-blue-50'
        : isTouristRoute || isHomestayRoute
          ? 'from-teal-50 to-blue-50'
          : 'from-gray-50 to-gray-50';

  const borderColorLight = isGuideRoute 
    ? 'border-blue-100' 
    : isDestinationRoute 
      ? 'border-green-100' 
      : isHandicraftRoute 
        ? 'border-purple-100' 
        : isTouristRoute || isHomestayRoute 
          ? 'border-teal-100' 
          : 'border-gray-100';

  const borderColorMedium = isGuideRoute 
    ? 'border-blue-200' 
    : isDestinationRoute 
      ? 'border-green-200' 
      : isHandicraftRoute 
        ? 'border-purple-200' 
        : isTouristRoute || isHomestayRoute 
          ? 'border-teal-200' 
          : 'border-gray-200';

  const borderColorDark = isGuideRoute 
    ? 'border-blue-300' 
    : isDestinationRoute 
      ? 'border-green-300' 
      : isHandicraftRoute 
        ? 'border-purple-300' 
        : isTouristRoute || isHomestayRoute 
          ? 'border-teal-300' 
          : 'border-gray-300';

  const modalHeaderGradient = isGuideRoute 
    ? 'from-green-100 to-blue-100' 
    : isDestinationRoute 
      ? 'from-green-100 to-green-100' 
      : isHandicraftRoute 
        ? 'from-purple-100 to-blue-100' 
        : isTouristRoute || isHomestayRoute 
          ? 'from-teal-100 to-blue-100' 
          : 'from-gray-100 to-gray-100';

  const hoverColor = isGuideRoute 
    ? 'hover:text-blue-800' 
    : isDestinationRoute 
      ? 'hover:text-green-800' 
      : isHandicraftRoute 
        ? 'hover:text-purple-800' 
        : isTouristRoute || isHomestayRoute 
          ? 'hover:text-teal-800' 
          : 'hover:text-gray-800';

  const focusRingColor = isGuideRoute 
    ? 'focus:ring-blue-500' 
    : isDestinationRoute 
      ? 'focus:ring-green-500' 
      : isHandicraftRoute 
        ? 'focus:ring-purple-500' 
        : isTouristRoute || isHomestayRoute 
          ? 'focus:ring-teal-500' 
          : 'focus:ring-gray-500';

  const tableHoverBg = isGuideRoute 
    ? 'hover:bg-blue-50' 
    : isDestinationRoute 
      ? 'hover:bg-green-50' 
      : isHandicraftRoute 
        ? 'hover:bg-purple-50' 
        : isTouristRoute || isHomestayRoute 
          ? 'hover:bg-teal-50' 
          : 'hover:bg-gray-50';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgGradient}`}>
      {/* Header */}
      <header className={`bg-white shadow-lg border-b-4 ${borderColorDark} sticky top-0 z-30`}>
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleMobileMenu}
              className={`lg:hidden p-2 rounded-lg ${hoverColor} ${bgGradient} transition-colors duration-200`}
            >
              <Menu className={`w-6 h-6 ${textAndStickerColor}`} />
            </button>
            <div className="flex items-center gap-3">
              <div className={`bg-gradient-to-r ${backgroundGradient} p-2 rounded-lg shadow-md`}>
                <Mountain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${backgroundGradient}`}>
                  Jharkhand Tourism
                </h1>
                <p className="text-sm text-gray-500">Admin Dashboard</p>
              </div>
            </div>
          </div>
          
          {/* Nature-inspired decorative elements */}
          <div className="hidden md:flex items-center gap-4">
            <Trees className={`w-5 h-5 ${textAndStickerColor} animate-pulse`} />
            <Waves className={`w-5 h-5 ${textAndStickerColor} animate-pulse`} style={{ animationDelay: '0.5s' }} />
            <Bird className={`w-5 h-5 ${textAndStickerColor} animate-pulse`} style={{ animationDelay: '1s' }} />
            <Mountain className={`w-5 h-5 ${textAndStickerColor} animate-pulse`} style={{ animationDelay: '1.5s' }} />
          </div>
        </div>
      </header>

      {/* Layout */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
            lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:shadow-xl
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          {/* Mobile menu header */}
          <div className={`lg:hidden flex items-center justify-between p-6 border-b ${borderColorMedium} bg-gradient-to-r ${backgroundGradient}`}>
            <h2 className="text-xl font-bold text-white">Navigation</h2>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors duration-200"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Sidebar content */}
          <div className="flex flex-col h-full p-6">
            {/* Natural beauty banner */}
            <div className={`mb-8 p-4 bg-gradient-to-r ${modalHeaderGradient} rounded-xl border ${borderColorLight} shadow-sm`}>
              <div className="flex items-center gap-2 mb-2">
                <Mountain className={`w-5 h-5 ${textAndStickerColor}`} />
                <Waves className={`w-5 h-5 ${textAndStickerColor}`} />
                <Trees className={`w-5 h-5 ${textAndStickerColor}`} />
                <Bird className={`w-4 h-4 ${textAndStickerColor}`} />
              </div>
              <p className="text-sm text-gray-700 font-medium">Land of Forests & Waterfalls</p>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 space-y-2">
              <NavItem 
                to="/dashBoard/tourist" 
                icon={Users} 
                onClick={closeMobileMenu}
              >
                Tourist
              </NavItem>
              <NavItem 
                to="/dashBoard/destination" 
                icon={MapPin} 
                onClick={closeMobileMenu}
              >
                Destination
              </NavItem>
              <NavItem 
                to="/dashBoard/handicraft" 
                icon={Palette} 
                onClick={closeMobileMenu}
              >
                Handicraft
              </NavItem>
              <NavItem 
                to="/dashBoard/homestays" 
                icon={Home} 
                onClick={closeMobileMenu}
              >
                Homestays
              </NavItem>
              <NavItem 
                to="/dashBoard/guide" 
                icon={UserCheck} 
                onClick={closeMobileMenu}
              >
                Guide
              </NavItem>
            </nav>

            {/* Logout Button */}
            <div className={`pt-6 border-t ${borderColorMedium}`}>
              <button
                onClick={handleLogout}
                className={`w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-all duration-200 group hover:shadow-md ${focusRingColor}`}
              >
                <LogOut className={`w-5 h-5 ${textAndStickerColor} group-hover:text-red-700`} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={closeMobileMenu}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className={`bg-gradient-to-b ${bgGradient} min-h-full p-4`}>
            <Outlet />
          </div>
        </main>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;