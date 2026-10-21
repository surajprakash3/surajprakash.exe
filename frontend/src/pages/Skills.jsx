import React, { Component, useState, useMemo } from 'react';
import { 
  Code2, Layout, Server, Database, Cloud, GitBranch, Wrench, 
  Search, Workflow, Layers, Grid, SlidersHorizontal, Sparkles,
  ChevronRight, ArrowRight, ShieldCheck, Cpu
} from 'lucide-react';
import { useSkills } from '../hooks/useSkills';
import { 
  CATEGORIES, 
  TECHNOLOGIES, 
  WORKFLOW_STAGES, 
  mergeSkillsWithDatabase 
} from '../data/technologiesData';
import TechCard from '../components/skills/TechCard';
import TechDetailModal from '../components/skills/TechDetailModal';
import TechArchitectureFlow from '../components/skills/TechArchitectureFlow';

// Icon mapper for categories
const CATEGORY_ICON_MAP = {
  'Frontend Development': Layout,
  'Backend Development': Server,
  'Databases': Database,
  'Cloud Infrastructure': Cloud,
  'DevOps & Deployment': GitBranch,
  'Programming Languages': Code2,
  'Tools & Design': Wrench,
};

class SkillsErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, errorInfo) { 
    console.error("Skills Section Error:", error, errorInfo); 
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="py-16 text-center bg-theme-card/20 backdrop-blur-md rounded-2xl border border-theme-border m-4">
          <h2 className="text-lg font-bold text-theme-text mb-2">Something went wrong</h2>
          <p className="text-theme-muted text-sm">The skills section encountered an error. Please reload.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const Skills = () => {
  const { data: dbData, loading } = useSkills();
  const dbSkills = Array.isArray(dbData) ? dbData : [];

  // Master merged list of technologies (Codebase Architecture + Dynamic DB items)
  const allTechnologies = useMemo(() => {
    return mergeSkillsWithDatabase(dbSkills);
  }, [dbSkills]);

  // UI View Mode: 'workflow' (Architecture Diagram) vs 'categories' (Categorized Grid)
  const [activeView, setActiveView] = useState('workflow');

  // Search & Category Filters
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected technology for the detail modal
  const [selectedTech, setSelectedTech] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenDetail = (tech) => {
    setSelectedTech(tech);
    setIsModalOpen(true);
  };

  const handleCloseDetail = () => {
    setIsModalOpen(false);
  };

  // Filtered technologies for the categorized grid view
  const filteredTechnologies = useMemo(() => {
    return allTechnologies.filter((tech) => {
      const matchesCategory = selectedCategory === 'All' || tech.category === selectedCategory;
      const matchesSearch = 
        !searchQuery.trim() || 
        tech.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        (tech.purpose && tech.purpose.toLowerCase().includes(searchQuery.toLowerCase().trim())) ||
        (tech.category && tech.category.toLowerCase().includes(searchQuery.toLowerCase().trim()));
      
      return matchesCategory && matchesSearch;
    });
  }, [allTechnologies, selectedCategory, searchQuery]);

  // Group technologies by category dynamically so any new category automatically renders!
  const groupedCategories = useMemo(() => {
    const map = new Map();

    // Preserve ordering from predefined CATEGORIES
    CATEGORIES.forEach(cat => {
      map.set(cat.name, {
        meta: cat,
        items: []
      });
    });

    // Populate with filtered technologies
    filteredTechnologies.forEach(tech => {
      const catName = tech.category || 'Tools & Design';
      if (!map.has(catName)) {
        map.set(catName, {
          meta: {
            id: catName,
            name: catName,
            badge: 'Category',
            subtitle: 'Specialized Technologies',
            description: `${catName} and supporting utilities.`,
            icon: 'Code2',
            accentColor: 'text-accent-400',
            bgGlow: 'from-accent-500/10 to-blue-500/10',
          },
          items: []
        });
      }
      map.get(catName).items.push(tech);
    });

    // Return non-empty categories
    return Array.from(map.values()).filter(entry => entry.items.length > 0);
  }, [filteredTechnologies]);

  // Unique list of all category names for filter tabs
  const categoryNames = useMemo(() => {
    const set = new Set();
    allTechnologies.forEach(t => {
      if (t.category) set.add(t.category);
    });
    return ['All', ...Array.from(set)];
  }, [allTechnologies]);

  if (loading && allTechnologies.length === 0) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-3 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <SkillsErrorBoundary>
      <section id="skills" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/10 text-accent-400 text-xs font-bold border border-accent-500/20 mb-3">
              <Sparkles size={13} className="text-accent-400" />
              Production Engineering Toolkit
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-theme-text tracking-tight">
              Technology Stack & <span className="text-gradient">Architecture</span>
            </h2>
            <div className="w-20 h-1.5 bg-accent-500 rounded-full mt-3 mb-3"></div>
            <p className="text-theme-muted max-w-2xl text-sm sm:text-base leading-relaxed">
              An architectural breakdown of the technologies, cloud frameworks, and DevOps pipelines I use to build, scale, and maintain high-performance software applications.
            </p>
          </div>

          {/* View Switcher: Architecture Flow vs All Categories Grid */}
          <div className="flex items-center p-1.5 bg-theme-card/70 dark:bg-dark-800/80 rounded-2xl border border-theme-border/80 shadow-md shrink-0">
            <button
              onClick={() => setActiveView('workflow')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeView === 'workflow'
                  ? 'bg-accent-500 text-white shadow-theme-glow-sm'
                  : 'text-theme-muted hover:text-theme-text'
              }`}
            >
              <Workflow size={16} />
              <span>Stack Architecture</span>
            </button>
            <button
              onClick={() => setActiveView('categories')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeView === 'categories'
                  ? 'bg-accent-500 text-white shadow-theme-glow-sm'
                  : 'text-theme-muted hover:text-theme-text'
              }`}
            >
              <Grid size={16} />
              <span>All Technologies ({allTechnologies.length})</span>
            </button>
          </div>
        </div>

        {/* View 1: Architecture Workflow Visualization */}
        {activeView === 'workflow' && (
          <TechArchitectureFlow
            onSelectTech={handleOpenDetail}
            selectedTech={selectedTech}
          />
        )}

        {/* View 2: All Technologies Categorized Grid */}
        {activeView === 'categories' && (
          <div className="space-y-8">
            {/* Search & Category Filter Controls */}
            <div className="glass p-4 rounded-2xl border border-theme-border/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Category Pills (horizontal scrollable) */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide flex-1">
                {categoryNames.map((catName) => {
                  const isSelected = selectedCategory === catName;
                  return (
                    <button
                      key={catName}
                      onClick={() => setSelectedCategory(catName)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                        isSelected
                          ? 'bg-accent-500 text-white border-accent-500 shadow-theme-glow-sm'
                          : 'bg-theme-bg/60 text-theme-muted hover:text-theme-text hover:bg-theme-border/60 border-theme-border'
                      }`}
                    >
                      {catName}
                    </button>
                  );
                })}
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-64 shrink-0">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-muted" />
                <input
                  type="text"
                  placeholder="Search technologies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-theme-bg/80 border border-theme-border text-theme-text placeholder-theme-muted focus:outline-none focus:ring-1 focus:ring-accent-500 transition shadow-inner"
                />
              </div>
            </div>

            {/* Empty state */}
            {groupedCategories.length === 0 ? (
              <div className="text-center py-16 glass rounded-2xl">
                <Code2 className="mx-auto h-12 w-12 text-theme-muted mb-3 opacity-60" />
                <h3 className="text-lg font-bold text-theme-text">No technologies found</h3>
                <p className="text-theme-muted text-xs mt-1">Try clearing your search query or selecting a different category.</p>
                <button
                  onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                  className="mt-4 px-4 py-2 rounded-xl bg-accent-500 text-white text-xs font-bold hover:bg-accent-600 transition cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              /* Categorized Sections */
              <div className="space-y-10">
                {groupedCategories.map(({ meta, items }) => {
                  const CategoryIcon = CATEGORY_ICON_MAP[meta.name] || Code2;

                  return (
                    <div key={meta.id} className="space-y-4">
                      {/* Category Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-theme-border/70">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-accent-500/10 text-accent-400 border border-accent-500/20">
                            <CategoryIcon size={18} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg sm:text-xl font-bold font-heading text-theme-text">
                                {meta.name}
                              </h3>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-theme-bg border border-theme-border text-accent-500">
                                {items.length}
                              </span>
                            </div>
                            <p className="text-xs text-theme-muted mt-0.5 hidden sm:block">
                              {meta.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Technology Cards Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {items.map((tech) => (
                          <TechCard
                            key={tech.id}
                            tech={tech}
                            onSelect={handleOpenDetail}
                            isSelected={selectedTech?.id === tech.id}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Interactive Technology Detail Modal */}
        <TechDetailModal
          tech={selectedTech}
          isOpen={isModalOpen}
          onClose={handleCloseDetail}
          onSelectRelated={(relatedTech) => {
            setSelectedTech(relatedTech);
          }}
        />
      </section>
    </SkillsErrorBoundary>
  );
};

export default Skills;
