import { useState, useMemo } from 'react';
import { useCoder } from '../hooks/useCoder';
import CoderHero from '../components/coder/CoderHero';
import CodingOverview from '../components/coder/CodingOverview';
import PlatformCard from '../components/coder/PlatformCard';
import ProblemDifficultyChart from '../components/coder/ProblemDifficultyChart';
import CodingHeatmap from '../components/coder/CodingHeatmap';
import DSAProgress from '../components/coder/DSAProgress';
import LanguageStats from '../components/coder/LanguageStats';
import GitHubOverview from '../components/coder/GitHubOverview';
import CodingAchievements from '../components/coder/CodingAchievements';
import SEO from '../components/SEO';
import { Terminal, Search, Plus, Filter, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';

const Coder = () => {
  const { platforms, overview, dsaTopics, settings, achievements, loading } = useCoder();
  const [platformSearch, setPlatformSearch] = useState('');

  // Filtered platforms
  const filteredPlatforms = useMemo(() => {
    return platforms.filter(p => {
      if (!platformSearch.trim()) return true;
      return (
        p.name.toLowerCase().includes(platformSearch.toLowerCase()) ||
        (p.username || '').toLowerCase().includes(platformSearch.toLowerCase())
      );
    });
  }, [platforms, platformSearch]);

  // Section visibility and ordering map from Settings (or default)
  const sectionsConfig = useMemo(() => {
    if (settings?.sections && Array.isArray(settings.sections) && settings.sections.length > 0) {
      return [...settings.sections].sort((a, b) => (a.order || 0) - (b.order || 0));
    }
    return [
      { id: 'overview', enabled: true },
      { id: 'platforms', enabled: true },
      { id: 'difficulty', enabled: true },
      { id: 'heatmap', enabled: true },
      { id: 'dsa', enabled: true },
      { id: 'languages', enabled: true },
      { id: 'github', enabled: true },
      { id: 'achievements', enabled: true }
    ];
  }, [settings]);

  const isSectionEnabled = (id) => {
    const s = sectionsConfig.find(item => item.id === id);
    return s ? s.enabled !== false : true;
  };

  return (
    <>
      <SEO 
        title="Coder Telemetry & Analytics" 
        description="Live coding platform statistics, algorithmic problem solving breakdown, DSA mastery, and GitHub activity for Suraj Prakash." 
        url="/coder" 
      />

      <div className="min-h-screen bg-[#050811] text-slate-100 selection:bg-cyan-500 selection:text-black">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          
          {/* Coder Hero */}
          <CoderHero overview={overview} platforms={platforms} />

          {/* Section: Overview (KPIs) */}
          {isSectionEnabled('overview') && (
            <CodingOverview overview={overview} platforms={platforms} />
          )}

          {/* Section: Platforms Grid */}
          {isSectionEnabled('platforms') && (
            <section id="platforms" className="py-8 scroll-mt-20">
              <div className="flex items-center justify-between gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-[2px] bg-cyan-400"></span>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
                    CONNECTED HUBS ({filteredPlatforms.length})
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight">
                    Coding Platforms & <span className="text-gradient">Profiles</span>
                  </h2>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    Live synced statistics and verified profiles across major programming ecosystems.
                  </p>
                </div>

                {/* Instant Search Bar */}
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                  <input
                    type="text"
                    placeholder="Search platforms..."
                    value={platformSearch}
                    onChange={(e) => setPlatformSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Platforms Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredPlatforms.map((platform) => (
                  <PlatformCard key={platform._id || platform.platformKey} platform={platform} />
                ))}
              </div>
            </section>
          )}

          {/* Section: Difficulty Breakdown */}
          {isSectionEnabled('difficulty') && (
            <ProblemDifficultyChart overview={overview} platforms={platforms} />
          )}

          {/* Section: Activity Heatmap */}
          {isSectionEnabled('heatmap') && (
            <CodingHeatmap platforms={platforms} />
          )}

          {/* Section: DSA Mastery Tracker */}
          {isSectionEnabled('dsa') && (
            <DSAProgress dsaTopics={dsaTopics} />
          )}

          {/* Section: Languages Breakdown */}
          {isSectionEnabled('languages') && (
            <LanguageStats />
          )}

          {/* Section: GitHub Repositories */}
          {isSectionEnabled('github') && (
            <GitHubOverview platforms={platforms} />
          )}

          {/* Section: Achievements & Milestones */}
          {isSectionEnabled('achievements') && (
            <CodingAchievements achievements={achievements} />
          )}

        </div>
      </div>
    </>
  );
};

export default Coder;
