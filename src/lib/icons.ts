import type { Component } from "svelte";
import { render } from "svelte/server";

export { default as ThemeIcon } from "central-icons/IconAppearanceDarkMode";
export { default as CalendarIcon } from "central-icons/IconCalendar1";
export { default as CheckIcon } from "central-icons/IconCheckmark1";
export { default as ChevronDownIcon } from "central-icons/IconChevronBottom";
export { default as ChevronLeftIcon } from "central-icons/IconChevronLeft";
export { default as ChevronRightIcon } from "central-icons/IconChevronRight";
export { default as ChevronUpIcon } from "central-icons/IconChevronTop";
export { default as ClockIcon } from "central-icons/IconClock";
export { default as XIcon } from "central-icons/IconCrossMedium";
export { default as EnvelopeIcon } from "central-icons/IconEmail1";
export { default as EyeCrossedOutIcon } from "central-icons/IconEyeSlash";
export { default as GithubIcon } from "central-icons/IconGithub";
export { default as HeartIcon } from "central-icons/IconHeart";
export { default as BeakerIcon } from "central-icons/IconLab";
export { default as LinkedinIcon } from "central-icons/IconLinkedin";
export { default as SearchIcon } from "central-icons/IconMagnifyingGlass";
export { default as MoonIcon } from "central-icons/IconMoon";
export { default as RocketIcon } from "central-icons/IconRocket";
export { default as CogIcon } from "central-icons/IconSettingsGear1";
export { default as ShareIcon } from "central-icons/IconShareOs";
export { default as DuplicateIcon } from "central-icons/IconSquareBehindSquare1";
export { default as SunIcon } from "central-icons/IconSun";
export { default as LoadingIcon } from "central-icons/IconLoader";

/** Renders an icon component to an HTML string for non-component contexts. */
export function renderIcon(
  Icon: Component<Record<string, unknown>>,
  props: Record<string, unknown> = {
    class: "size-4",
  },
) {
  return render(Icon, { props }).body;
}
