import { dev } from "$app/environment";
import matter from "gray-matter";
import * as v from "valibot";

/**
 * Lazy per-file loaders for the raw markdown. Because the glob is *not* eager,
 * a post's body is only imported when its loader is invoked, so an individual
 * post page pulls in just its own markdown instead of every post's content.
 */
const postFiles = import.meta.glob("./*.md", { query: "?raw", import: "default" }) as Record<
  string,
  () => Promise<string>
>;

const stringSchema = v.pipe(v.string(), v.trim(), v.minLength(1));

const metaSchema = v.object({
  title: stringSchema,
  publishedOn: v.optional(v.date()),
  tagline: stringSchema,
  slug: stringSchema,
  tags: v.fallback(v.array(stringSchema), []),
  thumbnailSrc: v.optional(stringSchema),
  thumbnailAlt: v.optional(stringSchema),
  readingTime: v.number(),
});

const postSchema = v.object({
  content: stringSchema,
  meta: metaSchema,
});

export type PostMeta = v.InferOutput<typeof metaSchema>;
/** A post without its (potentially large) markdown body. */
export type PostPreview = { meta: PostMeta };
export type Post = v.InferOutput<typeof postSchema>;

function pathToSlug(path: string): string {
  return path.slice(2, -3);
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
 * Parses a raw markdown file (frontmatter + body) into a fully typed post.
 *
 * @param raw The raw contents of the markdown file
 * @param path The glob path of the file, used to derive the slug
 * @returns The parsed post
 */
function parsePost(raw: string, path: string): Post {
  const slug = pathToSlug(path);
  const parsed = matter(raw);
  const readingTime = calculateReadingTime(parsed.content);

  const result = v.safeParse(postSchema, {
    content: parsed.content,
    meta: { ...parsed.data, slug, readingTime },
  });

  if (!result.success) {
    throw new Error(`Cannot parse post '${slug}'`);
  }

  return result.output;
}

/** In dev, posts without a publish date are treated as published "now". */
function withDevDate<T extends PostPreview>(post: T): T {
  if (!dev || post.meta.publishedOn) return post;
  return { ...post, meta: { ...post.meta, publishedOn: new Date() } };
}

function isPublished(post: PostPreview): boolean {
  return dev || !!post.meta.publishedOn;
}

function byNewest(a: PostPreview, b: PostPreview): number {
  return (b.meta.publishedOn?.getTime() ?? 0) - (a.meta.publishedOn?.getTime() ?? 0);
}

/**
 * Returns lightweight metadata for every published post, newest first.
 *
 * The markdown body is intentionally omitted so it is never serialized to
 * pages that only need to list or link posts.
 *
 * @returns An array of post metadata
 */
export async function listPostsMeta(): Promise<PostPreview[]> {
  try {
    const posts = await Promise.all(
      Object.entries(postFiles).map(async ([path, load]) => parsePost(await load(), path)),
    );

    return posts
      .map(withDevDate)
      .filter(isPublished)
      .sort(byNewest)
      .map(({ meta }) => ({ meta }));
  } catch {
    return [];
  }
}

/**
 * Loads a single post including its markdown body, lazily importing only that
 * post's file.
 *
 * @param slug The slug of the post to load
 * @returns The post, or null if it does not exist or is not published
 */
export async function getPost(slug: string): Promise<Post | null> {
  const entry = Object.entries(postFiles).find(([path]) => pathToSlug(path) === slug);
  if (!entry) return null;

  const [path, load] = entry;
  const post = withDevDate(parsePost(await load(), path));

  if (!isPublished(post)) return null;

  return post;
}
