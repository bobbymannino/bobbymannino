import { onScroll, scrambleText, animate } from "animejs";
import type { Action } from "svelte/action";

type Options = {
  /**
   * How long the whole unscramble takes (in ms)
   * @default 700
   */
  duration?: number;
  /**
   * Control the delay before the first letter is unscrambled (in ms)
   * @default 400
   */
  delay?: number;
};

/**
 * Scrambles the elements text, then unscrambles it once the element enters the viewport
 */
export const scramble: Action<HTMLElement, Options | undefined> = (node, options) => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const { duration = 700, delay = 400 } = options ?? {};

  const animation = animate(node, {
    textContent: scrambleText({ revealDelay: delay, duration, chars: "braille" }),
    autoplay: onScroll({ target: node, enter: "bottom", repeat: false }),
  });

  return {
    destroy() {
      animation.revert();
    },
  };
};
