import { useState, useEffect, useCallback } from 'react';
import * as coderService from '../services/coderService';

// Fallback platforms if server is initially empty or offline
export const FALLBACK_PLATFORMS = [
  {
    _id: 'fb-leetcode',
    name: 'LeetCode',
    platformKey: 'leetcode',
    username: 'Sp_alphatech',
    profileUrl: 'https://leetcode.com/u/Sp_alphatech/',
    color: '#FFA116',
    isActive: true,
    source: 'manual',
    stats: {
      totalSolved: 342,
      easy: 154,
      medium: 156,
      hard: 32,
      rating: 1680,
      globalRank: 'Top 14%',
      acceptanceRate: '68.4%',
      streak: 45
    },
    lastSyncedAt: new Date().toISOString()
  },
  {
    _id: 'fb-github',
    name: 'GitHub',
    platformKey: 'github',
    username: 'surajprakash3',
    profileUrl: 'https://github.com/surajprakash3',
    color: '#38bdf8',
    isActive: true,
    source: 'manual',
    stats: {
      totalSolved: 0,
      repositories: 38,
      contributions: 420,
      stars: 24,
      streak: 65,
      customMetrics: {
        followers: 18,
        publicGists: 5
      }
    },
    lastSyncedAt: new Date().toISOString()
  },
  {
    _id: 'fb-hackerrank',
    name: 'HackerRank',
    platformKey: 'hackerrank',
    username: 'sp_alphatech',
    profileUrl: 'https://www.hackerrank.com/profile/sp_alphatech',
    color: '#00EA64',
    isActive: true,
    source: 'manual',
    stats: {
      totalSolved: 120,
      easy: 70,
      medium: 40,
      hard: 10,
      rating: 1820,
      globalRank: '5★ Problem Solving',
      stars: 5
    },
    lastSyncedAt: new Date().toISOString()
  },
  {
    _id: 'fb-gfg',
    name: 'GeeksforGeeks',
    platformKey: 'geeksforgeeks',
    username: 'sp_alphatech',
    profileUrl: 'https://www.geeksforgeeks.org/user/sp_alphatech/',
    color: '#2F8D46',
    isActive: true,
    source: 'manual',
    stats: {
      totalSolved: 215,
      easy: 105,
      medium: 85,
      hard: 25,
      rating: 1740,
      globalRank: 'Institute Rank #4',
      customMetrics: {
        codingScore: 540
      }
    },
    lastSyncedAt: new Date().toISOString()
  },
  {
    _id: 'fb-codeforces',
    name: 'Codeforces',
    platformKey: 'codeforces',
    username: 'sp_alphatech',
    profileUrl: 'https://codeforces.com/profile/sp_alphatech',
    color: '#1890ff',
    isActive: true,
    source: 'manual',
    stats: {
      totalSolved: 85,
      easy: 45,
      medium: 32,
      hard: 8,
      rating: 1240,
      globalRank: 'Pupil'
    },
    lastSyncedAt: new Date().toISOString()
  },
  {
    _id: 'fb-codechef',
    name: 'CodeChef',
    platformKey: 'codechef',
    username: 'sp_alphatech',
    profileUrl: 'https://www.codechef.com/users/sp_alphatech',
    color: '#8B4513',
    isActive: true,
    source: 'manual',
    stats: {
      totalSolved: 95,
      easy: 50,
      medium: 35,
      hard: 10,
      rating: 1510,
      globalRank: '2★'
    },
    lastSyncedAt: new Date().toISOString()
  }
];

export const FALLBACK_DSA = [
  { _id: 'dsa-1', topic: 'Arrays & Strings', category: 'Fundamental Structures', order: 1, totalQuestions: 60, solvedQuestions: 54, easy: 24, medium: 26, hard: 4, status: 'Mastered', confidence: 95 },
  { _id: 'dsa-2', topic: 'Two Pointers & Sliding Window', category: 'Techniques', order: 2, totalQuestions: 45, solvedQuestions: 40, easy: 16, medium: 20, hard: 4, status: 'Mastered', confidence: 90 },
  { _id: 'dsa-3', topic: 'Hashing & Hash Maps', category: 'Fundamental Structures', order: 3, totalQuestions: 40, solvedQuestions: 35, easy: 18, medium: 15, hard: 2, status: 'Mastered', confidence: 90 },
  { _id: 'dsa-4', topic: 'Binary Search & Monotonicity', category: 'Algorithms', order: 4, totalQuestions: 35, solvedQuestions: 28, easy: 12, medium: 14, hard: 2, status: 'Mastered', confidence: 85 },
  { _id: 'dsa-5', topic: 'Linked Lists (Singly & Doubly)', category: 'Fundamental Structures', order: 5, totalQuestions: 30, solvedQuestions: 26, easy: 14, medium: 10, hard: 2, status: 'Mastered', confidence: 88 },
  { _id: 'dsa-6', topic: 'Stacks & Queues (Monotonic Stack)', category: 'Linear Structures', order: 6, totalQuestions: 35, solvedQuestions: 27, easy: 12, medium: 12, hard: 3, status: 'Mastered', confidence: 82 },
  { _id: 'dsa-7', topic: 'Trees, Binary Trees & BST', category: 'Hierarchical Structures', order: 7, totalQuestions: 55, solvedQuestions: 42, easy: 18, medium: 20, hard: 4, status: 'In Progress', confidence: 80 },
  { _id: 'dsa-8', topic: 'Heaps & Priority Queues', category: 'Hierarchical Structures', order: 8, totalQuestions: 25, solvedQuestions: 18, easy: 8, medium: 8, hard: 2, status: 'In Progress', confidence: 75 },
  { _id: 'dsa-9', topic: 'Graphs (BFS, DFS, Dijkstra, TopoSort)', category: 'Advanced Structures', order: 9, totalQuestions: 50, solvedQuestions: 32, easy: 10, medium: 18, hard: 4, status: 'In Progress', confidence: 72 },
  { _id: 'dsa-10', topic: 'Recursion & Backtracking', category: 'Algorithms', order: 10, totalQuestions: 30, solvedQuestions: 21, easy: 8, medium: 10, hard: 3, status: 'In Progress', confidence: 70 },
  { _id: 'dsa-11', topic: 'Greedy Algorithms', category: 'Algorithms', order: 11, totalQuestions: 30, solvedQuestions: 22, easy: 12, medium: 8, hard: 2, status: 'In Progress', confidence: 78 },
  { _id: 'dsa-12', topic: 'Dynamic Programming (1D & 2D)', category: 'Advanced Algorithms', order: 12, totalQuestions: 60, solvedQuestions: 34, easy: 10, medium: 18, hard: 6, status: 'In Progress', confidence: 68 }
];

export const useCoder = () => {
  const [platforms, setPlatforms] = useState(FALLBACK_PLATFORMS);
  const [overview, setOverview] = useState(null);
  const [dsaTopics, setDsaTopics] = useState(FALLBACK_DSA);
  const [settings, setSettings] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [ovData, platData, dsaData, settsData, achData] = await Promise.allSettled([
        coderService.getCoderOverview(),
        coderService.getCodingPlatforms(),
        coderService.getDSAProgress(),
        coderService.getCoderSettings(),
        coderService.getCodingAchievements()
      ]);

      if (platData.status === 'fulfilled' && Array.isArray(platData.value) && platData.value.length > 0) {
        setPlatforms(platData.value);
      }
      if (ovData.status === 'fulfilled') {
        setOverview(ovData.value);
      }
      if (dsaData.status === 'fulfilled' && Array.isArray(dsaData.value) && dsaData.value.length > 0) {
        setDsaTopics(dsaData.value);
      }
      if (settsData.status === 'fulfilled') {
        setSettings(settsData.value);
      }
      if (achData.status === 'fulfilled' && Array.isArray(achData.value)) {
        setAchievements(achData.value);
      }
    } catch (err) {
      console.warn('Could not fetch coder data, using initial data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    platforms,
    overview,
    dsaTopics,
    settings,
    achievements,
    loading,
    error,
    refetch: fetchAll
  };
};
