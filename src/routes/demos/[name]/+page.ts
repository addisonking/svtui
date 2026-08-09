import { error } from '@sveltejs/kit';
import { demos, demosBySlug, type Demo } from '$lib/config/demos';

export const prerender = true;

export function entries() {
	return demos.map((d) => ({ name: d.slug }));
}

export function load({ params }: { params: { name: string } }): { demo: Demo } {
	const demo = demosBySlug[params.name];
	if (!demo) throw error(404, `Unknown demo: ${params.name}`);
	return { demo };
}
