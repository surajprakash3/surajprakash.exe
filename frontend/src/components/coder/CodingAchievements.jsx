import { Award, Trophy, Flame, Star, Sparkles, ExternalLink } from 'lucide-react';

const DEFAULT_ACHIEVEMENTS = [
  {
    _id: 'ach-1',
    title: '50 Days Coding Streak',
    platform: 'LeetCode',
    date: '2025 - 2026',
    description: 'Maintained continuous daily algorithmic workout streak on LeetCode.',
    icon: Flame,
    color: '#FFA116'
  },
  {
    _id: 'ach-2',
    title: '5★ Problem Solving Badge',
    platform: 'HackerRank',
    date: '2024',
    description: 'Gold level problem solving badge across data structures and algorithmic challenges.',
    icon: Star,
    color: '#00EA64'
  },
  {
    _id: 'ach-3',
    title: 'Top 15% Global Rating',
    platform: 'LeetCode',
    date: '2025',
    description: 'Ranked in the top 15% percentile worldwide in biweekly programming contests.',
    icon: Trophy,
    color: '#a855f7'
  },
  {
    _id: 'ach-4',
    title: 'Open Source Contributor',
    platform: 'GitHub',
    date: '2025 - 2026',
    description: '400+ contributions and open source projects spanning full-stack, cloud, and developer utilities.',
    icon: Sparkles,
    color: '#38bdf8'
  }
];

const CodingAchievements = ({ achievements = [] }) => {
  const list = achievements.length > 0 ? achievements : DEFAULT_ACHIEVEMENTS;

  return (
    <section id="achievements" className="py-8 scroll-mt-20">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-5 h-[2px] bg-purple-400"></span>
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400">
          RECOGNITION & BADGES
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight mb-2">
        Milestones & <span className="text-gradient">Badges</span>
      </h2>
      <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mb-8 leading-relaxed">
        Key programming contest recognitions, problem-solving streaks, and verified developer badges.
      </p>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {list.map((item) => {
          const Icon = item.icon || Award;
          const color = item.color || '#38bdf8';

          return (
            <div
              key={item._id || item.title}
              className="p-5 rounded-3xl bg-[#080d19]/95 border border-slate-800 hover:border-slate-700 shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center border shadow-inner"
                    style={{
                      backgroundColor: `${color}18`,
                      borderColor: `${color}40`,
                      color: color
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                    {item.platform}
                  </span>
                </div>

                <h3 className="text-sm font-bold font-heading text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 mt-4 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>{item.date || 'Verified'}</span>
                <span className="text-emerald-400 font-bold">✓ Verified</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CodingAchievements;
