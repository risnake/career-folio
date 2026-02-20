const MAX_ENTRIES = 10_000;

type RateLimitEntry = { windowStart: number; count: number };

export function createRateLimiter(windowMs: number, maxRequests: number) {
  const store = new Map<string, RateLimitEntry>();
  let lastCleanup = Date.now();

  function evictStale(now: number) {
    if (store.size <= MAX_ENTRIES && now - lastCleanup < windowMs) return;
    for (const [key, entry] of store) {
      if (now - entry.windowStart > windowMs) store.delete(key);
    }
    lastCleanup = now;
  }

  return {
    isLimited(ip: string): boolean {
      const now = Date.now();
      evictStale(now);
      const entry = store.get(ip);

      if (!entry) {
        store.set(ip, { windowStart: now, count: 1 });
        return false;
      }

      if (now - entry.windowStart > windowMs) {
        entry.windowStart = now;
        entry.count = 1;
        store.set(ip, entry);
        return false;
      }

      entry.count += 1;
      store.set(ip, entry);
      return entry.count > maxRequests;
    },
  };
}

export function getClientIp(request: Request): string {
  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}
