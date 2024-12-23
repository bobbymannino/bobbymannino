import * as v from "valibot";
import matter from "gray-matter";

/**
 * Returns an array of posts
 * @returns An array of posts
 */
export function listPosts() {
  try {
    const posts = Object.entries(
      import.meta.glob("./*.md", { eager: true, query: "?raw" }),
    );

    return posts.map(([path, module]) => {
      return parsePost(module.default);
    });
  } catch {
    return [];
  }
}

/**
 * Given a path to a post, will return the content of the file
 * @param content The path to the file
 * @returns A string containing the contents of the file
 */
function parsePost(content: string) {
  const post = matter(content);

  const parsed = v.safeParse(postMetadataSchema, post.data);

  if (!parsed.success) {
    console.error("Failed to parse post");
    console.error(parsed.issues);
    throw new Error(`Cannot parse file '${content}'`);
  }

  return {
    content: post.content,
    meta: parsed.output,
  };
}

const postMetadataSchema = v.object({
  title: v.string(),
  slug: v.string(),
  publishedOn: v.date(),
  tagline: v.string(),
  tags: v.array(v.string()),
});
