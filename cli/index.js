#!/usr/bin/env node
// svtui CLI — terminal-aesthetic Svelte components, copied into your project.
// `init` writes the token preset + font; `add <name>` copies a self-contained
// component; `list` shows what's available. Components read CSS vars defined by
// `init`, so run that first.
import { existsSync, mkdirSync, readFileSync, copyFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const VERSION = '0.1.3';
const here = dirname(fileURLToPath(import.meta.url));
const registryDir = join(here, 'registry');
const registryFile = join(registryDir, 'index.json');

// ---------- helpers ----------
function readRegistry() {
	if (!existsSync(registryFile)) {
		console.error('svtui: registry not found. This build of the CLI is incomplete.');
		process.exit(1);
	}
	return JSON.parse(readFileSync(registryFile, 'utf8'));
}

function findItem(items, name) {
	return items.find((i) => i.name === name);
}

function detectPM(cwd) {
	if (existsSync(join(cwd, 'bun.lock')) || existsSync(join(cwd, 'bun.lockb'))) return 'bun';
	if (existsSync(join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
	if (existsSync(join(cwd, 'yarn.lock'))) return 'yarn';
	return 'npm';
}

function installHint(pm, deps) {
	const cmd = { bun: 'bun add', pnpm: 'pnpm add', yarn: 'yarn add', npm: 'npm install' }[pm];
	return `${cmd} ${deps.join(' ')}`;
}

// Copy a file, creating parent dirs. Returns true if written, false if skipped.
function writeFile(src, dest, force) {
	if (existsSync(dest) && !force) {
		console.log(`  skip  ${dest} (exists; use --force to overwrite)`);
		return false;
	}
	mkdirSync(dirname(dest), { recursive: true });
	copyFileSync(src, dest);
	console.log(`  wrote ${dest}`);
	return true;
}

// ---------- commands ----------
function help() {
	console.log(`svtui ${VERSION} — terminal-aesthetic Svelte components

  svtui init              write the token preset (src/app.css) + font into your project
  svtui add <name>        copy a self-contained component into src/lib/components
  svtui list              list available components
  svtui --version
  svtui --help

  --cwd <dir>   run in <dir> instead of the current directory
  --out <dir>   write components to <dir> instead of <cwd>/src/lib/components
  --force       overwrite existing files

Run \`svtui init\` first — components read CSS variables it defines.
See https://github.com/addisonking/svtui`);
}

function list() {
	const { items } = readRegistry();
	console.log('Available components:');
	for (const it of items) {
		const tag = it.type === 'init' ? '(init)' : '';
		const deps = it.npmDependencies.length ? `  deps: ${it.npmDependencies.join(', ')}` : '';
		console.log(`  ${it.name}${tag ? ' ' + tag : ''}${deps}`);
	}
}

function add(args) {
	const { positional, cwd, out, force } = parseArgs(args);
	const name = positional[0];
	if (!name) return fail('add: missing component name. Try `svtui list`.');

	const { items } = readRegistry();
	const item = findItem(items, name);
	if (!item) return fail(`add: unknown component "${name}". Try \`svtui list\`.`);
	if (item.type === 'init') return fail(`add: "${name}" is an init item. Use \`svtui init\`.`);

	const componentsDir = out ? resolve(cwd, out) : join(cwd, 'src', 'lib', 'components');
	// Multi-file components get their own subfolder; single-file ones live flat.
	const destBase = item.files.length > 1 ? join(componentsDir, item.name) : join(componentsDir);

	console.log(`Adding ${item.name} -> ${destBase}/`);
	let wroteAny = false;
	for (const rel of item.files) {
		const src = join(registryDir, item.name, rel);
		if (!existsSync(src)) return fail(`registry missing file ${item.name}/${rel}`);
		// single-file: write basename; multi-file: preserve rel under destBase
		const destName = item.files.length > 1 ? rel : rel.split('/').pop();
		if (writeFile(src, join(destBase, destName), force)) wroteAny = true;
	}

	if (!wroteAny) {
		console.log('Nothing written (all files already existed).');
		return;
	}

	if (item.npmDependencies.length) {
		const pm = detectPM(cwd);
		console.log(
			`\nThis component needs npm dependencies. Install them:\n  ${installHint(pm, item.npmDependencies)}`
		);
	}
}

function init(args) {
	const { cwd, force } = parseArgs(args);
	const { items } = readRegistry();
	const item = findItem(items, 'tokens');
	if (!item || item.type !== 'init') return fail('init: tokens item missing from registry.');

	console.log('Writing token preset + font...');
	for (const rel of item.files) {
		const src = join(registryDir, item.name, rel);
		if (!existsSync(src)) return fail(`registry missing file ${item.name}/${rel}`);
		const dest = join(cwd, rel);
		writeFile(src, dest, force);
	}
	console.log('\nDone. Components you add will read the CSS variables in src/app.css.');
}

// ---------- arg parsing ----------
function parseArgs(args) {
	const opts = { cwd: process.cwd(), out: null, force: false, positional: [] };
	for (let i = 0; i < args.length; i++) {
		const a = args[i];
		if (a === '--cwd') opts.cwd = resolve(args[++i]);
		else if (a === '--out') opts.out = args[++i];
		else if (a === '--force') opts.force = true;
		else opts.positional.push(a);
	}
	return opts;
}

function fail(msg) {
	console.error('svtui: ' + msg);
	process.exit(1);
}

// ---------- entry ----------
const args = process.argv.slice(2);
const cmd = args[0];
const rest = args.slice(1);

if (!cmd || cmd === '-h' || cmd === '--help' || cmd === 'help') {
	help();
	process.exit(0);
}
if (cmd === '-v' || cmd === '--version') {
	console.log(VERSION);
	process.exit(0);
}
if (cmd === 'list') {
	list();
	process.exit(0);
}
if (cmd === 'init') {
	init(rest);
	process.exit(0);
}
if (cmd === 'add') {
	add(rest);
	process.exit(0);
}

fail(`unknown command "${cmd}". Try \`svtui --help\`.`);
