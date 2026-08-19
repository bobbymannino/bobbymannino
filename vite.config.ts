import { sentrySvelteKit } from "@sentry/sveltekit";
import adapter from "@sveltejs/adapter-node";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      sentrySvelteKit({
        telemetry: false,
        release: {
          create: false,
          finalize: false,
        },
        sentryUrl: env.SENTRY_URL,
        org: env.SENTRY_ORG,
        project: env.SENTRY_PROJECT,
        authToken: env.SENTRY_AUTH_TOKEN,
      }),
      enhancedImages(),
      tailwindcss(),
      sveltekit({
        adapter: adapter(),
        alias: {
          $components: "./src/components",
          "$components/*": "./src/components/*",
        },
        experimental: {
          explicitEnvironmentVariables: true,
          instrumentation: {
            server: true,
          },
        },
      }),
    ],
    assetsInclude: ["**/*.md"],
    build: {
      sourcemap: true,
    },
    define: {
      __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
    },
  };
});
