<script lang="ts">
	import { docs } from '$lib/config/docs';
	import ActionList from '$lib/components/action-list.svelte';
	import ActionButton from '$lib/components/action-button.svelte';
	import { toggleMode } from 'mode-watcher';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<div class="flex flex-row min-h-screen">
	<aside class="w-64 shrink-0 p-4 space-y-4 border-r border-[var(--border-default)]">
		<div class="flex flex-col gap-2">
			<ActionList icon="<" href="/">HOME</ActionList>
			<ActionButton onclick={toggleMode} hotkey={['control', 't']}>TOGGLE THEME</ActionButton>
		</div>
		<nav class="flex flex-col">
			{#each docs as doc (doc.slug)}
				<ActionList
					icon=">"
					href="/components/{doc.slug}"
					class={page.params.name === doc.slug ? 'active' : ''}>{doc.name}</ActionList
				>
			{/each}
		</nav>
	</aside>
	<main class="flex-1 min-w-0">
		{@render children()}
	</main>
</div>

<style>
	:global(.active .text) {
		background: var(--focus-ring);
	}
</style>
