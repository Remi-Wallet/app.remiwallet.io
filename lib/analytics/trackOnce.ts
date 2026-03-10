// lib/analytics/trackOnce.ts

export function createTrackOnce<E extends string, P extends Record<string, any> = Record<string, any>>(
  track: (event: E, payload?: P) => void
) {
  return (event: E, payload?: P, key?: string) => {
    if (typeof window === "undefined") return;

    const k = `remi_once_${event}::${key ?? ""}`;

    try {
      if (sessionStorage.getItem(k)) return;
      sessionStorage.setItem(k, "1");
    } catch {
      // if sessionStorage fails, fall through and track normally
    }

    track(event, payload);
  };
}