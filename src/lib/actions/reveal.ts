import { onScroll, stagger, waapi } from "animejs";
import type { Action } from "svelte/action";

type Options = {
  /**
   * How long each child takes to fade in (in ms)
   * @default 333
   */
  duration?: number;
  /**
   * Gap between each child starting (in ms)
   * @default 50
   */
  stagger?: number;
  /**
   * How far below its resting place each child starts (in px)
   * @default 16
   */
  distance?: number;
};

/**
 * Fades and slides the elements children in, one after the other, once the element enters the viewport
 */
export const reveal: Action<HTMLElement, Options | undefined> = (node, options) => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const { duration = 333, stagger: gap = 50, distance = 16 } = options ?? {};

  const children = Array.from(node.children) as HTMLElement[];
  for (const child of children) child.style.opacity = "0";

  const animation = waapi.animate(children, {
    opacity: [0, 1],
    y: [distance, 0],
    duration,
    delay: stagger(gap),
    ease: "outQuad",
    autoplay: onScroll({ target: node, enter: "bottom", repeat: false }),
  });

  return {
    destroy() {
      animation.revert();
      for (const child of children) child.style.removeProperty("opacity");
    },
  };
};
