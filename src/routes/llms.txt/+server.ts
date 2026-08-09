import { llmsTxt } from '$lib/config/llm';

export const prerender = true;

export function GET() {
	return new Response(llmsTxt(), {
		headers: { 'content-type': 'text/plain; charset=utf-8' }
	});
}
