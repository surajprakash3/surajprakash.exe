import { ChevronRight, ArrowUpRight } from 'lucide-react';
import TechIcon from './TechIcon';

export const TechCard = ({ tech, onSelect, isSelected = false, isRelated = false }) => {
  if (!tech) return null;

  return (
    <div
      onClick={() => onSelect && onSelect(tech)}
      className={`group relative flex flex-col justify-between p-4 rounded-2xl cursor-pointer transition-all duration-200 border text-left ${
        isSelected
          ? 'bg-accent-500/10 border-accent-500 shadow-theme-glow ring-1 ring-accent-500'
          : isRelated
          ? 'bg-accent-500/5 border-accent-400/50 shadow-sm'
          : 'bg-theme-card/60 dark:bg-dark-800/60 backdrop-blur-md border-theme-border/80 hover:border-accent-500/60 hover:shadow-theme-glow-sm hover:-translate-y-0.5'
      }`}
    >
      {/* Top row: Icon + Name + Badge */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-3 min-w-0">
            <TechIcon tech={tech} size="md" />
            <div className="min-w-0">
              <h4 className="text-sm sm:text-base font-bold font-heading text-theme-text group-hover:text-accent-400 transition-colors truncate">
                {tech.name}
              </h4>
              {tech.workflowRole && (
                <span className="text-[10px] font-medium text-theme-muted uppercase tracking-wider line-clamp-1">
                  {tech.workflowStage || 'tool'}
                </span>
              )}
            </div>
          </div>

          <div className="p-1 rounded-lg text-theme-muted group-hover:text-accent-400 group-hover:bg-accent-500/10 transition-colors shrink-0">
            <ArrowUpRight size={15} />
          </div>
        </div>

        {/* Purpose / Role in workflow */}
        <p className="text-xs text-theme-muted line-clamp-2 leading-relaxed mb-3">
          {tech.purpose}
        </p>
      </div>

      {/* Bottom row: Related count + Quick explore prompt */}
      <div className="pt-2 border-t border-theme-border/50 flex items-center justify-between text-[11px]">
        {tech.relatedTechnologies && tech.relatedTechnologies.length > 0 ? (
          <span className="text-theme-muted font-medium">
            <span className="text-accent-500 font-semibold">{tech.relatedTechnologies.length}</span> connected {tech.relatedTechnologies.length === 1 ? 'tool' : 'tools'}
          </span>
        ) : (
          <span className="text-theme-muted/60">Standalone</span>
        )}

        <span className="inline-flex items-center text-accent-500 font-semibold group-hover:translate-x-0.5 transition-transform">
          Details <ChevronRight size={12} className="ml-0.5" />
        </span>
      </div>
    </div>
  );
};

export default TechCard;
