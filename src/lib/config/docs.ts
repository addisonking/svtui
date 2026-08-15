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
	ASCIICanvasExample,
	KbdExample,
	SpinnerExample,
	TabsExample,
	AsciiChartExample,
	SwitchExample,
	CommandPaletteExample,
	SelectExample
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
import kbdSource from '$lib/components/kbd.svelte?raw';
import spinnerSource from '$lib/components/spinner.svelte?raw';
import tabsSource from '$lib/components/tabs.svelte?raw';
import asciiChartSource from '$lib/components/ascii-chart.svelte?raw';
import switchSource from '$lib/components/switch.svelte?raw';
import commandPaletteSource from '$lib/components/command-palette.svelte?raw';
import selectSource from '$lib/components/select.svelte?raw';

import buttonExampleSource from './(component-examples)/button.svelte?raw';
import actionButtonExampleSource from './(component-examples)/action-button.svelte?raw';
import actionListExampleSource from './(component-examples)/action-list.svelte?raw';
import inputExampleSource from './(component-examples)/input.svelte?raw';
import textAreaExampleSource from './(component-examples)/text-area.svelte?raw';
import checkboxExampleSource from './(component-examples)/checkbox.svelte?raw';
import radioButtonGroupExampleSource from './(component-examples)/radio-button-group.svelte?raw';
import badgeExampleSource from './(component-examples)/badge.svelte?raw';
import alertBannerExampleSource from './(component-examples)/alert-banner.svelte?raw';
import cardExampleSource from './(component-examples)/card.svelte?raw';
import tableExampleSource from './(component-examples)/table.svelte?raw';
import dialogExampleSource from './(component-examples)/dialog.svelte?raw';
import accordionExampleSource from './(component-examples)/accordion.svelte?raw';
import breadcrumbsExampleSource from './(component-examples)/breadcrumbs.svelte?raw';
import navigationExampleSource from './(component-examples)/navigation.svelte?raw';
import dividerExampleSource from './(component-examples)/divider.svelte?raw';
import codeBlockExampleSource from './(component-examples)/code-block.svelte?raw';
import avatarExampleSource from './(component-examples)/avatar.svelte?raw';
import barProgressExampleSource from './(component-examples)/bar-progress.svelte?raw';
import blockLoaderExampleSource from './(component-examples)/block-loader.svelte?raw';
import asciiCanvasExampleSource from './(component-examples)/ascii-canvas.svelte?raw';
import kbdExampleSource from './(component-examples)/kbd.svelte?raw';
import spinnerExampleSource from './(component-examples)/spinner.svelte?raw';
import tabsExampleSource from './(component-examples)/tabs.svelte?raw';
import asciiChartExampleSource from './(component-examples)/ascii-chart.svelte?raw';
import switchExampleSource from './(component-examples)/switch.svelte?raw';
import commandPaletteExampleSource from './(component-examples)/command-palette.svelte?raw';
import selectExampleSource from './(component-examples)/select.svelte?raw';

export type Doc = {
	name: string;
	slug: string;
	description: string;
	componentExample: Component;
	exampleSource: string;
	source: string;
	sourceName: string;
};

export const docs: Doc[] = [
	{
		name: 'Button',
		slug: 'button',
		description: 'Buttons that should be used primarily for actions that require attention.',
		componentExample: ButtonExample,
		exampleSource: buttonExampleSource,
		source: buttonSource,
		sourceName: 'button.svelte'
	},
	{
		name: 'Action Button',
		slug: 'action-button',
		description:
			'Buttons that represent actions, typically used for navigation or important tasks.',
		componentExample: ActionButtonExample,
		exampleSource: actionButtonExampleSource,
		source: actionButtonSource,
		sourceName: 'action-button.svelte'
	},
	{
		name: 'Action List',
		slug: 'action-list',
		description: 'Action lists present a list of actions or options to the user.',
		componentExample: ActionListExample,
		exampleSource: actionListExampleSource,
		source: actionListSource,
		sourceName: 'action-list.svelte'
	},
	{
		name: 'Input',
		slug: 'input',
		description: 'A styled monospace text input field with custom caret display.',
		componentExample: InputExample,
		exampleSource: inputExampleSource,
		source: inputSource,
		sourceName: 'input.svelte'
	},
	{
		name: 'Text Area',
		slug: 'text-area',
		description: 'A themed auto-growing textarea with a fake-caret display.',
		componentExample: TextAreaExample,
		exampleSource: textAreaExampleSource,
		source: textAreaSource,
		sourceName: 'text-area.svelte'
	},
	{
		name: 'Checkbox',
		slug: 'checkbox',
		description: 'Checkboxes allow users to select one or more options from a set.',
		componentExample: CheckboxExample,
		exampleSource: checkboxExampleSource,
		source: checkboxSource,
		sourceName: 'checkbox.svelte'
	},
	{
		name: 'Radio Button Group',
		slug: 'radio-button-group',
		description: 'A self-contained group of radio options with selection state.',
		componentExample: RadioButtonGroupExample,
		exampleSource: radioButtonGroupExampleSource,
		source: radioButtonGroupSource,
		sourceName: 'radio-button-group.svelte'
	},
	{
		name: 'Select',
		slug: 'select',
		description: 'A dropdown select component with keyboard navigation and popover menu.',
		componentExample: SelectExample,
		exampleSource: selectExampleSource,
		source: selectSource,
		sourceName: 'select.svelte'
	},
	{
		name: 'Switch',
		slug: 'switch',
		description: 'A binary toggle switch with text, box, and track variants.',
		componentExample: SwitchExample,
		exampleSource: switchExampleSource,
		source: switchSource,
		sourceName: 'switch.svelte'
	},
	{
		name: 'Tabs',
		slug: 'tabs',
		description: 'A tab switcher and bufferline navigation with arrow key support.',
		componentExample: TabsExample,
		exampleSource: tabsExampleSource,
		source: tabsSource,
		sourceName: 'tabs.svelte'
	},
	{
		name: 'Command Palette',
		slug: 'command-palette',
		description: 'A modal command palette / fuzzy finder with search filtering and shortcuts.',
		componentExample: CommandPaletteExample,
		exampleSource: commandPaletteExampleSource,
		source: commandPaletteSource,
		sourceName: 'command-palette.svelte'
	},
	{
		name: 'Badge',
		slug: 'badge',
		description: 'Small, inline elements used to display status, counts, or labels.',
		componentExample: BadgeExample,
		exampleSource: badgeExampleSource,
		source: badgeSource,
		sourceName: 'badge.svelte'
	},
	{
		name: 'Kbd',
		slug: 'kbd',
		description: 'A keycap badge for keyboard shortcuts and hotkey hints.',
		componentExample: KbdExample,
		exampleSource: kbdExampleSource,
		source: kbdSource,
		sourceName: 'kbd.svelte'
	},
	{
		name: 'Alert Banner',
		slug: 'alert-banner',
		description: 'A flat banner with a drop-shadow corner for inline notices.',
		componentExample: AlertBannerExample,
		exampleSource: alertBannerExampleSource,
		source: alertBannerSource,
		sourceName: 'alert-banner.svelte'
	},
	{
		name: 'Card',
		slug: 'card',
		description: 'Container components used to group related content with optional titles.',
		componentExample: CardExample,
		exampleSource: cardExampleSource,
		source: cardSource,
		sourceName: 'card.svelte'
	},
	{
		name: 'Table',
		slug: 'table',
		description:
			'Tables display data in rows and columns with optional reactive cell highlighting.',
		componentExample: TableExample,
		exampleSource: tableExampleSource,
		source: tableSource,
		sourceName: 'table.svelte'
	},
	{
		name: 'Dialog',
		slug: 'dialog',
		description: 'A modal dialog built on bits-ui with accessible focus management and backdrop.',
		componentExample: DialogExample,
		exampleSource: dialogExampleSource,
		source: dialogSource,
		sourceName: 'dialog.svelte'
	},
	{
		name: 'Accordion',
		slug: 'accordion',
		description: 'A collapsible row that toggles an indented content section.',
		componentExample: AccordionExample,
		exampleSource: accordionExampleSource,
		source: accordionSource,
		sourceName: 'accordion.svelte'
	},
	{
		name: 'Breadcrumbs',
		slug: 'breadcrumbs',
		description: 'A breadcrumb trail of named links separated by a chevron.',
		componentExample: BreadCrumbsExample,
		exampleSource: breadcrumbsExampleSource,
		source: breadcrumbsSource,
		sourceName: 'breadcrumbs.svelte'
	},
	{
		name: 'Navigation',
		slug: 'navigation',
		description: 'A top nav bar with logo and left, center, right slots.',
		componentExample: NavigationExample,
		exampleSource: navigationExampleSource,
		source: navigationSource,
		sourceName: 'navigation.svelte'
	},
	{
		name: 'Divider',
		slug: 'divider',
		description: 'Horizontal rules in DEFAULT, DOUBLE, and GRADIENT variants.',
		componentExample: DividerExample,
		exampleSource: dividerExampleSource,
		source: dividerSource,
		sourceName: 'divider.svelte'
	},
	{
		name: 'Code Block',
		slug: 'code-block',
		description: 'Code blocks are used to display code snippets in a formatted manner.',
		componentExample: CodeBlockExample,
		exampleSource: codeBlockExampleSource,
		source: codeBlockSource,
		sourceName: 'code-block.svelte'
	},
	{
		name: 'Avatar',
		slug: 'avatar',
		description: 'A square avatar tile with an image or placeholder, optionally a link.',
		componentExample: AvatarExample,
		exampleSource: avatarExampleSource,
		source: avatarSource,
		sourceName: 'avatar.svelte'
	},
	{
		name: 'Bar Progress',
		slug: 'bar-progress',
		description: 'A character-based progress bar that fills with a glyph.',
		componentExample: BarProgressExample,
		exampleSource: barProgressExampleSource,
		source: barProgressSource,
		sourceName: 'bar-progress.svelte'
	},
	{
		name: 'Block Loader',
		slug: 'block-loader',
		description: 'A spinning braille or block glyph loader.',
		componentExample: BlockLoaderExample,
		exampleSource: blockLoaderExampleSource,
		source: blockLoaderSource,
		sourceName: 'block-loader.svelte'
	},
	{
		name: 'Spinner',
		slug: 'spinner',
		description: 'A lightweight single-cell rotating ASCII / braille loader with preset patterns.',
		componentExample: SpinnerExample,
		exampleSource: spinnerExampleSource,
		source: spinnerSource,
		sourceName: 'spinner.svelte'
	},
	{
		name: 'Ascii Chart',
		slug: 'ascii-chart',
		description: 'A multi-level ASCII / block chart for sparklines and time-series data.',
		componentExample: AsciiChartExample,
		exampleSource: asciiChartExampleSource,
		source: asciiChartSource,
		sourceName: 'ascii-chart.svelte'
	},
	{
		name: 'ASCII Canvas',
		slug: 'ascii-canvas',
		description: 'A per-cell ASCII canvas that runs a rAF painter and diffs cells.',
		componentExample: ASCIICanvasExample,
		exampleSource: asciiCanvasExampleSource,
		source: asciiCanvasSource,
		sourceName: 'ascii-canvas.svelte'
	}
];

export const docsBySlug = Object.fromEntries(docs.map((d) => [d.slug, d]));
