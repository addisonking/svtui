import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import pkg from './package.json';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
	define: {
		__SVTUI_VERSION__: JSON.stringify(pkg.version)
	}
});
