import { useState, useMemo } from 'react';
import { 
  Briefcase, Code2, Users, User, ArrowUpRight, MessageSquare, 
  Mail, Sparkles
} from 'lucide-react';
import { useSocials } from '../hooks/useSocials';
import { useProfile } from '../hooks/useProfile';
import { getImageUrl } from '../utils/imageUtils';
import { downloadResume } from '../services/resumeService';
import defaultHeroImage from '../assets/hero.png';
import SEO from '../components/SEO';

// Authentic Brand SVGs matching reference screenshot precisely
const BRAND_ICONS = {
  linkedin: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#0A66C2]">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28Z"/>
    </svg>
  ),
  resume: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 text-white fill-none stroke-current" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 2v6h6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17h4" />
    </svg>
  ),
  hashnode: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#2962FF]">
      <path d="M22.351 8.019l-6.37-6.37a5.63 5.63 0 0 0-7.962 0l-6.37 6.37a5.63 5.63 0 0 0 0 7.962l6.37 6.37a5.63 5.63 0 0 0 7.962 0l6.37-6.37a5.63 5.63 0 0 0 0-7.962zM12 15.6a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2z"/>
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  ),
  gitlab: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#FC6D26]">
      <path d="m23.6 9.57-.03-.08-3.41-8.72a.85.85 0 0 0-1.62 0l-2.34 7.22H7.8L5.46.77a.85.85 0 0 0-1.62 0L.43 9.49l-.03.08a5.9 5.9 0 0 0 2.08 6.72l9.52 6.92 9.52-6.92a5.9 5.9 0 0 0 2.08-6.72"/>
    </svg>
  ),
  leetcode: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#FFA116]">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.874 5.874 0 0 0 .349 1.017 5.938 5.938 0 0 0 4.818 3.821 5.91 5.91 0 0 0 3.343-.457l3.96-2.14a1.442 1.442 0 0 0 .543-.543l3.96-4.126a1.375 1.375 0 0 0-.96-2.336H8.847l2.875-2.875 3.73-3.73A1.374 1.374 0 0 0 14.489.438 1.374 1.374 0 0 0 13.483 0zm-2.88 14.471-1.393.754a3.136 3.136 0 0 1-1.77.242 3.155 3.155 0 0 1-2.56-2.032 3.125 3.125 0 0 1-.186-.54 2.936 2.936 0 0 1-.033-1.256 2.798 2.798 0 0 1 .643-1.12l2.046-2.19 1.432 1.432a1.375 1.375 0 0 0 1.944 0 1.375 1.375 0 0 0 0-1.944L9.38 6.425l1.63-1.63h3.513l-4.04 4.04a1.375 1.375 0 0 0 0 1.944 1.375 1.375 0 0 0 1.944 0l4.04-4.04v.006l-4.474 4.474a1.375 1.375 0 0 0 0 1.944 1.375 1.375 0 0 0 1.944 0l4.474-4.474h3.01l-2.48 2.48a1.375 1.375 0 0 0 0 1.944 1.375 1.375 0 0 0 1.944 0l2.48-2.48v.006l-5.694 5.694a1.375 1.375 0 0 0 0 1.944 1.375 1.375 0 0 0 1.944 0l5.694-5.694h.006z"/>
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#FF0000]">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  devto: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
      <path d="M7.42 10.05c-.18-.12-.46-.23-.84-.23H5.13v4.36h1.45c.38 0 .66-.11.84-.23.23-.15.35-.41.35-.95v-2c0-.54-.12-.8-.35-.95zm4.83.69v2.52c0 .48-.22.68-.68.68h-.84v-3.88h.84c.46 0 .68.2.68.68zm5.75-8.74H6a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4zm-8.8 13.5H5.13V8.5h4.07c.88 0 1.58.26 2.06.77.49.51.74 1.25.74 2.19v1.08c0 .94-.25 1.68-.74 2.19-.48.51-1.18.77-2.06.77zm4.6 0h-3.32V8.5h3.32c1.23 0 1.95.82 1.95 2.14v3.22c0 1.32-.72 2.14-1.95 2.14zm6.2 0h-4.32l2.36-7h1.96z"/>
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" className="w-8 h-8">
      <defs>
        <radialGradient id="ig-grad-social" cx="0.2" cy="1" r="1">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <path fill="url(#ig-grad-social)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  medium: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
      <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
    </svg>
  ),
  notion: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.83a2.91 2.91 0 0 0-2.006-.746L2.92 2.062c-.373.047-.466.28-.326.513l1.865 1.633zm.42 3.497v13.634c0 .84.42 1.12 1.353 1.073l14.288-.84c.933-.046 1.166-.606 1.166-1.352V6.679c0-.746-.28-1.026-.98-1.026l-14.753.84c-.84.046-1.074.42-1.074 1.212zm13.122 1.306c.093.42 0 .84-.42.887l-.746.14v8.583c-.42.233-.887.373-1.306.373-.7 0-1.027-.327-1.54-1.027l-5.084-7.977v7.557l1.4.327c.094.046.14.373.047.466l-2.612.14c-.093-.047-.047-.373.047-.466l1.213-.28V9.757l-1.4-.14c-.093-.046-.046-.373.047-.466l2.846-.187 5.223 8.07V9.71l-1.26-.14c-.093-.047-.046-.373.046-.467l2.8-.186c.093.046.046.373.046.467z"/>
    </svg>
  )
};

// Platform Icon Component with clean fallback
const PlatformIcon = ({ keyId, name, iconUrl }) => {
  const [imgErr, setImgErr] = useState(false);
  const clean = (keyId || name || '').toLowerCase().replace(/[\s\.\-_]/g, '');

  if (BRAND_ICONS[clean]) {
    return BRAND_ICONS[clean];
  }

  if (iconUrl && !imgErr) {
    return (
      <img
        src={getImageUrl(iconUrl)}
        alt={name}
        className="w-8 h-8 object-contain"
        onError={() => setImgErr(true)}
      />
    );
  }

  return <Sparkles className="w-8 h-8 text-cyan-400" />;
};

// Centered Tile matching the reference screenshot layout:
// - Top-right arrow
// - Centered platform logo
// - Centered title
// - Centered subtitle
const SocialTile = ({ item, isResume = false, onResumeClick }) => {
  const tileBody = (
    <div className="relative group p-4 sm:p-5 rounded-2xl bg-[#09101f]/90 border border-slate-800/80 hover:border-slate-600/90 hover:bg-[#0d1629] transition-all duration-200 flex flex-col items-center justify-center text-center h-full cursor-pointer hover:-translate-y-1 shadow-md">
      {/* Top right diagonal arrow */}
      <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-md bg-slate-800/60 border border-slate-700/50 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:border-slate-500 transition-colors">
        <ArrowUpRight size={12} />
      </div>

      {/* Centered Brand Icon */}
      <div className="w-10 h-10 flex items-center justify-center mb-2.5 mt-1 transition-transform group-hover:scale-110 duration-200">
        <PlatformIcon keyId={item.key} name={item.platform} iconUrl={item.icon} />
      </div>

      {/* Centered Title */}
      <h4 className="text-sm font-bold font-heading text-white tracking-tight group-hover:text-cyan-300 transition-colors">
        {item.platform}
      </h4>

      {/* Centered Subtitle */}
      <p className="text-[11px] text-slate-400 font-medium leading-tight mt-0.5 line-clamp-1">
        {item.subtitle || item.handle || 'Connect with me'}
      </p>
    </div>
  );

  if (isResume) {
    return (
      <button type="button" onClick={onResumeClick} className="text-left w-full h-full block">
        {tileBody}
      </button>
    );
  }

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
    >
      {tileBody}
    </a>
  );
};

const Social = () => {
  const { data: socialsData } = useSocials();
  const { data: profile } = useProfile();
  const socials = Array.isArray(socialsData) ? socialsData : [];

  // Match db socials by keyword or fallback
  const findDbUrl = (keyword, fallback) => {
    const found = socials.find(s => {
      const p = ((s.platform || '') + (s.url || '')).toLowerCase();
      return p.includes(keyword.toLowerCase());
    });
    return found ? found.url : fallback;
  };

  // 4 Quadrants configuration matching reference screenshot
  const SECTIONS = useMemo(() => [
    {
      id: '01',
      number: '01',
      title: 'Professional Network',
      subtitle: 'Career, opportunities and professional updates.',
      icon: Briefcase,
      cardColor: 'border-cyan-500/60 shadow-[0_0_28px_rgba(6,182,212,0.18)]',
      iconBg: 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30',
      badgeColor: 'border-cyan-500/50 text-cyan-400 bg-cyan-500/10',
      items: [
        {
          key: 'linkedin',
          platform: 'LinkedIn',
          subtitle: 'Professional Updates',
          url: findDbUrl('linkedin', profile?.socials?.linkedinUrl || 'https://www.linkedin.com/in/surajprakash2/'),
        },
        {
          key: 'resume',
          platform: 'Resume',
          subtitle: 'View My Resume',
          isResume: true,
        },
        {
          key: 'hashnode',
          platform: 'Hashnode',
          subtitle: 'Tech Blogging',
          url: findDbUrl('hashnode', 'https://hashnode.com/@surajprakash'),
        }
      ]
    },
    {
      id: '02',
      number: '02',
      title: 'Developer & Open Source',
      subtitle: 'Code, collaborate and contribute to open source.',
      icon: Code2,
      cardColor: 'border-purple-500/60 shadow-[0_0_28px_rgba(168,85,247,0.18)]',
      iconBg: 'bg-purple-500/15 text-purple-400 border border-purple-500/30',
      badgeColor: 'border-purple-500/50 text-purple-400 bg-purple-500/10',
      items: [
        {
          key: 'github',
          platform: 'GitHub',
          subtitle: 'Open Source Projects',
          url: findDbUrl('github', profile?.socials?.githubUrl || 'https://github.com/surajprakash3'),
        },
        {
          key: 'gitlab',
          platform: 'GitLab',
          subtitle: 'Code Repositories',
          url: findDbUrl('gitlab', 'https://gitlab.com/surajprakash'),
        },
        {
          key: 'leetcode',
          platform: 'LeetCode',
          subtitle: 'Problem Solving',
          url: findDbUrl('leetcode', 'https://leetcode.com/u/Sp_alphatech/'),
        }
      ]
    },
    {
      id: '03',
      number: '03',
      title: 'Tech Communities',
      subtitle: 'Learning, sharing and growing with the community.',
      icon: Users,
      cardColor: 'border-amber-500/60 shadow-[0_0_28px_rgba(245,158,11,0.18)]',
      iconBg: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
      badgeColor: 'border-amber-500/50 text-amber-400 bg-amber-500/10',
      items: [
        {
          key: 'youtube',
          platform: 'YouTube',
          subtitle: 'Tech Content & Learning',
          url: findDbUrl('youtube', 'https://www.youtube.com/@Sp_alphatech'),
        },
        {
          key: 'twitter',
          platform: 'X (Twitter)',
          subtitle: 'Tech Updates & Discussions',
          url: findDbUrl('twitter', profile?.socials?.twitterUrl || 'https://x.com/Sp_alphatech'),
        },
        {
          key: 'devto',
          platform: 'Dev.to',
          subtitle: 'Tech Articles & Community',
          url: findDbUrl('dev.to', 'https://dev.to/surajprakash'),
        }
      ]
    },
    {
      id: '04',
      number: '04',
      title: 'Personal & Creative',
      subtitle: 'A glimpse of my personal life, hobbies and creativity.',
      icon: User,
      cardColor: 'border-emerald-500/60 shadow-[0_0_28px_rgba(16,185,129,0.18)]',
      iconBg: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
      badgeColor: 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10',
      items: [
        {
          key: 'instagram',
          platform: 'Instagram',
          subtitle: 'Personal Moments',
          url: findDbUrl('instagram', 'https://instagram.com/sp_alphatech'),
        },
        {
          key: 'medium',
          platform: 'Medium',
          subtitle: 'Articles & Thoughts',
          url: findDbUrl('medium', 'https://medium.com/@surajprakash'),
        },
        {
          key: 'notion',
          platform: 'Notion',
          subtitle: 'Notes & Ideas',
          url: findDbUrl('notion', 'https://notion.so'),
        }
      ]
    }
  ], [socials, profile]);

  const profileImg = profile?.hero?.profileImage ? getImageUrl(profile.hero.profileImage) : defaultHeroImage;

  return (
    <>
      <SEO title="Connect & Social" description="Connect with Suraj Prakash across coding, learning, and professional platforms." url="/socials" />

      <section id="socials" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-[1360px] mx-auto overflow-hidden">
        
        {/* --- Top Header Row --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-cyan-400 mb-2">
              <span className="w-5 h-[2px] bg-cyan-400"></span>
              LET'S CONNECT
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight">
              Connect & <span className="text-gradient">Social</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mt-2 leading-relaxed">
              Connect with me across coding, learning, and professional communities. <br className="hidden sm:inline" />
              Let's build, learn and grow together.
            </p>
          </div>

          {/* Top Right "Open to opportunities" Banner */}
          <a
            href="#contact"
            className="group flex items-center justify-between gap-4 p-4 sm:px-5 rounded-3xl bg-[#080d19]/90 border border-slate-700/60 hover:border-purple-400/80 shadow-lg hover:shadow-purple-500/10 transition-all max-w-md w-full md:w-auto"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-purple-600/25 text-purple-300 border border-purple-500/40 flex items-center justify-center shrink-0 shadow-inner">
                <Users size={20} />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-200 leading-snug group-hover:text-white transition-colors">
                Open to opportunities, collaborations <br className="hidden sm:inline" />
                and interesting tech discussions.
              </p>
            </div>
            <div className="w-7 h-7 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-purple-300 group-hover:border-purple-500/40 transition-colors shrink-0">
              <ArrowUpRight size={15} />
            </div>
          </a>
        </div>

        {/* --- Main 4 Quadrants & Centerpiece Avatar Layout --- */}
        <div className="relative">

          {/* Glowing Connecting Wires SVG (Rendered on Large Screens) */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
            <svg className="w-full h-full" viewBox="0 0 1200 620" fill="none" preserveAspectRatio="none">
              <defs>
                {/* Cyan Glow to Card 01 */}
                <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {/* Purple Glow to Card 02 */}
                <filter id="glow-purple" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {/* Orange Glow to Card 03 */}
                <filter id="glow-orange" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {/* Emerald Glow to Card 04 */}
                <filter id="glow-emerald" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Wire 1: Center Avatar to Card 01 (Right Edge of Card 01) */}
              <path
                d="M 520 270 C 470 270 470 170 410 170"
                stroke="#06b6d4"
                strokeWidth="2.5"
                filter="url(#glow-cyan)"
              />
              <circle cx="520" cy="270" r="4.5" fill="#06b6d4" />

              {/* Wire 2: Center Avatar to Card 02 (Left Edge of Card 02) */}
              <path
                d="M 680 270 C 730 270 730 170 790 170"
                stroke="#a855f7"
                strokeWidth="2.5"
                filter="url(#glow-purple)"
              />
              <circle cx="680" cy="270" r="4.5" fill="#a855f7" />

              {/* Wire 3: Center Avatar to Card 03 (Right Edge of Card 03) */}
              <path
                d="M 520 330 C 470 330 470 450 410 450"
                stroke="#f59e0b"
                strokeWidth="2.5"
                filter="url(#glow-orange)"
              />
              <circle cx="520" cy="330" r="4.5" fill="#f59e0b" />

              {/* Wire 4: Center Avatar to Card 04 (Left Edge of Card 04) */}
              <path
                d="M 680 330 C 730 330 730 450 790 450"
                stroke="#10b981"
                strokeWidth="2.5"
                filter="url(#glow-emerald)"
              />
              <circle cx="680" cy="330" r="4.5" fill="#10b981" />
            </svg>
          </div>

          {/* Grid Layout: Left Column (01 & 03), Center Hub (Avatar), Right Column (02 & 04) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">

            {/* --- Left Column: Card 01 & Card 03 --- */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Card 01: Professional Network */}
              <div className={`p-5 sm:p-6 rounded-3xl bg-[#070c18]/95 border ${SECTIONS[0].cardColor} backdrop-blur-xl transition-all`}>
                <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${SECTIONS[0].iconBg} shadow-inner`}>
                      <Briefcase size={20} />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold font-heading text-white">
                        {SECTIONS[0].title}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {SECTIONS[0].subtitle}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${SECTIONS[0].badgeColor}`}>
                    {SECTIONS[0].number}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                  {SECTIONS[0].items.map((item) => (
                    <SocialTile
                      key={item.key}
                      item={item}
                      isResume={item.isResume}
                      onResumeClick={() => downloadResume(profile?.hero?.resumeUrl)}
                    />
                  ))}
                </div>
              </div>

              {/* Card 03: Tech Communities */}
              <div className={`p-5 sm:p-6 rounded-3xl bg-[#070c18]/95 border ${SECTIONS[2].cardColor} backdrop-blur-xl transition-all`}>
                <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${SECTIONS[2].iconBg} shadow-inner`}>
                      <Users size={20} />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold font-heading text-white">
                        {SECTIONS[2].title}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {SECTIONS[2].subtitle}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${SECTIONS[2].badgeColor}`}>
                    {SECTIONS[2].number}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                  {SECTIONS[2].items.map((item) => (
                    <SocialTile key={item.key} item={item} />
                  ))}
                </div>
              </div>

            </div>

            {/* --- Center Column: Circular Avatar Hub --- */}
            <div className="lg:col-span-2 flex flex-col items-center justify-center my-8 lg:my-0 text-center relative z-20">
              
              {/* Outer Circular Ring with Glowing Neon Cyan Border */}
              <div className="relative w-40 h-40 sm:w-44 sm:h-44 flex items-center justify-center mb-4 group cursor-pointer">
                {/* Tech HUD Ring with dashed accents */}
                <div className="absolute inset-0 rounded-full border-2 border-cyan-400/80 shadow-[0_0_35px_rgba(6,182,212,0.65)] animate-[spin_20s_linear_infinite]" />
                
                {/* Secondary segmented ring */}
                <div className="absolute -inset-1.5 rounded-full border border-dashed border-cyan-400/40" />

                {/* Profile Photo */}
                <div className="w-[140px] h-[140px] sm:w-[152px] sm:h-[152px] rounded-full overflow-hidden border-4 border-[#070c18] bg-[#070c18] relative shadow-inner z-10 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={profileImg}
                    alt="Suraj Prakash"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = defaultHeroImage; }}
                  />
                </div>
              </div>

              {/* Title & Tagline under Avatar */}
              <h3 className="text-lg sm:text-xl font-black font-heading text-white tracking-tight">
                Connect With Me
              </h3>
              <p className="text-[10px] sm:text-[11px] font-extrabold tracking-widest uppercase text-cyan-400 mt-0.5">
                LET'S BUILD TOGETHER
              </p>
              <div className="w-12 h-1 bg-cyan-400 rounded-full mt-2 shadow-[0_0_10px_#22d3ee]"></div>
            </div>

            {/* --- Right Column: Card 02 & Card 04 --- */}
            <div className="lg:col-span-5 space-y-6">

              {/* Card 02: Developer & Open Source */}
              <div className={`p-5 sm:p-6 rounded-3xl bg-[#070c18]/95 border ${SECTIONS[1].cardColor} backdrop-blur-xl transition-all`}>
                <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${SECTIONS[1].iconBg} shadow-inner`}>
                      <Code2 size={20} />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold font-heading text-white">
                        {SECTIONS[1].title}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {SECTIONS[1].subtitle}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${SECTIONS[1].badgeColor}`}>
                    {SECTIONS[1].number}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                  {SECTIONS[1].items.map((item) => (
                    <SocialTile key={item.key} item={item} />
                  ))}
                </div>
              </div>

              {/* Card 04: Personal & Creative */}
              <div className={`p-5 sm:p-6 rounded-3xl bg-[#070c18]/95 border ${SECTIONS[3].cardColor} backdrop-blur-xl transition-all`}>
                <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${SECTIONS[3].iconBg} shadow-inner`}>
                      <User size={20} />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold font-heading text-white">
                        {SECTIONS[3].title}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {SECTIONS[3].subtitle}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${SECTIONS[3].badgeColor}`}>
                    {SECTIONS[3].number}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                  {SECTIONS[3].items.map((item) => (
                    <SocialTile key={item.key} item={item} />
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* --- Bottom Footer Strip: Let's Talk • Drop a Message • Collaborate --- */}
        <div className="mt-12 p-4 sm:p-6 rounded-3xl bg-[#070c18]/95 border border-slate-800/80 shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-800/80">
          
          {/* Column 1: Let's Talk */}
          <a href="#contact" className="group flex items-center gap-4 hover:translate-x-1 transition-transform pt-2 md:pt-0">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
              <MessageSquare size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold font-heading text-white group-hover:text-cyan-400 transition-colors">
                Let's Talk
              </h4>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Always open for meaningful conversations.
              </p>
            </div>
          </a>

          {/* Column 2: Drop a Message */}
          <a href="mailto:surajprak101@gmail.com" className="group flex items-center gap-4 pt-4 md:pt-0 md:pl-6 hover:translate-x-1 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
              <Mail size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold font-heading text-white group-hover:text-blue-400 transition-colors">
                Drop a Message
              </h4>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Feel free to reach out for opportunities.
              </p>
            </div>
          </a>

          {/* Column 3: Collaborate */}
          <a href="#contact" className="group flex items-center gap-4 pt-4 md:pt-0 md:pl-6 hover:translate-x-1 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
              <Users size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold font-heading text-white group-hover:text-indigo-400 transition-colors">
                Collaborate
              </h4>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Let's work on something amazing together.
              </p>
            </div>
          </a>

        </div>

      </section>
    </>
  );
};

export default Social;
