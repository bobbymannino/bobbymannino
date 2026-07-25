import { PUBLIC_LINKEDIN_URL } from "$env/static/public";
import { redirect } from "@sveltejs/kit";

export const load = () => redirect(308, PUBLIC_LINKEDIN_URL);
