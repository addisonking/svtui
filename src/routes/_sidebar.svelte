<script lang="ts">
	import { docs } from '$lib/config/docs';
	import ActionList from '$lib/components/action-list.svelte';
	import ActionButton from '$lib/components/action-button.svelte';
	import { toggleMode } from 'mode-watcher';
	import { page } from '$app/state';

	let { onNavigate }: { onNavigate?: () => void } = $props();
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-col gap-2">
		<ActionList icon="<" href="/" onclick={onNavigate}>HOME</ActionList>
		<ActionList icon="=" href="/cheatsheet" onclick={onNavigate}>CHEATSHEET</ActionList>
		<ActionButton onclick={toggleMode} hotkey={['control', 't']}>TOGGLE THEME</ActionButton>
	</div>
	<nav class="flex flex-col">
		{#each docs as doc (doc.slug)}
			<ActionList
				icon=">"
				href="/components/{doc.slug}"
				onclick={onNavigate}
				class={page.params.name === doc.slug ? 'active' : ''}>{doc.name}</ActionList
			>
		{/each}
	</nav>
</div>

<style>
	:global(.active .text) {
		background: var(--focus-ring);
	}
</style>
