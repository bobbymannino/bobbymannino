import { read } from "$app/server";
import robotoRegular from "$lib/roboto/roboto@400.ttf";
import robotoBlack from "$lib/roboto/roboto@900.ttf";
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
        name: "Roboto",
        style: "normal",
        weight: 800,
        data: await read(robotoBlack).arrayBuffer(),
      },
      {
        name: "Roboto",
        style: "normal",
        weight: 400,
        data: await read(robotoRegular).arrayBuffer(),
      },
    ],
  });

  const buffer = Buffer.from(svg);

  return await sharp(buffer).jpeg().toBuffer();
}
