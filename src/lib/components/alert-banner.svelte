<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	/** A flat banner with a drop-shadow corner, for inline notices/alerts. */
	export type AlertBannerProps = HTMLAttributes<HTMLDivElement> & {
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
	}: AlertBannerProps = $props();
</script>

<div bind:this={ref} class={`alert-banner ${className ?? ''}`} {style} {...restProps}>
	{@render children?.()}
</div>

<style>
	.alert-banner {
		display: block;
		background: var(--border-default);
		box-shadow: 1ch 1ch 0 0 var(--border-muted);
		padding: calc(var(--font-size) * var(--base-line-height)) 2ch;
		font-weight: 400;
	}
</style>
