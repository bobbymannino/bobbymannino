import { paraglideMiddleware } from "$lib/paraglide/server";
import * as Sentry from "@sentry/sveltekit";
import type { Handle, HandleServerError } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

const paraglideHandle: Handle = ({ event, resolve }) =>
  paraglideMiddleware(event.request, ({ request, locale }) => {
    event.request = request;

    return resolve(event, {
      transformPageChunk: ({ html }) => html.replace("%paraglide.lang%", locale),
    });
  });

export const handle: Handle = sequence(Sentry.sentryHandle(), paraglideHandle);
export const handleError: HandleServerError = Sentry.handleErrorWithSentry();
