// lib/analytics/events.ts

export type RemiEventName =
  | "quiz_start"
  | "step_view"
  | "answer_selected"
  | "multi_continue"
  | "tier_assigned"
  | "quiz_complete"
  | "lead_submit"
  | "lead_submitted"
  | "summary_cta"
  | "summary_skip_to_beta"
  | "summary_continue"
  | "summary_to_waitlist";

export type RemiEventPayload = Record<string, any>;

function nowIso() {
  return new Date().toISOString();
}

function safeReadSessionId() {
  try {
    return localStorage.getItem("remi_session_id") || undefined;
  } catch {
    return undefined;
  }
}

function safeReadTier() {
  try {
    return (localStorage.getItem("remi_tier") as "A" | "B" | "C" | null) || undefined;
  } catch {
    return undefined;
  }
}

export function track(event: RemiEventName, payload: RemiEventPayload = {}) {
  const base = {
    ts: nowIso(),
    event,
    sessionId: typeof window !== "undefined" ? safeReadSessionId() : undefined,
    tier: typeof window !== "undefined" ? safeReadTier() : undefined,
    path: typeof window !== "undefined" ? window.location.pathname : undefined,
  };

  const record = { ...base, ...payload };

  // Console output (structured)
  // eslint-disable-next-line no-console
  console.log("[remi:event]", record);

  // Optional: keep a local buffer for debugging
  try {
    const key = "remi_event_buffer";
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    existing.push(record);
    localStorage.setItem(key, JSON.stringify(existing.slice(-200)));
  } catch {
    // ignore
  }
}