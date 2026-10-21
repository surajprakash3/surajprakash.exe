import { Terminal, Code2, Sparkles, Flame, Trophy, ExternalLink, ArrowDown } from 'lucide-react';

const CoderHero = ({ overview, platforms }) => {
  const totalSolved = overview?.totalSolved || 342;
  const leetcode = platforms.find(p => p.platformKey === 'leetcode');
  const streak = leetcode?.stats?.streak || 45;

  return (
    <div className="relative pt-6 pb-12 sm:pb-16 overflow-hidden">
      {/* Background ambient neon glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-purple-500/15 via-cyan-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Top Terminal Tag & Status Pill */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono text-cyan-400 shadow-inner">
          <Terminal size={14} className="text-cyan-400" />
          <span>suraj@alphatech:~$ ./coder-telemetry --live</span>
          <span className="w-1.5 h-3 bg-cyan-400 animate-pulse ml-0.5" />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Live Sync Active
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Flame size={13} className="text-amber-400" />
            {streak} Day Streak
          </div>
        </div>
      </div>

      {/* Main Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Heading & Mission */}
        <div className="lg:col-span-7">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading text-white tracking-tight leading-[1.1] mb-4">
            Algorithms, Architecture & <span className="text-gradient">Code Craft</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mb-8">
            A dedicated live analytics dashboard tracking my algorithmic problem-solving journey, competitive programming ratings, data structure mastery, and open-source software contributions.
          </p>

          {/* Quick Platform Badges / Jump anchors */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-bold text-slate-500 mr-1 uppercase tracking-wider font-mono">
              Connected Hubs:
            </span>
            {platforms.slice(0, 5).map((p) => (
              <a
                key={p._id || p.platformKey}
                href={p.profileUrl || '#platforms'}
                target={p.profileUrl ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50 hover:shadow-cyan-500/10 transition-all"
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color || '#38bdf8' }} />
                {p.name}
                {p.profileUrl && <ExternalLink size={11} className="text-slate-500" />}
              </a>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Terminal Preview Box */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl bg-[#070c18]/95 border border-slate-800 shadow-2xl p-5 relative overflow-hidden backdrop-blur-xl">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-[11px] font-mono text-slate-400 ml-2">platform-metrics.json</span>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 font-bold">200 OK</span>
            </div>

            {/* Code / JSON Stats Snippet */}
            <pre className="font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto select-none">
              <code>
                <span className="text-purple-400">&#123;</span><br />
                &nbsp;&nbsp;<span className="text-cyan-400">"engineer"</span>: <span className="text-amber-300">"Suraj Prakash"</span>,<br />
                &nbsp;&nbsp;<span className="text-cyan-400">"totalProblemsSolved"</span>: <span className="text-emerald-400 font-bold">{totalSolved}</span>,<br />
                &nbsp;&nbsp;<span className="text-cyan-400">"primaryLanguages"</span>: <span className="text-slate-400">[</span><span className="text-amber-300">"C++"</span>, <span className="text-amber-300">"Python"</span>, <span className="text-amber-300">"JS"</span><span className="text-slate-400">]</span>,<br />
                &nbsp;&nbsp;<span className="text-cyan-400">"contestRating"</span>: <span className="text-purple-400 font-bold">1680</span>,<br />
                &nbsp;&nbsp;<span className="text-cyan-400">"dsaFocus"</span>: <span className="text-amber-300">"Graphs, DP, Trees"</span>,<br />
                &nbsp;&nbsp;<span className="text-cyan-400">"openSourceContributions"</span>: <span className="text-emerald-400">420+</span><br />
                <span className="text-purple-400">&#125;</span>
              </code>
            </pre>

            {/* Bottom Quick Action */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-mono text-[11px]">Synced with MongoDB</span>
              <a 
                href="#overview" 
                className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 group"
              >
                Inspect Telemetry
                <ArrowDown size={13} className="group-hover:translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CoderHero;
