import { useState } from 'react';
import { 
  ArrowDown, ArrowRight, CheckCircle2, Cpu, Globe, 
  Layers, Server, Database, Cloud, GitBranch, Shield, Zap 
} from 'lucide-react';
import TechIcon from './TechIcon';
import { getTechnologyById } from '../../data/technologiesData';

const FLOW_STAGES = [
  {
    step: 1,
    id: 'frontend',
    title: '1. Frontend Client Layer',
    badge: 'User Interface',
    summary: 'Renders reactive, accessible user interfaces in the client browser with state management and client-side routing.',
    icon: Layers,
    color: 'from-cyan-500 to-blue-500',
    borderColor: 'border-cyan-500/30',
    glowColor: 'rgba(6, 182, 212, 0.15)',
    techIds: ['react', 'nextjs', 'tailwindcss', 'javascript', 'html5', 'css3'],
    connectionLabel: 'HTTP REST / JSON Requests',
    outcome: 'Responsive UI, User Event Capture, Client Validation'
  },
  {
    step: 2,
    id: 'backend',
    title: '2. Backend API & Auth Layer',
    badge: 'Server Logic',
    summary: 'Handles business logic, secures endpoints via JWT authentication, validates payloads, and processes requests.',
    icon: Server,
    color: 'from-emerald-500 to-teal-500',
    borderColor: 'border-emerald-500/30',
    glowColor: 'rgba(16, 185, 129, 0.15)',
    techIds: ['nodejs', 'express', 'jwt', 'restapi'],
    connectionLabel: 'Mongoose / MySQL Query Protocol',
    outcome: 'Authenticated Session, Middleware Verification, Business Logic'
  },
  {
    step: 3,
    id: 'database',
    title: '3. Data Persistence Layer',
    badge: 'Data Store',
    summary: 'Stores application state, structured entity relationships, and dynamic user collections with high consistency.',
    icon: Database,
    color: 'from-amber-500 to-orange-500',
    borderColor: 'border-amber-500/30',
    glowColor: 'rgba(245, 158, 11, 0.15)',
    techIds: ['mongodb', 'mysql'],
    connectionLabel: 'Encapsulated inside Private Subnet (VPC)',
    outcome: 'ACID Transactions, Document Aggregations, Data Integrity'
  },
  {
    step: 4,
    id: 'cloud',
    title: '4. Cloud Infrastructure Layer',
    badge: 'AWS Cloud',
    summary: 'Provisions virtual compute instances, object storage buckets, and isolated network perimeters for enterprise reliability.',
    icon: Cloud,
    color: 'from-sky-500 to-indigo-500',
    borderColor: 'border-sky-500/30',
    glowColor: 'rgba(14, 165, 233, 0.15)',
    techIds: ['aws_ec2', 'aws_s3', 'aws_cloudfront', 'aws_vpc', 'aws_iam'],
    connectionLabel: 'Automated Container Deployment',
    outcome: 'Global CDN Delivery, Network Isolation, IAM Security'
  },
  {
    step: 5,
    id: 'devops',
    title: '5. DevOps & CI/CD Pipeline',
    badge: 'Automation',
    summary: 'Containerizes application artifacts, runs automated test suites, and pushes continuous updates with zero downtime.',
    icon: GitBranch,
    color: 'from-violet-500 to-purple-500',
    borderColor: 'border-violet-500/30',
    glowColor: 'rgba(139, 92, 246, 0.15)',
    techIds: ['docker', 'kubernetes', 'git', 'github_actions', 'linux'],
    connectionLabel: 'Live Automated Production Delivery',
    outcome: 'Continuous Integration, Container Self-Healing, Immutable Builds'
  }
];

export const TechArchitectureFlow = ({ onSelectTech, selectedTech }) => {
  const [activeStageId, setActiveStageId] = useState('frontend');

  const activeStage = FLOW_STAGES.find(s => s.id === activeStageId) || FLOW_STAGES[0];

  return (
    <div className="space-y-8">
      {/* Overview Intro Banner */}
      <div className="glass p-5 sm:p-6 rounded-2xl border border-theme-border/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent-500/10 text-accent-500 text-xs font-bold border border-accent-500/20">
            <Zap size={12} />
            End-to-End Engineering Architecture
          </div>
          <h3 className="text-lg sm:text-xl font-bold font-heading text-theme-text">
            How My Technology Stack Connects & Executes
          </h3>
          <p className="text-xs sm:text-sm text-theme-muted max-w-2xl">
            From user interactions in the browser down to cloud infrastructure and container pipelines — select any stage to see its constituent technologies and workflow responsibilities.
          </p>
        </div>

        {/* Quick Stage Indicator Pills */}
        <div className="flex flex-wrap gap-1.5 shrink-0">
          {FLOW_STAGES.map((stage) => {
            const isActive = activeStageId === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageId(stage.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                  isActive
                    ? 'bg-accent-500 text-white border-accent-500 shadow-theme-glow-sm'
                    : 'bg-theme-card/60 text-theme-muted hover:text-theme-text hover:bg-theme-border/50 border-theme-border'
                }`}
              >
                <span>{stage.step}.</span>
                <span>{stage.badge}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Flow Pipeline Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Sequential Pipeline Stages */}
        <div className="lg:col-span-7 space-y-4">
          {FLOW_STAGES.map((stage, idx) => {
            const isActive = activeStageId === stage.id;
            const Icon = stage.icon;
            const isLast = idx === FLOW_STAGES.length - 1;

            return (
              <div key={stage.id} className="relative">
                {/* Stage Box */}
                <div
                  onClick={() => setActiveStageId(stage.id)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-theme-card dark:bg-[#111827] border-accent-500 shadow-theme-glow ring-1 ring-accent-500/50'
                      : 'bg-theme-card/40 dark:bg-dark-800/40 border-theme-border hover:border-accent-500/40 hover:bg-theme-card/70'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stage.color} text-white shadow-sm`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold font-heading text-theme-text">
                          {stage.title}
                        </h4>
                        <span className="text-[10px] font-bold tracking-wider uppercase text-theme-muted">
                          {stage.badge}
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] font-semibold text-accent-500 px-2 py-0.5 rounded-md bg-accent-500/10">
                      {stage.techIds.length} Technologies
                    </span>
                  </div>

                  <p className="text-xs text-theme-muted leading-relaxed mb-3">
                    {stage.summary}
                  </p>

                  {/* Technology Pills inside Stage */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-theme-border/50">
                    {stage.techIds.map((id) => {
                      const tech = getTechnologyById(id);
                      if (!tech) return null;
                      const isSelected = selectedTech && selectedTech.id === tech.id;

                      return (
                        <button
                          key={id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectTech && onSelectTech(tech);
                          }}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                            isSelected
                              ? 'bg-accent-500 text-white border-accent-500 shadow-sm'
                              : 'bg-theme-bg/80 hover:bg-accent-500/10 border-theme-border text-theme-text hover:text-accent-400 hover:border-accent-500/40'
                          }`}
                        >
                          <TechIcon tech={tech} size="xs" />
                          <span>{tech.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Flow Connector Arrow to Next Stage */}
                {!isLast && (
                  <div className="flex items-center justify-center py-2">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-theme-bg/90 border border-theme-border shadow-xs text-[10px] font-bold text-accent-500">
                      <ArrowDown size={11} className="animate-bounce" />
                      <span>{stage.connectionLabel}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Active Stage Architecture Breakdown */}
        <div className="lg:col-span-5 sticky top-20 space-y-4">
          <div className="bg-theme-card/70 dark:bg-dark-800/80 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-theme-border shadow-xl space-y-5">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold tracking-wider uppercase text-accent-500 px-2 py-0.5 rounded bg-accent-500/10 border border-accent-500/20">
                  Stage {activeStage.step} of 5
                </span>
                <span className="text-xs text-theme-muted font-medium">
                  Architecture Role
                </span>
              </div>
              <h4 className="text-lg font-bold font-heading text-theme-text">
                {activeStage.title}
              </h4>
              <p className="text-xs text-theme-muted mt-1 leading-relaxed">
                {activeStage.summary}
              </p>
            </div>

            {/* Outcome Metric */}
            <div className="p-3.5 rounded-2xl bg-theme-bg/80 border border-theme-border/60">
              <span className="text-[10px] font-bold text-theme-muted uppercase tracking-wider block mb-1">
                Architecture Output:
              </span>
              <p className="text-xs font-semibold text-accent-400 flex items-center gap-1.5">
                <CheckCircle2 size={14} className="shrink-0" />
                {activeStage.outcome}
              </p>
            </div>

            {/* Detailed Cards for Techs in this Stage */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-theme-muted mb-2.5">
                Active Technologies in Stage:
              </h5>
              <div className="space-y-2.5">
                {activeStage.techIds.map((id) => {
                  const tech = getTechnologyById(id);
                  if (!tech) return null;

                  return (
                    <div
                      key={id}
                      onClick={() => onSelectTech && onSelectTech(tech)}
                      className="group p-3 rounded-xl bg-theme-bg/60 hover:bg-accent-500/10 border border-theme-border/60 hover:border-accent-500/40 transition cursor-pointer flex items-start gap-3"
                    >
                      <TechIcon tech={tech} size="sm" className="mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-theme-text group-hover:text-accent-400 transition-colors">
                            {tech.name}
                          </span>
                          <span className="text-[10px] text-accent-500 font-semibold group-hover:underline">
                            Inspect →
                          </span>
                        </div>
                        <p className="text-[11px] text-theme-muted line-clamp-2 mt-0.5 leading-snug">
                          {tech.purpose}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hint */}
            <div className="pt-2 border-t border-theme-border/40 text-center">
              <span className="text-[11px] text-theme-muted">
                💡 Click any technology to view where & why it's used in production.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechArchitectureFlow;
