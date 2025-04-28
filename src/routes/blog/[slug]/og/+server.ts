import type { ComponentProps } from "svelte";
import type { RequestHandler } from "./$types";
import Card from "./card.svelte";
import { componentToJpeg } from "./component-to-jpeg";
import { error } from "@sveltejs/kit";

const width = 738;
const height = 360;

export const GET: RequestHandler = async ({ params, locals }) => {
  const post = locals.posts.find((post) => post.meta.slug == params.slug);
  if (!post) error(404, { message: "No post with that slug found" });

  const props: ComponentProps<typeof Card> = {
    title: post.meta.title,
    publishedOn: post.meta.publishedOn,
  };

  const jpeg = await componentToJpeg(Card, { width, height, props });

  return new Response(jpeg, { headers: { "Content-Type": "image/jpeg" } });
};
