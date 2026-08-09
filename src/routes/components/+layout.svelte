<script lang="ts">
	import { docs } from '$lib/config/docs';
	import ActionList from '$lib/components/action-list.svelte';
	import ActionButton from '$lib/components/action-button.svelte';
	import { toggleMode } from 'mode-watcher';
	import { page } from '$app/state';

	let { children } = $props();
	let open = $state(false);

	const close = () => (open = false);
</script>

<div class="layout">
	<button class="menu-toggle" onclick={() => (open = !open)} aria-expanded={open}>
		{open ? 'CLOSE' : 'MENU'}
	</button>

	{#if open}
		<button class="backdrop" onclick={close} aria-label="Close menu"></button>
	{/if}

	<aside class="sidebar" class:open>
		<div class="flex flex-col gap-2">
			<ActionList icon="<" href="/" onclick={close}>HOME</ActionList>
			<ActionList icon="=" href="/cheatsheet" onclick={close}>CHEATSHEET</ActionList>
			<ActionButton onclick={toggleMode} hotkey={['control', 't']}>TOGGLE THEME</ActionButton>
		</div>
		<nav class="flex flex-col">
			{#each docs as doc (doc.slug)}
				<ActionList
					icon=">"
					href="/components/{doc.slug}"
					onclick={close}
					class={page.params.name === doc.slug ? 'active' : ''}>{doc.name}</ActionList
				>
			{/each}
		</nav>
	</aside>

	<main class="content">
		{@render children()}
	</main>
</div>

<style>
	.layout {
		min-height: 100vh;
	}

	.sidebar {
		width: 16rem;
		flex-shrink: 0;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border-right: 1px solid var(--border-default);
	}

	.content {
		min-width: 0;
	}

	.menu-toggle {
		display: none;
	}

	/* Mobile: sidebar becomes a drawer with a backdrop. */
	@media (max-width: 767px) {
		.menu-toggle {
			display: block;
			font-family: inherit;
			font-size: inherit;
			border: 0;
			border-bottom: 2px solid var(--border-default);
			background: var(--surface-base);
			color: inherit;
			padding: 0.5rem 1ch;
			cursor: pointer;
			width: 100%;
			text-align: left;
		}
		.menu-toggle:hover {
			background: var(--focus-ring);
		}
		.sidebar {
			position: fixed;
			top: 0;
			left: 0;
			height: 100vh;
			z-index: 50;
			background: var(--surface-base);
			transform: translateX(-100%);
			transition: transform 0.15s ease-in-out;
		}
		.sidebar.open {
			transform: translateX(0);
		}
		.backdrop {
			position: fixed;
			inset: 0;
			z-index: 40;
			border: 0;
			padding: 0;
			background: color-mix(in srgb, var(--text-primary) 35%, transparent);
			cursor: pointer;
		}
	}

	/* Desktop: sidebar is a static column beside the content. */
	@media (min-width: 768px) {
		.layout {
			display: flex;
			flex-direction: row;
		}
		.sidebar {
			position: sticky;
			top: 0;
			align-self: flex-start;
			height: 100vh;
			overflow-y: auto;
		}
	}

	:global(.active .text) {
		background: var(--focus-ring);
	}
</style>
