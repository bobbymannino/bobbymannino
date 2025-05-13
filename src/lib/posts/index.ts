import { dev } from "$app/environment";
import matter from "gray-matter";
import * as v from "valibot";

/**
 * Returns an array of posts
 * @returns An array of posts
 */
export function listPosts() {
  try {
    const rawPosts = Object.entries(
      import.meta.glob("./*.md", { eager: true, query: "?raw" }),
    );

    const allPosts = rawPosts.map(([path, module]) => {
      return parsePost(module.default, path);
    });

    const publishedPosts = dev
      ? allPosts.map((p) => {
          if (p.meta.publishedOn) return p;
          return { ...p, meta: { ...p.meta, publishedOn: new Date() } };
        })
      : allPosts.filter((post) => !!post.meta.publishedOn);

    return publishedPosts.sort(
      (a, b) => b.meta.publishedOn.getTime() - a.meta.publishedOn.getTime(),
    );
  } catch {
    return [];
  }
}

/**
 * Calculates the reading time based on words per minute
 *
 * @param content The content to calculate reading time for
 * @param wordsPerMinute Words per minute reading speed @default 100
 * @returns Reading time in minutes
 */
function calculateReadingTime(content: string, wordsPerMinute = 100): number {
  const words = content.trim().split(/\s+/).length;
  const minutes = words / wordsPerMinute;
  return Math.max(1, Math.round(minutes));
}

/**
 * Given a path to a post, will return the content of the file
 *
 * @param content The path to the file
 * @returns A string containing the contents of the file
 */
function parsePost(content: string, path: string) {
  const slug = path.slice(2, -3);
  const raw = matter(content);
  const readingTime = calculateReadingTime(raw.content);

  const parsed = v.safeParse(postSchema, {
    content: raw.content,
    meta: { ...raw.data, slug, readingTime },
  });

  if (!parsed.success) {
    throw new Error(`Cannot parse file '${content}'`);
  }

  return parsed.output;
}

const stringSchema = v.pipe(v.string(), v.trim(), v.minLength(1));

const postSchema = v.object({
  content: stringSchema,
  meta: v.object({
    title: stringSchema,
    publishedOn: v.optional(v.date()),
    tagline: stringSchema,
    slug: stringSchema,
    tags: v.fallback(v.array(stringSchema), []),
    thumbnailSrc: v.optional(stringSchema),
    thumbnailAlt: v.optional(stringSchema),
    readingTime: v.number(),
  }),
});

export type Post = v.InferOutput<typeof postSchema>;
