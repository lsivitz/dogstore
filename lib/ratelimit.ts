const hits = new Map<string, number>()

export function checkLimit(key: string, limit = 60) {
  const now = Date.now()
  const count = hits.get(key) || 0
  hits.set(key, count + 1)
  return count < limit
}
