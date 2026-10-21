/**
 * Codeforces Data Provider using official public REST API
 */
export async function syncCodeforces(handle) {
  if (!handle) {
    throw new Error('Codeforces handle is required');
  }

  const cleanHandle = handle.replace(/^https?:\/\/codeforces\.com\/profile\//, '').replace(/\/$/, '');
  const url = `https://codeforces.com/api/user.info?handles=${encodeURIComponent(cleanHandle)}`;

  const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
  if (!res.ok) {
    throw new Error(`Codeforces API error: ${res.statusText}`);
  }

  const data = await res.json();
  if (data.status !== 'OK' || !data.result || data.result.length === 0) {
    throw new Error(`Codeforces user "${cleanHandle}" not found`);
  }

  const user = data.result[0];

  return {
    rating: user.rating || 0,
    globalRank: user.rank ? user.rank.toUpperCase() : '',
    customMetrics: {
      maxRating: user.maxRating || 0,
      maxRank: user.maxRank || '',
      organization: user.organization || ''
    }
  };
}
