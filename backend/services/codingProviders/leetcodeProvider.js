/**
 * LeetCode Data Provider using public GraphQL and reliable public proxy endpoints
 */
export async function syncLeetCode(username) {
  if (!username) {
    throw new Error('LeetCode username is required');
  }

  const cleanUser = username
    .replace(/^https?:\/\/(www\.)?leetcode\.com\/(u\/)?/, '')
    .replace(/\/$/, '');

  // 1. Try public GraphQL query first
  const query = `
    query getUserProfile($username: String!) {
      allQuestionsCount {
        difficulty
        count
      }
      matchedUser(username: $username) {
        username
        profile {
          ranking
          reputation
        }
        submitStats {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
      }
    }
  `;

  try {
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com'
      },
      body: JSON.stringify({
        query,
        variables: { username: cleanUser }
      }),
      signal: AbortSignal.timeout(6000)
    });

    if (res.ok) {
      const data = await res.json();
      if (data?.data?.matchedUser) {
        const stats = data.data.matchedUser.submitStats?.acSubmissionNum || [];
        const total = stats.find(s => s.difficulty === 'All')?.count || 0;
        const easy = stats.find(s => s.difficulty === 'Easy')?.count || 0;
        const medium = stats.find(s => s.difficulty === 'Medium')?.count || 0;
        const hard = stats.find(s => s.difficulty === 'Hard')?.count || 0;
        const rank = data.data.matchedUser.profile?.ranking;

        return {
          totalSolved: total,
          easy,
          medium,
          hard,
          globalRank: rank ? `#${rank.toLocaleString()}` : ''
        };
      }
    }
  } catch (err) {
    console.warn('LeetCode direct GraphQL failed, trying public mirror...', err.message);
  }

  // 2. Try reliable public mirror (alfa-leetcode-api)
  try {
    const mirrorRes = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${cleanUser}`, {
      signal: AbortSignal.timeout(6000)
    });

    if (mirrorRes.ok) {
      const d = await mirrorRes.json();
      return {
        totalSolved: d.totalSolved || 0,
        easy: d.easySolved || 0,
        medium: d.mediumSolved || 0,
        hard: d.hardSolved || 0,
        globalRank: d.ranking ? `#${d.ranking.toLocaleString()}` : ''
      };
    }
  } catch (err) {
    console.warn('LeetCode mirror endpoint failed:', err.message);
  }

  throw new Error(`Unable to reach LeetCode endpoint for user "${cleanUser}". You can enter verified stats manually in the Admin dashboard.`);
}
