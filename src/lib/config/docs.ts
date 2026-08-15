import { type Component } from 'svelte';

import {
	ButtonExample,
	ActionButtonExample,
	ActionListExample,
	InputExample,
	TextAreaExample,
	CheckboxExample,
	RadioButtonGroupExample,
	BadgeExample,
	AlertBannerExample,
	CardExample,
	TableExample,
	DialogExample,
	AccordionExample,
	BreadCrumbsExample,
	NavigationExample,
	DividerExample,
	CodeBlockExample,
	AvatarExample,
	BarProgressExample,
	BlockLoaderExample,
	ASCIICanvasExample
} from './(component-examples)';

import buttonSource from '$lib/components/button.svelte?raw';
import actionButtonSource from '$lib/components/action-button.svelte?raw';
import actionListSource from '$lib/components/action-list.svelte?raw';
import inputSource from '$lib/components/input.svelte?raw';
import textAreaSource from '$lib/components/text-area.svelte?raw';
import checkboxSource from '$lib/components/checkbox.svelte?raw';
import radioButtonGroupSource from '$lib/components/radio-button-group.svelte?raw';
import badgeSource from '$lib/components/badge.svelte?raw';
import alertBannerSource from '$lib/components/alert-banner.svelte?raw';
import cardSource from '$lib/components/card.svelte?raw';
import tableSource from '$lib/components/table/table.svelte?raw';
import dialogSource from '$lib/components/dialog/dialog.svelte?raw';
import accordionSource from '$lib/components/accordion.svelte?raw';
import breadcrumbsSource from '$lib/components/breadcrumbs.svelte?raw';
import navigationSource from '$lib/components/navigation.svelte?raw';
import dividerSource from '$lib/components/divider.svelte?raw';
import codeBlockSource from '$lib/components/code-block.svelte?raw';
import avatarSource from '$lib/components/avatar.svelte?raw';
import barProgressSource from '$lib/components/bar-progress.svelte?raw';
import blockLoaderSource from '$lib/components/block-loader.svelte?raw';
import asciiCanvasSource from '$lib/components/ascii-canvas.svelte?raw';

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
		name: 'Action List',
		slug: 'action-list',
		description: 'Action lists present a list of actions or options to the user.',
		componentExample: ActionListExample,
		source: actionListSource,
		sourceName: 'action-list.svelte'
	},
	{
		name: 'Input',
		slug: 'input',
		description: 'A styled monospace text input field with custom caret display.',
		componentExample: InputExample,
		source: inputSource,
		sourceName: 'input.svelte'
	},
	{
		name: 'Text Area',
		slug: 'text-area',
		description: 'A themed auto-growing textarea with a fake-caret display.',
		componentExample: TextAreaExample,
		source: textAreaSource,
		sourceName: 'text-area.svelte'
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
		name: 'Radio Button Group',
		slug: 'radio-button-group',
		description: 'A self-contained group of radio options with selection state.',
		componentExample: RadioButtonGroupExample,
		source: radioButtonGroupSource,
		sourceName: 'radio-button-group.svelte'
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
		name: 'Alert Banner',
		slug: 'alert-banner',
		description: 'A flat banner with a drop-shadow corner for inline notices.',
		componentExample: AlertBannerExample,
		source: alertBannerSource,
		sourceName: 'alert-banner.svelte'
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
		name: 'Dialog',
		slug: 'dialog',
		description: 'A modal dialog built on bits-ui with accessible focus management and backdrop.',
		componentExample: DialogExample,
		source: dialogSource,
		sourceName: 'dialog.svelte'
	},
	{
		name: 'Accordion',
		slug: 'accordion',
		description: 'A collapsible row that toggles an indented content section.',
		componentExample: AccordionExample,
		source: accordionSource,
		sourceName: 'accordion.svelte'
	},
	{
		name: 'Breadcrumbs',
		slug: 'breadcrumbs',
		description: 'A breadcrumb trail of named links separated by a chevron.',
		componentExample: BreadCrumbsExample,
		source: breadcrumbsSource,
		sourceName: 'breadcrumbs.svelte'
	},
	{
		name: 'Navigation',
		slug: 'navigation',
		description: 'A top nav bar with logo and left, center, right slots.',
		componentExample: NavigationExample,
		source: navigationSource,
		sourceName: 'navigation.svelte'
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
		name: 'Code Block',
		slug: 'code-block',
		description: 'Code blocks are used to display code snippets in a formatted manner.',
		componentExample: CodeBlockExample,
		source: codeBlockSource,
		sourceName: 'code-block.svelte'
	},
	{
		name: 'Avatar',
		slug: 'avatar',
		description: 'A square avatar tile with an image or placeholder, optionally a link.',
		componentExample: AvatarExample,
		source: avatarSource,
		sourceName: 'avatar.svelte'
	},
	{
		name: 'Bar Progress',
		slug: 'bar-progress',
		description: 'A character-based progress bar that fills with a glyph.',
		componentExample: BarProgressExample,
		source: barProgressSource,
		sourceName: 'bar-progress.svelte'
	},
	{
		name: 'Block Loader',
		slug: 'block-loader',
		description: 'A spinning braille or block glyph loader.',
		componentExample: BlockLoaderExample,
		source: blockLoaderSource,
		sourceName: 'block-loader.svelte'
	},
	{
		name: 'ASCII Canvas',
		slug: 'ascii-canvas',
		description: 'A per-cell ASCII canvas that runs a rAF painter and diffs cells.',
		componentExample: ASCIICanvasExample,
		source: asciiCanvasSource,
		sourceName: 'ascii-canvas.svelte'
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
