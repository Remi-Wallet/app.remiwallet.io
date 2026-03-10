// lib/analytics/trackOnce.ts

/**
 * Analytics architecture
 *
 * createTrackOnce(track)
 * - Wraps the core track() function.
 * - Prevents duplicate firing for events that should only happen once
 *   per session/key, especially in React Strict Mode during development.
 *
 * Use trackOnce() at the page/component level for:
 * - quiz_start
 * - step_view
 *
 * Do NOT use trackOnce() for repeatable events like:
 * - answer_selected
 * - multi_continue
 * - lead_submit
 */

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