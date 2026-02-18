import { a, defineData, type ClientSchema } from "@aws-amplify/backend";

const schema = a.schema({
  QuizSession: a
    .model({
      status: a.enum(["ACTIVE", "COMPLETED", "ABANDONED"]),
      tier: a.enum(["A", "B", "C"]),
      currentScreenId: a.string(),
      startedAt: a.datetime(),
      completedAt: a.datetime(),

      // attribution + light client metadata
      utmSource: a.string(),
      utmCampaign: a.string(),
      utmMedium: a.string(),
      referrer: a.string(),
      userAgent: a.string(),
      locale: a.string(),
      timezone: a.string(),

      // relations
      responses: a.hasMany("QuizResponse", "sessionId"),
      lead: a.hasOne("WaitlistLead", "sessionId"),
      events: a.hasMany("EventLog", "sessionId"),
    })
    .authorization((allow) => [
      // v1 anonymous: public access (tighten later with Cognito + owner auth)
      allow.publicApiKey(),
    ]),

  QuizResponse: a
    .model({
      sessionId: a.id(),
      screenId: a.string(), // e.g. "S2"
      questionKey: a.string(), // e.g. "cardCountBand"
      answerType: a.enum(["single", "multi", "text", "number"]),
      answer: a.string(), // JSON.stringify(value)
      answeredAt: a.datetime(),

      session: a.belongsTo("QuizSession", "sessionId"),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  WaitlistLead: a
    .model({
      sessionId: a.id(),
      email: a.email().required(),
      phone: a.phone(),

      emailOptIn: a.boolean().default(false),
      smsOptIn: a.boolean().default(false),
      betaOptIn: a.boolean().default(false),

      sourceTier: a.enum(["A", "B", "C"]),
      createdAt: a.datetime(),

      session: a.belongsTo("QuizSession", "sessionId"),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  EventLog: a
    .model({
      sessionId: a.id(),
      eventName: a.string(), // START, SCREEN_VIEW, ANSWER_SUBMIT, TIER_COMPUTED, LEAD_SUBMIT, etc.
      screenId: a.string(),
      properties: a.string(), // JSON.stringify({...})
      createdAt: a.datetime(),

      session: a.belongsTo("QuizSession", "sessionId"),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: { expiresInDays: 30 },
  },
});
