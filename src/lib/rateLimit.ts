// Lightweight in-memory rate limiter for serverless functions.
//
// This is intentionally simple: it lives in the function's memory, so it
// only limits requests hitting the *same warm instance*. On Netlify that
// covers the common abuse case (a script hammering the endpoint in a burst,
// or one bad actor sending many requests in a row) since warm instances
// serve bursts of traffic. It will NOT perfectly enforce a global limit
// across every cold-started instance under heavy distributed load — if this
// endpoint ever needs bulletproof limits at scale, swap this for a durable
// store (e.g. Netlify Blobs, Upstash Redis) using the same interface below.
// For a small site's real threat model (opportunistic cost abuse, not a
// coordinated attack), this is a solid, zero-dependency first line of defense.

interface Bucket {
  count: number
  windowStart: number
}

const buckets = new Map<string, Bucket>()

// Periodically clear old entries so the Map doesn't grow unbounded on a
// long-lived warm instance.
const MAX_TRACKED_KEYS = 5000

export function isRateLimited(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): boolean {
  const now = Date.now()
  const bucket = buckets.get(key)

  if (!bucket || now - bucket.windowStart > windowMs) {
    buckets.set(key, { count: 1, windowStart: now })
    if (buckets.size > MAX_TRACKED_KEYS) {
      const oldestKey = buckets.keys().next().value
      if (oldestKey) buckets.delete(oldestKey)
    }
    return false
  }

  bucket.count += 1
  return bucket.count > limit
}

export function getClientIp(request: Request): string {
  // Netlify sets this header with the real client IP.
  const nfIp = request.headers.get('x-nf-client-connection-ip')
  if (nfIp) return nfIp

  // Fallback for local dev / other proxies.
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) return forwardedFor.split(',')[0].trim()

  return 'unknown'
}
