const MAX_ENTRIES = 10_000;

type RateLimitEntry = { windowStart: number; count: number };

export function createRateLimiter(windowMs: number, maxRequests: number) {
  const store = new Map<string, RateLimitEntry>();

  function evictStale() {
    if (store.size <= MAX_ENTRIES) return;
    const now = Date.now();
    for (const [key, entry] of store) {
      if (now - entry.windowStart > windowMs) store.delete(key);
    }
  }

  return {
    isLimited(ip: string): boolean {
      evictStale();
      const now = Date.now();
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
