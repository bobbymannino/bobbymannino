export type Heading = {
  text: string;
  id: string;
  level: number;
};

/** Turns a heading's text into a slug usable as an element id */
export function textToId(text: string) {
  return text
    .replace(/[^\w\s-]/g, "")
    .replace(/\s/g, "-")
    .toLowerCase();
}
