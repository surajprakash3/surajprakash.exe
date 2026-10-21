import { syncGitHub } from './githubProvider.js';
import { syncLeetCode } from './leetcodeProvider.js';
import { syncCodeforces } from './codeforcesProvider.js';

export const PROVIDERS = {
  github: syncGitHub,
  leetcode: syncLeetCode,
  codeforces: syncCodeforces
};

export async function syncPlatformData(platformKey, username) {
  const provider = PROVIDERS[platformKey.toLowerCase()];
  if (!provider) {
    throw new Error(`Automatic API sync is not yet available for "${platformKey}". Please enter verified statistics manually.`);
  }

  return await provider(username);
}
