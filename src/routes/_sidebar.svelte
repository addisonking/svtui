<script lang="ts">
	import { docs } from '$lib/config/docs';
	import ActionList from '$lib/components/action-list.svelte';
	import { page } from '$app/state';
	import ThemePicker from './_theme-picker.svelte';

	let { onNavigate }: { onNavigate?: () => void } = $props();
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-col">
		<ActionList icon="<" href="/" onclick={onNavigate}>HOME</ActionList>
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

	<div class="flex flex-col">
		<span class="category-heading">DEMOS</span>
		<ActionList
			icon=">"
			href="/demos/agy"
			onclick={onNavigate}
			class={page.url.pathname === '/demos/agy' ? 'active' : ''}>Antigravity CLI</ActionList
		>
	</div>

	<ThemePicker />
</div>

<style>
	:global(.active .text) {
		background: var(--focus-ring);
	}

	.category-heading {
		text-transform: uppercase;
		font-size: var(--font-size);
		line-height: var(--line);
		opacity: 0.5;
		padding-left: 1ch;
	}
</style>
