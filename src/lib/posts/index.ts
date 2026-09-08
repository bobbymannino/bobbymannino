import { dev } from "$app/env";
import * as v from "valibot";

/**
 * Returns an array of posts, newest first
 *
 * @returns An array of posts
 */
export function listPosts() {
  try {
    const rawPosts = Object.entries(import.meta.glob("./*.md", { eager: true, query: "?raw" }));

    const allPosts = rawPosts.map(([path, module]) => {
      return parsePost(module.default, path);
    });

    const publishedPosts = dev
      ? allPosts.map((p) => {
          if (p.meta.publishedOn) return p;
          return { ...p, meta: { ...p.meta, publishedOn: new Date() } };
        })
      : allPosts.filter((post) => !!post.meta.publishedOn);

    return publishedPosts.sort((a, b) => b.meta.publishedOn.getTime() - a.meta.publishedOn.getTime());
  } catch {
    return [];
  }
}

/**
 * Returns an array of post metadata (no content), newest first
 *
 * @returns An array of post metadata
 */
export function listPostMetas(): PostMeta[] {
  return listPosts().map(({ meta }) => ({ meta }));
}

/**
 * Returns a single post (including content) by its slug
 *
 * @param slug The slug of the post to find
 * @returns The matching post, or undefined if none exists
 */
export function getPost(slug: string) {
  return listPosts().find((post) => post.meta.slug === slug) ?? null;
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

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*\r?\n?/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Reads a single frontmatter scalar
 *
 * Supports quoted strings, `YYYY-MM-DD` dates and bare words
 *
 * @param raw The trimmed text to the right of the `key:`
 * @returns The parsed value
 */
function parseScalar(raw: string): string | Date {
  if (raw.startsWith('"') && raw.endsWith('"')) return raw.slice(1, -1);
  if (raw.startsWith("'") && raw.endsWith("'")) return raw.slice(1, -1);
  if (DATE.test(raw)) return new Date(raw);
  return raw;
}

/**
 * Splits a markdown file into its frontmatter and its body
 *
 * The frontmatter is a small YAML subset: one `key: value` per line, where a
 * value is a quoted string, a bare word, a `YYYY-MM-DD` date or a `[a, b]` list
 *
 * @param file The raw contents of a markdown file
 * @returns The frontmatter data and the remaining content
 */
function parseFrontmatter(file: string): { data: Record<string, unknown>; content: string } {
  const match = FRONTMATTER.exec(file);

  if (!match) return { data: {}, content: file };

  const data: Record<string, unknown> = {};

  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator < 0) continue;

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    if (!key || !value) continue;

    data[key] =
      value.startsWith("[") && value.endsWith("]")
        ? value
            .slice(1, -1)
            .split(",")
            .map((item) => parseScalar(item.trim()))
            .filter((item) => item !== "")
        : parseScalar(value);
  }

  return { data, content: file.slice(match[0].length) };
}

/**
 * Given a path to a post, will return the content of the file
 *
 * @param content The path to the file
 * @returns A string containing the contents of the file
 */
function parsePost(content: string, path: string) {
  const slug = path.slice(2, -3);
  const raw = parseFrontmatter(content);
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

const postMetaSchema = v.object({
  meta: v.object({
    title: stringSchema,
    publishedOn: v.optional(v.date()),
    tagline: stringSchema,
    slug: stringSchema,
    series: v.optional(stringSchema),
    tags: v.fallback(v.array(stringSchema), []),
    thumbnailSrc: v.optional(stringSchema),
    thumbnailAlt: v.optional(stringSchema),
    readingTime: v.number(),
  }),
});

const postSchema = v.object({
  ...postMetaSchema.entries,
  content: stringSchema,
});

export type Post = v.InferOutput<typeof postSchema>;
export type PostMeta = v.InferOutput<typeof postMetaSchema>;
