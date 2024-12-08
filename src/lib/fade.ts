type Options = {
  /**
   * Control the speed of each letter being faded in (in ms)
   * @default 4
   */
  speed?: number;
  /**
   * Control the delay before the first letter is faded in (in ms)
   * @default 0
   */
  delay?: number;
};

export function fade(node: HTMLElement, options?: Options) {
  const text = node.textContent || "";
  const textLength = text.length;

  const _options = options
    ? {
        speed: options.speed ?? 4,
        delay: options.delay ?? 0,
      }
    : {
        speed: 4,
        delay: 0,
      };

  node.textContent = "";

  for (let i = 0; i < textLength; i++) {
    const span = document.createElement("span");
    span.className =
      "inline-block scale-50 opacity-0 transition-all ease-in-out whitespace-pre";
    span.textContent = text[i];
    node.appendChild(span);
  }

  let i = 1;

  let decrementInterval: number;
  setTimeout(() => {
    decrementInterval = setInterval(() => {
      const span = node.querySelector(`span:nth-child(${i})`);
      span?.classList.remove("scale-50", "opacity-0");
      i++;

      if (i > textLength) {
        clearInterval(decrementInterval);
        return;
      }
    }, _options.speed);
  }, _options.delay);

  return () => {
    clearInterval(decrementInterval);
  };
}
