import { useState, useEffect } from 'react';
import { ArrowRight, Download, Github, Linkedin, Twitter } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { getImageUrl } from '../utils/imageUtils';
import { downloadResume } from '../services/resumeService';
import SEO from '../components/SEO';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Experience from './Experience';
import Certifications from './Certifications';
import Blog from './Blog';
import Social from './Social';
import Contact from './Contact';
import defaultHeroImage from '../assets/hero.png';

const Typewriter = ({ words }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer = setTimeout(() => {
      const i = loopNum % words.length;
      const fullText = String(words[i]);

      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
        setTypingSpeed(30);
      } else {
        setText(fullText.substring(0, text.length + 1));
        setTypingSpeed(100);
      }

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, words]);

  return (
    <span className="inline-flex items-center text-theme-text font-bold">
      {text}
      <span className="inline-block w-[3px] h-[1.1em] bg-accent-500 ml-[2px] rounded-full" />
    </span>
  );
};

const Home = () => {
  const { data: profile, loading } = useProfile();

  if (loading) {
    return (
      <div className="flex-grow flex items-center min-h-[calc(100vh-64px)] justify-center px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="h-8 w-48 bg-theme-border rounded-full mx-auto"></div>
          <div className="h-16 w-96 bg-theme-border rounded-lg mx-auto"></div>
          <div className="h-6 w-80 bg-theme-border rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  const name = profile?.hero?.fullName || 'Suraj Prakash';
  const titleWords = (profile?.hero?.roles && profile.hero.roles.length > 0)
        ? profile.hero.roles
        : ['Cloud Enthusiast', 'Full Stack Developer', 'Problem Solver'];
  
  const tagline = profile?.hero?.tagline || 'Building scalable, modern, and high-performance applications.';
  const shortDescription = profile?.hero?.shortDescription || 'I build beautiful, responsive, and performant web applications using modern technologies.';
  const available = profile?.hero?.availability !== false;
  const stats = profile?.hero?.stats || { projects: '10+', experience: '3+ Years', contributions: '50+' };
  const socials = profile?.socials || {};
  const resumeUrl = profile?.hero?.resumeUrl;
  const profileImage = profile?.hero?.profileImage;

  return (
    <>
      <SEO title="Home" description={tagline} url="/" />

      <section
        id="home"
        className="relative pt-12 pb-10 md:pt-16 md:pb-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden min-h-[80vh] flex items-center"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 items-center w-full z-10 relative">

          {/* Mobile Profile Photo */}
          <div className="md:hidden flex justify-center -mb-2">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl p-1 bg-gradient-to-tr from-accent-500 to-blue-500 shadow-xl shadow-accent-500/20">
              <img
                src={profileImage ? getImageUrl(profileImage) : defaultHeroImage}
                alt={name}
                onError={(e) => { e.currentTarget.src = defaultHeroImage; }}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>

          {/* Left Column: Text */}
          <div className="md:col-span-7 flex flex-col justify-center text-center md:text-left relative z-10">
            {/* Hero Headers */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading mb-2 tracking-tight leading-tight relative z-20">
              <span className="inline-block mr-2 text-theme-text">Hi, I'm</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-400 via-accent-300 to-blue-500 relative inline-block pb-0.5">{name}</span>
            </h1>

            <h2 className="text-lg sm:text-xl font-bold opacity-90 mb-3 font-heading flex flex-wrap items-center justify-center md:justify-start gap-2 h-7 sm:h-8 overflow-hidden">
               <span className="text-theme-muted">I am a </span> <Typewriter words={titleWords} />
            </h2>

            {/* Impact Statement */}
            <div className="mb-4 text-theme-muted max-w-lg mx-auto md:mx-0">
              <p className="font-semibold text-theme-text text-sm sm:text-base leading-relaxed">
                {tagline}
              </p>
              {shortDescription && shortDescription !== tagline && (
                <p className="text-xs sm:text-sm font-medium leading-relaxed text-theme-muted mt-1">{shortDescription}</p>
              )}
            </div>

            {/* Stats Section */}
            <div className="flex items-center justify-center md:justify-start gap-4 sm:gap-6 mb-5 border-y border-theme-border/40 py-2 w-full md:w-max mx-auto md:mx-0">
              <div className="flex flex-col items-center md:items-start">
                 <span className="text-lg sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent-500 to-accent-300">{stats.projects}</span>
                 <span className="text-[10px] font-bold text-theme-muted uppercase tracking-wider mt-0.5">Projects</span>
              </div>
              <div className="w-px h-7 bg-theme-border/40"></div>
              <div className="flex flex-col items-center md:items-start">
                 <span className="text-lg sm:text-xl font-black text-theme-text">{stats.experience}</span>
                 <span className="text-[10px] font-bold text-theme-muted uppercase tracking-wider mt-0.5">Experience</span>
              </div>
              <div className="w-px h-7 bg-theme-border/40"></div>
              <div className="flex flex-col items-center md:items-start">
                 <span className="text-lg sm:text-xl font-black text-theme-text">{stats.contributions}</span>
                 <span className="text-[10px] font-bold text-theme-muted uppercase tracking-wider mt-0.5">Contributions</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center px-5 py-2.5 text-xs sm:text-sm font-bold text-white overflow-hidden rounded-xl border border-transparent shadow-md shadow-accent-500/20 w-full sm:w-auto cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent-600 via-accent-500 to-accent-600 z-0"></div>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 z-0"></div>
                <span className="relative z-10 flex items-center">
                  View My Work
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </span>
              </a>
              
              <button
                type="button"
                onClick={() => downloadResume(resumeUrl)}
                className="inline-flex items-center justify-center px-5 py-2.5 text-xs sm:text-sm font-bold text-theme-text bg-theme-card/60 backdrop-blur-md hover:bg-theme-bg/80 hover:text-accent-500 rounded-xl border border-theme-border w-full sm:w-auto shadow-sm tracking-wide cursor-pointer"
              >
                <Download className="w-4 h-4 mr-1.5" />
                Download CV
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center md:justify-start gap-2.5 mt-4">
                {socials?.githubUrl && (
                    <a title='GitHub' href={socials.githubUrl} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-theme-card border border-theme-border flex items-center justify-center text-theme-muted hover:text-accent-500 hover:border-accent-500/50 shadow-sm">
                        <Github size={15} />
                    </a>
                )}
                {socials?.linkedinUrl && (
                    <a title='LinkedIn' href={socials.linkedinUrl} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-theme-card border border-theme-border flex items-center justify-center text-theme-muted hover:text-accent-500 hover:border-accent-500/50 shadow-sm">
                        <Linkedin size={15} />
                    </a>
                )}
                {socials?.twitterUrl && (
                    <a title='Twitter' href={socials.twitterUrl} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-theme-card border border-theme-border flex items-center justify-center text-theme-muted hover:text-accent-500 hover:border-accent-500/50 shadow-sm">
                        <Twitter size={15} />
                    </a>
                )}
            </div>
          </div>

          {/* Desktop Right Column: Image */}
          <div className="hidden md:flex md:col-span-5 relative items-center justify-center md:justify-end">
            {/* Ambient Backdrop Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-accent-500/20 to-accent-300/10 blur-[80px] rounded-full -z-10 pointer-events-none" />

            <div className="relative w-full aspect-[4/5] max-w-[240px] lg:max-w-[270px] group">
              {/* Glowing Border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-600 via-blue-500 to-accent-400 rounded-2xl opacity-30 blur-md group-hover:opacity-60"></div>
              
              {/* Profile Card */}
              <div className="w-full h-full bg-theme-card/60 backdrop-blur-xl rounded-2xl p-2 shadow-xl border border-theme-border/50 relative group-hover:-translate-y-1">
                <div className="w-full h-full rounded-xl overflow-hidden relative bg-theme-bg shadow-inner">
                  <img
                    src={profileImage ? getImageUrl(profileImage) : defaultHeroImage}
                    alt={name}
                    onError={(e) => { e.currentTarget.src = defaultHeroImage; }}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Experience Chip */}
              {(stats.experience) && (
                <div className="absolute -bottom-3 -left-3 bg-theme-card/95 backdrop-blur-xl px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2 border border-theme-border/60 z-20 cursor-default">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-500 to-blue-500 flex items-center justify-center text-white font-extrabold text-xs shadow-md">
                    {String(stats.experience).split('+')[0].split(' ')[0]}+
                  </div>
                  <div>
                    <p className="text-[8px] text-theme-muted font-bold tracking-wider uppercase leading-tight">Years</p>
                    <p className="font-bold text-theme-text text-[11px] leading-tight">Experience</p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-500/50 to-transparent"></div>
      </section>

      <section id="about"><About /></section>
      <section id="skills"><Skills /></section>
      <section id="projects"><Projects /></section>
      <section id="experience"><Experience /></section>
      <section id="certifications"><Certifications /></section>
      <section id="blog"><Blog /></section>
      <section id="socials"><Social /></section>
      <section id="contact"><Contact /></section>
    </>
  );
};

export default Home;
