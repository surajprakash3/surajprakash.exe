import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Github, Linkedin, Twitter } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { useBackground } from '../context/BackgroundContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: profile } = useProfile();
  const location = useLocation();
  const { bgOpacity } = useBackground();

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

  const navLinks = [
    { name: 'Home', path: '/#home' },
    { name: 'About', path: '/#about' },
    { name: 'Skills', path: '/#skills' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'Social', path: '/socials' },
    { name: 'Experience', path: '/#experience' },
    { name: 'Blog', path: '/#blog' },
    { name: 'Contact', path: '/#contact' },
  ];

  return (
    <>
      <nav 
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#0b0f19]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <NavLink to="/" className="flex-shrink-0 flex items-center">
                <span className="font-heading font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-accent-500 to-blue-500">
                  Suraj Prakash
                </span>
              </NavLink>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                const isActive = location.pathname + location.hash === link.path || (link.path.startsWith('/#') && location.pathname === '/' && location.hash === link.path.replace('/', ''));

                return (
                  <a
                    key={link.name}
                    href={link.path}
                    className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                      isActive 
                        ? 'text-accent-500 bg-accent-500/10' 
                        : 'text-theme-text hover:text-accent-500 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}

              <div className="flex items-center space-x-2 pl-4 ml-2 border-l border-slate-200 dark:border-slate-700/50">
                {profile?.socials?.githubUrl && (
                  <a href={profile.socials.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-theme-muted hover:text-accent-500 transition-colors" aria-label="GitHub Profile">
                    <Github size={20} />
                  </a>
                )}
                {profile?.socials?.linkedinUrl && (
                  <a href={profile.socials.linkedinUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-theme-muted hover:text-accent-500 transition-colors" aria-label="LinkedIn Profile">
                    <Linkedin size={20} />
                  </a>
                )}

                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full text-theme-muted hover:text-accent-500 transition-colors ml-1 focus:outline-none cursor-pointer"
                  aria-label="Toggle Dark Mode"
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </div>

            {/* Mobile menu buttons */}
            <div className="flex items-center justify-center lg:hidden gap-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-theme-muted hover:text-accent-500 focus:outline-none transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-theme-muted hover:text-accent-500 focus:outline-none transition-colors"
                aria-label="Open menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
          />
          <div
            className="absolute top-0 left-0 bottom-0 w-[280px] sm:w-[320px] shadow-2xl flex flex-col pt-20 pb-6 px-4 overflow-y-auto bg-white dark:bg-[#0b0f19] border-r border-theme-border"
          >
            <div className="flex flex-col gap-2 relative">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-lg text-base font-medium text-theme-text hover:text-accent-500 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
                >
                  {link.name}
                </a>
              ))}

              {(profile?.socials?.githubUrl || profile?.socials?.linkedinUrl || profile?.socials?.twitterUrl) && (
                <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 flex justify-center space-x-6 relative">
                  {profile?.socials?.githubUrl && (
                    <a href={profile.socials.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-theme-muted hover:text-accent-500">
                      <Github size={22} />
                    </a>
                  )}
                  {profile?.socials?.linkedinUrl && (
                    <a href={profile.socials.linkedinUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-theme-muted hover:text-accent-500">
                      <Linkedin size={22} />
                    </a>
                  )}
                  {profile?.socials?.twitterUrl && (
                    <a href={profile.socials.twitterUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-theme-muted hover:text-accent-500">
                      <Twitter size={22} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
