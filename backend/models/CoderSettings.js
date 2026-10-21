import mongoose from 'mongoose';

const sectionConfigSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    enabled: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    layoutVariant: { type: String, default: 'grid' },
    columns: { type: Number, default: 3 }
  },
  { _id: false }
);

const coderSettingsSchema = new mongoose.Schema(
  {
    heroTitle: {
      type: String,
      default: 'Algorithms, Architecture & Code Craft'
    },
    heroSubtitle: {
      type: String,
      default: 'A live dashboard tracking my problem solving journey, competitive ratings, and open source development across major engineering platforms.'
    },
    accentColor: {
      type: String,
      default: '#06b6d4' // cyan
    },
    showActivityHeatmap: {
      type: Boolean,
      default: true
    },
    showDifficultyBreakdown: {
      type: Boolean,
      default: true
    },
    sections: {
      type: [sectionConfigSchema],
      default: [
        { id: 'overview', title: 'Coding Analytics Overview', subtitle: 'Verified metrics across all connected platforms', enabled: true, order: 1, layoutVariant: 'metrics', columns: 4 },
        { id: 'platforms', title: 'Connected Coding Platforms', subtitle: 'Live synced statistics from major algorithmic & developer hubs', enabled: true, order: 2, layoutVariant: 'grid', columns: 3 },
        { id: 'difficulty', title: 'Problem Difficulty Distribution', subtitle: 'Easy, Medium, and Hard breakdown with acceptance benchmarks', enabled: true, order: 3, layoutVariant: 'chart', columns: 2 },
        { id: 'heatmap', title: 'Activity & Consistency Heatmap', subtitle: 'Frequency of submissions and algorithmic workouts', enabled: true, order: 4, layoutVariant: 'heatmap', columns: 1 },
        { id: 'dsa', title: 'DSA Mastery & Topic Progress', subtitle: 'Structured tracking across essential algorithmic paradigms', enabled: true, order: 5, layoutVariant: 'progress', columns: 2 },
        { id: 'languages', title: 'Programming Languages & Syntax', subtitle: 'Languages used in problem solving and system development', enabled: true, order: 6, layoutVariant: 'bars', columns: 2 },
        { id: 'github', title: 'GitHub Open Source Footprint', subtitle: 'Repositories, commits, contributions, and active projects', enabled: true, order: 7, layoutVariant: 'cards', columns: 3 },
        { id: 'achievements', title: 'Milestones & Badges', subtitle: 'Earned contest badges, stars, and algorithmic achievements', enabled: true, order: 8, layoutVariant: 'badges', columns: 4 }
      ]
    }
  },
  { timestamps: true }
);

const CoderSettings = mongoose.model('CoderSettings', coderSettingsSchema);
export default CoderSettings;
