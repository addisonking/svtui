<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	export type BlockProps = HTMLAttributes<HTMLSpanElement> & {
		ref?: HTMLSpanElement | null;
	};
</script>

<script lang="ts">
	let { class: className, ref = $bindable(null), children, ...restProps }: BlockProps = $props();
</script>

<span class="block {className ?? ''}" bind:this={ref} {...restProps}>
	{@render children?.()}
</span>

<style>
	.block {
		display: inline-block;
		width: 1ch;
		background: var(--text-primary);
		height: var(--line);
		vertical-align: bottom;
		flex-shrink: 0;
	}
</style>
