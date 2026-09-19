import { getRequestEvent, command, query } from "$app/server";
import { getPost } from "$lib/posts";
import { getAnonymousLikeId, getOrCreateAnonymousLikeId } from "$lib/server/anonymous-likes";
import { getPostLikeStatus as readPostLikeStatus, setPostLiked as writePostLiked } from "$lib/server/post-likes";
import { error } from "@sveltejs/kit";
import * as v from "valibot";

const slugSchema = v.pipe(v.string(), v.trim(), v.minLength(1), v.maxLength(200));
const statusInputSchema = v.object({ slug: slugSchema });
const updateInputSchema = v.object({ slug: slugSchema, liked: v.boolean() });

function ensurePostExists(slug: string) {
  if (!getPost(slug)) error(404, "Post not found");
}

export const getPostLikeStatus = query(statusInputSchema, async ({ slug }) => {
  const { cookies } = getRequestEvent();
  ensurePostExists(slug);

  return readPostLikeStatus(slug, getAnonymousLikeId(cookies));
});

export const updatePostLike = command(updateInputSchema, async ({ slug, liked }) => {
  const { cookies } = getRequestEvent();
  ensurePostExists(slug);

  const anonymousId = liked ? getOrCreateAnonymousLikeId(cookies) : getAnonymousLikeId(cookies);

  if (!anonymousId) return readPostLikeStatus(slug, null);

  return writePostLiked(slug, anonymousId, liked);
});
