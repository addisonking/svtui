<script lang="ts">
	import ActionButton from '$lib/components/action-button/action-button.svelte';
	import Card from '$lib/components/card/card.svelte';
	import Badge from '$lib/components/badge/badge.svelte';
	import { docs } from '$lib/config/docs';
	import { toggleMode } from 'mode-watcher';

	let version = $state(`69420-${'abcdef0'}`);
</script>

<ActionButton onclick={toggleMode} style="margin-left: 1rem;" hotkey={['control', 't']}
	>TOGGLE THEME</ActionButton
>
<div class="max-w-3xl space-y-8 p-4">
	<div>
		sv-tui <Badge>v{version}</Badge>
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
				<span class="">{doc.name.toUpperCase()}</span>
				<span>{doc.description}</span>
			</div>
			<Card title="EXAMPLE">
					<svelte:component this={doc.componentExample} />
</Card
			>
		</div>
	{/each}
</div>
