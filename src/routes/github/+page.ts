import { redirect } from "@sveltejs/kit";
import { PUBLIC_GITHUB_URL } from "$env/static/public";

export const load = () => redirect(308, PUBLIC_GITHUB_URL);
