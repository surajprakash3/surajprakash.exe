import { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, Eye, EyeOff, Save, Check, Layout, Sparkles } from 'lucide-react';
import * as coderService from '../../services/coderService';

const DEFAULT_SECTIONS = [
  { id: 'overview', title: 'Coding Analytics Overview', subtitle: 'Verified metrics across all connected platforms', enabled: true, order: 1 },
  { id: 'platforms', title: 'Connected Coding Platforms', subtitle: 'Live synced statistics from major algorithmic & developer hubs', enabled: true, order: 2 },
  { id: 'difficulty', title: 'Problem Difficulty Distribution', subtitle: 'Easy, Medium, and Hard breakdown with acceptance benchmarks', enabled: true, order: 3 },
  { id: 'heatmap', title: 'Activity & Consistency Heatmap', subtitle: 'Frequency of submissions and algorithmic workouts', enabled: true, order: 4 },
  { id: 'dsa', title: 'DSA Mastery & Topic Progress', subtitle: 'Structured tracking across essential algorithmic paradigms', enabled: true, order: 5 },
  { id: 'languages', title: 'Programming Languages & Syntax', subtitle: 'Languages used in problem solving and system development', enabled: true, order: 6 },
  { id: 'github', title: 'GitHub Open Source Footprint', subtitle: 'Repositories, commits, contributions, and active projects', enabled: true, order: 7 },
  { id: 'achievements', title: 'Milestones & Badges', subtitle: 'Earned contest badges, stars, and algorithmic achievements', enabled: true, order: 8 }
];

const ManageCoderLayout = () => {
  const [heroTitle, setHeroTitle] = useState('Algorithms, Architecture & Code Craft');
  const [heroSubtitle, setHeroSubtitle] = useState('A live dashboard tracking my problem solving journey, competitive ratings, and open source development across major engineering platforms.');
  const [accentColor, setAccentColor] = useState('#06b6d4');
  const [sections, setSections] = useState(DEFAULT_SECTIONS);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await coderService.getCoderSettings();
        if (data) {
          if (data.heroTitle) setHeroTitle(data.heroTitle);
          if (data.heroSubtitle) setHeroSubtitle(data.heroSubtitle);
          if (data.accentColor) setAccentColor(data.accentColor);
          if (Array.isArray(data.sections) && data.sections.length > 0) {
            setSections([...data.sections].sort((a, b) => (a.order || 0) - (b.order || 0)));
          }
        }
      } catch (err) {
        console.warn('Error loading coder settings:', err);
      }
    };
    loadSettings();
  }, []);

  const moveSection = (index, direction) => {
    const newSections = [...sections];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;

    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;

    // Re-assign orders
    newSections.forEach((s, idx) => {
      s.order = idx + 1;
    });

    setSections(newSections);
  };

  const toggleSection = (id) => {
    setSections(sections.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
  };

  const handleTitleChange = (id, newTitle) => {
    setSections(sections.map(s => s.id === id ? { ...s, title: newTitle } : s));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await coderService.updateCoderSettings({
        heroTitle,
        heroSubtitle,
        accentColor,
        sections
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      alert(err.message || 'Error saving layout configuration');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black font-heading text-white">Coder Page Layout & Design</h1>
          <p className="text-xs text-slate-400 mt-1">
            Customize section order, visibility, headings, and theme accent colors
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all cursor-pointer disabled:opacity-50"
        >
          {savedSuccess ? (
            <>
              <Check size={16} />
              Saved Successfully!
            </>
          ) : (
            <>
              <Save size={16} />
              {saving ? 'Saving...' : 'Save Configuration'}
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Hero Customization Card */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#0b1329] border border-slate-800 shadow-xl space-y-4">
          <h2 className="text-sm font-bold font-mono text-cyan-400 uppercase tracking-wider">
            Coder Hero Settings
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Headline</label>
            <input
              type="text"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Subtext / Description</label>
            <textarea
              rows={2}
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
            />
          </div>
        </div>

        {/* Section Ordering & Visibility */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#0b1329] border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold font-mono text-cyan-400 uppercase tracking-wider">
              Sections Ordering & Visibility ({sections.length})
            </h2>
            <span className="text-[11px] text-slate-400">Reorder with Up / Down arrows</span>
          </div>

          <div className="space-y-3">
            {sections.map((section, idx) => (
              <div
                key={section.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                  section.enabled 
                    ? 'bg-slate-900/80 border-slate-800' 
                    : 'bg-slate-900/30 border-slate-900 opacity-60'
                }`}
              >
                {/* Left: Position Number & Name */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="w-7 h-7 rounded-xl bg-slate-800 text-slate-400 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                    {idx + 1}
                  </span>
                  
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => handleTitleChange(section.id, e.target.value)}
                      className="w-full bg-transparent font-bold text-xs sm:text-sm text-white focus:outline-none focus:border-b border-cyan-400"
                    />
                    <p className="text-[11px] font-mono text-slate-400 mt-0.5 truncate">
                      ID: {section.id}
                    </p>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    className={`p-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                      section.enabled
                        ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                        : 'bg-slate-800 border-slate-700 text-slate-500'
                    }`}
                    title={section.enabled ? 'Enabled' : 'Disabled'}
                  >
                    {section.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>

                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => moveSection(idx, -1)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 cursor-pointer"
                    title="Move Up"
                  >
                    <ArrowUp size={16} />
                  </button>

                  <button
                    type="button"
                    disabled={idx === sections.length - 1}
                    onClick={() => moveSection(idx, 1)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 cursor-pointer"
                    title="Move Down"
                  >
                    <ArrowDown size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </form>
    </div>
  );
};

export default ManageCoderLayout;
