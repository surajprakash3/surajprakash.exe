import { CheckCircle2, Trophy, GitFork, Flame, Layers, Star, Code2, Zap } from 'lucide-react';

const CodingOverview = ({ overview, platforms }) => {
  const totalSolved = overview?.totalSolved || platforms.reduce((acc, p) => acc + (p.stats?.totalSolved || 0), 0) || 750;
  const easy = overview?.difficulty?.easy || platforms.reduce((acc, p) => acc + (p.stats?.easy || 0), 0) || 369;
  const medium = overview?.difficulty?.medium || platforms.reduce((acc, p) => acc + (p.stats?.medium || 0), 0) || 313;
  const hard = overview?.difficulty?.hard || platforms.reduce((acc, p) => acc + (p.stats?.hard || 0), 0) || 68;
  const connectedPlatforms = overview?.connectedPlatforms || platforms.length || 6;
  const repositories = overview?.repositories || 38;
  const contributions = overview?.contributions || 420;
  const highestRating = overview?.highestRating || 1820;
  const dsaCompletion = overview?.dsa?.completionRate || 78;

  return (
    <section id="overview" className="py-8 scroll-mt-20">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-5 h-[2px] bg-cyan-400"></span>
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
          GLOBAL CODING METRICS
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight mb-2">
        Coding Analytics & <span className="text-gradient">Performance</span>
      </h2>
      <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mb-8 leading-relaxed">
        Aggregated, non-duplicated problem solving statistics collected across all verified coding platforms.
      </p>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Total Problems Solved */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#080d19]/95 border border-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.15)] backdrop-blur-xl relative overflow-hidden group hover:-translate-y-1 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shadow-inner">
              <CheckCircle2 size={22} />
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              Aggregated
            </span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-black font-heading text-white tracking-tight">
            {totalSolved}+
          </h3>
          <p className="text-xs font-semibold text-slate-300 mt-1">Total Problems Solved</p>

          {/* Mini Difficulty Progress Bar */}
          <div className="mt-4 pt-3 border-t border-slate-800">
            <div className="flex justify-between text-[11px] font-mono mb-1.5">
              <span className="text-emerald-400">E: {easy}</span>
              <span className="text-amber-400">M: {medium}</span>
              <span className="text-rose-400">H: {hard}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden flex">
              <div style={{ width: `${(easy / totalSolved) * 100}%` }} className="bg-emerald-400" />
              <div style={{ width: `${(medium / totalSolved) * 100}%` }} className="bg-amber-400" />
              <div style={{ width: `${(hard / totalSolved) * 100}%` }} className="bg-rose-500" />
            </div>
          </div>
        </div>

        {/* Card 2: Contest Rating & Rank */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#080d19]/95 border border-purple-500/50 shadow-[0_0_25px_rgba(168,85,247,0.15)] backdrop-blur-xl relative overflow-hidden group hover:-translate-y-1 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center shadow-inner">
              <Trophy size={22} />
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">
              Peak Score
            </span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-black font-heading text-white tracking-tight">
            {highestRating}
          </h3>
          <p className="text-xs font-semibold text-slate-300 mt-1">Highest Contest Rating</p>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>LeetCode: 1680</span>
            <span className="text-purple-400 font-bold">Top 14%</span>
          </div>
        </div>

        {/* Card 3: GitHub Open Source Footprint */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#080d19]/95 border border-blue-500/50 shadow-[0_0_25px_rgba(59,130,246,0.15)] backdrop-blur-xl relative overflow-hidden group hover:-translate-y-1 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-2xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center shadow-inner">
              <GitFork size={22} />
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
              GitHub API
            </span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-black font-heading text-white tracking-tight">
            {contributions}+
          </h3>
          <p className="text-xs font-semibold text-slate-300 mt-1">Commits & Contributions</p>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Repositories: <strong className="text-white">{repositories}</strong></span>
            <span>Stars: <strong className="text-amber-400">24★</strong></span>
          </div>
        </div>

        {/* Card 4: DSA Topic Mastery */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#080d19]/95 border border-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.15)] backdrop-blur-xl relative overflow-hidden group hover:-translate-y-1 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shadow-inner">
              <Layers size={22} />
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              {dsaCompletion}% Mastered
            </span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-black font-heading text-white tracking-tight">
            12 Topics
          </h3>
          <p className="text-xs font-semibold text-slate-300 mt-1">Curated DSA Curriculum</p>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>{connectedPlatforms} Active Hubs</span>
            <span className="text-emerald-400 font-bold">400+ Curated Problems</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CodingOverview;
