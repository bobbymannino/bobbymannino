import type { Post } from "$lib/posts";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    interface PageData {
      posts: Post[];
    }
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
