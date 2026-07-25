import { PUBLIC_GITHUB_URL } from "$env/static/public";
import { redirect } from "@sveltejs/kit";

export const load = () => redirect(308, PUBLIC_GITHUB_URL);
