import mongoose from 'mongoose';

const codingPlatformSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Platform name is required'],
      trim: true
    },
    platformKey: {
      type: String,
      required: [true, 'Platform key is required'],
      lowercase: true,
      trim: true
    },
    username: {
      type: String,
      default: '',
      trim: true
    },
    profileUrl: {
      type: String,
      default: '',
      trim: true
    },
    icon: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#38bdf8'
    },
    isActive: {
      type: Boolean,
      default: true
    },
    order: {
      type: Number,
      default: 0
    },
    source: {
      type: String,
      enum: ['api', 'manual', 'cached'],
      default: 'manual'
    },
    stats: {
      totalSolved: { type: Number, default: 0 },
      easy: { type: Number, default: 0 },
      medium: { type: Number, default: 0 },
      hard: { type: Number, default: 0 },
      rating: { type: Number, default: 0 },
      globalRank: { type: String, default: '' },
      contributions: { type: Number, default: 0 },
      repositories: { type: Number, default: 0 },
      stars: { type: Number, default: 0 },
      streak: { type: Number, default: 0 },
      acceptanceRate: { type: String, default: '' },
      customMetrics: { type: mongoose.Schema.Types.Mixed, default: {} }
    },
    lastSyncedAt: {
      type: Date,
      default: Date.now
    },
    syncStatus: {
      type: String,
      enum: ['synced', 'failed', 'pending', 'manual'],
      default: 'manual'
    },
    syncError: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

const CodingPlatform = mongoose.model('CodingPlatform', codingPlatformSchema);
export default CodingPlatform;
