import React, { Component, useState, useMemo } from 'react';
import { 
  Lightbulb, Brain, Palette, Rocket, TrendingUp,
  Monitor, Settings, Database, Cloud, Infinity as InfinityIcon, Wrench,
  Code2, Layers, ArrowRight, ArrowDown, Sparkles, CheckCircle2, X
} from 'lucide-react';
import { useSkills } from '../hooks/useSkills';
import ArchitectureIcon from '../components/skills/ArchitectureIcon';

// The 5 Lifecycle Stages in Top Row
const LIFECYCLE_STAGES = [
  {
    step: 1,
    title: 'Ideation',
    subtitle: 'Start with a problem or an idea',
    icon: Lightbulb,
    color: 'from-amber-400 to-purple-500',
    borderColor: 'border-purple-500/40',
    badgeBg: 'bg-purple-600',
    glow: 'rgba(168, 85, 247, 0.25)',
  },
  {
    step: 2,
    title: 'Brainstorm',
    subtitle: 'Plan, design and choose the right tech',
    icon: Brain,
    color: 'from-blue-500 to-cyan-400',
    borderColor: 'border-cyan-500/40',
    badgeBg: 'bg-cyan-500',
    glow: 'rgba(6, 182, 212, 0.25)',
  },
  {
    step: 3,
    title: 'Build',
    subtitle: 'Write code, integrate and test',
    icon: Palette,
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-500/40',
    badgeBg: 'bg-emerald-500',
    glow: 'rgba(16, 185, 129, 0.25)',
  },
  {
    step: 4,
    title: 'Deploy',
    subtitle: 'Host, automate and scale',
    icon: Rocket,
    color: 'from-orange-500 to-amber-500',
    borderColor: 'border-orange-500/40',
    badgeBg: 'bg-orange-500',
    glow: 'rgba(249, 115, 22, 0.25)',
  },
  {
    step: 5,
    title: 'Grow',
    subtitle: 'Monitor, learn and improve',
    icon: TrendingUp,
    color: 'from-pink-500 to-rose-500',
    borderColor: 'border-pink-500/40',
    badgeBg: 'bg-pink-500',
    glow: 'rgba(236, 72, 153, 0.25)',
  },
];

// Architectural Pillars Configuration
const ARCHITECTURE_PILLARS = [
  {
    id: 'frontend',
    categoryMatch: ['Frontend Development', 'Frontend'],
    title: 'Frontend Development',
    subtitle: 'Build interactive and responsive user interfaces',
    icon: Monitor,
    borderColor: 'border-purple-500/50',
    glowColor: 'shadow-[0_0_20px_rgba(168,85,247,0.18)]',
    headerIconBg: 'bg-purple-500/15 text-purple-400 border border-purple-500/30',
    defaultSkills: [
      { name: 'React' }, { name: 'HTML5' }, { name: 'CSS3' }, 
      { name: 'Tailwind CSS' }, { name: 'JavaScript' }, { name: 'Bootstrap' }
    ]
  },
  {
    id: 'backend',
    categoryMatch: ['Backend Development', 'Backend'],
    title: 'Backend Development',
    subtitle: 'Build APIs, handle business logic and authentication',
    icon: Settings,
    borderColor: 'border-cyan-500/50',
    glowColor: 'shadow-[0_0_20px_rgba(6,182,212,0.18)]',
    headerIconBg: 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30',
    defaultSkills: [
      { name: 'Node.js' }, { name: 'Express.js' }, { name: 'JWT' }
    ]
  },
  {
    id: 'databases',
    categoryMatch: ['Databases', 'Database'],
    title: 'Databases',
    subtitle: 'Store, manage and retrieve data',
    icon: Database,
    borderColor: 'border-emerald-500/50',
    glowColor: 'shadow-[0_0_20px_rgba(16,185,129,0.18)]',
    headerIconBg: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    defaultSkills: [
      { name: 'MongoDB' }, { name: 'MySQL' }
    ]
  },
  {
    id: 'cloud',
    categoryMatch: ['Cloud Infrastructure', 'Cloud', 'Cloud Computing'],
    title: 'Cloud Infrastructure',
    subtitle: 'Host applications and manage infrastructure',
    icon: Cloud,
    borderColor: 'border-orange-500/50',
    glowColor: 'shadow-[0_0_20px_rgba(249,115,22,0.18)]',
    headerIconBg: 'bg-orange-500/15 text-orange-400 border border-orange-500/30',
    defaultSkills: [
      { name: 'AWS EC2' }, { name: 'AWS S3' }, { name: 'AWS CloudFront' },
      { name: 'AWS IAM' }, { name: 'AWS VPC' }, { name: 'AWS Lambda' }
    ]
  },
  {
    id: 'devops',
    categoryMatch: ['DevOps & Deployment', 'DevOps'],
    title: 'DevOps & Deployment',
    subtitle: 'Automate, containerize and deploy applications',
    icon: InfinityIcon,
    borderColor: 'border-blue-500/50',
    glowColor: 'shadow-[0_0_20px_rgba(59,130,246,0.18)]',
    headerIconBg: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
    defaultSkills: [
      { name: 'Docker' }, { name: 'Kubernetes' }, { name: 'Jenkins' },
      { name: 'Git' }, { name: 'GitHub' }, { name: 'Terraform' },
      { name: 'GitHub Actions' }, { name: 'Linux' }
    ]
  },
  {
    id: 'tools',
    categoryMatch: ['Tools & Design', 'Tools & Technologies', 'Tools'],
    title: 'Tools & Design',
    subtitle: 'Improve productivity and design better solutions',
    icon: Wrench,
    borderColor: 'border-pink-500/50',
    glowColor: 'shadow-[0_0_20px_rgba(236,72,153,0.18)]',
    headerIconBg: 'bg-pink-500/15 text-pink-400 border border-pink-500/30',
    defaultSkills: [
      { name: 'VS Code' }, { name: 'Postman' }, { name: 'Figma' },
      { name: 'Jira' }, { name: 'Notion' }, { name: 'Slack' }
    ]
  }
];

// Bottom Sections Configuration
const BOTTOM_SECTIONS = {
  languages: {
    id: 'languages',
    categoryMatch: ['Programming Languages', 'Languages'],
    title: 'Programming Languages',
    subtitle: 'Core languages I use to build and solve problems',
    icon: Code2,
    borderColor: 'border-indigo-500/50',
    glowColor: 'shadow-[0_0_20px_rgba(99,102,241,0.18)]',
    headerIconBg: 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30',
    defaultSkills: [
      { name: 'C' }, { name: 'C++' }, { name: 'Java' }, { name: 'Python' }, { name: 'JavaScript' }
    ]
  },
  other: {
    id: 'other',
    categoryMatch: ['Other Technologies', 'Machine Learning / AI', 'AI & Machine Learning', 'Additional Skills'],
    title: 'Other Technologies',
    subtitle: 'Libraries, frameworks and other tools I work with',
    icon: Layers,
    borderColor: 'border-teal-500/50',
    glowColor: 'shadow-[0_0_20px_rgba(20,184,166,0.18)]',
    headerIconBg: 'bg-teal-500/15 text-teal-400 border border-teal-500/30',
    defaultSkills: [
      { name: 'TensorFlow' }, { name: 'OpenCV' }, { name: 'MediaPipe' },
      { name: 'Linux' }, { name: 'Ansible' }, { name: 'Networking' }
    ]
  }
};

// Interconnection map between technologies
const TECH_CONNECTIONS = {
  'react': ['javascript', 'tailwindcss', 'html5', 'css3', 'bootstrap', 'nodejs', 'express', 'awss3', 'figma'],
  'html5': ['css3', 'javascript', 'react', 'tailwindcss', 'bootstrap'],
  'css3': ['html5', 'tailwindcss', 'bootstrap', 'react'],
  'tailwindcss': ['react', 'html5', 'css3', 'figma'],
  'javascript': ['react', 'nodejs', 'express', 'typescript', 'html5', 'css3'],
  'bootstrap': ['html5', 'css3', 'javascript', 'react'],
  'nodejs': ['express', 'mongodb', 'mysql', 'docker', 'awsec2', 'jwt', 'javascript'],
  'express': ['nodejs', 'mongodb', 'mysql', 'jwt', 'postman', 'react'],
  'expressjs': ['nodejs', 'mongodb', 'mysql', 'jwt', 'postman', 'react'],
  'jwt': ['express', 'nodejs', 'react'],
  'mongodb': ['nodejs', 'express', 'docker', 'awsec2'],
  'mysql': ['nodejs', 'express', 'docker', 'cplusplus'],
  'awsec2': ['docker', 'linux', 'awsvpc', 'awsiam', 'nodejs'],
  'awss3': ['awscloudfront', 'awsiam', 'react'],
  'awscloudfront': ['awss3', 'react'],
  'awsiam': ['awsec2', 'awss3', 'awslambda'],
  'awsvpc': ['awsec2', 'mongodb', 'mysql'],
  'awslambda': ['nodejs', 'python', 'awsiam', 'awss3'],
  'docker': ['kubernetes', 'linux', 'git', 'github', 'jenkins', 'nodejs', 'mongodb', 'mysql'],
  'kubernetes': ['docker', 'awsec2', 'terraform', 'jenkins'],
  'jenkins': ['docker', 'kubernetes', 'git', 'github', 'githubactions'],
  'git': ['github', 'vscode', 'linux', 'githubactions'],
  'github': ['git', 'githubactions', 'vscode'],
  'terraform': ['awsec2', 'awsvpc', 'kubernetes'],
  'githubactions': ['git', 'github', 'docker', 'awsec2'],
  'linux': ['docker', 'git', 'awsec2', 'ansible', 'networking'],
  'vscode': ['git', 'github', 'javascript', 'react', 'nodejs', 'python'],
  'postman': ['express', 'nodejs', 'jwt'],
  'figma': ['react', 'tailwindcss', 'html5'],
  'jira': ['github', 'slack', 'notion'],
  'notion': ['jira', 'slack'],
  'slack': ['jira', 'github', 'notion'],
  'c': ['cplusplus'],
  'cplusplus': ['c', 'mysql', 'python', 'linux'],
  'cpp': ['c', 'mysql', 'python', 'linux'],
  'java': ['cplusplus', 'mysql'],
  'python': ['tensorflow', 'opencv', 'mediapipe', 'linux'],
  'tensorflow': ['python', 'opencv', 'mediapipe'],
  'opencv': ['python', 'tensorflow', 'mediapipe', 'cplusplus'],
  'mediapipe': ['python', 'opencv', 'tensorflow'],
  'ansible': ['linux', 'awsec2', 'docker'],
  'networking': ['linux', 'awsvpc', 'docker']
};

const normalizeKey = (str) => {
  if (!str) return '';
  return str.toLowerCase().replace(/[\s\.\-_]/g, '');
};

const TechTile = ({ item, activeKey, onHover, onClick, isPinned }) => {
  const cleanKey = normalizeKey(item.name);
  const activeConn = activeKey ? TECH_CONNECTIONS[activeKey] || [] : [];

  const isSelf = activeKey && (activeKey === cleanKey);
  const isConnected = activeConn.includes(cleanKey);
  const isDimmed = activeKey && !isSelf && !isConnected;

  return (
    <div
      onMouseEnter={() => onHover(cleanKey)}
      onMouseLeave={() => !isPinned && onHover(null)}
      onClick={() => onClick(cleanKey)}
      className={`group flex flex-col items-center justify-center p-2 rounded-2xl cursor-pointer transition-all duration-200 relative ${
        isSelf
          ? 'bg-accent-500/25 border-2 border-accent-400 ring-4 ring-accent-400/30 shadow-[0_0_25px_rgba(6,182,212,0.8)] scale-110 z-30'
          : isConnected
          ? 'bg-accent-500/15 border-2 border-accent-400/90 ring-2 ring-accent-400/40 shadow-[0_0_15px_rgba(6,182,212,0.5)] scale-105 z-20'
          : isDimmed
          ? 'opacity-20 grayscale-[70%] border border-transparent scale-95'
          : 'bg-[#0f172a]/70 dark:bg-[#0b1329]/80 border border-slate-700/60 hover:border-accent-400/80 hover:shadow-theme-glow-sm hover:scale-105'
      }`}
      style={{ minWidth: '72px', minHeight: '74px' }}
    >
      {/* Connected glowing indicator */}
      {isConnected && (
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent-400 rounded-full border-2 border-[#0b0f19] shadow-[0_0_8px_#38bdf8] animate-pulse" />
      )}

      {/* Official Icon */}
      <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110">
        <ArchitectureIcon name={item.name} icon={item.icon} className="w-full h-full" />
      </div>

      {/* Label under icon */}
      <span className="text-[11px] font-bold text-slate-300 dark:text-slate-200 text-center tracking-tight leading-none group-hover:text-accent-400 transition-colors truncate max-w-[68px]">
        {item.name}
      </span>
    </div>
  );
};

const ArchitecturePillarCard = ({ pillar, skills, activeKey, onHover, onClick, isPinned }) => {
  const Icon = pillar.icon;

  return (
    <div
      className={`relative flex flex-col justify-between p-5 rounded-3xl bg-[#0b1120]/80 dark:bg-[#080d1a]/90 backdrop-blur-xl border ${pillar.borderColor} ${pillar.glowColor} transition-all duration-300 h-full`}
    >
      {/* Pillar Header */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${pillar.headerIconBg}`}>
            <Icon size={18} />
          </div>
          <h3 className="text-base font-extrabold font-heading text-white tracking-tight">
            {pillar.title}
          </h3>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
          {pillar.subtitle}
        </p>
      </div>

      {/* Technology Icons Grid */}
      <div className="grid grid-cols-2 gap-2.5 flex-grow content-start">
        {skills.map((item, idx) => (
          <TechTile
            key={item._id || item.name || idx}
            item={item}
            activeKey={activeKey}
            onHover={onHover}
            onClick={onClick}
            isPinned={isPinned}
          />
        ))}
      </div>
    </div>
  );
};

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, errorInfo) { 
    console.error("Skills Section Error:", error, errorInfo); 
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="py-16 text-center bg-theme-card/20 backdrop-blur-md rounded-2xl border border-theme-border m-4">
          <h2 className="text-lg font-bold text-theme-text mb-2">Something went wrong</h2>
          <p className="text-theme-muted text-sm">The skills section encountered an error. Please refresh the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const Skills = () => {
  const { data: dbSkillsData, loading } = useSkills();
  const dbSkills = Array.isArray(dbSkillsData) ? dbSkillsData : [];

  const [hoveredKey, setHoveredKey] = useState(null);
  const [pinnedKey, setPinnedKey] = useState(null);

  const activeKey = pinnedKey || hoveredKey;
  const activeConn = activeKey ? TECH_CONNECTIONS[activeKey] || [] : [];

  const handleTileClick = (key) => {
    if (pinnedKey === key) setPinnedKey(null);
    else setPinnedKey(key);
  };

  // Dynamically resolve skills per pillar from database (with fallback to default architecture skills)
  const getPillarSkills = (pillar) => {
    const fromDb = dbSkills.filter(s => {
      if (!s || !s.category) return false;
      return pillar.categoryMatch.some(cat => s.category.toLowerCase().trim() === cat.toLowerCase().trim());
    });
    return fromDb.length > 0 ? fromDb : pillar.defaultSkills;
  };

  const getBottomSkills = (section) => {
    const fromDb = dbSkills.filter(s => {
      if (!s || !s.category) return false;
      return section.categoryMatch.some(cat => s.category.toLowerCase().trim() === cat.toLowerCase().trim());
    });
    return fromDb.length > 0 ? fromDb : section.defaultSkills;
  };

  return (
    <ErrorBoundary>
      <section id="skills" className="py-14 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-[1400px] mx-auto overflow-hidden">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight mb-3">
            Technology Stack & <span className="text-gradient">Skills Architecture</span>
          </h2>
          <div className="w-20 h-1.5 bg-accent-500 rounded-full mx-auto mb-3"></div>
          <p className="text-slate-400 max-w-3xl mx-auto text-xs sm:text-sm leading-relaxed">
            From product ideation to production cloud scaling — how my engineering stack interconnects across the modern software lifecycle.
          </p>
        </div>

        {/* --- 1. TOP ROW: The 5 Product Lifecycle Stages --- */}
        <div className="relative mb-12">
          {/* Connector Curved Line SVG (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2 -z-0 pointer-events-none px-8">
            <svg className="w-full h-8" viewBox="0 0 1000 30" fill="none">
              <path d="M 50 15 Q 250 15 450 15 T 850 15" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="2" strokeDasharray="6 6" />
            </svg>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 relative z-10">
            {LIFECYCLE_STAGES.map((stage, idx) => {
              const StageIcon = stage.icon;
              const isLast = idx === LIFECYCLE_STAGES.length - 1;

              return (
                <div key={stage.step} className="relative group">
                  <div
                    className={`p-4 rounded-3xl bg-[#0b1120]/90 dark:bg-[#080d1a]/95 border ${stage.borderColor} shadow-lg transition-all hover:-translate-y-1 flex flex-col justify-between h-full`}
                    style={{ boxShadow: `0 0 20px ${stage.glow}` }}
                  >
                    {/* Top: Icon + Number Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${stage.color} p-0.5 shadow-md flex items-center justify-center text-white`}>
                        <div className="w-full h-full rounded-[14px] bg-[#0b1120]/40 backdrop-blur-sm flex items-center justify-center">
                          <StageIcon size={20} className="text-white drop-shadow-md" />
                        </div>
                      </div>
                      <span className={`w-6 h-6 rounded-full ${stage.badgeBg} text-white font-extrabold text-xs flex items-center justify-center shadow-md`}>
                        {stage.step}
                      </span>
                    </div>

                    {/* Stage Info */}
                    <div>
                      <h4 className="text-sm sm:text-base font-extrabold font-heading text-white mb-0.5 tracking-tight">
                        {stage.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium leading-snug">
                        {stage.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Flow Arrow to next step (Desktop) */}
                  {!isLast && (
                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-cyan-400">
                      <span className="text-xs font-black">➔</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* --- 2. INTERACTIVE CONNECTION FEEDBACK BANNER --- */}
        {activeKey ? (
          <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-accent-500/20 via-blue-500/10 to-transparent border border-accent-400/60 backdrop-blur-xl shadow-theme-glow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-accent-400 shadow-[0_0_10px_#38bdf8] animate-pulse"></span>
              <div>
                <span className="text-sm font-bold text-white uppercase tracking-wider">
                  <span className="text-accent-400 font-extrabold uppercase">{activeKey}</span> connects with:
                </span>
                <span className="text-xs text-slate-300 ml-2">
                  {activeConn.length > 0 
                    ? activeConn.map(c => c.toUpperCase()).join(' • ')
                    : 'Universal stack tool'}
                </span>
              </div>
            </div>
            {pinnedKey && (
              <button
                onClick={() => setPinnedKey(null)}
                className="px-3 py-1 rounded-xl bg-slate-800 border border-slate-600 text-xs text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer shrink-0"
              >
                <X size={13} /> Unpin
              </button>
            )}
          </div>
        ) : (
          <div className="mb-8 px-4 py-2.5 rounded-2xl bg-[#0f172a]/40 border border-slate-800 text-xs text-slate-400 flex items-center justify-between gap-2">
            <span className="flex items-center gap-2">
              <Sparkles size={14} className="text-accent-400 shrink-0" />
              Hover or click any technology tile below to reveal how it connects across the entire engineering lifecycle.
            </span>
            <span className="hidden sm:inline text-[11px] font-bold text-accent-400 uppercase tracking-wider">
              ⚡ Real-time Interconnection
            </span>
          </div>
        )}

        {/* --- 3. MIDDLE ROW: 6 Architecture Pillars with Horizontal Flow Connectors --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5 sm:gap-4 relative mb-10">
          {ARCHITECTURE_PILLARS.map((pillar, idx) => {
            const isLast = idx === ARCHITECTURE_PILLARS.length - 1;
            const skills = getPillarSkills(pillar);

            return (
              <div key={pillar.id} className="relative flex flex-col h-full">
                <ArchitecturePillarCard
                  pillar={pillar}
                  skills={skills}
                  activeKey={activeKey}
                  onHover={setHoveredKey}
                  onClick={handleTileClick}
                  isPinned={!!pinnedKey}
                />

                {/* Horizontal Flow Arrow Connector (between pillars on desktop) */}
                {!isLast && (
                  <div className="hidden xl:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-[#0b1120] border border-cyan-500/40 items-center justify-center text-cyan-400 shadow-md">
                    <ArrowRight size={13} className="text-cyan-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* --- 4. BOTTOM ROW: Programming Languages + Build Real Projects Center Hub + Other Technologies --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          
          {/* Left Block: Programming Languages */}
          <div className="lg:col-span-4 h-full">
            <div className={`p-5 rounded-3xl bg-[#0b1120]/80 dark:bg-[#080d1a]/90 backdrop-blur-xl border ${BOTTOM_SECTIONS.languages.borderColor} ${BOTTOM_SECTIONS.languages.glowColor} h-full flex flex-col justify-between`}>
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${BOTTOM_SECTIONS.languages.headerIconBg}`}>
                    <Code2 size={18} />
                  </div>
                  <h3 className="text-base font-extrabold font-heading text-white tracking-tight">
                    {BOTTOM_SECTIONS.languages.title}
                  </h3>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                  {BOTTOM_SECTIONS.languages.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {getBottomSkills(BOTTOM_SECTIONS.languages).map((item, idx) => (
                  <TechTile
                    key={item._id || item.name || idx}
                    item={item}
                    activeKey={activeKey}
                    onHover={setHoveredKey}
                    onClick={handleTileClick}
                    isPinned={!!pinnedKey}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Center Hub: "Build Real Projects" Glowing Halo */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center my-4 lg:my-0 text-center relative px-2">
            
            {/* Pulsing Connector arrows */}
            <div className="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 text-cyan-400 font-bold text-lg">
              ◀
            </div>
            <div className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 text-cyan-400 font-bold text-lg">
              ▶
            </div>

            {/* Glowing Double Halo Circle */}
            <div className="relative w-36 h-36 rounded-full flex items-center justify-center p-1 bg-gradient-to-tr from-cyan-500 via-blue-500 to-indigo-600 shadow-[0_0_40px_rgba(6,182,212,0.4)] mb-4">
              <div className="w-full h-full rounded-full bg-[#080d1a] border-2 border-cyan-400/60 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-md"></div>
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400 shadow-inner mb-1 relative z-10">
                  <Code2 size={24} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-cyan-300 relative z-10">Production</span>
              </div>
            </div>

            <h3 className="text-lg font-black font-heading text-white tracking-tight mb-1">
              Build Real Projects
            </h3>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
              Combine these technologies to create scalable and impactful applications
            </p>
          </div>

          {/* Right Block: Other Technologies (AI, CV, Libraries) */}
          <div className="lg:col-span-4 h-full">
            <div className={`p-5 rounded-3xl bg-[#0b1120]/80 dark:bg-[#080d1a]/90 backdrop-blur-xl border ${BOTTOM_SECTIONS.other.borderColor} ${BOTTOM_SECTIONS.other.glowColor} h-full flex flex-col justify-between`}>
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${BOTTOM_SECTIONS.other.headerIconBg}`}>
                    <Layers size={18} />
                  </div>
                  <h3 className="text-base font-extrabold font-heading text-white tracking-tight">
                    {BOTTOM_SECTIONS.other.title}
                  </h3>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                  {BOTTOM_SECTIONS.other.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {getBottomSkills(BOTTOM_SECTIONS.other).map((item, idx) => (
                  <TechTile
                    key={item._id || item.name || idx}
                    item={item}
                    activeKey={activeKey}
                    onHover={setHoveredKey}
                    onClick={handleTileClick}
                    isPinned={!!pinnedKey}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>

      </section>
    </ErrorBoundary>
  );
};

export default Skills;
