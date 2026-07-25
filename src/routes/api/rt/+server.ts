import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, fetch }) => {
  if (!process.env.SENTRY_DSN) error(404);

  const dsn = new URL(process.env.SENTRY_DSN);
  const projectId = dsn.pathname.replace(/^\//, "");
  const upstream = `${dsn.protocol}//${dsn.host}/api/${projectId}/envelope/?sentry_key=${dsn.username}`;

  const response = await fetch(upstream, {
    method: "POST",
    body: await request.arrayBuffer(),
    headers: { "Content-Type": "application/x-sentry-envelope" },
  });

  return new Response(null, { status: response.status });
};
