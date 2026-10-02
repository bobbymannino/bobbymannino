import * as Sentry from "@sentry/sveltekit";
import { sequence, type Handle, type HandleServerError } from "@sveltejs/kit/hooks";
import { paraglideMiddleware } from "#lib/paraglide/server.js";

const paraglideHandle: Handle = ({ event, resolve }) =>
  paraglideMiddleware(event.request, ({ request, locale }) => {
    // `request` is typed readonly in SvelteKit 3, but swapping in paraglide's de-localized request still works
    (event as { request: Request }).request = request;

    return resolve(event, {
      transformPageChunk: ({ html }) => html.replace("%paraglide.lang%", locale),
    });
  });

export const handle: Handle = sequence(Sentry.sentryHandle(), paraglideHandle);
export const handleError: HandleServerError = Sentry.handleErrorWithSentry();
