import asyncHandler from 'express-async-handler';
import CodingPlatform from '../models/CodingPlatform.js';
import DSAProgress from '../models/DSAProgress.js';
import CoderSettings from '../models/CoderSettings.js';
import CodingAchievement from '../models/CodingAchievement.js';
import { syncPlatformData, PROVIDERS } from '../services/codingProviders/index.js';

// ==========================================
// PUBLIC ENDPOINTS
// ==========================================

// @desc    Get aggregated coding statistics
// @route   GET /api/coder/overview
// @access  Public
export const getCoderOverview = asyncHandler(async (req, res) => {
  const platforms = await CodingPlatform.find({ isActive: true }).lean();
  const dsaTopics = await DSAProgress.find({}).lean();

  // Aggregate verified statistics without double counting
  let totalSolved = 0;
  let totalEasy = 0;
  let totalMedium = 0;
  let totalHard = 0;
  let totalRepositories = 0;
  let totalContributions = 0;
  let highestRating = 0;

  platforms.forEach(p => {
    const s = p.stats || {};
    totalSolved += Number(s.totalSolved) || 0;
    totalEasy += Number(s.easy) || 0;
    totalMedium += Number(s.medium) || 0;
    totalHard += Number(s.hard) || 0;
    totalRepositories += Number(s.repositories) || 0;
    totalContributions += Number(s.contributions) || 0;
    if (s.rating && Number(s.rating) > highestRating) {
      highestRating = Number(s.rating);
    }
  });

  // Calculate DSA stats
  let totalDsaQuestions = 0;
  let solvedDsaQuestions = 0;
  dsaTopics.forEach(t => {
    totalDsaQuestions += Number(t.totalQuestions) || 0;
    solvedDsaQuestions += Number(t.solvedQuestions) || 0;
  });

  const dsaCompletionRate = totalDsaQuestions > 0 
    ? Math.round((solvedDsaQuestions / totalDsaQuestions) * 100) 
    : 0;

  res.json({
    totalSolved,
    difficulty: {
      easy: totalEasy,
      medium: totalMedium,
      hard: totalHard
    },
    connectedPlatforms: platforms.length,
    repositories: totalRepositories,
    contributions: totalContributions,
    highestRating,
    dsa: {
      totalQuestions: totalDsaQuestions,
      solvedQuestions: solvedDsaQuestions,
      completionRate: dsaCompletionRate,
      topicsCount: dsaTopics.length
    },
    lastUpdated: new Date().toISOString()
  });
});

// @desc    Get all active platforms
// @route   GET /api/coder/platforms
// @access  Public
export const getCodingPlatforms = asyncHandler(async (req, res) => {
  const platforms = await CodingPlatform.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
  res.json(platforms);
});

// @desc    Get all DSA progress topics
// @route   GET /api/coder/dsa
// @access  Public
export const getDSAProgress = asyncHandler(async (req, res) => {
  const topics = await DSAProgress.find({}).sort({ order: 1, createdAt: 1 });
  res.json(topics);
});

// @desc    Get coder layout settings
// @route   GET /api/coder/settings
// @access  Public
export const getCoderSettings = asyncHandler(async (req, res) => {
  let settings = await CoderSettings.findOne({});
  if (!settings) {
    settings = await CoderSettings.create({});
  }
  res.json(settings);
});

// @desc    Get coding achievements
// @route   GET /api/coder/achievements
// @access  Public
export const getCodingAchievements = asyncHandler(async (req, res) => {
  const achievements = await CodingAchievement.find({}).sort({ order: 1, createdAt: -1 });
  res.json(achievements);
});

// ==========================================
// ADMIN ENDPOINTS (PROTECTED)
// ==========================================

// Platforms Admin CRUD
export const getAllPlatformsAdmin = asyncHandler(async (req, res) => {
  const platforms = await CodingPlatform.find({}).sort({ order: 1, createdAt: 1 });
  res.json(platforms);
});

export const createPlatform = asyncHandler(async (req, res) => {
  const { name, platformKey, username, profileUrl, icon, color, stats, order, source, isActive } = req.body;

  const platform = new CodingPlatform({
    name,
    platformKey: (platformKey || name).toLowerCase().replace(/[\s\-_]/g, ''),
    username,
    profileUrl,
    icon: icon || '',
    color: color || '#38bdf8',
    isActive: isActive !== undefined ? isActive : true,
    order: order || 0,
    source: source || 'manual',
    stats: stats || {},
    lastSyncedAt: new Date(),
    syncStatus: 'manual'
  });

  const created = await platform.save();
  res.status(201).json(created);
});

export const updatePlatform = asyncHandler(async (req, res) => {
  const platform = await CodingPlatform.findById(req.params.id);
  if (!platform) {
    res.status(404);
    throw new Error('Coding platform not found');
  }

  const { name, platformKey, username, profileUrl, icon, color, stats, order, source, isActive } = req.body;

  if (name !== undefined) platform.name = name;
  if (platformKey !== undefined) platform.platformKey = platformKey;
  if (username !== undefined) platform.username = username;
  if (profileUrl !== undefined) platform.profileUrl = profileUrl;
  if (icon !== undefined) platform.icon = icon;
  if (color !== undefined) platform.color = color;
  if (order !== undefined) platform.order = order;
  if (source !== undefined) platform.source = source;
  if (isActive !== undefined) platform.isActive = isActive;
  if (stats !== undefined) {
    platform.stats = { ...platform.stats, ...stats };
  }

  const updated = await platform.save();
  res.json(updated);
});

export const deletePlatform = asyncHandler(async (req, res) => {
  const platform = await CodingPlatform.findById(req.params.id);
  if (!platform) {
    res.status(404);
    throw new Error('Coding platform not found');
  }

  await CodingPlatform.findByIdAndDelete(req.params.id);
  res.json({ message: 'Platform removed successfully' });
});

// Trigger sync for a platform
export const syncPlatform = asyncHandler(async (req, res) => {
  const platform = await CodingPlatform.findById(req.params.id);
  if (!platform) {
    res.status(404);
    throw new Error('Coding platform not found');
  }

  if (!PROVIDERS[platform.platformKey.toLowerCase()]) {
    return res.status(400).json({
      message: `API synchronization not supported for "${platform.name}". Please update stats manually.`
    });
  }

  try {
    const syncedStats = await syncPlatformData(platform.platformKey, platform.username);
    platform.stats = { ...platform.stats, ...syncedStats };
    platform.lastSyncedAt = new Date();
    platform.source = 'api';
    platform.syncStatus = 'synced';
    platform.syncError = '';
    await platform.save();

    res.json({ message: `Successfully synchronized ${platform.name}`, platform });
  } catch (err) {
    platform.syncStatus = 'failed';
    platform.syncError = err.message;
    await platform.save();
    res.status(502).json({ message: err.message, platform });
  }
});

// Sync all platforms
export const syncAllPlatforms = asyncHandler(async (req, res) => {
  const platforms = await CodingPlatform.find({ isActive: true });
  const results = [];

  for (const p of platforms) {
    if (PROVIDERS[p.platformKey.toLowerCase()]) {
      try {
        const synced = await syncPlatformData(p.platformKey, p.username);
        p.stats = { ...p.stats, ...synced };
        p.lastSyncedAt = new Date();
        p.source = 'api';
        p.syncStatus = 'synced';
        p.syncError = '';
        await p.save();
        results.push({ name: p.name, status: 'synced' });
      } catch (err) {
        p.syncStatus = 'failed';
        p.syncError = err.message;
        await p.save();
        results.push({ name: p.name, status: 'failed', error: err.message });
      }
    }
  }

  res.json({ message: 'Sync process completed', results });
});

// DSA Admin CRUD
export const createDSATopic = asyncHandler(async (req, res) => {
  const { topic, category, totalQuestions, solvedQuestions, easy, medium, hard, status, notes, order } = req.body;
  const dsa = new DSAProgress({
    topic,
    category: category || 'Data Structures',
    totalQuestions: Number(totalQuestions) || 30,
    solvedQuestions: Number(solvedQuestions) || 0,
    easy: Number(easy) || 0,
    medium: Number(medium) || 0,
    hard: Number(hard) || 0,
    status: status || 'In Progress',
    notes: notes || '',
    order: Number(order) || 0
  });

  const created = await dsa.save();
  res.status(201).json(created);
});

export const updateDSATopic = asyncHandler(async (req, res) => {
  const dsa = await DSAProgress.findById(req.params.id);
  if (!dsa) {
    res.status(404);
    throw new Error('DSA Topic not found');
  }

  Object.assign(dsa, req.body);
  const updated = await dsa.save();
  res.json(updated);
});

export const deleteDSATopic = asyncHandler(async (req, res) => {
  const dsa = await DSAProgress.findById(req.params.id);
  if (!dsa) {
    res.status(404);
    throw new Error('DSA Topic not found');
  }

  await DSAProgress.findByIdAndDelete(req.params.id);
  res.json({ message: 'DSA topic removed successfully' });
});

// Coder Settings Admin Update
export const updateCoderSettings = asyncHandler(async (req, res) => {
  let settings = await CoderSettings.findOne({});
  if (!settings) {
    settings = new CoderSettings(req.body);
  } else {
    Object.assign(settings, req.body);
  }

  const updated = await settings.save();
  res.json(updated);
});

// Achievements Admin CRUD
export const createAchievement = asyncHandler(async (req, res) => {
  const achievement = new CodingAchievement(req.body);
  const created = await achievement.save();
  res.status(201).json(created);
});

export const updateAchievement = asyncHandler(async (req, res) => {
  const achievement = await CodingAchievement.findById(req.params.id);
  if (!achievement) {
    res.status(404);
    throw new Error('Achievement not found');
  }

  Object.assign(achievement, req.body);
  const updated = await achievement.save();
  res.json(updated);
});

export const deleteAchievement = asyncHandler(async (req, res) => {
  const achievement = await CodingAchievement.findById(req.params.id);
  if (!achievement) {
    res.status(404);
    throw new Error('Achievement not found');
  }

  await CodingAchievement.findByIdAndDelete(req.params.id);
  res.json({ message: 'Achievement removed successfully' });
});
