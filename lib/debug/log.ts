// lib/debug/log.ts
const env = process.env.NEXT_PUBLIC_APP_ENV || "local";
const enabled = env !== "prod";

export function debugLog(scope: string, message: string, data?: Record<string, unknown>) {
  if (!enabled) return;
  // eslint-disable-next-line no-console
  console.log(`[${scope}] ${message}`, data ?? "");
}