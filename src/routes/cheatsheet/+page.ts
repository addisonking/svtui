import { docs, type Doc } from '$lib/config/docs';

export const prerender = true;

export function load(): { docs: Doc[] } {
	return { docs };
}
