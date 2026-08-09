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
	CheckboxExample,
	DividerExample,
	RowExample,
	RowSpaceBetweenExample,
	IndentExample,
	BlockExample,
	TextExample
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
import dividerSource from '$lib/components/divider.svelte?raw';
import rowSource from '$lib/components/row.svelte?raw';
import rowSpaceBetweenSource from '$lib/components/row-space-between.svelte?raw';
import indentSource from '$lib/components/indent.svelte?raw';
import blockSource from '$lib/components/block.svelte?raw';
import textSource from '$lib/components/text.svelte?raw';

export type Doc = {
	name: string;
	slug: string;
	description: string;
	componentExample: Component;
	source: string;
	sourceName: string;
	propsType?: string;
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
		slug: 'input',
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
	},
	{
		name: 'Divider',
		slug: 'divider',
		description: 'Horizontal rules in DEFAULT, DOUBLE, and GRADIENT variants.',
		componentExample: DividerExample,
		source: dividerSource,
		sourceName: 'divider.svelte'
	},
	{
		name: 'Row',
		slug: 'row',
		description: 'A block-level row that highlights on focus.',
		componentExample: RowExample,
		source: rowSource,
		sourceName: 'row.svelte'
	},
	{
		name: 'Row Space Between',
		slug: 'row-space-between',
		description: 'A flex row that pushes its children to opposite edges.',
		componentExample: RowSpaceBetweenExample,
		source: rowSpaceBetweenSource,
		sourceName: 'row-space-between.svelte'
	},
	{
		name: 'Indent',
		slug: 'indent',
		description: 'A left-padded block (1ch) for visually nesting content.',
		componentExample: IndentExample,
		source: indentSource,
		sourceName: 'indent.svelte'
	},
	{
		name: 'Block',
		slug: 'block',
		description: 'A 1ch inline block, used as a textual spacer or marker.',
		componentExample: BlockExample,
		source: blockSource,
		sourceName: 'block.svelte'
	},
	{
		name: 'Text',
		slug: 'text',
		description: 'A paragraph that wraps long lines and preserves whitespace.',
		componentExample: TextExample,
		source: textSource,
		sourceName: 'text.svelte'
	}
];

// Extract the `export type *Props = …` block from a component's raw source.
// Keeps the props spec in sync with the source — no second hand-maintained copy.
// Terminates at the closing `</script>` so it handles both object-shape props
// (ending `};`) and discriminated-union props (ending `});`).
function extractPropsType(source: string): string {
	const m = source.match(/export type \w+Props\s*=\s*[\s\S]*?\n<\/script>/);
	return m ? m[0].replace(/\n<\/script>$/, '') : '';
}

for (const d of docs) d.propsType = extractPropsType(d.source);

export const docsBySlug = Object.fromEntries(docs.map((d) => [d.slug, d]));
