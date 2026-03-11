// amplify/data/resource.ts

import { a, defineData, type ClientSchema } from "@aws-amplify/backend";

const schema = a.schema({
  QuizSession: a
    .model({
      // clientSessionId correlates frontend local session storage with backend session rows
      clientSessionId: a.string().required(),
      status: a.enum(["ACTIVE", "COMPLETED", "ABANDONED"]),
      tier: a.enum(["A", "B", "C"]),
      score: a.integer(),
      currentScreenId: a.string(),
      startedAt: a.datetime(),
      completedAt: a.datetime(),

      utmSource: a.string(),
      utmCampaign: a.string(),
      utmMedium: a.string(),
      referrer: a.string(),
      userAgent: a.string(),
      locale: a.string(),
      timezone: a.string(),

      responses: a.hasMany("QuizResponse", "sessionId"),
      lead: a.hasOne("WaitlistLead", "sessionId"),
      events: a.hasMany("EventLog", "sessionId"),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  QuizResponse: a
    .model({
      sessionId: a.id(),
      screenId: a.string(),
      questionKey: a.string(),
      answerType: a.enum(["single", "multi", "text", "number"]),
      answer: a.string(),
      answeredAt: a.datetime(),

      session: a.belongsTo("QuizSession", "sessionId"),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  WaitlistLead: a
    .model({
      sessionId: a.id(),
      fullName: a.string(),
      email: a.email().required(),
      phone: a.phone(),
      sourceTier: a.enum(["A", "B", "C"]),
      score: a.integer(),
      source: a.string(),
      createdAt: a.datetime(),

      session: a.belongsTo("QuizSession", "sessionId"),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  EventLog: a
    .model({
      sessionId: a.id(),
      eventName: a.string(),
      screenId: a.string(),
      properties: a.string(),
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
