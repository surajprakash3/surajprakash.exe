import { useState, useMemo } from 'react';
import { 
  Award, ExternalLink, Calendar, Search, LayoutGrid, 
  Cloud, Code2, Settings, Globe, TrendingUp, Quote, BookOpen, 
  ArrowUpRight, ShieldCheck, Trophy, BarChart3, Crown, X
} from 'lucide-react';
import { useCertifications } from '../hooks/useCertifications';
import { getImageUrl } from '../utils/imageUtils';
import SEO from '../components/SEO';

// Fallback & reference certifications matching the reference screenshot exactly
const REFERENCE_CERTS = [
  {
    _id: 'ref-aws-01',
    name: 'AWS Academy Graduate – Cloud Architecting',
    issuer: 'Amazon Web Services (AWS Academy)',
    issueDate: 'Jan 2026',
    category: 'Cloud',
    featured: true,
    credentialUrl: 'https://www.credly.com/organizations/amazon-web-services/badges',
    brand: 'aws',
    accentColor: 'indigo'
  },
  {
    _id: 'ref-oracle-02',
    name: 'Oracle Cloud Infrastructure 2025 Certified Foundations',
    issuer: 'Oracle University',
    issueDate: 'Oct 2025',
    category: 'Cloud',
    featured: false,
    credentialUrl: 'https://catalog-education.oracle.com/',
    brand: 'oracle',
    accentColor: 'cyan'
  },
  {
    _id: 'ref-azure-03',
    name: 'Microsoft Certified Azure Fundamentals',
    issuer: 'Microsoft',
    issueDate: 'Aug 2024',
    category: 'Cloud',
    featured: false,
    credentialUrl: 'https://learn.microsoft.com/en-us/credentials/',
    brand: 'microsoft',
    accentColor: 'cyan'
  },
  {
    _id: 'ref-python-04',
    name: 'Python (Basic) Certification',
    issuer: 'HackerRank',
    issueDate: 'Feb 2024',
    category: 'Programming',
    featured: false,
    credentialUrl: 'https://www.hackerrank.com/certificates/',
    brand: 'hackerrank',
    accentColor: 'teal'
  },
  {
    _id: 'ref-fcc-05',
    name: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    issueDate: 'Nov 2023',
    category: 'Web Development',
    featured: false,
    credentialUrl: 'https://www.freecodecamp.org/certification/',
    brand: 'freecodecamp',
    accentColor: 'purple'
  },
  {
    _id: 'ref-git-06',
    name: 'Version Control with Git',
    issuer: 'Coursera',
    issueDate: 'Dec 2023',
    category: 'DevOps',
    featured: false,
    credentialUrl: 'https://www.coursera.org/',
    brand: 'coursera',
    accentColor: 'amber'
  }
];

// Authentic Certificate Card Mockup matching the visual screenshots
const CertificateMockup = ({ cert }) => {
  const brand = (cert.brand || cert.issuer || '').toLowerCase();
  
  if (brand.includes('aws') || brand.includes('amazon')) {
    return (
      <div className="w-full h-36 sm:h-40 bg-white rounded-xl p-3.5 relative overflow-hidden flex flex-col justify-between shadow-inner select-none border border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[#FF9900] font-black text-xs tracking-tighter">aws</span>
            <span className="text-slate-600 text-[10px] font-semibold">academy</span>
          </div>
          <div className="w-12 h-12 -mr-4 -mt-4 bg-gradient-to-bl from-purple-700 via-indigo-600 to-transparent opacity-80 rotate-12" />
        </div>
        <div className="my-auto text-left">
          <p className="text-[11px] font-bold text-slate-800 leading-tight">AWS Academy Graduate</p>
          <p className="text-[9px] text-slate-500">AWS Academy Cloud Architecting</p>
          <p className="text-[10px] font-bold text-slate-900 mt-1">Suraj Prakash</p>
        </div>
        <div className="flex items-end justify-between pt-1 border-t border-slate-100">
          <span className="text-[8px] font-serif text-slate-400 italic">Verified Graduate</span>
          <span className="text-[#FF9900] font-black text-xs">aws</span>
        </div>
      </div>
    );
  }

  if (brand.includes('oracle')) {
    return (
      <div className="w-full h-36 sm:h-40 bg-white rounded-xl p-3.5 relative overflow-hidden flex flex-col justify-between shadow-inner select-none border border-slate-200">
        <div className="flex items-center justify-between">
          <span className="text-[#C74634] font-black text-xs tracking-wider">ORACLE</span>
          <span className="text-[9px] font-mono text-slate-400">OCI-2025</span>
        </div>
        <div className="my-auto text-left">
          <p className="text-[10px] font-bold text-slate-800 leading-tight">Oracle Cloud Infrastructure</p>
          <p className="text-[9px] text-slate-600">2025 Certified Foundations Associate</p>
          <p className="text-[10px] font-bold text-slate-900 mt-1">Suraj Prakash</p>
        </div>
        <div className="flex items-end justify-between pt-1 border-t border-slate-100">
          <span className="text-[8px] text-slate-400">Oracle University</span>
          <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-600 flex items-center justify-center text-[8px] font-bold text-amber-700">★</div>
        </div>
      </div>
    );
  }

  if (brand.includes('microsoft') || brand.includes('azure')) {
    return (
      <div className="w-full h-36 sm:h-40 bg-white rounded-xl p-3.5 relative overflow-hidden flex flex-col justify-between shadow-inner select-none border border-slate-200">
        <div className="flex items-center gap-1.5">
          <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
            <span className="bg-[#f25022]"></span>
            <span className="bg-[#7fba00]"></span>
            <span className="bg-[#00a4ef]"></span>
            <span className="bg-[#ffb900]"></span>
          </div>
          <span className="text-slate-800 font-bold text-[10px]">Microsoft</span>
        </div>
        <div className="my-auto text-left">
          <p className="text-[10px] font-bold text-slate-800 leading-tight">Microsoft Certified</p>
          <p className="text-[9px] text-slate-600">Azure Fundamentals</p>
          <p className="text-[10px] font-bold text-slate-900 mt-1">Suraj Prakash</p>
        </div>
        <div className="flex items-end justify-between pt-1 border-t border-slate-100">
          <span className="text-[8px] text-slate-400">Issued by Microsoft</span>
          <div className="w-6 h-7 bg-[#0078d4] text-white flex items-center justify-center text-[8px] font-bold rounded-sm shadow-sm">Az</div>
        </div>
      </div>
    );
  }

  if (brand.includes('hackerrank') || brand.includes('python')) {
    return (
      <div className="w-full h-36 sm:h-40 bg-white rounded-xl p-3.5 relative overflow-hidden flex flex-col justify-between shadow-inner select-none border border-slate-200">
        <div className="flex items-center gap-1.5">
          <span className="text-[#00EA64] bg-[#001E00] px-1.5 py-0.5 rounded text-[9px] font-mono font-bold">H</span>
          <span className="text-slate-800 font-bold text-[10px]">HackerRank</span>
        </div>
        <div className="my-auto text-left">
          <p className="text-[10px] font-bold text-slate-800 leading-tight">Python (Basic) Certificate</p>
          <p className="text-[9px] text-slate-500">Problem Solving & Syntax</p>
          <p className="text-[10px] font-bold text-slate-900 mt-1">Suraj Prakash</p>
        </div>
        <div className="flex items-end justify-between pt-1 border-t border-slate-100">
          <span className="text-[8px] text-slate-400">Verified Skills</span>
          <div className="w-6 h-6 rounded-full bg-[#00EA64]/20 border border-[#00EA64] flex items-center justify-center text-[8px] text-emerald-800 font-bold">✓</div>
        </div>
      </div>
    );
  }

  if (brand.includes('freecodecamp')) {
    return (
      <div className="w-full h-36 sm:h-40 bg-white rounded-xl p-3.5 relative overflow-hidden flex flex-col justify-between shadow-inner select-none border border-slate-200">
        <div className="flex items-center gap-1">
          <span className="text-[#0a0a23] font-bold text-xs tracking-tight">freeCodeCamp(🔥)</span>
        </div>
        <div className="my-auto text-left">
          <p className="text-[10px] font-bold text-slate-800 leading-tight">Responsive Web Design</p>
          <p className="text-[9px] text-slate-500">Developer Certification (300 hours)</p>
          <p className="text-[10px] font-bold text-slate-900 mt-1">Suraj Prakash</p>
        </div>
        <div className="flex items-end justify-between pt-1 border-t border-slate-100">
          <span className="text-[8px] text-slate-400">Verified Certification</span>
          <div className="w-6 h-6 rounded-full border border-dashed border-slate-400 flex items-center justify-center text-[8px] text-slate-700">★</div>
        </div>
      </div>
    );
  }

  // Default Coursera / Generic
  return (
    <div className="w-full h-36 sm:h-40 bg-white rounded-xl p-3.5 relative overflow-hidden flex flex-col justify-between shadow-inner select-none border border-slate-200">
      <div className="flex items-center justify-between">
        <span className="text-[#0056D2] font-black text-xs tracking-wide">coursera</span>
        <span className="text-[9px] font-mono text-slate-400">Verified</span>
      </div>
      <div className="my-auto text-left">
        <p className="text-[10px] font-bold text-slate-800 leading-tight line-clamp-1">{cert.name}</p>
        <p className="text-[9px] text-slate-500">{cert.issuer}</p>
        <p className="text-[10px] font-bold text-slate-900 mt-1">Suraj Prakash</p>
      </div>
      <div className="flex items-end justify-between pt-1 border-t border-slate-100">
        <span className="text-[8px] text-slate-400">Course Certificate</span>
        <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[8px] text-blue-700 font-bold">✓</div>
      </div>
    </div>
  );
};

// Category Badge Pill
const CategoryBadge = ({ category }) => {
  const cat = (category || 'Other').toLowerCase();
  
  if (cat.includes('cloud')) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
        <Cloud size={12} />
        Cloud
      </span>
    );
  }

  if (cat.includes('program') || cat.includes('code')) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-500/15 text-teal-300 border border-teal-500/30">
        <Code2 size={12} />
        Programming
      </span>
    );
  }

  if (cat.includes('devops') || cat.includes('git')) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
        <Settings size={12} />
        DevOps
      </span>
    );
  }

  if (cat.includes('web') || cat.includes('design')) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
        <Globe size={12} />
        Web Development
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30">
      <Award size={12} />
      Other
    </span>
  );
};

const Certifications = () => {
  const { data: dbData } = useCertifications();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalCert, setModalCert] = useState(null);

  // Combine DB certifications with Reference Certifications for full rich display
  const allCertifications = useMemo(() => {
    const list = Array.isArray(dbData) && dbData.length > 0 ? [...dbData] : [];
    
    // Add reference certs if not already in DB
    REFERENCE_CERTS.forEach(ref => {
      const exists = list.some(c => 
        (c.name || '').toLowerCase().includes(ref.name.split(' ')[0].toLowerCase()) &&
        (c.issuer || '').toLowerCase().includes(ref.issuer.split(' ')[0].toLowerCase())
      );
      if (!exists) {
        list.push(ref);
      }
    });

    // Determine category and featured dynamically if not explicitly specified
    return list.map((cert) => {
      let category = cert.category;
      if (!category || category === 'Other') {
        const text = ((cert.name || '') + ' ' + (cert.issuer || '')).toLowerCase();
        if (text.includes('cloud') || text.includes('aws') || text.includes('azure') || text.includes('oracle')) {
          category = 'Cloud';
        } else if (text.includes('python') || text.includes('programming') || text.includes('hackerrank')) {
          category = 'Programming';
        } else if (text.includes('devops') || text.includes('git') || text.includes('docker')) {
          category = 'DevOps';
        } else if (text.includes('web') || text.includes('front-end') || text.includes('design')) {
          category = 'Web Development';
        } else {
          category = 'Other';
        }
      }

      const isAws = (cert.name || '').toLowerCase().includes('aws academy');
      const featured = cert.featured === true || isAws;

      return {
        ...cert,
        category,
        featured
      };
    });
  }, [dbData]);

  // Categories list with Icons matching reference
  const CATEGORIES = [
    { id: 'All', label: 'All', icon: LayoutGrid },
    { id: 'Cloud', label: 'Cloud', icon: Cloud },
    { id: 'Programming', label: 'Programming', icon: Code2 },
    { id: 'DevOps', label: 'DevOps', icon: Settings },
    { id: 'Web Development', label: 'Web Development', icon: Globe },
    { id: 'Other', label: 'Other', icon: Award }
  ];

  // Filtered and sorted Certifications (Featured always first matching reference screenshot)
  const filteredCerts = useMemo(() => {
    return allCertifications
      .filter(cert => {
        const matchCat = selectedCategory === 'All' || cert.category === selectedCategory;
        const matchSearch = !searchQuery.trim() || 
          (cert.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
          (cert.issuer || '').toLowerCase().includes(searchQuery.toLowerCase());
        return matchCat && matchSearch;
      })
      .sort((a, b) => {
        // Featured always at top
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  }, [allCertifications, selectedCategory, searchQuery]);

  // Curated Milestone Journey matching reference screenshot
  const timelineCerts = useMemo(() => {
    return [
      {
        year: '2026',
        name: 'AWS Academy Graduate',
        issuer: 'AWS Academy',
        dotColor: 'bg-blue-500 shadow-[0_0_8px_#3b82f6]'
      },
      {
        year: '2025',
        name: 'Oracle Cloud Infrastructure',
        issuer: 'Oracle University',
        dotColor: 'bg-purple-500 shadow-[0_0_8px_#a855f7]'
      },
      {
        year: '2024',
        name: 'Azure Fundamentals',
        issuer: 'Microsoft',
        dotColor: 'bg-teal-400 shadow-[0_0_8px_#2dd4bf]'
      },
      {
        year: '2024',
        name: 'Python (Basic)',
        issuer: 'HackerRank',
        dotColor: 'bg-pink-500 shadow-[0_0_8px_#ec4899]'
      },
      {
        year: '2023',
        name: 'Responsive Web Design',
        issuer: 'freeCodeCamp',
        dotColor: 'bg-amber-500 shadow-[0_0_8px_#f59e0b]'
      }
    ];
  }, []);

  const handleViewCert = (cert) => {
    if (cert.credentialUrl) {
      window.open(cert.credentialUrl, '_blank', 'noopener,noreferrer');
    } else {
      setModalCert(cert);
    }
  };

  return (
    <>
      <SEO title="Licenses & Certifications" description="My professional credentials and verified achievements demonstrating expertise." url="/certifications" />

      <section id="certifications" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-[1380px] mx-auto">
        
        {/* --- Top Header Row --- */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
          
          {/* Left Title & Rosette Badge */}
          <div className="flex items-start gap-4">
            {/* Blue glowing Rosette Ribbon Icon */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center shrink-0 shadow-[0_0_25px_rgba(59,130,246,0.35)]">
              <Award size={28} className="text-blue-400" />
            </div>

            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-400 mb-1">
                CERTIFICATIONS
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight">
                Licenses & <span className="text-gradient">Certifications</span>
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm max-w-xl mt-2 leading-relaxed">
                Professional credentials and verified achievements demonstrating my expertise.
              </p>
            </div>
          </div>

          {/* Right Metrics Strip (8+ Certifications • 4 Domains • 100% Verified) */}
          <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-2.5 rounded-2xl bg-[#080d19]/90 border border-slate-800 shadow-xl self-start lg:self-auto">
            {/* Metric 1 */}
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-900/40 border border-slate-800/80">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                <Trophy size={18} />
              </div>
              <div>
                <p className="text-base sm:text-lg font-black font-heading text-white leading-none">
                  {allCertifications.length > 8 ? `${allCertifications.length}+` : '8+'}
                </p>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">Certifications</p>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-900/40 border border-slate-800/80">
              <div className="w-9 h-9 rounded-xl bg-teal-500/15 border border-teal-500/30 text-teal-400 flex items-center justify-center shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <p className="text-base sm:text-lg font-black font-heading text-white leading-none">4</p>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">Domains</p>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-900/40 border border-slate-800/80">
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0">
                <BarChart3 size={18} />
              </div>
              <div>
                <p className="text-base sm:text-lg font-black font-heading text-white leading-none">100%</p>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">Verified</p>
              </div>
            </div>
          </div>

        </div>

        {/* --- Category Filter Pills & Search Bar --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          
          {/* Left Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive 
                      ? 'bg-[#0284c7] text-white shadow-[0_0_15px_rgba(2,132,199,0.5)] border border-cyan-400' 
                      : 'bg-[#080d19]/90 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-white' : 'text-slate-400'} />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Right Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
            <input
              type="text"
              placeholder="Search certifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#080d19]/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X size={13} />
              </button>
            )}
          </div>

        </div>

        {/* --- Main 2-Column Content: Certifications Grid (Col 1) + Right Sidebar (Col 2) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left / Middle: Certifications Grid (8 Cols on Desktop) */}
          <div className="lg:col-span-8">
            {filteredCerts.length === 0 ? (
              <div className="text-center py-20 rounded-3xl bg-[#080d19]/80 border border-slate-800">
                <Award className="mx-auto h-12 w-12 text-slate-600 mb-3" />
                <h3 className="text-base font-bold text-white mb-1">No certifications found</h3>
                <p className="text-xs text-slate-400">Try adjusting your filter or search query.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredCerts.map((cert) => {
                  const isFeatured = cert.featured;
                  const cat = (cert.category || 'Other').toLowerCase();
                  
                  // Category Border & Button styles matching reference
                  let cardBorder = 'border-slate-800/80 hover:border-slate-700';
                  let btnStyle = 'border border-cyan-500/60 text-cyan-400 hover:bg-cyan-500/10';

                  if (isFeatured) {
                    cardBorder = 'border-2 border-indigo-500/80 shadow-[0_0_30px_rgba(99,102,241,0.25)]';
                    btnStyle = 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold shadow-lg hover:shadow-cyan-500/25';
                  } else if (cat.includes('program')) {
                    cardBorder = 'border border-teal-500/50 shadow-[0_0_20px_rgba(20,184,166,0.12)]';
                    btnStyle = 'border border-teal-500/60 text-teal-300 hover:bg-teal-500/10';
                  } else if (cat.includes('web')) {
                    cardBorder = 'border border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.12)]';
                    btnStyle = 'border border-purple-500/60 text-purple-300 hover:bg-purple-500/10';
                  } else if (cat.includes('devops')) {
                    cardBorder = 'border border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.12)]';
                    btnStyle = 'border border-amber-500/60 text-amber-300 hover:bg-amber-500/10';
                  } else if (cat.includes('cloud')) {
                    cardBorder = 'border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.12)]';
                    btnStyle = 'border border-cyan-500/60 text-cyan-300 hover:bg-cyan-500/10';
                  }

                  return (
                    <div
                      key={cert._id}
                      className={`relative p-4 sm:p-5 rounded-3xl bg-[#080d19]/95 ${cardBorder} backdrop-blur-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg group`}
                    >
                      {/* Top Badges Row */}
                      <div className="flex items-center justify-between gap-2 mb-3 min-h-[26px]">
                        {isFeatured ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm">
                            <Crown size={12} className="text-amber-300" />
                            Featured
                          </span>
                        ) : <span />}

                        <CategoryBadge category={cert.category} />
                      </div>

                      {/* Certificate Visual Preview */}
                      <div className="mb-4 rounded-xl overflow-hidden shadow-inner">
                        {cert.logo && !cert.logo.includes('default') ? (
                          <div className="w-full h-36 sm:h-40 bg-white rounded-xl p-2.5 flex items-center justify-center overflow-hidden border border-slate-200">
                            <img
                              src={getImageUrl(cert.logo)}
                              alt={cert.name}
                              className="max-h-full max-w-full object-contain drop-shadow"
                            />
                          </div>
                        ) : (
                          <CertificateMockup cert={cert} />
                        )}
                      </div>

                      {/* Title & Metadata */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-sm sm:text-base font-bold font-heading text-white line-clamp-2 leading-snug group-hover:text-cyan-300 transition-colors">
                            {cert.name}
                          </h3>
                          <p className="text-xs text-slate-400 font-medium mt-1">
                            {cert.issuer}
                          </p>
                        </div>

                        <div className="flex items-center text-[11px] text-slate-400 mt-2.5">
                          <Calendar size={12} className="mr-1.5 text-slate-500" />
                          Issued {cert.issueDate}
                        </div>
                      </div>

                      {/* Action Button: View Certificate */}
                      <button
                        onClick={() => handleViewCert(cert)}
                        className={`w-full mt-4 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${btnStyle}`}
                      >
                        View Certificate
                        <ArrowUpRight size={13} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Sidebar: Journey • Quote • Explore (4 Cols on Desktop) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Card 1: My Certification Journey */}
            <div className="p-5 sm:p-6 rounded-3xl bg-[#080d19]/95 border border-slate-800 shadow-xl">
              {/* Header */}
              <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-slate-800/80">
                <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center shrink-0 shadow-inner">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold font-heading text-white">
                    My Certification Journey
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    Continuous learning towards a better future.
                  </p>
                </div>
              </div>

              {/* Vertical Timeline */}
              <div className="relative pl-2 sm:pl-3 space-y-4">
                {/* Vertical connecting line */}
                <div className="absolute left-[38px] top-2 bottom-2 w-[2px] bg-slate-800" />

                {timelineCerts.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 relative z-10">
                    {/* Year on left */}
                    <span className="font-mono text-xs font-bold text-slate-400 w-8 shrink-0 pt-0.5 text-right">
                      {item.year}
                    </span>

                    {/* Timeline Dot */}
                    <div className={`w-3.5 h-3.5 rounded-full ${item.dotColor} shrink-0 mt-1 border-2 border-[#080d19]`} />

                    {/* Cert Title & Issuer */}
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs sm:text-sm font-bold text-white leading-tight truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                        {item.issuer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: Inspirational Quote */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0c1f3a] via-[#091528] to-[#070c18] border border-cyan-500/30 shadow-xl relative overflow-hidden">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center justify-center mb-4 shadow-inner">
                <Quote size={20} />
              </div>
              <p className="text-slate-200 text-sm font-medium leading-relaxed italic">
                “Learning never exhausts the mind. It builds a stronger tomorrow.”
              </p>
              <div className="w-12 h-1 bg-cyan-400 rounded-full mt-4 shadow-[0_0_8px_#38bdf8]" />
            </div>

            {/* Card 3: Explore More */}
            <a
              href="#contact"
              className="p-5 rounded-3xl bg-[#080d19]/95 border border-purple-500/40 shadow-xl flex items-center justify-between group hover:border-purple-400 transition-all cursor-pointer block"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-purple-600/25 border border-purple-500/40 text-purple-300 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold font-heading text-white group-hover:text-purple-300 transition-colors">
                    Explore More
                  </h4>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    Check my full profile on certification platforms.
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center font-bold shadow-[0_0_12px_rgba(6,182,212,0.6)] group-hover:scale-110 transition-transform shrink-0">
                <ArrowUpRight size={16} />
              </div>
            </a>

          </div>

        </div>

        {/* Modal for certificate view if no external URL */}
        {modalCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-lg rounded-3xl bg-[#0b1329] border border-slate-700 p-6 shadow-2xl text-left">
              <button
                onClick={() => setModalCert(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>

              <div className="mb-4">
                <CategoryBadge category={modalCert.category} />
              </div>

              <h3 className="text-xl font-bold font-heading text-white mb-1">
                {modalCert.name}
              </h3>
              <p className="text-sm text-slate-300 mb-4">{modalCert.issuer}</p>

              <div className="mb-4 rounded-xl overflow-hidden border border-slate-700">
                <CertificateMockup cert={modalCert} />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800">
                <span>Issued: {modalCert.issueDate}</span>
                {modalCert.expiryDate && <span>Expires: {modalCert.expiryDate}</span>}
              </div>
            </div>
          </div>
        )}

      </section>
    </>
  );
};

export default Certifications;
