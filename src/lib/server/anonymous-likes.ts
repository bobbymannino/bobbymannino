import { createHmac, randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import { dev } from "$app/env";
import { ANONYMOUS_LIKE_SECRET } from "$app/env/private";
import type { Cookies } from "@sveltejs/kit";

const COOKIE_NAME = "anonymous_like_id";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
const ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const secret = ANONYMOUS_LIKE_SECRET ?? randomBytes(32).toString("hex");

function sign(id: string): string {
  return createHmac("sha256", secret).update(id).digest("hex");
}

function readSignedId(value: string | undefined): string | null {
  if (!value) return null;

  const separator = value.lastIndexOf(".");
  if (separator < 0) return null;

  const id = value.slice(0, separator);
  const signature = value.slice(separator + 1);
  if (!ID_PATTERN.test(id)) return null;

  const expected = sign(id);
  if (signature.length !== expected.length) return null;

  return timingSafeEqual(Buffer.from(signature), Buffer.from(expected)) ? id : null;
}

export function getAnonymousLikeId(cookies: Cookies) {
  return readSignedId(cookies.get(COOKIE_NAME));
}

export function getOrCreateAnonymousLikeId(cookies: Cookies) {
  const existingId = getAnonymousLikeId(cookies);
  if (existingId) return existingId;

  const id = randomUUID();
  cookies.set(COOKIE_NAME, `${id}.${sign(id)}`, {
    path: "/",
    httpOnly: true,
    maxAge: COOKIE_MAX_AGE,
    sameSite: "strict",
    secure: !dev,
  });

  return id;
}
