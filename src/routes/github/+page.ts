import { GITHUB_URL } from "$app/env/public";
import { redirect } from "@sveltejs/kit";

export const load = () => redirect(308, GITHUB_URL);
