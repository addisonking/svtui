<script lang="ts">
	import CommandPalette, { type CommandItem } from '$lib/components/command-palette.svelte';
	import Button from '$lib/components/button.svelte';
	import Kbd from '$lib/components/kbd.svelte';

	let open = $state(false);
	let lastAction = $state('None');

	const commands: CommandItem[] = [
		{
			id: '1',
			label: 'Format Document',
			category: 'Editor',
			shortcut: '⇧⌥F',
			onselect: () => (lastAction = 'Formatted document')
		},
		{
			id: '2',
			label: 'Toggle File Tree',
			category: 'View',
			shortcut: '⌘B',
			onselect: () => (lastAction = 'Toggled file tree')
		},
		{
			id: '3',
			label: 'Git: Push Changes',
			category: 'Git',
			shortcut: '⌘P',
			onselect: () => (lastAction = 'Pushed changes to origin')
		},
		{
			id: '4',
			label: 'Switch Color Theme',
			category: 'Preferences',
			onselect: () => (lastAction = 'Opened theme picker')
		},
		{
			id: '5',
			label: 'Run Test Suite',
			category: 'Terminal',
			shortcut: '⌥T',
			onselect: () => (lastAction = 'Ran test suite')
		}
	];
</script>

<div class="flex flex-col gap-4">
	<div class="flex items-center gap-4">
		<Button onclick={() => (open = true)}>Open Command Palette</Button>
		<span class="opacity-60 text-xs">
			or press <Kbd>⌘</Kbd><Kbd>K</Kbd>
		</span>
	</div>

	<div class="text-xs">
		<span class="opacity-50">Last Executed: </span>
		<span class="font-bold">{lastAction}</span>
	</div>

	<CommandPalette bind:open items={commands} />
</div>
