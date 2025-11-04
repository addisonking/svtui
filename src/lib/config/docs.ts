import {
	ButtonExample,
	ActionButtonExample,
	LabelInputExample,
	BadgeExample,
	CodeBlockExample,
	ButtonExampleRaw,
	ActionButtonExampleRaw,
	LabelInputExampleRaw,
	BadgeExampleRaw,
	CodeBlockExampleRaw
} from './(component-examples)';
import { type Component } from 'svelte';

const docs: {
	name: string;
	description: string;
	componentExample: Component;
	componentExampleRaw: string;
}[] = [
	{
		name: 'Button',
		description: 'Buttons that should be used primarily for actions that require attention.',
		componentExample: ButtonExample,
		componentExampleRaw: ButtonExampleRaw
	},
	{
		name: 'Action Button',
		description:
			'Buttons that represent actions, typically used for navigation or important tasks.',
		componentExample: ActionButtonExample,
		componentExampleRaw: ActionButtonExampleRaw
	},
	{
		name: 'Input/Label',
		description:
			'Input fields for user text input, specifically. Labels are used to describe the input fields.',
		componentExample: LabelInputExample,
		componentExampleRaw: LabelInputExampleRaw
	},
	{
		name: 'Badge',
		description: 'Badges are small, inline elements used to display status, counts, or labels.',
		componentExample: BadgeExample,
		componentExampleRaw: BadgeExampleRaw
	},
	{
		name: 'Code Block',
		description: 'Code blocks are used to display code snippets in a formatted manner.',
		componentExample: CodeBlockExample,
		componentExampleRaw: CodeBlockExampleRaw
	}
];

export { docs };
