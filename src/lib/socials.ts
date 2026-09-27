import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "$app/env/public";
import { EnvelopeIcon, GithubIcon, LinkedinIcon } from "$lib/icons";
import { m } from "$lib/paraglide/messages";
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
    get title() {
      return m.social_github_title();
    },
    href: GITHUB_URL,
    icon: GithubIcon,
  },
  {
    platform: "email",
    get title() {
      return m.social_email_title();
    },
    href: `mailto:${EMAIL}`,
    icon: EnvelopeIcon,
  },
  {
    platform: "linkedin",
    get title() {
      return m.social_linkedin_title();
    },
    href: LINKEDIN_URL,
    icon: LinkedinIcon,
  },
];
