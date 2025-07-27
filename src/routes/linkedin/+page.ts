import { redirect } from "@sveltejs/kit";
import { PUBLIC_LINKEDIN_URL } from "$env/static/public";

export const load = () => redirect(308, PUBLIC_LINKEDIN_URL);
