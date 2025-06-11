import CPCTravel from "$lib/images/cpc-travel.png?enhanced&w=400";
import CPCBureau from "$lib/images/cpc-bureau.png?enhanced&w=400";
import FriaryMillTraining from "$lib/images/friary-mill-training.png?enhanced&w=400";

export type Project = {
  title: string;
  href?: string;
  thumbnail: string;
  year: number;
  languages: string[];
  status: "Released" | "Beta" | "Development" | "Private";
};

export const projects: Project[] = [
  {
    year: 2025,
  },
  {
    title: "Friary Mill Training",
    thumbnail: FriaryMillTraining,
    status: "Private",
    languages: ["nextjs", "postgres", "dufs"],
    year: 2025,
  },
  {
    title: "CPC Bureau de Change",
    href: "https://www.cpc-bureau-de-change.co.uk",
    thumbnail: CPCBureau,
    languages: ["sveltekit", "postgres"],
    status: "Released",
    year: 2022,
  },
  {
    title: "CPC Travel",
    href: "https://www.cpc-travel.co.uk",
    thumbnail: CPCTravel,
    languages: ["sveltekit", "postgres", "firebase", "stripe"],
    status: "Released",
    year: 2020,
  },
];
