import {
	ButtonExample,
	ActionButtonExample,
	LabelInputExample,
	BadgeExample,
	CodeBlockExample,
	ActionListExample,
	CardExample
} from './(component-examples)';
import { type Component } from 'svelte';

const docs: {
	name: string;
	description: string;
	componentExample: Component;
}[] = [
	{
		name: 'Button',
		description: 'Buttons that should be used primarily for actions that require attention.',
		componentExample: ButtonExample
	},
	{
		name: 'Action Button',
		description:
			'Buttons that represent actions, typically used for navigation or important tasks.',
		componentExample: ActionButtonExample
	},
	{
		name: 'Input/Label',
		description:
			'Input fields for user text input, specifically. Labels are used to describe the input fields.',
		componentExample: LabelInputExample
	},
	{
		name: 'Badge',
		description: 'Badges are small, inline elements used to display status, counts, or labels.',
		componentExample: BadgeExample
	},
	{
		name: 'Code Block',
		description: 'Code blocks are used to display code snippets in a formatted manner.',
		componentExample: CodeBlockExample
	},
	{
		name: 'Action List',
		description: 'Action lists are used to present a list of actions or options to the user.',
		componentExample: ActionListExample
	},
	{
		name: 'Card',
		description: 'Cards are container components used to group related content with optional titles.',
		componentExample: CardExample
	}
];

export { docs };
