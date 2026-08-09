import { llmsFullTxt } from '$lib/config/llm';

export const prerender = true;

export function GET() {
	return new Response(llmsFullTxt(), {
		headers: { 'content-type': 'text/plain; charset=utf-8' }
	});
}
