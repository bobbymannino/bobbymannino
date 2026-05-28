import { listPosts } from "$lib/posts";
import { nodeToJpeg } from "./component-to-jpeg";
import { error } from "@sveltejs/kit";

const width = 738;
const height = 360;

export const GET = async ({ params, url }) => {
  const post = listPosts().find((post) => post.meta.slug == params.slug);
  if (!post) error(404, { message: "No post with that slug found" });

  const dark = url.searchParams.has("dark");

  const bg = dark ? "black" : "#f4f4f5";
  const metaColor = dark ? "white" : "black";

  const publishedOn = post.meta.publishedOn || new Date();
  const meta = `${publishedOn.toLocaleDateString()} • ${post.meta.readingTime} min read • By Bobby Mannino`;

  const node = {
    type: "div",
    props: {
      style: {
        width: "738px",
        height: "360px",
        backgroundColor: bg,
        borderBottom: "36px solid #0675ff",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        padding: "16px",
        position: "relative",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              color: "#0675ff",
              position: "absolute",
              left: "8px",
              top: "8px",
              fontSize: "15px",
            },
            children: "bobman.dev",
          },
        },
        {
          type: "div",
          props: {
            style: {
              fontWeight: 800,
              fontSize: "50px",
              color: "#0675ff",
              textAlign: "right",
            },
            children: post.meta.title,
          },
        },
        {
          type: "div",
          props: {
            style: {
              fontSize: "20px",
              marginTop: "8px",
              textAlign: "right",
              color: metaColor,
            },
            children: meta,
          },
        },
      ],
    },
  };

  const jpeg = await nodeToJpeg(node, { width, height });

  return new Response(jpeg, {
    headers: {
      "Content-Type": "image/jpeg",
      "Content-Disposition": `inline; filename="${params.slug}.jpg"`,
      "Cache-Control": "public, max-age=2500000, immutable",
    },
  });
};
