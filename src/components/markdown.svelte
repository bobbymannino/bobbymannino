<script lang="ts">
  import "$lib/code.css";
  import { copyTextToClipboard } from "$lib/utils";

  type Props = {
    html: string;
  };

  let { html }: Props = $props();

  /** Copies a code block, or a heading's permalink, when its control is clicked */
  function onclick(event: MouseEvent) {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const copyButton = target.closest("[data-copy]");

    if (copyButton) {
      const code = copyButton.closest("[data-code-block]")?.querySelector("code");
      if (!code) return;

      copyTextToClipboard(code.textContent ?? "");
      copyButton.setAttribute("data-copied", "");
      setTimeout(() => copyButton.removeAttribute("data-copied"), 2000);

      return;
    }

    const headingLink = target.closest<HTMLAnchorElement>("[data-heading-link]");
    if (headingLink) copyTextToClipboard(headingLink.href);
  }
</script>

<div {onclick} class="markdown">{@html html}</div>
