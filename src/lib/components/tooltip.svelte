<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	/** A small styled block meant to sit near an element as a callout/note. */
	export type TooltipProps = HTMLAttributes<HTMLDivElement> & {
		ref?: HTMLDivElement | null;
	};
</script>

<script lang="ts">
	let {
		class: className,
		ref = $bindable(null),
		style,
		children,
		...restProps
	}: TooltipProps = $props();
</script>

<div bind:this={ref} class={`tooltip ${className ?? ''}`} {style} {...restProps}>
	{@render children?.()}
</div>

<style>
	.tooltip {
		display: block;
		background: var(--border-default);
		box-shadow: 0.5ch 0.5ch 0 0 var(--border-muted);
		font-weight: 400;
		max-width: 24ch;
	}
</style>
