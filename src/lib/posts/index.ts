import * as v from "valibot";
import matter from "gray-matter";
import { dev } from "$app/environment";

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

    return publishedPosts;
  } catch {
    return [];
  }
}

/**
 * Given a path to a post, will return the content of the file
 * @param content The path to the file
 * @returns A string containing the contents of the file
 */
function parsePost(content: string, path: string) {
  const slug = path.slice(2, -3);
  const raw = matter(content);

  const parsed = v.safeParse(postSchema, {
    content: raw.content,
    meta: { ...raw.data, slug },
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
  }),
});

export type Post = v.InferOutput<typeof postSchema>;
