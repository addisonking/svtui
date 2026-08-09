/**
 * flatten.ts — build the distributable registry the CLI ships.
 *
 * For each item in registry.json:
 *   1. Copies its source files into cli/registry/<name>/, preserving the
 *      path under src/lib/components (so `table` keeps its subfolder).
 *   2. Validates self-containment: items declaring no npmDependencies must
 *      not import any runtime npm package. `svelte`, `svelte/elements` and
 *      `svelte/...` type-only imports are allowed (Svelte ships those).
 *
 * Writes cli/registry/index.json — the resolved registry the CLI reads at
 * runtime, so `svtui add <name>` works offline from the installed package.
 *
 * Run: `bun run scripts/flatten.ts`
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = join(root, 'registry.json');
const outDir = join(root, 'cli', 'registry');

type Item = {
	name: string;
	type: string;
	files: string[];
	npmDependencies: string[];
	registryDependencies: string[];
};

function readRegistry(): { items: Item[] } {
	if (!existsSync(registryPath)) throw new Error('registry.json not found');
	const raw = JSON.parse(readFileSync(registryPath, 'utf8'));
	if (!Array.isArray(raw.items)) throw new Error('registry.json: missing "items" array');
	return raw;
}

function readText(p: string): string {
	return readFileSync(p, 'utf8');
}

// Imports we consider "free" — they ship with Svelte, not extra npm deps.
const SVELLE_BUILTINS = new Set([
	'svelte',
	'svelte/elements',
	'svelte/motion',
	'svelte/store',
	'svelte/transition',
	'svelte/animate',
	'svelte/easing',
	'svelte/events',
	'svelte/reactivity'
]);
// SvelteKit path aliases — not npm packages.
const KIT_ALIASES = new Set(['$lib', '$app']);

function scanImportsForNpm(src: string): string[] {
	const found = new Set<string>();
	// match: import ... from 'mod';  — type-only imports too.
	const re = /^\s*import\s[\s\S]*?from\s['"]([^'"]+)['"]/gm;
	let m: RegExpExecArray | null;
	while ((m = re.exec(src)) !== null) {
		const mod = m[1];
		if (mod.startsWith('.')) continue; // relative
		const top = mod.split('/')[0];
		if (KIT_ALIASES.has(top)) continue; // SvelteKit alias, not npm
		if (!SVELLE_BUILTINS.has(top) && top !== 'svelte') {
			if (!mod.startsWith('svelte/')) found.add(top);
			else found.add(mod);
		}
	}
	return [...found];
}

function main() {
	const { items } = readRegistry();

	rmSync(outDir, { recursive: true, force: true });
	mkdirSync(outDir, { recursive: true });

	const index: Item[] = [];
	const errors: string[] = [];

	for (const item of items) {
		const itemOut = join(outDir, item.name);
		mkdirSync(itemOut, { recursive: true });

		const resolvedFiles: string[] = [];
		for (const file of item.files) {
			const srcPath = join(root, file);
			if (!existsSync(srcPath)) {
				errors.push(`${item.name}: missing source file ${file}`);
				continue;
			}
			// init items preserve their project-relative path so the CLI can write them
			// to the right place (e.g. src/app.css, static/fonts/…). component items
			// land flat under cli/registry/<name>/.
			const compsRoot = `src/lib/components/${item.name}/`;
			const rel =
				item.type === 'init'
					? file
					: file.startsWith(compsRoot)
						? file.slice(compsRoot.length)
						: file.startsWith('src/lib/components/')
							? file.slice('src/lib/components/'.length)
							: file.replace(/^src\//, './');
			const dest = join(itemOut, rel);
			mkdirSync(dirname(dest), { recursive: true });
			copyFileSync(srcPath, dest);

			resolvedFiles.push(rel);

			// Only the .svelte and .ts source can hold imports; validate them.
			if (!(file.endsWith('.svelte') || file.endsWith('.ts'))) continue;
			const src = readText(srcPath);
			const npmImports = scanImportsForNpm(src);
			const declared = new Set(item.npmDependencies);
			const undeclared = npmImports.filter(
				(mod) => !declared.has(mod) && !declared.has(mod.split('/')[0])
			);
			if (undeclared.length) {
				errors.push(
					`${item.name}: ${file} imports npm package(s) not declared: ${undeclared.join(', ')}`
				);
			}
		}
		index.push({ ...item, files: resolvedFiles });
	}

	if (errors.length) {
		for (const e of errors) console.error('✗ ' + e);
		console.error(`\n${errors.length} error(s): resolve them or update registry.json.`);
		process.exit(1);
	}

	writeFileSync(join(outDir, 'index.json'), JSON.stringify({ items: index }, null, 2) + '\n');
	console.log(`✓ built registry: ${index.length} item(s) -> cli/registry/`);
}

main();
