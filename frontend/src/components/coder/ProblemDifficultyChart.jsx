import { PieChart, Zap, CheckCircle2, ShieldAlert } from 'lucide-react';

const ProblemDifficultyChart = ({ overview, platforms }) => {
  const easy = overview?.difficulty?.easy || platforms.reduce((acc, p) => acc + (p.stats?.easy || 0), 0) || 369;
  const medium = overview?.difficulty?.medium || platforms.reduce((acc, p) => acc + (p.stats?.medium || 0), 0) || 313;
  const hard = overview?.difficulty?.hard || platforms.reduce((acc, p) => acc + (p.stats?.hard || 0), 0) || 68;
  const total = easy + medium + hard || 750;

  const easyPct = Math.round((easy / total) * 100) || 49;
  const medPct = Math.round((medium / total) * 100) || 42;
  const hardPct = 100 - easyPct - medPct;

  // SVG Donut calculation
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const easyStroke = (easyPct / 100) * circumference;
  const medStroke = (medPct / 100) * circumference;
  const hardStroke = (hardPct / 100) * circumference;

  return (
    <section id="difficulty" className="py-8 scroll-mt-20">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-5 h-[2px] bg-purple-400"></span>
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400">
          COMPLEXITY ANALYSIS
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight mb-2">
        Problem Difficulty <span className="text-gradient">Distribution</span>
      </h2>
      <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mb-8 leading-relaxed">
        Distribution across fundamental, algorithmic, and advanced competitive programming problems.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left: SVG Donut Visual */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#080d19]/95 border border-slate-800 shadow-xl flex flex-col items-center justify-center text-center relative">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 140 140">
              {/* Background Circle */}
              <circle
                cx="70"
                cy="70"
                r={radius}
                className="stroke-slate-800 fill-none"
                strokeWidth="14"
              />
              {/* Easy Arc */}
              <circle
                cx="70"
                cy="70"
                r={radius}
                className="stroke-emerald-400 fill-none transition-all duration-1000"
                strokeWidth="14"
                strokeDasharray={`${easyStroke} ${circumference}`}
                strokeDashoffset={0}
                strokeLinecap="round"
              />
              {/* Medium Arc */}
              <circle
                cx="70"
                cy="70"
                r={radius}
                className="stroke-amber-400 fill-none transition-all duration-1000"
                strokeWidth="14"
                strokeDasharray={`${medStroke} ${circumference}`}
                strokeDashoffset={-easyStroke}
                strokeLinecap="round"
              />
              {/* Hard Arc */}
              <circle
                cx="70"
                cy="70"
                r={radius}
                className="stroke-rose-500 fill-none transition-all duration-1000"
                strokeWidth="14"
                strokeDasharray={`${hardStroke} ${circumference}`}
                strokeDashoffset={-(easyStroke + medStroke)}
                strokeLinecap="round"
              />
            </svg>

            {/* Inner Center Statistics */}
            <div className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none">
              <span className="text-2xl sm:text-3xl font-black font-heading text-white leading-none">
                {total}
              </span>
              <span className="text-[10px] uppercase tracking-wider font-mono text-slate-400 mt-1">
                SOLVED
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-400 font-medium mt-4">
            Aggregated Across Configured Platforms
          </p>
        </div>

        {/* Right: Detailed Breakdown Cards */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Easy Row */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#080d19]/95 border border-emerald-500/30 hover:border-emerald-500/60 transition-all flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-sm">
                E
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Easy Problems</h4>
                <p className="text-xs text-slate-400">Fundamental logic, syntax, strings & arrays</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-black font-heading text-emerald-400">{easy}</span>
              <span className="block text-[10px] font-mono text-slate-400">{easyPct}% of total</span>
            </div>
          </div>

          {/* Medium Row */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#080d19]/95 border border-amber-500/30 hover:border-amber-500/60 transition-all flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold text-sm">
                M
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Medium Problems</h4>
                <p className="text-xs text-slate-400">Two pointers, trees, graphs, backtracking & binary search</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-black font-heading text-amber-400">{medium}</span>
              <span className="block text-[10px] font-mono text-slate-400">{medPct}% of total</span>
            </div>
          </div>

          {/* Hard Row */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#080d19]/95 border border-rose-500/30 hover:border-rose-500/60 transition-all flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center font-bold text-sm">
                H
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Hard Problems</h4>
                <p className="text-xs text-slate-400">Dynamic programming, bitmask, segment trees & graph theory</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-black font-heading text-rose-400">{hard}</span>
              <span className="block text-[10px] font-mono text-slate-400">{hardPct}% of total</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ProblemDifficultyChart;
