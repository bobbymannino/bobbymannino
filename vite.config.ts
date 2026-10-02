import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { sentrySvelteKit } from "@sentry/sveltekit/vite";
import adapter from "@sveltejs/adapter-bun";
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
      paraglideVitePlugin({
        project: "./project.inlang",
        outdir: "./src/lib/paraglide",
        strategy: ["url", "baseLocale"],
      }),
      enhancedImages(),
      tailwindcss(),
      sveltekit({
        adapter: adapter(),
        experimental: {
          remoteFunctions: true,
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
