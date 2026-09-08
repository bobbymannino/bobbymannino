import type { RequestHandler } from "./$types";

export const GET: RequestHandler = () => {
  return new Response(JSON.stringify(Date.now()), {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
};
