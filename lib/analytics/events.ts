// lib/analytics/events.ts

import { debugLog } from "@/lib/debug/log";

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

  // Console output (structured, gated by env)
  debugLog("event", event, record);

  // Optional: keep a local buffer for debugging
  try {
    const existing = JSON.parse(localStorage.getItem(EVENT_BUFFER_KEY) || "[]");
    existing.push(record);
    localStorage.setItem(EVENT_BUFFER_KEY, JSON.stringify(existing.slice(-200)));
  } catch {
    // ignore
  }
}

// ---- Event buffer helpers (dev/stage debugging) ----

export type RemiEventRecord = Record<string, unknown>;

const EVENT_BUFFER_KEY = "remi_event_buffer";

export function getEventBuffer(): RemiEventRecord[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(EVENT_BUFFER_KEY) || "[]");
  } catch {
    return [];
  }
}

export function clearEventBuffer() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(EVENT_BUFFER_KEY);
  } catch {
    // ignore
  }
}