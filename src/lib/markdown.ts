import { textToId, type Heading } from "$lib/headings";
import hljs from "highlight.js";
import { Marked, Renderer } from "marked";

function escapeHtml(raw: string) {
  return raw
    .replace(/&(?!#?\w+;)/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const CHECK_ICON = `<svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.3209 4.24472C20.0143 4.69807 20.2088 5.62768 19.7555 6.32105L11.2555 19.321C10.9972 19.7161 10.5681 19.9665 10.0971 19.997C9.62616 20.0276 9.16828 19.8347 8.86114 19.4764L4.36114 14.2264C3.82201 13.5974 3.89485 12.6504 4.52384 12.1113C5.15283 11.5722 6.09978 11.645 6.63891 12.274L9.83828 16.0066L17.2446 4.6793C17.6979 3.98593 18.6275 3.79136 19.3209 4.24472Z" fill="currentColor"/></svg>`;

const DUPLICATE_ICON = `<svg class="size-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 8V5.25C8 3.45508 9.45507 2 11.25 2H18.75C20.5449 2 22 3.45507 22 5.25V12.75C22 14.5449 20.5449 16 18.75 16H16V18.75C16 20.5449 14.5449 22 12.75 22H5.25C3.45507 22 2 20.5449 2 18.75V11.25C2 9.45508 3.45507 8 5.25 8H8ZM11.25 16C9.45507 16 8 14.5449 8 12.75V10H5.25C4.55964 10 4 10.5596 4 11.25V18.75C4 19.4404 4.55964 20 5.25 20H12.75C13.4404 20 14 19.4404 14 18.75V16H11.25Z" fill="currentColor"/></svg>`;

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
