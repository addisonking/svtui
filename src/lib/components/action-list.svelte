<script lang="ts" module>
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	/**
	 * Polymorphic: renders `<a>` when `href` is set, `<button>` otherwise. `href`
	 * discriminates the allowed attributes. `icon` is a short string (often one
	 * character like `>` or `=`) shown in the leading gutter.
	 */
	export type ActionListProps =
		| (HTMLButtonAttributes & { ref?: HTMLElement | null; icon?: string; href?: undefined })
		| (HTMLAnchorAttributes & { ref?: HTMLElement | null; icon?: string; href: string });
</script>

<script lang="ts">
	let {
		class: className,
		ref = $bindable(null),
		icon = '',
		href,
		children,
		...restProps
	}: ActionListProps = $props();
</script>

{#if href}
	<a
		bind:this={ref}
		class={`item ${className ?? ''}`}
		{href}
		{...restProps as HTMLAnchorAttributes}
	>
		<span class="icon">{icon}</span>
		<span class="text">
			{@render children?.()}
		</span>
	</a>
{:else}
	<button bind:this={ref} class={`item ${className ?? ''}`} {...restProps as HTMLButtonAttributes}>
		<span class="icon">{icon}</span>
		<span class="text">
			{@render children?.()}
		</span>
	</button>
{/if}

<style>
	.item {
		align-items: flex-start;
		background: transparent;
		color: var(--text-primary);
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		outline: 0;
		border: 0;
		text-decoration: none;

		&:visited {
			background: transparent;
			color: var(--text-primary);
		}

		&:hover {
			background: transparent;
			color: var(--text-primary);
		}

		&:hover .icon {
			background: var(--focus-ring);
		}

		&:focus .icon {
			background: var(--focus-ring);
		}
	}

	.icon {
		align-items: center;
		background: var(--border-muted);
		display: inline-flex;
		flex-shrink: 0;
		height: calc(var(--font-size) * var(--base-line-height));
		justify-content: center;
		width: 3ch;
		user-select: none;
	}

	.text {
		align-items: center;
		align-self: stretch;
		background: var(--border-default);
		display: inline-flex;
		justify-content: flex-start;
		min-width: 10%;
		padding: 0 1ch 0 1ch;
		user-select: none;
		width: 100%;
	}
</style>
