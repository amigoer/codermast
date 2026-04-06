// Fetch commit history for a given content file from GitHub.
// Cached for 1 hour to avoid hitting unauthenticated GitHub API rate limits (60/hr).
const REPO = 'amigoer/codermast'
const BRANCH = 'main'

export default defineCachedEventHandler(
  async (event) => {
    const query = getQuery(event)
    const path = String(query.path || '')
    if (!path) {
      return { commits: [] }
    }

    const url = `https://api.github.com/repos/${REPO}/commits?path=${encodeURIComponent(path)}&sha=${BRANCH}&per_page=10`
    try {
      const res: any[] = await $fetch(url, {
        headers: {
          Accept: 'application/vnd.github+json',
          'User-Agent': 'CoderMast-Docs',
        },
      })
      const commits = (res || []).map(c => ({
        sha: c.sha,
        shortSha: c.sha?.slice(0, 7),
        message: c.commit?.message?.split('\n')[0] ?? '',
        author: c.commit?.author?.name ?? c.author?.login ?? 'unknown',
        avatar: c.author?.avatar_url ?? null,
        date: c.commit?.author?.date ?? null,
        url: c.html_url,
      }))
      return { commits }
    } catch (e: any) {
      return { commits: [], error: e?.message ?? 'fetch failed' }
    }
  },
  {
    maxAge: 60 * 60, // 1 hour
    getKey: (event) => `commits:${getQuery(event).path || ''}`,
  }
)
