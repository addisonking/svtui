<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	export type BadgeProps = HTMLAttributes<HTMLElement> & {
		ref?: HTMLElement | null;
	};
</script>

<script lang="ts">
	let { class: className, ref = $bindable(null), children, ...restProps }: BadgeProps = $props();
</script>

<span class={`badge ${className ?? ''}`} bind:this={ref} {...restProps}>
	{@render children?.()}
</span>

<style>
	.badge {
		min-height: calc(var(--base-line-height) * var(--font-size));
		display: inline-block;
		max-width: fit-content;
		background-color: var(--border-default);
		color: var(--text-primary);
		padding-left: 1ch;
		padding-right: 1ch;
	}
</style>
