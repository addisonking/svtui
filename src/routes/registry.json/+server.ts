import { registryManifest } from '$lib/config/llm';

export const prerender = true;

export function GET() {
	return new Response(JSON.stringify(registryManifest(), null, 2), {
		headers: { 'content-type': 'application/json; charset=utf-8' }
	});
}
