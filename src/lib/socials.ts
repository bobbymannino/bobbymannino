import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "$app/env/public";
import EnvelopeIcon from "$lib/icons/envelope-icon.svelte";
import GithubIcon from "$lib/icons/github.svelte";
import LinkedinIcon from "$lib/icons/linkedin-icon.svelte";
import type { Component } from "svelte";

type Social = {
  platform: string;
  href: string;
  title: string;
  icon: Component;
};

export const socials: Social[] = [
  {
    platform: "github",
    title: "see this repo on github",
    href: GITHUB_URL,
    icon: GithubIcon,
  },
  {
    platform: "email",
    title: "send me an email",
    href: `mailto:${EMAIL}`,
    icon: EnvelopeIcon,
  },
  {
    platform: "linkedin",
    title: "see me me on linkedin",
    href: LINKEDIN_URL,
    icon: LinkedinIcon,
  },
];
