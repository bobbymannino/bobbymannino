import { SENTRY_DSN } from "$app/env/public";
import * as Sentry from "@sentry/sveltekit";
import { version } from "../package.json";

Sentry.init({
  dsn: SENTRY_DSN,
  enabled: Boolean(SENTRY_DSN),
  tunnel: "/api/rt",
  environment: process.env.NODE_ENV,
  release: version,
  tracesSampleRate: 1,
  // v11 collects more by default; keep the v10 (sendDefaultPii off) baseline
  dataCollection: {
    userInfo: false,
    cookies: false,
    httpHeaders: {
      request: { deny: ["forwarded", "-ip", "remote-", "via", "-user"] },
      response: { deny: ["forwarded", "-ip", "remote-", "via", "-user"] },
    },
    httpBodies: [],
    urlQueryParams: { deny: ["forwarded", "-ip", "remote-", "via", "-user"] },
    genAI: { inputs: false, outputs: false },
    databaseQueryData: false,
    queues: false,
    graphQL: { document: false, variables: false },
  },
});

export const handleError = Sentry.handleErrorWithSentry();
