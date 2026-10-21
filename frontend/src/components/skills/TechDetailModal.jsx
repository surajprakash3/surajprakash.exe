import { useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, Layers, Workflow, ExternalLink } from 'lucide-react';
import TechIcon from './TechIcon';
import { getTechnologyById } from '../../data/technologiesData';

export const TechDetailModal = ({ tech, isOpen, onClose, onSelectRelated }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !tech) return null;

  // Resolve related technologies
  const relatedList = (tech.relatedTechnologies || [])
    .map(relId => getTechnologyById(relId))
    .filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div
        className="relative w-full max-w-lg bg-theme-card dark:bg-[#0f172a] rounded-3xl border border-theme-border/90 shadow-2xl p-6 sm:p-7 overflow-hidden z-10 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Ambient top glow */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-accent-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-theme-border/60">
          <div className="flex items-center gap-3.5">
            <TechIcon tech={tech} size="lg" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-accent-500/10 text-accent-400 border border-accent-500/20">
                  {tech.category}
                </span>
                {tech.workflowStage && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-slate-100 dark:bg-dark-700 text-theme-muted border border-theme-border">
                    {tech.workflowStage}
                  </span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-theme-text">
                {tech.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-xl bg-theme-bg border border-theme-border text-theme-muted hover:text-theme-text hover:bg-slate-200 dark:hover:bg-dark-700 transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto space-y-5 pt-4 pr-1">
          {/* Purpose / Role */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-theme-muted mb-1.5 flex items-center gap-1.5">
              <Workflow size={13} className="text-accent-500" />
              Purpose & Workflow Role
            </h4>
            <p className="text-sm text-theme-text leading-relaxed bg-theme-bg/60 p-3.5 rounded-xl border border-theme-border/60">
              {tech.purpose}
            </p>
          </div>

          {/* Used For */}
          {tech.usedFor && tech.usedFor.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-theme-muted mb-2 flex items-center gap-1.5">
                <Layers size={13} className="text-accent-500" />
                Where & How I Use It
              </h4>
              <ul className="space-y-2">
                {tech.usedFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-theme-muted leading-relaxed">
                    <CheckCircle2 size={15} className="text-accent-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Technologies in the Architecture */}
          {relatedList.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-theme-muted mb-2 flex items-center gap-1.5">
                <ArrowRight size={13} className="text-accent-500" />
                Connected in Stack Architecture
              </h4>
              <div className="flex flex-wrap gap-2">
                {relatedList.map((relTech) => (
                  <button
                    key={relTech.id}
                    onClick={() => onSelectRelated && onSelectRelated(relTech)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-theme-bg hover:bg-accent-500/10 hover:border-accent-500/40 border border-theme-border text-theme-text hover:text-accent-400 transition cursor-pointer"
                  >
                    <TechIcon tech={relTech} size="xs" />
                    <span>{relTech.name}</span>
                    <span className="text-[10px] text-theme-muted">({relTech.workflowStage})</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 mt-2 border-t border-theme-border/50 flex items-center justify-between">
          <span className="text-[11px] text-theme-muted">
            Part of Suraj Prakash's active engineering toolkit
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-accent-500 hover:bg-accent-600 text-white text-xs font-bold transition shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default TechDetailModal;
