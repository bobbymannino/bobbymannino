import { read } from "$app/server";
import fontRegular from "$lib/inter/inter@400.ttf";
import fontBold from "$lib/inter/inter@900.ttf";
import satori from "satori";
import sharp from "sharp";

type Node = Parameters<typeof satori>[0];

export async function nodeToJpeg(node: Node, { width, height }: { width: number; height: number }) {
  const svg = await satori(node, {
    width,
    height,
    fonts: [
      {
        name: "Inter",
        style: "normal",
        weight: 700,
        data: await read(fontBold).arrayBuffer(),
      },
      {
        name: "Inter",
        style: "normal",
        weight: 400,
        data: await read(fontRegular).arrayBuffer(),
      },
    ],
  });

  return await sharp(Buffer.from(svg)).jpeg().toBuffer();
}
