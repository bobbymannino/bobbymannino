import CPCTravel from "$lib/images/cpc-travel.png?enhanced";
import CPCBureau from "$lib/images/cpc-bureau.png?enhanced";
import Bingoverse from "$lib/images/bingoverse.png?enhanced";

export type Project = {
  title: string;
  href?: string;
  thumbnail: string;
  status: "Released" | "Beta" | "Development";
};

export const projects: Project[] = [
  {
    title: "CPC Travel",
    href: "https://www.cpc-travel.co.uk",
    thumbnail: CPCTravel,
    status: "Released",
  },
  {
    title: "CPC Bureau de Change",
    href: "https://www.cpc-bureau-de-change.co.uk",
    thumbnail: CPCBureau,
    status: "Released",
  },
  {
    title: "Bingoverse",
    thumbnail: Bingoverse,
    status: "Development",
    href: "https://bingoverse.bobman.dev",
  },
];
