import { ExternalLink, CheckCircle, Clock, RefreshCw, Flame, Star, Trophy, GitFork } from 'lucide-react';

const PlatformCard = ({ platform }) => {
  const {
    name,
    username,
    profileUrl,
    color,
    source,
    stats = {},
    lastSyncedAt,
    syncStatus
  } = platform;

  const isGitHub = platform.platformKey === 'github';
  const isCodeforces = platform.platformKey === 'codeforces';

  // Format sync date
  const syncDate = lastSyncedAt 
    ? new Date(lastSyncedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    : 'Recent';

  return (
    <div 
      className="relative p-5 sm:p-6 rounded-3xl bg-[#080d19]/95 border border-slate-800 hover:border-slate-700/80 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-lg"
      style={{
        boxShadow: `0 0 25px ${color}12`
      }}
    >
      {/* Top Header Row */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            {/* Platform Accent Orb / Logo */}
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white text-base shadow-inner border"
              style={{
                backgroundColor: `${color}18`,
                borderColor: `${color}40`,
                color: color || '#38bdf8'
              }}
            >
              {name.substring(0, 2).toUpperCase()}
            </div>

            <div>
              <h3 className="text-base font-bold font-heading text-white group-hover:text-cyan-300 transition-colors">
                {name}
              </h3>
              <p className="text-xs font-mono text-slate-400">
                @{username || 'surajprakash'}
              </p>
            </div>
          </div>

          {/* Sync Source Pill */}
          <span 
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border"
            style={{
              backgroundColor: source === 'api' ? 'rgba(6,182,212,0.1)' : 'rgba(148,163,184,0.1)',
              borderColor: source === 'api' ? 'rgba(6,182,212,0.3)' : 'rgba(148,163,184,0.2)',
              color: source === 'api' ? '#22d3ee' : '#94a3b8'
            }}
          >
            {source === 'api' ? (
              <>
                <CheckCircle size={10} className="text-cyan-400" />
                API Synced
              </>
            ) : (
              <>
                <CheckCircle size={10} className="text-slate-400" />
                Verified
              </>
            )}
          </span>
        </div>

        {/* Platform Specific Metrics Grid */}
        <div className="my-4">
          {/* GitHub Metrics */}
          {isGitHub ? (
            <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-2xl bg-slate-900/50 border border-slate-800/80 text-center">
              <div>
                <p className="text-base font-black font-heading text-white">{stats.repositories || 38}</p>
                <p className="text-[10px] text-slate-400 font-medium">Repositories</p>
              </div>
              <div className="border-x border-slate-800">
                <p className="text-base font-black font-heading text-cyan-400">{stats.contributions || 420}+</p>
                <p className="text-[10px] text-slate-400 font-medium">Contributions</p>
              </div>
              <div>
                <p className="text-base font-black font-heading text-amber-400">{stats.stars || 24}★</p>
                <p className="text-[10px] text-slate-400 font-medium">Stars</p>
              </div>
            </div>
          ) : isCodeforces ? (
            /* Codeforces Metrics */
            <div className="grid grid-cols-2 gap-2 py-3 px-3.5 rounded-2xl bg-slate-900/50 border border-slate-800/80 text-center">
              <div>
                <p className="text-base font-black font-heading text-blue-400">{stats.rating || 1240}</p>
                <p className="text-[10px] text-slate-400 font-medium">Contest Rating</p>
              </div>
              <div className="border-l border-slate-800">
                <p className="text-base font-black font-heading text-purple-400">{stats.globalRank || 'Pupil'}</p>
                <p className="text-[10px] text-slate-400 font-medium">Rank Division</p>
              </div>
            </div>
          ) : (
            /* Problem Solving Platforms (LeetCode, HackerRank, GFG, CodeChef) */
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-xs text-slate-400 font-medium">Solved Problems</span>
                <span className="text-xl font-black font-heading text-white">
                  {stats.totalSolved || 0}
                </span>
              </div>

              {/* Easy / Med / Hard Pills */}
              {(stats.easy !== undefined || stats.medium !== undefined || stats.hard !== undefined) && (
                <div className="grid grid-cols-3 gap-1.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 text-center text-[10px] font-mono">
                  <div className="py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <span className="block font-bold">{stats.easy || 0}</span>
                    <span className="text-[9px] opacity-75">Easy</span>
                  </div>
                  <div className="py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <span className="block font-bold">{stats.medium || 0}</span>
                    <span className="text-[9px] opacity-75">Medium</span>
                  </div>
                  <div className="py-1 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    <span className="block font-bold">{stats.hard || 0}</span>
                    <span className="text-[9px] opacity-75">Hard</span>
                  </div>
                </div>
              )}

              {/* Extra Rating / Rank row */}
              {(stats.rating || stats.globalRank) && (
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2.5 px-1">
                  {stats.rating && <span>Rating: <strong className="text-white">{stats.rating}</strong></span>}
                  {stats.globalRank && <span className="text-cyan-400 font-bold">{stats.globalRank}</span>}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action & Sync Timestamp */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
          <Clock size={11} />
          <span>Synced: {syncDate}</span>
        </div>

        {profileUrl && (
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            View Profile
            <ExternalLink size={12} />
          </a>
        )}
      </div>
    </div>
  );
};

export default PlatformCard;
