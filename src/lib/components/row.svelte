<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	export type RowProps = HTMLAttributes<HTMLElement> & {
		ref?: HTMLElement | null;
	};
</script>

<script lang="ts">
	let { class: className, ref = $bindable(null), children, ...restProps }: RowProps = $props();
</script>

<section class="row {className ?? ''}" bind:this={ref} {...restProps}>
	{@render children?.()}
</section>

<style>
	.row {
		display: block;
		outline: 0;
		border: 0;
		transition: 200ms ease background;
	}

	.row:focus-visible {
		background: var(--focus-ring);
	}
</style>
