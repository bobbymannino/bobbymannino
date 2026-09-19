import { defineEnvVars } from "@sveltejs/kit/env";
import * as v from "valibot";

export const variables = defineEnvVars({
  URL: {
    public: true,
    static: true,
    description: "Canonical origin of the site, used for meta tags, RSS and the sitemap",
    schema: v.pipe(v.string(), v.url()),
  },
  EMAIL: {
    public: true,
    static: true,
    description: "Contact email address shown in the footer and RSS feed",
    schema: v.pipe(v.string(), v.email()),
  },
  GITHUB_URL: {
    public: true,
    static: true,
    description: "GitHub profile URL, target of the /github redirect",
    schema: v.pipe(v.string(), v.url()),
  },
  LINKEDIN_URL: {
    public: true,
    static: true,
    description: "LinkedIn profile URL, target of the /linkedin redirect",
    schema: v.pipe(v.string(), v.url()),
  },
  SENTRY_DSN: {
    public: true,
    static: true,
    description: "Sentry DSN, read at runtime. Leave unset to disable error reporting",
    schema: v.optional(v.pipe(v.string(), v.url())),
  },
  DRAGONFLY_URL: {
    description: "Dragonfly connection URL used to store anonymous post likes",
    schema: v.optional(v.pipe(v.string(), v.url()), "redis://127.0.0.1:6379"),
  },
  ANONYMOUS_LIKE_SECRET: {
    description: "Secret used to sign anonymous like identifiers",
    schema: v.optional(v.pipe(v.string(), v.minLength(32))),
  },
});
