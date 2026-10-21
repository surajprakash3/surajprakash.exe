import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sun, Moon, Menu, X, Github, Linkedin, Twitter, 
  User, Terminal, Sparkles, Layers 
} from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { useBackground } from '../context/BackgroundContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: profile } = useProfile();
  const location = useLocation();
  const navigate = useNavigate();
  const { bgOpacity } = useBackground();

  // Detect current active mode based on route
  const isCoderMode = location.pathname.startsWith('/coder');

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(!isDark);
  const toggleMenu = () => setIsOpen(!isOpen);

  const handleModeSwitch = (mode) => {
    if (mode === 'coder') {
      navigate('/coder');
    } else {
      navigate('/');
    }
    setIsOpen(false);
  };

  // Portfolio mode navigation links
  const portfolioLinks = [
    { name: 'Home', path: '/#home' },
    { name: 'About', path: '/#about' },
    { name: 'Skills', path: '/#skills' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'Social', path: '/socials' },
    { name: 'Experience', path: '/#experience' },
    { name: 'Contact', path: '/#contact' },
  ];

  // Coder mode navigation links
  const coderLinks = [
    { name: 'Overview', path: '/coder#overview' },
    { name: 'Platforms', path: '/coder#platforms' },
    { name: 'Difficulty', path: '/coder#difficulty' },
    { name: 'Heatmap', path: '/coder#heatmap' },
    { name: 'DSA Progress', path: '/coder#dsa' },
    { name: 'Languages', path: '/coder#languages' },
    { name: 'GitHub', path: '/coder#github' },
    { name: 'Milestones', path: '/coder#achievements' }
  ];

  const currentNavLinks = isCoderMode ? coderLinks : portfolioLinks;

  return (
    <>
      <nav 
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#070c18]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Left: Brand Identity + Mode Switcher */}
            <div className="flex items-center gap-3 sm:gap-4">
              <NavLink to="/" className="flex-shrink-0 flex items-center">
                <span className="font-heading font-extrabold text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                  Suraj Prakash
                </span>
              </NavLink>

              {/* Mode Switcher Pill */}
              <div 
                className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 shadow-inner"
                role="group"
                aria-label="Mode Switcher"
              >
                <button
                  type="button"
                  onClick={() => handleModeSwitch('portfolio')}
                  aria-pressed={!isCoderMode}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    !isCoderMode
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  <User size={12} />
                  <span>Portfolio</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleModeSwitch('coder')}
                  aria-pressed={isCoderMode}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isCoderMode
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/25'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  <Terminal size={12} />
                  <span>Coder</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </button>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {currentNavLinks.map((link) => {
                const isHashActive = location.hash === link.path.replace('/coder', '').replace('/', '');
                const isExactPath = location.pathname === link.path;
                const isActive = isExactPath || (isHashActive && location.hash !== '');

                return (
                  <a
                    key={link.name}
                    href={link.path}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                      isActive 
                        ? (isCoderMode ? 'text-purple-400 bg-purple-500/10' : 'text-cyan-400 bg-cyan-500/10')
                        : 'text-slate-600 dark:text-slate-400 hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}

              <div className="flex items-center space-x-1 pl-3 ml-2 border-l border-slate-200 dark:border-slate-800">
                {profile?.socials?.githubUrl && (
                  <a href={profile.socials.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-cyan-400 transition-colors" aria-label="GitHub Profile">
                    <Github size={18} />
                  </a>
                )}
                {profile?.socials?.linkedinUrl && (
                  <a href={profile.socials.linkedinUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-blue-400 transition-colors" aria-label="LinkedIn Profile">
                    <Linkedin size={18} />
                  </a>
                )}

                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full text-slate-400 hover:text-cyan-400 transition-colors focus:outline-none cursor-pointer"
                  aria-label="Toggle Dark Mode"
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>
            </div>

            {/* Mobile menu toggle button */}
            <div className="flex items-center lg:hidden gap-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-slate-400 hover:text-cyan-400 focus:outline-none"
                aria-label="Toggle Dark Mode"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
                aria-label="Open menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-[40]">
          <div 
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div
            className="absolute top-0 left-0 bottom-0 w-[290px] shadow-2xl flex flex-col pt-20 pb-6 px-4 overflow-y-auto bg-white dark:bg-[#070c18] border-r border-slate-200 dark:border-slate-800"
          >
            {/* Mobile Mode Switcher */}
            <div className="p-1 rounded-2xl bg-slate-100 dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 mb-4 flex">
              <button
                type="button"
                onClick={() => handleModeSwitch('portfolio')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 ${
                  !isCoderMode
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'text-slate-400'
                }`}
              >
                <User size={13} />
                Portfolio
              </button>
              <button
                type="button"
                onClick={() => handleModeSwitch('coder')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 ${
                  isCoderMode
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400'
                }`}
              >
                <Terminal size={13} />
                Coder
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              {currentNavLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 flex justify-center space-x-6">
                {profile?.socials?.githubUrl && (
                  <a href={profile.socials.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-cyan-400">
                    <Github size={20} />
                  </a>
                )}
                {profile?.socials?.linkedinUrl && (
                  <a href={profile.socials.linkedinUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-blue-400">
                    <Linkedin size={20} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
