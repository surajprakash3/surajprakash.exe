import React, { Component, useState, useMemo, useRef } from 'react';
import { 
  Code2, Users, Wrench, Lightbulb, ChevronLeft, ChevronRight, 
  Sparkles, Zap, ArrowRight, X, Link2, Info 
} from 'lucide-react';
import { useSkills } from '../hooks/useSkills';
import { getImageUrl } from '../utils/imageUtils';

const isValidIcon = (iconStr) => {
  return iconStr && iconStr !== 'null' && iconStr !== 'undefined' && iconStr.trim() !== '';
};

const DEVICON_MAP = {
  'html': 'html5', 'html5': 'html5', 'css': 'css3', 'css3': 'css3',
  'javascript': 'javascript', 'js': 'javascript', 'typescript': 'typescript', 'ts': 'typescript',
  'react': 'react', 'react.js': 'react', 'reactjs': 'react', 'react native': 'react',
  'next.js': 'nextjs', 'nextjs': 'nextjs', 'next': 'nextjs',
  'vue': 'vuejs', 'vue.js': 'vuejs', 'vuejs': 'vuejs',
  'angular': 'angular', 'angularjs': 'angularjs',
  'svelte': 'svelte', 'node': 'nodejs', 'node.js': 'nodejs', 'nodejs': 'nodejs',
  'express': 'express', 'express.js': 'express', 'expressjs': 'express',
  'python': 'python', 'java': 'java', 'c': 'c', 'c++': 'cplusplus', 'cpp': 'cplusplus',
  'c#': 'csharp', 'csharp': 'csharp', 'go': 'go', 'golang': 'go',
  'rust': 'rust', 'ruby': 'ruby', 'php': 'php', 'swift': 'swift',
  'kotlin': 'kotlin', 'dart': 'dart', 'flutter': 'flutter', 'r': 'r',
  'mongodb': 'mongodb', 'mongo': 'mongodb', 'mysql': 'mysql',
  'postgresql': 'postgresql', 'postgres': 'postgresql',
  'redis': 'redis', 'sqlite': 'sqlite', 'firebase': 'firebase',
  'docker': 'docker', 'kubernetes': 'kubernetes', 'k8s': 'kubernetes',
  'aws': 'amazonwebservices', 'azure': 'azure', 'gcp': 'googlecloud', 'google cloud': 'googlecloud',
  'git': 'git', 'github': 'github', 'gitlab': 'gitlab', 'bitbucket': 'bitbucket',
  'linux': 'linux', 'ubuntu': 'ubuntu', 'bash': 'bash',
  'nginx': 'nginx', 'apache': 'apache',
  'figma': 'figma', 'sketch': 'sketch', 'photoshop': 'photoshop',
  'illustrator': 'illustrator', 'xd': 'xd',
  'tailwind': 'tailwindcss', 'tailwindcss': 'tailwindcss', 'tailwind css': 'tailwindcss',
  'bootstrap': 'bootstrap', 'sass': 'sass', 'scss': 'sass', 'less': 'less',
  'webpack': 'webpack', 'vite': 'vitejs', 'babel': 'babel',
  'npm': 'npm', 'yarn': 'yarn', 'pnpm': 'pnpm',
  'jest': 'jest', 'mocha': 'mocha', 'cypress': 'cypressio',
  'graphql': 'graphql', 'rest api': 'fastapi', 'fastapi': 'fastapi',
  'django': 'django', 'flask': 'flask', 'spring': 'spring', 'spring boot': 'spring',
  'laravel': 'laravel', 'rails': 'rails', 'ruby on rails': 'rails',
  'tensorflow': 'tensorflow', 'pytorch': 'pytorch',
  'pandas': 'pandas', 'numpy': 'numpy', 'jupyter': 'jupyter',
  'heroku': 'heroku', 'vercel': 'vercel', 'netlify': 'netlify',
  'jira': 'jira', 'confluence': 'confluence', 'trello': 'trello',
  'slack': 'slack', 'vscode': 'vscode', 'visual studio code': 'vscode',
  'intellij': 'intellij', 'android': 'android', 'ios': 'apple',
  'unity': 'unity', 'unreal': 'unrealengine',
  'three.js': 'threejs', 'threejs': 'threejs',
  'socket.io': 'socketio', 'socketio': 'socketio',
  'postman': 'postman', 'insomnia': 'insomnia',
  'material ui': 'materialui', 'mui': 'materialui',
  'redux': 'redux', 'mobx': 'mobx',
  'electron': 'electron', 'deno': 'denojs',
  'supabase': 'supabase', 'prisma': 'prisma',
  'mongoose': 'mongoose',
  'vs code': 'vscode', 'visual studio': 'visualstudio'
};

const getDeviconUrl = (skillName) => {
  if (!skillName) return null;
  const key = skillName.toLowerCase().trim();
  const deviconName = DEVICON_MAP[key];
  if (deviconName) {
    return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${deviconName}/${deviconName}-original.svg`;
  }
  return null;
};

// Normalize names for consistent connection keys
const normalizeKey = (str) => {
  if (!str) return '';
  return str.toLowerCase().replace(/[\s\.\-_]/g, '');
};

// Technology connection mapping - defines which technologies connect with which others and their workflow role
const TECH_CONNECTIONS = {
  'react': {
    name: 'React.js',
    role: 'Frontend UI Framework',
    workflow: 'Renders reactive client UI components, manages client state, and communicates with backend APIs.',
    connects: ['javascript', 'tailwindcss', 'html5', 'css3', 'nextjs', 'nodejs', 'express', 'npm', 'figma']
  },
  'nodejs': {
    name: 'Node.js',
    role: 'Backend Server Runtime',
    workflow: 'Executes server-side JavaScript, handles asynchronous I/O, and manages database queries.',
    connects: ['express', 'javascript', 'mongodb', 'mysql', 'docker', 'npm', 'react', 'postman']
  },
  'express': {
    name: 'Express.js',
    role: 'REST API & Routing',
    workflow: 'Processes HTTP requests, authenticates JWT sessions, and provides REST endpoints for React.',
    connects: ['nodejs', 'mongodb', 'mysql', 'react', 'postman', 'javascript', 'npm']
  },
  'nextjs': {
    name: 'Next.js',
    role: 'Hybrid Full-Stack Engine',
    workflow: 'Enables Server-Side Rendering (SSR) and Edge API routes integrated with React and Node.js.',
    connects: ['react', 'javascript', 'typescript', 'nodejs', 'tailwindcss']
  },
  'html5': {
    name: 'HTML5',
    role: 'Semantic Structure',
    workflow: 'Defines DOM hierarchy, accessibility, and form controls rendered by React.',
    connects: ['css3', 'javascript', 'react', 'tailwindcss']
  },
  'css3': {
    name: 'CSS3',
    role: 'Presentation & Styling',
    workflow: 'Provides visual styling, layout responsiveness, and modern glassmorphic theme styling.',
    connects: ['html5', 'tailwindcss', 'javascript', 'react']
  },
  'tailwindcss': {
    name: 'Tailwind CSS',
    role: 'Utility Design System',
    workflow: 'Rapidly styles React components with consistent dark theme tokens and responsive layouts.',
    connects: ['react', 'css3', 'html5', 'nextjs', 'figma']
  },
  'javascript': {
    name: 'JavaScript (ES6+)',
    role: 'Universal Language',
    workflow: 'Core programming language executing both client-side React code and server-side Node.js.',
    connects: ['react', 'nodejs', 'express', 'html5', 'css3', 'nextjs', 'typescript']
  },
  'typescript': {
    name: 'TypeScript',
    role: 'Type-Safe Architecture',
    workflow: 'Guarantees strict type contracts across API payloads and React component props.',
    connects: ['javascript', 'react', 'nodejs', 'nextjs']
  },
  'mongodb': {
    name: 'MongoDB',
    role: 'NoSQL Document Store',
    workflow: 'Persists dynamic JSON documents, portfolio content, and blog collections for Node.js APIs.',
    connects: ['nodejs', 'express', 'docker']
  },
  'mysql': {
    name: 'MySQL',
    role: 'Relational Database',
    workflow: 'Enforces ACID compliance, structured schemas, and referential integrity for core entities.',
    connects: ['nodejs', 'express', 'cplusplus', 'docker']
  },
  'docker': {
    name: 'Docker',
    role: 'Containerization',
    workflow: 'Packages Node.js, Express, and database microservices into portable, isolated containers.',
    connects: ['nodejs', 'linux', 'git', 'github', 'mongodb', 'mysql']
  },
  'git': {
    name: 'Git',
    role: 'Version Control',
    workflow: 'Tracks atomic code changes, branches, and merges synchronized with remote GitHub repos.',
    connects: ['github', 'vscode', 'linux', 'docker']
  },
  'github': {
    name: 'GitHub',
    role: 'Collaboration & Repositories',
    workflow: 'Central repository hub triggering automated CI/CD workflows and code collaboration.',
    connects: ['git', 'vscode', 'docker', 'linux']
  },
  'linux': {
    name: 'Linux / Ubuntu',
    role: 'Production Host OS',
    workflow: 'Underlying operating system hosting container daemons, PM2 processes, and shell scripts.',
    connects: ['docker', 'git', 'github', 'nodejs']
  },
  'cplusplus': {
    name: 'C++',
    role: 'Core Problem Solving',
    workflow: 'Optimized Data Structures & Algorithms (DSA) execution with low-level memory efficiency.',
    connects: ['mysql', 'linux']
  },
  'cpp': {
    name: 'C++',
    role: 'Core Problem Solving',
    workflow: 'Optimized Data Structures & Algorithms (DSA) execution with low-level memory efficiency.',
    connects: ['mysql', 'linux']
  },
  'vscode': {
    name: 'VS Code',
    role: 'Development Environment',
    workflow: 'Integrated coding command center with Git integration, terminal shells, and extensions.',
    connects: ['git', 'github', 'javascript', 'react', 'nodejs']
  },
  'postman': {
    name: 'Postman',
    role: 'API Testing & Contracts',
    workflow: 'Tests Express REST endpoints, payload validations, and response schemas prior to UI build.',
    connects: ['express', 'nodejs']
  },
  'figma': {
    name: 'Figma',
    role: 'UI/UX Design & Prototyping',
    workflow: 'Visual design blueprint and token generation translated directly into Tailwind CSS code.',
    connects: ['react', 'tailwindcss']
  },
  'npm': {
    name: 'NPM',
    role: 'Package Ecosystem',
    workflow: 'Resolves dependencies, locks versions, and runs build scripts across the JavaScript stack.',
    connects: ['nodejs', 'react', 'express', 'tailwindcss']
  }
};

const SkillItem = ({ skill, activeKey, onHover, onClick, isPinned }) => {
  if (!skill || !skill.name) return null;
  
  const [imgError, setImgError] = useState(false);
  const [deviconError, setDeviconError] = useState(false);

  const hasStoredIcon = isValidIcon(skill.icon);
  const deviconUrl = !hasStoredIcon ? getDeviconUrl(skill.name) : null;
  const iconSrc = hasStoredIcon ? getImageUrl(skill.icon) : deviconUrl;
  const showFallback = (!iconSrc || (hasStoredIcon && imgError) || (!hasStoredIcon && deviconError));

  const thisKey = normalizeKey(skill.name);
  const activeConn = activeKey ? TECH_CONNECTIONS[activeKey] : null;

  const isSelf = activeKey && (activeKey === thisKey);
  const isConnected = activeConn && activeConn.connects && activeConn.connects.includes(thisKey);
  const isDimmed = activeKey && !isSelf && !isConnected;

  return (
    <div
      onMouseEnter={() => onHover(thisKey)}
      onMouseLeave={() => !isPinned && onHover(null)}
      onClick={() => onClick(thisKey)}
      className={`flex-shrink-0 flex flex-col items-center justify-center p-2 w-[54px] h-[54px] sm:w-[60px] sm:h-[60px] rounded-xl border transition-all duration-200 cursor-pointer relative group/icon ${
        isSelf
          ? 'bg-accent-500/25 border-accent-400 ring-2 ring-accent-400 shadow-[0_0_20px_rgba(6,182,212,0.8)] scale-110 z-30'
          : isConnected
          ? 'bg-accent-500/15 border-accent-400/80 ring-1 ring-accent-400/60 shadow-[0_0_14px_rgba(6,182,212,0.45)] scale-105 z-20'
          : isDimmed
          ? 'opacity-25 grayscale-[60%] border-theme-border/40 scale-95 bg-theme-bg/40'
          : 'bg-theme-bg/60 backdrop-blur-md border-theme-border shadow-theme-glow-sm hover:border-accent-500/70 hover:scale-105 hover:shadow-theme-glow'
      }`}
    >
      {/* Connected dot indicator */}
      {isConnected && (
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent-400 rounded-full border-2 border-[#0b0f19] shadow-[0_0_8px_#38bdf8] animate-pulse z-30" />
      )}

      {/* Main Icon */}
      {!showFallback ? (
        <img
          src={iconSrc}
          alt={skill.name}
          className="w-7 h-7 sm:w-8 sm:h-8 object-contain relative z-10 transition-transform group-hover/icon:scale-110"
          onError={() => {
            if (hasStoredIcon) setImgError(true);
            else setDeviconError(true);
          }}
        />
      ) : (
        <span className="text-lg sm:text-xl font-bold text-accent-400 relative z-10">
          {skill.name ? skill.name.charAt(0).toUpperCase() : '?'}
        </span>
      )}

      {/* Hover tooltip label */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-theme-text opacity-0 group-hover/icon:opacity-100 transition-opacity pointer-events-none bg-slate-900/95 dark:bg-[#0b0f19]/95 px-2.5 py-0.5 rounded-lg border border-accent-500/50 shadow-xl z-40 tracking-wider uppercase">
        {skill.name}
      </div>
    </div>
  );
};

const CategoryCard = ({ category, activeKey, onHover, onClick, isPinned }) => {
  if (!category || !category.icon) return null;
  const IconComponent = category.icon;

  return (
    <div
      className="bg-theme-card/40 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-theme-border shadow-theme-glow-sm hover:shadow-theme-glow w-[280px] sm:w-[320px] md:w-[360px] shrink-0 snap-start flex flex-col h-full transition-all"
    >
      {/* Category Card Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${category.gradient || 'from-slate-500 to-slate-400'} text-white shadow-md shadow-accent-500/20`}>
          <IconComponent size={22} />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold font-heading text-theme-text">{category.title}</h3>
          <p className="text-[10px] font-bold text-theme-muted uppercase tracking-wider mt-0.5">{category.subtitle}</p>
        </div>
      </div>

      {/* Sub-groups */}
      <div className="space-y-5 flex-grow">
        {(category.groups || []).map((group, gIdx) => (
          <div key={gIdx} className="space-y-2.5">
            <h4 className="text-[11px] font-bold text-theme-text flex items-center gap-1.5 uppercase tracking-wider text-theme-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
              {group.name}
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {(group.skills || []).map((skill, sIdx) => (
                <SkillItem 
                  key={sIdx} 
                  skill={skill}
                  activeKey={activeKey}
                  onHover={onHover}
                  onClick={onClick}
                  isPinned={isPinned}
                />
              ))}
            </div>
          </div>
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
          <p className="text-theme-muted text-sm">The skills section failed to load. Please refresh the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const Skills = () => {
  const { data, loading } = useSkills();
  const dbSkills = typeof data === 'object' && Array.isArray(data) ? data : [];
  const scrollRef = useRef(null);

  // Connection State: tracks which skill is currently inspected / hovered
  const [hoveredKey, setHoveredKey] = useState(null);
  const [pinnedKey, setPinnedKey] = useState(null);

  const activeKey = pinnedKey || hoveredKey;
  const activeConn = activeKey ? TECH_CONNECTIONS[activeKey] : null;

  const handleTileClick = (key) => {
    if (pinnedKey === key) {
      setPinnedKey(null); // toggle off
    } else {
      setPinnedKey(key);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const categories = useMemo(() => {
    const build = (title, subtitle, icon, gradient, catName) => {
      const skills = dbSkills.filter(s => s && s.category === catName);
      if (skills.length === 0) return null;

      const groupMap = {};
      skills.forEach(s => {
        const gName = s.group || 'General';
        if (!groupMap[gName]) groupMap[gName] = [];
        groupMap[gName].push(s);
      });

      return {
        title, subtitle, icon, gradient,
        groups: Object.entries(groupMap).map(([name, skills]) => ({ name, skills }))
      };
    };

    return [
      build("Technical Skills", "Primary Expertise", Code2, "from-blue-500 to-cyan-400", "Technical Skills"),
      build("Tools & Technologies", "Workflow & Ecosystem", Wrench, "from-amber-500 to-orange-400", "Tools & Technologies"),
      build("Core / Soft Skills", "Professional Qualities", Users, "from-emerald-500 to-teal-400", "Core / Soft Skills"),
      build("Additional Skills", "Versatility", Lightbulb, "from-purple-500 to-pink-400", "Additional Skills")
    ].filter(Boolean);
  }, [dbSkills]);

  if (loading) return (
    <div className="flex justify-center py-16">
      <div className="w-8 h-8 border-3 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <ErrorBoundary>
      <section id="skills" className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-theme-text mb-3">
              Expertise & <span className="text-gradient">Skills Architecture</span>
            </h2>
            <div className="w-16 h-1.5 bg-accent-500 rounded-full mb-3"></div>
            <p className="text-theme-muted max-w-2xl text-sm sm:text-base">
              A comprehensive overview of my technical capabilities and how each technology interconnects across the full stack.
            </p>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center gap-2 pb-1 shrink-0 ml-4">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="p-2 rounded-lg bg-theme-card border border-theme-border text-theme-muted hover:text-accent-500 hover:border-accent-500/50 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="p-2 rounded-lg bg-theme-card border border-theme-border text-theme-muted hover:text-accent-500 hover:border-accent-500/50 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Live Interactive Technology Connection Strip */}
        {activeConn ? (
          <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-accent-500/20 via-blue-500/10 to-theme-card/40 border border-accent-500/50 backdrop-blur-xl shadow-theme-glow transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-400 shadow-[0_0_8px_#38bdf8] animate-pulse"></span>
                  <h3 className="text-base sm:text-lg font-bold font-heading text-theme-text flex items-center gap-2">
                    {activeConn.name}
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent-500/20 text-accent-400 border border-accent-500/30">
                      {activeConn.role}
                    </span>
                  </h3>
                  {pinnedKey && (
                    <button
                      onClick={() => setPinnedKey(null)}
                      className="ml-2 text-[11px] text-theme-muted hover:text-theme-text flex items-center gap-1 bg-theme-card px-2 py-0.5 rounded border border-theme-border cursor-pointer"
                    >
                      <X size={12} /> Clear Pin
                    </button>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-theme-muted leading-relaxed">
                  {activeConn.workflow}
                </p>
              </div>

              {/* Connected tags */}
              <div className="flex items-center gap-1.5 flex-wrap shrink-0">
                <span className="text-[11px] font-bold text-accent-400 uppercase tracking-wider mr-1 flex items-center gap-1">
                  <Link2 size={13} />
                  Connected with:
                </span>
                {activeConn.connects.map((connKey) => {
                  const targetInfo = TECH_CONNECTIONS[connKey];
                  const label = targetInfo ? targetInfo.name : connKey;
                  return (
                    <span
                      key={connKey}
                      onClick={() => handleTileClick(connKey)}
                      className="text-xs px-2.5 py-1 rounded-lg bg-accent-500/15 text-accent-300 font-semibold border border-accent-500/30 shadow-xs cursor-pointer hover:bg-accent-500/30 transition-colors"
                    >
                      {label}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6 px-4 py-3 rounded-2xl bg-theme-card/40 border border-theme-border/60 text-xs text-theme-muted flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles size={15} className="text-accent-400 shrink-0" />
              <span>Kisi bhi technology icon par hover ya click karein — wo doosre connected technologies ko visually highlight karega!</span>
            </div>
            <span className="text-[11px] font-bold text-accent-500 hidden sm:inline-flex items-center gap-1">
              <Zap size={12} /> Live Interconnection
            </span>
          </div>
        )}

        {/* Categories Horizontal Carousel */}
        <div
          ref={scrollRef}
          className="flex flex-nowrap overflow-x-auto gap-5 pb-5 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {categories.map((cat, idx) => (
            <CategoryCard 
              key={idx} 
              category={cat}
              activeKey={activeKey}
              onHover={setHoveredKey}
              onClick={handleTileClick}
              isPinned={!!pinnedKey}
            />
          ))}
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default Skills;
