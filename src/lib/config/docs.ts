import { type Component } from 'svelte';

import {
	ButtonExample,
	ActionButtonExample,
	LabelInputExample,
	BadgeExample,
	CodeBlockExample,
	ActionListExample,
	CardExample,
	TableExample,
	CheckboxExample
} from './(component-examples)';

import buttonSource from '$lib/components/button.svelte?raw';
import actionButtonSource from '$lib/components/action-button.svelte?raw';
import actionListSource from '$lib/components/action-list.svelte?raw';
import badgeSource from '$lib/components/badge.svelte?raw';
import cardSource from '$lib/components/card.svelte?raw';
import codeBlockSource from '$lib/components/code-block.svelte?raw';
import inputSource from '$lib/components/input.svelte?raw';
import checkboxSource from '$lib/components/checkbox.svelte?raw';
import tableSource from '$lib/components/table/table.svelte?raw';

export type Doc = {
	name: string;
	slug: string;
	description: string;
	componentExample: Component;
	source: string;
	sourceName: string;
};

export const docs: Doc[] = [
	{
		name: 'Button',
		slug: 'button',
		description: 'Buttons that should be used primarily for actions that require attention.',
		componentExample: ButtonExample,
		source: buttonSource,
		sourceName: 'button.svelte'
	},
	{
		name: 'Action Button',
		slug: 'action-button',
		description:
			'Buttons that represent actions, typically used for navigation or important tasks.',
		componentExample: ActionButtonExample,
		source: actionButtonSource,
		sourceName: 'action-button.svelte'
	},
	{
		name: 'Input/Label',
		slug: 'input-label',
		description:
			'Input fields for user text input, specifically. Labels describe the input fields.',
		componentExample: LabelInputExample,
		source: inputSource,
		sourceName: 'input.svelte'
	},
	{
		name: 'Badge',
		slug: 'badge',
		description: 'Small, inline elements used to display status, counts, or labels.',
		componentExample: BadgeExample,
		source: badgeSource,
		sourceName: 'badge.svelte'
	},
	{
		name: 'Code Block',
		slug: 'code-block',
		description: 'Code blocks are used to display code snippets in a formatted manner.',
		componentExample: CodeBlockExample,
		source: codeBlockSource,
		sourceName: 'code-block.svelte'
	},
	{
		name: 'Action List',
		slug: 'action-list',
		description: 'Action lists present a list of actions or options to the user.',
		componentExample: ActionListExample,
		source: actionListSource,
		sourceName: 'action-list.svelte'
	},
	{
		name: 'Card',
		slug: 'card',
		description: 'Container components used to group related content with optional titles.',
		componentExample: CardExample,
		source: cardSource,
		sourceName: 'card.svelte'
	},
	{
		name: 'Table',
		slug: 'table',
		description:
			'Tables display data in rows and columns with optional reactive cell highlighting.',
		componentExample: TableExample,
		source: tableSource,
		sourceName: 'table.svelte'
	},
	{
		name: 'Checkbox',
		slug: 'checkbox',
		description: 'Checkboxes allow users to select one or more options from a set.',
		componentExample: CheckboxExample,
		source: checkboxSource,
		sourceName: 'checkbox.svelte'
	}
];

export const docsBySlug = Object.fromEntries(docs.map((d) => [d.slug, d]));
