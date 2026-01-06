<script lang="ts">
	import ActionButton from '$lib/components/action-button.svelte';
	import Card from '$lib/components/card.svelte';
	import Badge from '$lib/components/badge.svelte';
	import { docs } from '$lib/config/docs';
	import { toggleMode } from 'mode-watcher';

	let version = $state(`69420-${'abcdef0'}`);
</script>

<div class="flex flex-row ml-4">
	<ActionButton onclick={toggleMode} hotkey={['control', 't']}>TOGGLE THEME</ActionButton>
	<ActionButton
		href="https://github.com/addisonking/svtui"
		hotkey={['control', 'g']}
		target="_blank">VIEW SOURCE</ActionButton
	>
</div>

<div class="max-w-3xl space-y-8 p-4">
	<div>
		svtui <Badge>v{version}</Badge>
		<p>
			An open-source, minimal <Badge style="background-color: #ff3e00; color: white;">Svelte</Badge>
			component repository for building web applications and static sites with terminal aesthetic. Inspired
			by srcl.
			<span class="text-red-500"
				>This project is currently under development and prone to issues.</span
			>
		</p>
	</div>

	{#each docs.sort( (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name) ) as doc (doc.name)}
		<div class="flex flex-col gap-2">
			<div class="flex flex-col">
				<span class="uppercase">{doc.name}</span>
				<span>{doc.description}</span>
			</div>
			<Card title="EXAMPLE">
				<svelte:component this={doc.componentExample} />
			</Card>
		</div>
	{/each}
</div>
