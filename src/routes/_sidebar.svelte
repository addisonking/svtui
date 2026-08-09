<script lang="ts">
	import { docs } from '$lib/config/docs';
	import ActionList from '$lib/components/action-list.svelte';
	import { page } from '$app/state';
	import ThemePicker from './_theme-picker.svelte';

	let { onNavigate }: { onNavigate?: () => void } = $props();
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-col gap-2">
		<ActionList icon="<" href="/" onclick={onNavigate}>HOME</ActionList>
		<ActionList icon="#" href="/demos" onclick={onNavigate}>DEMOS</ActionList>
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

	<ThemePicker />
</div>

<style>
	:global(.active .text) {
		background: var(--focus-ring);
	}
</style>
