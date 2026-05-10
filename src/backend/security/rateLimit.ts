const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const BLOCK_MS = 30 * 60 * 1000;

type AttemptState = {
  count: number;
  firstAttemptAt: number;
  blockedUntil?: number;
};

const attempts = new Map<string, AttemptState>();

function now() {
  return Date.now();
}

export function canAttemptLogin(key: string): { ok: boolean; retryAfterSec?: number } {
  const state = attempts.get(key);
  if (!state) {
    return { ok: true };
  }

  if (state.blockedUntil && state.blockedUntil > now()) {
    return { ok: false, retryAfterSec: Math.ceil((state.blockedUntil - now()) / 1000) };
  }

  if (now() - state.firstAttemptAt > WINDOW_MS) {
    attempts.delete(key);
    return { ok: true };
  }

  return { ok: true };
}

export function recordFailedLogin(key: string): void {
  const current = attempts.get(key);

  if (!current || now() - current.firstAttemptAt > WINDOW_MS) {
    attempts.set(key, { count: 1, firstAttemptAt: now() });
    return;
  }

  const nextCount = current.count + 1;
  const updated: AttemptState = {
    ...current,
    count: nextCount,
  };

  if (nextCount >= MAX_ATTEMPTS) {
    updated.blockedUntil = now() + BLOCK_MS;
  }

  attempts.set(key, updated);
}

export function recordSuccessfulLogin(key: string): void {
  attempts.delete(key);
}
