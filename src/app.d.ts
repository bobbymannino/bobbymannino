import type { PostMeta } from "$lib/posts";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    interface PageData {
      posts: PostMeta[];
    }
    // interface PageState {}
    // interface Platform {}

    type Clsx = string | Record<string, boolean> | Clsx[];
  }
}

export {};
