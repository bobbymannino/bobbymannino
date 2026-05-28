import type { PostPreview } from "$lib/posts";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    interface PageData {
      posts: PostPreview[];
    }
    // interface PageState {}
    // interface Platform {}

    type Clsx = string | Record<string, boolean> | Clsx[];
  }
}

export {};
