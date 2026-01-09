type CacheEntry = {
  session: any;
  expires: number;
};

const map = new Map<string, CacheEntry>();

export function getCachedSession(token: string) {
  if (!token) return null;
  const entry = map.get(token);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    map.delete(token);
    return null;
  }
  return entry.session;
}

export function setCachedSession(token: string, session: any, ttlSecs = 300) {
  if (!token) return;
  const expires = Date.now() + ttlSecs * 1000;
  map.set(token, { session, expires });
}

export function deleteCachedSession(token: string) {
  if (!token) return;
  map.delete(token);
}

function clearExpired() {
  const now = Date.now();
  for (const [k, v] of map) {
    if (now > v.expires) map.delete(k);
  }
}

// Periodic cleanup
setInterval(clearExpired, 60 * 1000).unref?.();

export const DEFAULT_SESSION_CACHE_TTL = Number(process.env.SESSION_CACHE_TTL || process.env.NEXT_PUBLIC_SESSION_CACHE_TTL || 300);
