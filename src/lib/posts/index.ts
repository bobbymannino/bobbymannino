import * as v from "valibot";
import matter from "gray-matter";

/**
 * Returns an array of posts
 * @returns An array of posts
 */
export function listPosts() {
  try {
    const rawPosts = Object.entries(
      import.meta.glob("./*.md", { eager: true, query: "?raw" }),
    );

    const posts = rawPosts.map(([path, module]) => {
      return parsePost(module.default, path);
    });

    const publishedPosts = posts.filter(
      (post) => post.meta.publishedOn != undefined,
    );

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
  const post = matter(content);

  const parsed = v.safeParse(postMetadataSchema, post.data);

  if (!parsed.success) {
    throw new Error(`Cannot parse file '${content}'`);
  }

  return {
    content: post.content,
    meta: { ...parsed.output, slug },
  };
}

const postMetadataSchema = v.object({
  title: v.string(),
  publishedOn: v.optional(v.date()),
  tagline: v.string(),
  tags: v.array(v.string()),
  thumbnailSrc: v.optional(v.string()),
  thumbnailAlt: v.optional(v.string()),
});

type PostMetadata = v.InferOutput<typeof postMetadataSchema>;

export type Post = {
  content: string;
  meta: PostMetadata;
};
