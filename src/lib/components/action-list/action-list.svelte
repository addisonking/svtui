<script lang="ts" module>
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	export type ActionListProps = HTMLButtonAttributes &
		HTMLAnchorAttributes & {
			ref?: HTMLElement | null;
			icon?: string;
		};
</script>

<script lang="ts">
	let {
		class: className,
		ref = $bindable(null),
		icon = '',
		children,
		...restProps
	}: ActionButtonProps = $props();
</script>

{#if restProps.href}
	<a bind:this={ref} class={`item ${className ?? ''}`} {...restProps}>
		<span class="icon">{icon}</span>
		<span class="text">
			{@render children?.()}
		</span>
	</a>
{:else}
	<button bind:this={ref} class={`item ${className ?? ''}`} {...restProps}>
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
		color: var(--theme-text);
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		outline: 0;
		border: 0;
		text-decoration: none;

		&:visited {
			background: transparent;
			color: var(--theme-text);
		}

		&:hover {
			background: transparent;
			color: var(--theme-text);
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
		height: calc(var(--font-size) * var(--theme-line-height-base));
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
