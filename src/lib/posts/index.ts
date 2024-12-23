import { readdirSync } from "node:fs";
import * as v from "valibot";
import grayMatter from "gray-matter";

/**
 * Returns an array of posts
 * @returns An array of posts
 */
export function listPosts() {
  const dir = import.meta.dirname;
  const files = readdirSync(dir);

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => `${dir}/${file}`);
}

/**
 * Given a path to a post, will return the content of the file
 * @param file The path to the file
 * @returns A string containing the contents of the file
 */
export function getPost(file: string) {
  const post = grayMatter.read(file);

  const parsed = v.safeParse(postMetadataSchema, post.data);

  if (!parsed.success) {
    console.error(parsed.issues);
    throw new Error(`Cannot parse file '${file}'`);
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
