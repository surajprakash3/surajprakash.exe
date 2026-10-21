import { GitFork, Star, ExternalLink, Code2, FolderGit2 } from 'lucide-react';

const PINNED_REPOS = [
  {
    name: 'digitalportfolio',
    description: 'Modern, high-performance portfolio & developer analytics platform built with React, Vite, Node.js & MongoDB.',
    language: 'JavaScript',
    langColor: '#F7DF1E',
    stars: 12,
    forks: 4,
    url: 'https://github.com/surajprakash3/digitalportfolio'
  },
  {
    name: 'cloud-native-microservices',
    description: 'Production-ready microservices architecture with Docker, Kubernetes, AWS S3, and API Gateway integration.',
    language: 'TypeScript',
    langColor: '#3178C6',
    stars: 8,
    forks: 2,
    url: 'https://github.com/surajprakash3'
  },
  {
    name: 'dsa-competitive-solutions',
    description: 'Curated repository containing 350+ optimal solutions for LeetCode, Codeforces, and HackerRank in modern C++ and Python.',
    language: 'C++',
    langColor: '#00599C',
    stars: 14,
    forks: 5,
    url: 'https://github.com/surajprakash3'
  }
];

const GitHubOverview = ({ platforms }) => {
  const ghPlatform = platforms.find(p => p.platformKey === 'github');
  const repos = ghPlatform?.stats?.repositories || 38;
  const stars = ghPlatform?.stats?.stars || 24;
  const contributions = ghPlatform?.stats?.contributions || 420;

  return (
    <section id="github" className="py-8 scroll-mt-20">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-5 h-[2px] bg-blue-400"></span>
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400">
          OPEN SOURCE FOOTPRINT
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight mb-2">
        GitHub Repositories & <span className="text-gradient">Contributions</span>
      </h2>
      <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mb-8 leading-relaxed">
        Live repositories, architectural boilerplate, and open source utilities authored by Suraj Prakash.
      </p>

      {/* Pinned Repos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PINNED_REPOS.map((repo) => (
          <div
            key={repo.name}
            className="p-5 sm:p-6 rounded-3xl bg-[#080d19]/95 border border-slate-800 hover:border-cyan-500/50 shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <FolderGit2 size={18} className="text-cyan-400" />
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors font-mono">
                    {repo.name}
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  Public
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
                {repo.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.langColor }} />
                  {repo.language}
                </span>
                <span className="flex items-center gap-1">
                  <Star size={12} className="text-amber-400" />
                  {repo.stars}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork size={12} className="text-slate-500" />
                  {repo.forks}
                </span>
              </div>

              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 p-1"
                aria-label={`View ${repo.name} on GitHub`}
              >
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GitHubOverview;
