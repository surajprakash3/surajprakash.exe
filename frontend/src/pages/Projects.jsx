import { useState, useRef } from 'react';
import { Github, ExternalLink, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { getImageUrl } from '../utils/imageUtils';

const ProjectCard = ({ project }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl overflow-hidden group flex flex-col h-full border border-slate-200 dark:border-slate-800/80 hover:border-sky-500/40 hover:shadow-xl hover:-translate-y-1 relative z-10 w-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
          {/* Spotlight Effect */}
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.08), transparent 40%)`,
              opacity: isHovered ? 1 : 0
            }}
          />
          <div className="absolute inset-0 rounded-3xl pointer-events-none border border-theme-border mix-blend-overlay z-20"></div>

          {project.image && (
            <div className="relative overflow-hidden h-36 sm:h-40 w-full shrink-0 z-10">
              <img
                src={getImageUrl(project.image)}
                alt={project.title}
                className="w-full h-full object-cover object-top group-hover:scale-[1.05]"
                loading="lazy"
              />
            </div>
          )}

          <div className="p-3.5 sm:p-4 flex flex-col flex-grow relative z-10">
            <h3 className="text-base sm:text-lg font-bold font-heading text-theme-text mb-1.5 group-hover:text-accent-500 z-10 relative line-clamp-2">
              {project.title}
            </h3>

            {/* Description */}
            <div className="mb-3 flex-grow flex flex-col justify-start z-10 relative">
              <div className={`text-xs text-theme-muted leading-relaxed ${isExpanded ? 'max-h-32 overflow-y-auto pr-1 custom-scrollbar' : 'line-clamp-3'}`}>
                {project.description}
              </div>
              {project.description && project.description.length > 90 && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                  className="self-start mt-1 text-xs font-semibold text-accent-500 hover:text-accent-400 inline-flex items-center gap-0.5 cursor-pointer"
                >
                  {isExpanded ? (<>Show less <ChevronUp size={12} /></>) : (<>Read more <ChevronDown size={12} /></>)}
                </button>
              )}
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1 mb-3 z-10 relative">
              {(project.techStack || project.technologies || []).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-[11px] font-semibold text-theme-text bg-theme-bg/50 backdrop-blur-sm rounded-md border border-theme-border shadow-sm cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-auto pt-2.5 border-t border-theme-border z-10 relative">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-accent-600 via-accent-500 to-accent-600 text-white font-semibold text-xs shadow-md"
                >
                  <ExternalLink size={14} className="mr-1" />
                  Live Demo
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-2.5 py-1.5 rounded-lg bg-theme-card text-theme-text font-semibold text-xs border border-theme-border shadow-sm"
                >
                  <Github size={14} className="mr-1" />
                  Codebase
                </a>
              )}
            </div>
          </div>
    </div>
  );
};

const Projects = () => {
  const { data, loading, error } = useProjects();
  const projects = data || [];
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -330 : 330;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="flex items-end justify-between mb-6 sm:mb-8">
        <div className="inline-block">
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-theme-text mb-3">
            Featured <span className="text-gradient">Projects</span>
          </h1>
          <div className="w-16 h-1.5 bg-accent-500 rounded-full"></div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-2 pb-1">
          <button onClick={() => scroll('left')} aria-label="Scroll left" className="p-2 rounded-lg bg-theme-card border border-theme-border text-theme-muted hover:text-accent-500 hover:border-accent-500/50 shadow-sm hover:scale-105 active:scale-95 cursor-pointer">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => scroll('right')} aria-label="Scroll right" className="p-2 rounded-lg bg-theme-card border border-theme-border text-theme-muted hover:text-accent-500 hover:border-accent-500/50 shadow-sm hover:scale-105 active:scale-95 cursor-pointer">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {error && (
        <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-2xl text-red-600 dark:text-red-400">{error}</div>
      )}

      {loading ? (
        <div className="flex flex-nowrap overflow-x-auto gap-5 pb-4 pt-1 scrollbar-hide">
          {[1, 2, 3].map((n) => (
            <div key={n} className="w-[270px] sm:w-[310px] md:w-[330px] shrink-0 bg-theme-card/50 border border-theme-border rounded-2xl overflow-hidden shadow-lg">
              <div className="w-full h-36 sm:h-40 bg-theme-border/50"></div>
              <div className="p-3.5 sm:p-4">
                <div className="h-4 bg-theme-border/50 rounded w-3/4 mb-2.5"></div>
                <div className="space-y-1.5 mb-3">
                  <div className="h-3 bg-theme-border/50 rounded w-full"></div>
                  <div className="h-3 bg-theme-border/50 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="flex flex-nowrap overflow-x-auto gap-5 pb-4 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {projects.map((project) => (
            <div key={project._id} className="w-[270px] sm:w-[310px] md:w-[330px] shrink-0 snap-start flex flex-col">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
