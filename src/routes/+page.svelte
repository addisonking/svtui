<script lang="ts">
	import pkg from '../../package.json';
	import { docs } from '$lib/config/docs';
	import ActionButton from '$lib/components/action-button.svelte';
	import ActionList from '$lib/components/action-list.svelte';
	import Badge from '$lib/components/badge.svelte';
	import { toggleMode } from 'mode-watcher';
</script>

<svelte:head>
	<title>svtui</title>
	<meta
		name="description"
		content="Terminal-aesthetic Svelte components. Copy-paste, self-contained, minimal deps."
	/>
</svelte:head>

<div class="max-w-3xl space-y-8 p-4">
	<div>
		<div class="flex items-center gap-2">
			<h1 class="text-lg">svtui</h1>
			<Badge>v{pkg.version}</Badge>
		</div>
		<p>
			An open-source, minimal
			<Badge style="background-color: #ff3e00; color: white;">Svelte</Badge>
			component repository for building web applications and static sites with terminal aesthetic. Inspired
			by <a href="https://sacred.computer">srcl</a>.
		</p>
		<p class="text-sm">
			Components are self-contained source files you copy into your own project. Use the CLI
			<code>npx svtui add &lt;name&gt;</code> or browse below.
		</p>
	</div>

	<div class="flex flex-row gap-2">
		<ActionButton onclick={toggleMode} hotkey={['control', 't']}>TOGGLE THEME</ActionButton>
		<ActionButton
			href="https://github.com/addisonking/svtui"
			hotkey={['control', 'g']}
			target="_blank">VIEW SOURCE</ActionButton
		>
	</div>

	<nav class="flex flex-col">
		{#each docs as doc (doc.slug)}
			<ActionList icon=">" href="/components/{doc.slug}">{doc.name}</ActionList>
		{/each}
	</nav>
</div>
