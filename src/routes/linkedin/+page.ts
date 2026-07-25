import { LINKEDIN_URL } from "$app/env/public";
import { redirect } from "@sveltejs/kit";

export const load = () => redirect(308, LINKEDIN_URL);
