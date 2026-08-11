// Docs-site theme settings — manages three orthogonal axes that compose on
// <body> as class names: theme (light/dark), tint (8 hues), font (6 faces).
// Persists to localStorage and syncs to URL search params so palettes are
// shareable. Docs-site-only; ships nothing into the component library.
import { writable } from 'svelte/store';

export type ThemeName = 'light' | 'dark';
export type TintName = 'none' | 'green' | 'blue' | 'red' | 'yellow' | 'purple' | 'orange' | 'pink';
export type FontName = 'geist' | 'fixedsys' | 'vt220' | 'phoenix' | 'jetbrains';

export type Settings = {
	theme: ThemeName;
	tint: TintName;
	font: FontName;
	grid: boolean;
};

export const tints: TintName[] = [
	'none',
	'green',
	'blue',
	'red',
	'yellow',
	'purple',
	'orange',
	'pink'
];
export const fonts: FontName[] = ['geist', 'fixedsys', 'vt220', 'phoenix', 'jetbrains'];

const STORAGE_KEY = 'svtui:settings';
const DEFAULTS: Settings = { theme: 'dark', tint: 'none', font: 'geist', grid: false };

function readStorage(): Settings {
	if (typeof localStorage === 'undefined') return { ...DEFAULTS };
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
	} catch {
		/* ignore malformed */
	}
	return { ...DEFAULTS };
}

function readUrl(): Partial<Settings> {
	if (typeof window === 'undefined') return {};
	const p = new URLSearchParams(window.location.search);
	const out: Partial<Settings> = {};
	const theme = p.get('theme');
	const tint = p.get('tint');
	const font = p.get('font');
	if (theme === 'light' || theme === 'dark') out.theme = theme;
	if (tint && tints.includes(tint as TintName)) out.tint = tint as TintName;
	if (font && fonts.includes(font as FontName)) out.font = font as FontName;
	if (p.get('grid') === '1') out.grid = true;
	return out;
}

function applyToBody(s: Settings) {
	if (typeof document === 'undefined') return;
	const body = document.body;
	body.classList.remove('theme-light', 'theme-dark');
	body.classList.add(s.theme === 'light' ? 'theme-light' : 'theme-dark');
	body.classList.toggle('show-grid', s.grid);
	for (const t of tints) body.classList.remove(`tint-${t}`);
	body.classList.add(`tint-${s.tint}`);
	for (const f of fonts) body.classList.remove(`font-${f}`);
	body.classList.add(`font-${s.font}`);
}

function writeUrl(s: Settings) {
	if (typeof window === 'undefined') return;
	const p = new URLSearchParams();
	if (s.theme !== DEFAULTS.theme) p.set('theme', s.theme);
	if (s.tint !== DEFAULTS.tint) p.set('tint', s.tint);
	if (s.font !== DEFAULTS.font) p.set('font', s.font);
	if (s.grid) p.set('grid', '1');
	const qs = p.toString();
	const url = qs
		? `${window.location.pathname}?${qs}${window.location.hash}`
		: window.location.pathname + window.location.hash;
	window.history.replaceState({}, '', url);
}

const initial: Settings = { ...readStorage(), ...readUrl() };
applyToBody(initial);

export const settings = writable<Settings>(initial);

settings.subscribe((s) => {
	applyToBody(s);
	if (typeof localStorage !== 'undefined') {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
		} catch {
			/* ignore */
		}
	}
	writeUrl(s);
});

export function setTheme(theme: ThemeName) {
	settings.update((s) => ({ ...s, theme }));
}
export function setTint(tint: TintName) {
	settings.update((s) => ({ ...s, tint }));
}
export function setFont(font: FontName) {
	settings.update((s) => ({ ...s, font }));
}
export function toggleTheme() {
	settings.update((s) => ({ ...s, theme: s.theme === 'light' ? 'dark' : 'light' }));
}
export function toggleGrid() {
	settings.update((s) => ({ ...s, grid: !s.grid }));
}
// Alias for the old mode-watcher API name, so call sites don't need to change.
export const toggleMode = toggleTheme;
