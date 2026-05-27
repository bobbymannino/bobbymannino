const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@£$%^&*()_-/\\?~";

const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

type Options = {
  /**
   * Control the speed of each letter being unscrambled (in ms)
   * @default 66
   */
  speed?: number;
  /**
   * Control the delay before the first letter in unscambled (in ms)
   * @default 1000
   */
  delay?: number;
};

export function hacker(node: HTMLElement, options?: Options) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const text = node.textContent || "";
  const textLength = text.length;

  const _options = options
    ? {
        speed: options.speed ?? 66,
        delay: options.delay ?? 1000,
      }
    : {
        speed: 66,
        delay: 1000,
      };

  node.textContent = Array.from({ length: textLength }).map(randomChar).join("");

  let i = 0;

  const shuffleInterval = setInterval(() => {
    node.textContent =
      text.slice(0, i) +
      Array.from({ length: textLength - i })
        .map(randomChar)
        .join("");
  }, 33);

  let decrementInterval: NodeJS.Timeout;
  const timeout = setTimeout(() => {
    decrementInterval = setInterval(() => {
      i++;

      if (i > textLength) {
        clearInterval(shuffleInterval);
        clearInterval(decrementInterval);
        return;
      }
    }, _options.speed);
  }, _options.delay);

  return () => {
    clearTimeout(timeout);
    clearInterval(shuffleInterval);
    clearInterval(decrementInterval);
  };
}
