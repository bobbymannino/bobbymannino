import { DRAGONFLY_URL } from "$app/env/private";

const dragonfly = new Bun.RedisClient(DRAGONFLY_URL);

function postLikesKey(slug: string): string {
  return `blog:post:${slug}:likes`;
}

export async function getPostLikeStatus(slug: string, anonymousId: string | null) {
  const key = postLikesKey(slug);
  const [count, liked] = await Promise.all([
    dragonfly.scard(key),
    anonymousId ? dragonfly.sismember(key, anonymousId) : Promise.resolve(false),
  ]);

  return { count, liked };
}

export async function setPostLiked(slug: string, anonymousId: string, liked: boolean) {
  const key = postLikesKey(slug);

  if (liked) await dragonfly.sadd(key, anonymousId);
  else await dragonfly.srem(key, anonymousId);

  return { count: await dragonfly.scard(key), liked };
}
