import React, { useState, useEffect } from 'react';
import { ChevronDown, Code2, Brain, Rocket, Star, Github, Linkedin, Mail, ExternalLink, Sparkles } from 'lucide-react';

const AbhishekPortfolio = () => {
  const [currentTheme, setCurrentTheme] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  const themes = [
    {
      name: 'Cyberpunk',
      bg: 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900',
      accent: 'text-cyan-400',
      secondary: 'text-purple-300',
      button: 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500',
      particle: 'bg-cyan-400'
    },
    {
      name: 'Neon Dreams',
      bg: 'bg-gradient-to-br from-pink-900 via-purple-900 to-violet-900',
      accent: 'text-pink-400',
      secondary: 'text-violet-300',
      button: 'bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-400 hover:to-violet-500',
      particle: 'bg-pink-400'
    },
    {
      name: 'Matrix Green',
      bg: 'bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900',
      accent: 'text-green-400',
      secondary: 'text-emerald-300',
      button: 'bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-400 hover:to-teal-500',
      particle: 'bg-green-400'
    },
    {
      name: 'Sunset Vibes',
      bg: 'bg-gradient-to-br from-orange-900 via-red-900 to-pink-900',
      accent: 'text-orange-400',
      secondary: 'text-red-300',
      button: 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500',
      particle: 'bg-orange-400'
    }
  ];

  const skills = [
    'React & Next.js', 'Node.js & Express', 'Python & AI/ML', 'TypeScript', 
    'MongoDB & PostgreSQL', 'Docker & AWS', 'TensorFlow & PyTorch', 'GraphQL'
  ];

  const achievements = [
    '20+ Full-Stack Projects Built',
    'AI-Powered Applications Expert',
    'Open Source Contributor',
    'Rapid Learning Enthusiast'
  ];

  useEffect(() => {
    setIsVisible(true);
    const themeInterval = setInterval(() => {
      setCurrentTheme(prev => (prev + 1) % themes.length);
    }, 5000);

    // Create particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 3 + 2
    }));
    setParticles(newParticles);

    return () => clearInterval(themeInterval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const theme = themes[currentTheme];

  return (
    <div className={`min-h-screen ${theme.bg} relative overflow-hidden transition-all duration-1000`}>
      {/* Animated Background Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className={`absolute w-2 h-2 ${theme.particle} rounded-full opacity-20 animate-pulse`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.id * 0.1}s`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}

      {/* Mouse Follower */}
      <div 
        className="fixed w-6 h-6 border-2 border-white/30 rounded-full pointer-events-none z-50 transition-all duration-300"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: 'scale(1.2)',
        }}
      />

      {/* Header */}
      <header className="relative z-10 p-6">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <div className={`text-2xl font-bold ${theme.accent} animate-pulse`}>
            AP
          </div>
          <div className="flex gap-6">
            <button className={`${theme.secondary} hover:${theme.accent} transition-colors duration-300`}>
              <Github size={24} />
            </button>
            <button className={`${theme.secondary} hover:${theme.accent} transition-colors duration-300`}>
              <Linkedin size={24} />
            </button>
            <button className={`${theme.secondary} hover:${theme.accent} transition-colors duration-300`}>
              <Mail size={24} />
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Theme Indicator */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm mb-8 ${theme.secondary}`}>
            <Sparkles size={16} />
            <span className="text-sm font-medium">Theme: {theme.name}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-black mb-6 relative">
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent animate-pulse">
              Presenting to you
            </span>
          </h1>

          <div className="mb-8 relative">
            <h2 className={`text-4xl md:text-6xl font-bold ${theme.accent} mb-4 animate-bounce`}>
              THE ONE & ONLY
            </h2>
            <div className={`text-5xl md:text-7xl font-black ${theme.accent} mb-2 transform hover:scale-105 transition-transform duration-300`}>
              ABHISHEK PANDEY
            </div>
            <div className="flex justify-center items-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={24} 
                  className={`${theme.accent} animate-pulse`} 
                  style={{ animationDelay: `${i * 0.2}s` }} 
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div className={`max-w-4xl mx-auto text-xl md:text-2xl ${theme.secondary} mb-12 leading-relaxed`}>
            <p className="mb-6 transform hover:scale-102 transition-transform duration-300">
              🚀 <strong className={theme.accent}>At just 20 years old</strong>, this extraordinary developer has mastered the entire spectrum of modern web development and AI technologies.
            </p>
            <p className="mb-6">
              From crafting pixel-perfect frontends to architecting robust backends, from training neural networks to deploying cloud solutions - 
              <strong className={`${theme.accent} ml-2`}>Abhishek doesn't just code, he creates digital magic!</strong>
            </p>
          </div>

          {/* Skills Showcase */}
          <div className="mb-12">
            <h3 className={`text-2xl font-bold ${theme.accent} mb-6 flex items-center justify-center gap-2`}>
              <Code2 className="animate-spin" />
              Master of Technologies
            </h3>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {skills.map((skill, index) => (
                <span
                  key={skill}
                  className={`px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm ${theme.secondary} hover:${theme.accent} transition-all duration-300 transform hover:scale-110 cursor-pointer`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-12">
            <h3 className={`text-2xl font-bold ${theme.accent} mb-6 flex items-center justify-center gap-2`}>
              <Brain className="animate-pulse" />
              Achievements Unlocked
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement}
                  className={`p-4 rounded-lg border border-white/20 backdrop-blur-sm ${theme.secondary} hover:${theme.accent} transition-all duration-300 transform hover:scale-105 cursor-pointer`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex items-center gap-2">
                    <Rocket size={20} />
                    {achievement}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className={`px-8 py-4 rounded-full ${theme.button} text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-2`}>
              <ExternalLink size={20} />
              View Projects
            </button>
            <button className={`px-8 py-4 rounded-full border-2 border-white/30 backdrop-blur-sm text-white font-bold text-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105`}>
              Get In Touch
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <ChevronDown size={32} className={`${theme.accent} mx-auto`} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`relative z-10 text-center py-8 ${theme.secondary}`}>
        <p className="text-lg">
          © 2025 Abhishek Pandey - Crafting the future, one line of code at a time ✨
        </p>
      </footer>
    </div>
  );
};

export default AbhishekPortfolio;