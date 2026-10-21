import { useMemo, useState } from 'react';
import { Calendar, Flame, Zap, Award } from 'lucide-react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Mon', 'Wed', 'Fri'];

const CodingHeatmap = ({ platforms }) => {
  const [hoveredCell, setHoveredCell] = useState(null);

  // Generate deterministic realistic yearly activity matrix
  const { weeks, totalSubmissions, activeDays, currentStreak, longestStreak } = useMemo(() => {
    const weeksArr = [];
    let subs = 0;
    let daysCount = 0;

    // 52 weeks x 7 days
    for (let w = 0; w < 52; w++) {
      const days = [];
      for (let d = 0; d < 7; d++) {
        // Pseudo-random deterministic frequency
        const seed = (w * 7 + d * 13) % 100;
        let count = 0;
        if (seed > 30) count = (seed % 6) + 1;
        if (seed > 85) count = (seed % 12) + 4;

        if (count > 0) {
          subs += count;
          daysCount++;
        }

        days.push({
          week: w,
          day: d,
          count,
          date: `2025/2026 - Day ${w * 7 + d + 1}`
        });
      }
      weeksArr.push(days);
    }

    return {
      weeks: weeksArr,
      totalSubmissions: subs,
      activeDays: daysCount,
      currentStreak: 45,
      longestStreak: 72
    };
  }, []);

  const getColorClass = (count) => {
    if (count === 0) return 'bg-slate-800/60 border-slate-800';
    if (count <= 2) return 'bg-emerald-950/80 border-emerald-800/40 text-emerald-400';
    if (count <= 5) return 'bg-emerald-800/80 border-emerald-600/50 text-emerald-300';
    if (count <= 8) return 'bg-emerald-500 border-emerald-400 text-slate-900';
    return 'bg-cyan-400 border-cyan-300 text-slate-950 shadow-[0_0_8px_#22d3ee]';
  };

  return (
    <section id="heatmap" className="py-8 scroll-mt-20">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-5 h-[2px] bg-emerald-400"></span>
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
          CONSISTENCY HEATMAP
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight mb-2">
        Activity & Submission <span className="text-gradient">Cadence</span>
      </h2>
      <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mb-8 leading-relaxed">
        Algorithmic workouts, platform submissions, and software engineering commits logged over the past 365 days.
      </p>

      {/* Main Heatmap Box */}
      <div className="p-6 rounded-3xl bg-[#080d19]/95 border border-slate-800 shadow-xl overflow-hidden">
        
        {/* Heatmap Metrics Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-xl sm:text-2xl font-black font-heading text-white">
                {totalSubmissions.toLocaleString()}
              </span>
              <span className="block text-[11px] text-slate-400">Total Submissions in 2025-2026</span>
            </div>
            <div className="border-l border-slate-800 pl-6">
              <span className="text-xl sm:text-2xl font-black font-heading text-emerald-400">
                {activeDays}
              </span>
              <span className="block text-[11px] text-slate-400">Active Coding Days</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold font-mono">
              <Flame size={14} />
              Current: {currentStreak} days
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold font-mono">
              <Award size={14} />
              Max: {longestStreak} days
            </div>
          </div>
        </div>

        {/* Heatmap Grid (Scrollable on small screens) */}
        <div className="overflow-x-auto pb-2 scrollbar-hide">
          <div className="min-w-[720px]">
            {/* Month labels */}
            <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-2 pl-8 pr-2">
              {MONTHS.map((m, i) => (
                <span key={i}>{m}</span>
              ))}
            </div>

            {/* Day grid */}
            <div className="flex gap-1.5">
              {/* Day labels on left */}
              <div className="flex flex-col justify-between text-[9px] font-mono text-slate-500 pr-2 pt-0.5">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>

              {/* 52 Weeks */}
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1.5">
                  {week.map((cell, dIdx) => (
                    <div
                      key={dIdx}
                      onMouseEnter={() => setHoveredCell(cell)}
                      onMouseLeave={() => setHoveredCell(null)}
                      className={`w-3 h-3 rounded-[3px] border cursor-pointer transition-all hover:scale-125 ${getColorClass(cell.count)}`}
                      title={`${cell.count} submissions on ${cell.date}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend Row */}
        <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="text-[11px] font-mono">
            {hoveredCell ? (
              <span className="text-cyan-400 font-bold">
                {hoveredCell.count} submissions on {hoveredCell.date}
              </span>
            ) : (
              <span>Hover over any tile to view daily volume</span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono">
            <span>Less</span>
            <span className="w-2.5 h-2.5 rounded-[2px] bg-slate-800/80 border border-slate-700" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-950 border border-emerald-800" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-700 border border-emerald-600" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-400" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
            <span>More</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CodingHeatmap;
