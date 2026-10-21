import { useState, useMemo } from 'react';
import { Layers, CheckCircle2, Clock, Search, BookOpen, Star, Sparkles } from 'lucide-react';

const DSAProgress = ({ dsaTopics }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const topics = Array.isArray(dsaTopics) && dsaTopics.length > 0 ? dsaTopics : [];

  const filtered = useMemo(() => {
    return topics.filter(t => {
      const matchFilter = selectedFilter === 'All' || t.status === selectedFilter;
      const matchSearch = !searchQuery.trim() || 
        t.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.category || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [topics, selectedFilter, searchQuery]);

  const totalQuestions = topics.reduce((acc, t) => acc + (t.totalQuestions || 0), 0);
  const solvedQuestions = topics.reduce((acc, t) => acc + (t.solvedQuestions || 0), 0);
  const overallPercentage = totalQuestions > 0 ? Math.round((solvedQuestions / totalQuestions) * 100) : 0;

  return (
    <section id="dsa" className="py-8 scroll-mt-20">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-5 h-[2px] bg-cyan-400"></span>
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
          CURRICULUM MASTERY
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight mb-2">
        Data Structures & <span className="text-gradient">Algorithms Progress</span>
      </h2>
      <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mb-6 leading-relaxed">
        Structured tracking across fundamental, algorithmic, and advanced paradigms with difficulty breakdown and revision notes.
      </p>

      {/* Top Aggregation Banner */}
      <div className="p-5 rounded-3xl bg-[#080d19]/95 border border-slate-800 shadow-xl mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl font-black font-heading text-white">
              {solvedQuestions} / {totalQuestions}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              {overallPercentage}% Completed
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Curated problem sets across {topics.length} key categories</p>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full md:w-80">
          <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden shadow-inner">
            <div 
              style={{ width: `${overallPercentage}%` }} 
              className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-400 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {['All', 'Mastered', 'In Progress'].map(st => (
            <button
              key={st}
              onClick={() => setSelectedFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedFilter === st
                  ? 'bg-cyan-500 text-slate-950 font-black shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                  : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
          <input
            type="text"
            placeholder="Search topic or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(t => {
          const pct = t.totalQuestions > 0 ? Math.round((t.solvedQuestions / t.totalQuestions) * 100) : 0;
          const isMastered = t.status === 'Mastered';

          return (
            <div
              key={t._id || t.topic}
              className={`p-4 sm:p-5 rounded-2xl bg-[#080d19]/95 border transition-all duration-200 flex flex-col justify-between ${
                isMastered 
                  ? 'border-emerald-500/40 hover:border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Header: Title + Status Pill */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      {t.category || 'Topic'}
                    </span>
                    <h3 className="text-sm font-bold text-white leading-snug">
                      {t.topic}
                    </h3>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold shrink-0 ${
                    isMastered 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                  }`}>
                    {t.status}
                  </span>
                </div>

                {/* Question Counts & Progress */}
                <div className="flex items-center justify-between text-xs text-slate-400 mt-3 mb-1.5">
                  <span>Solved: <strong className="text-white">{t.solvedQuestions}</strong> / {t.totalQuestions}</span>
                  <span className="font-mono text-cyan-400 font-bold">{pct}%</span>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mb-3">
                  <div
                    style={{ width: `${pct}%` }}
                    className={`h-full rounded-full ${
                      isMastered ? 'bg-emerald-400' : 'bg-gradient-to-r from-cyan-400 to-blue-500'
                    }`}
                  />
                </div>
              </div>

              {/* Bottom Difficulty Pills */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="text-emerald-400">E: {t.easy || 0}</span>
                <span className="text-amber-400">M: {t.medium || 0}</span>
                <span className="text-rose-400">H: {t.hard || 0}</span>
                <span className="text-slate-500">★ {t.confidence || 80}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DSAProgress;
