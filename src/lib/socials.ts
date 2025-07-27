import {
  PUBLIC_EMAIL,
  PUBLIC_GITHUB_URL,
  PUBLIC_LINKEDIN_URL,
} from "$env/static/public";
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
    href: PUBLIC_GITHUB_URL,
    icon: GithubIcon,
  },
  {
    platform: "email",
    title: "send me an email",
    href: `mailto:${PUBLIC_EMAIL}`,
    icon: EnvelopeIcon,
  },
  {
    platform: "linkedin",
    title: "see me me on linkedin",
    href: PUBLIC_LINKEDIN_URL,
    icon: LinkedinIcon,
  },
];
