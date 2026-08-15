// Build LLM-ingestible views of the component catalog. Single source of truth
// is docs.ts (+ registry.json for the manifest). The /llms.txt, /llms-full.txt,
// and /registry.json routes all derive from these so nothing is hand-maintained.
import { docs } from './docs';
import registryJson from '../../../registry.json';

const VERSION = __SVTUI_VERSION__;

/** Short markdown index — what exists and where to read it. */
export function llmsTxt(): string {
	const lines = [
		`# svtui`,
		``,
		`> Terminal-aesthetic Svelte 5 components. Self-contained source files you copy into your project (shadcn-style). v${VERSION}.`,
		``,
		`<https://github.com/addisonking/svtui>`,
		``,
		`## Components`,
		``
	];
	for (const d of docs) {
		lines.push(`- ${d.name} (\`svtui add ${d.slug}\`): ${d.description}`);
		lines.push(`  source: https://svtui.addisonking.com/components/${d.slug}`);
	}
	lines.push(
		``,
		`## Full source`,
		``,
		`All component sources concatenated: https://svtui.addisonking.com/llms-full.txt`
	);
	lines.push(
		``,
		`## Manifest`,
		``,
		`Machine-readable: https://svtui.addisonking.com/registry.json`
	);
	return lines.join('\n') + '\n';
}

/** All component sources concatenated into one fetchable document. */
export function llmsFullTxt(): string {
	const parts = [`# svtui — full component source (v${VERSION})`, ``];
	for (const d of docs) {
		parts.push(
			`================================================================================`,
			``
		);
		parts.push(`COMPONENT: ${d.name}  (slug: ${d.slug})`, `purpose: ${d.description}`, ``);
		parts.push(`-------- ${d.sourceName} --------`, '```svelte');
		parts.push(d.source);
		parts.push('```', ``);
	}
	return parts.join('\n') + '\n';
}

/** The registry manifest as JSON (same shape registry.json ships to the CLI). */
export function registryManifest(): unknown {
	return registryJson;
}
