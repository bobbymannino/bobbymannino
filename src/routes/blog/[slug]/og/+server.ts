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
    readingTime: post.meta.readingTime,
  };

  const jpeg = await componentToJpeg(Card, { width, height, props });

  return new Response(jpeg, {
    headers: {
      "Content-Type": "image/jpeg",
      "Content-Disposition": `inline; filename="${params.slug}.jpg"`,
      // Instructs browsers and CDNs to cache this image for ~1 month
      // since it's unlikely to change and will improve load performance
      "Cache-Control": "public, max-age=2500000, immutable",
    },
  });
};
