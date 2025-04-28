import { read } from "$app/server";
import fontRegular from "$lib/inter/inter@400.ttf";
import fontBold from "$lib/inter/inter@900.ttf";
import satori from "satori";
import { html as toReact } from "satori-html";
import sharp from "sharp";
import type { Component, ComponentProps } from "svelte";
import { render } from "svelte/server";

export async function componentToJpeg<T extends Component<any>>(
  component: T,
  {
    props,
    width,
    height,
  }: {
    props: ComponentProps<T>;
    width: number;
    height: number;
  },
) {
  const { body: html } = render(component, { props });

  const reactNode = toReact(html);

  const svg = await satori(reactNode, {
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

  const buffer = Buffer.from(svg);

  return await sharp(buffer).jpeg().toBuffer();
}
