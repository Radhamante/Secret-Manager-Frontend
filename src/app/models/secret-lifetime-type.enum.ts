export const SecretLifetimeType = {
  MINUTES: 1,
  HOURS: 60,
  DAYS: 1440,
  WEEKS: 10080,
  MONTHS: 43200,
} as const;

export type SecretLifetimeType =
  (typeof SecretLifetimeType)[keyof typeof SecretLifetimeType];
