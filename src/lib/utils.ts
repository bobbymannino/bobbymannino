/**
 * Copies the provided string to the system clipboard.
 *
 * @param {string} str - The text string to be copied to clipboard
 */
export function copyTextToClipboard(str: string) {
  navigator.clipboard.writeText(str);
}
