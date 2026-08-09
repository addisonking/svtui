import { error } from '@sveltejs/kit';
import { docs, docsBySlug, type Doc } from '$lib/config/docs';

export const prerender = true;

export function entries() {
	return docs.map((d) => ({ name: d.slug }));
}

export function load({ params }: { params: { name: string } }): { doc: Doc } {
	const doc = docsBySlug[params.name];
	if (!doc) throw error(404, `Unknown component: ${params.name}`);
	return { doc };
}
