import { Code2, Terminal, Cpu } from 'lucide-react';

const LANGUAGES = [
  { name: 'C++', percentage: 38, problems: 285, color: '#00599C', badge: 'DSA & Contests' },
  { name: 'JavaScript / Node', percentage: 28, problems: 210, color: '#F7DF1E', badge: 'Web & Microservices' },
  { name: 'Python', percentage: 20, problems: 150, color: '#3776AB', badge: 'Algorithms & Automation' },
  { name: 'TypeScript', percentage: 9, problems: 68, color: '#3178C6', badge: 'Typed Systems' },
  { name: 'SQL', percentage: 5, problems: 37, color: '#CC292B', badge: 'Data Querying' }
];

const LanguageStats = () => {
  return (
    <section id="languages" className="py-8 scroll-mt-20">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-5 h-[2px] bg-amber-400"></span>
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
          SYNTAX & PARADIGMS
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight mb-2">
        Programming Languages & <span className="text-gradient">Usage</span>
      </h2>
      <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mb-8 leading-relaxed">
        Breakdown of languages utilized in algorithmic problem solving, competitive contests, and software development.
      </p>

      {/* Main Multi-Color Stack Bar */}
      <div className="p-6 rounded-3xl bg-[#080d19]/95 border border-slate-800 shadow-xl mb-6">
        <div className="w-full h-4 rounded-full bg-slate-800 overflow-hidden flex shadow-inner mb-6">
          {LANGUAGES.map((lang) => (
            <div
              key={lang.name}
              style={{
                width: `${lang.percentage}%`,
                backgroundColor: lang.color
              }}
              className="h-full transition-all hover:brightness-125 cursor-pointer"
              title={`${lang.name}: ${lang.percentage}% (${lang.problems} problems)`}
            />
          ))}
        </div>

        {/* Detailed Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {LANGUAGES.map((lang) => (
            <div
              key={lang.name}
              className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800/80 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: lang.color }}
                  />
                  <h4 className="text-xs font-bold text-white">{lang.name}</h4>
                </div>
                <span className="text-xs font-mono font-black text-cyan-400">{lang.percentage}%</span>
              </div>

              <div className="text-[11px] text-slate-400 font-mono flex items-center justify-between">
                <span>{lang.problems} Solved</span>
                <span className="text-[10px] text-slate-500">{lang.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LanguageStats;
