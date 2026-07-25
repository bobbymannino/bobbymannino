import * as Sentry from "@sentry/sveltekit";

import { version } from "../package.json";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  enabled: Boolean(process.env.SENTRY_DSN),
  environment: process.env.NODE_ENV,
  release: version,
  enableLogs: true,
  tracesSampleRate: 1,
});
