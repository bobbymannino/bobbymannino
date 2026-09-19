import { textToId, type Heading } from "$lib/headings";
import { CheckIcon, DuplicateIcon } from "$lib/icons";
import hljs from "highlight.js";
import { Marked, Renderer } from "marked";
import type { Component } from "svelte";
import { render } from "svelte/server";

function escapeHtml(raw: string) {
  return raw
    .replace(/&(?!#?\w+;)/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Renders an icon component to an HTML string, so markdown HTML stays in sync with the icon package */
function renderIcon(Icon: Component<Record<string, unknown>>) {
  return render(Icon, { props: { class: "size-4" } }).body;
}

const CHECK_ICON = renderIcon(CheckIcon);
const DUPLICATE_ICON = renderIcon(DuplicateIcon);

const md = new Marked({ gfm: true }).use({
  renderer: {
    heading({ tokens, depth, text: raw }) {
      const text = this.parser.parseInline(tokens);
      const id = textToId(raw);
      const style = depth === 1 ? ` style="--vtn: post-title-${id}"` : "";

      return `<h${depth} id="${id}"${style}><a href="#${id}" data-heading-link tabindex="0" class="ring-on-focus-visible relative before:absolute before:right-[calc(100%+.25rem)] before:opacity-50 hover:underline hover:before:content-['#']">${text}</a></h${depth}>`;
    },

    code({ text, lang }) {
      const language = (lang || "").trim();
      const highlighted = hljs.getLanguage(language)
        ? hljs.highlight(text, { language }).value
        : hljs.highlightAuto(text).value;

      return `<div data-code-block><div class="flex items-center justify-between border-b border-zinc-300 bg-zinc-200 p-2 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"><span class="uppercase">${escapeHtml(language)}</span><button type="button" data-copy title="Copy code to the clipboard" class="ring-on-focus-visible hover:text-accent-600 active:text-accent-700 flex cursor-pointer items-center gap-1 active:scale-95"><span data-copy-state="idle" class="flex items-center gap-1">${DUPLICATE_ICON}<span>Copy</span></span><span data-copy-state="done" class="flex items-center gap-1">${CHECK_ICON}<span>Copied</span></span></button></div><pre><code class="hljs">${highlighted}</code></pre></div>`;
    },

    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const titleAttr = title ? ` title="${escapeHtml(title)}"` : "";

      return `<a href="${escapeHtml(href)}"${titleAttr} target="_blank" rel="noopener noreferrer" tabindex="0" class="ring-on-focus-visible hover:underline">${text}</a>`;
    },

    table(token) {
      return `<div class="overflow-x-auto">${Renderer.prototype.table.call(this, token)}</div>`;
    },
  },
});

/**
 * Renders a post's markdown to HTML, collecting its headings on the way
 *
 * @param markdown The markdown body of a post
 * @returns The rendered HTML and a flat list of its headings
 */
export function renderMarkdown(markdown: string): { html: string; headings: Heading[] } {
  const tokens = md.lexer(markdown);

  const headings = tokens
    .filter((token) => token.type === "heading")
    .map((token) => ({
      text: token.text.replace(/[`*]/g, ""),
      level: token.depth,
      id: textToId(token.text),
    }));

  return { html: md.parser(tokens), headings };
}
