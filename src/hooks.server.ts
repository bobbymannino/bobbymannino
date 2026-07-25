import * as Sentry from "@sentry/sveltekit";
import type { Handle, HandleServerError } from "@sveltejs/kit";

export const handle: Handle = Sentry.sentryHandle();
export const handleError: HandleServerError = Sentry.handleErrorWithSentry();
