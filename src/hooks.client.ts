import { SENTRY_DSN } from "$app/env/public";
import * as Sentry from "@sentry/sveltekit";
import { version } from "../package.json";

Sentry.init({
  dsn: SENTRY_DSN,
  enabled: Boolean(SENTRY_DSN),
  tunnel: "/api/rt",
  environment: process.env.NODE_ENV,
  release: version,
  enableLogs: true,
  tracesSampleRate: 1,
});

export const handleError = Sentry.handleErrorWithSentry();
