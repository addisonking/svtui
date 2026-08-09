import { type Component } from 'svelte';

import { ChatDemo, SnakeDemo } from './(demos)';

export type Demo = {
	name: string;
	slug: string;
	description: string;
	component: Component;
};

export const demos: Demo[] = [
	{
		name: 'AI Chat',
		slug: 'ai-chat',
		description: 'A Claude / ChatGPT-style chat clone. Frontend only, with a fake think + reply.',
		component: ChatDemo
	},
	{
		name: 'Snake',
		slug: 'snake',
		description: 'A terminal snake game rendered on the ASCII Canvas component.',
		component: SnakeDemo
	}
];

export const demosBySlug = Object.fromEntries(demos.map((d) => [d.slug, d]));
