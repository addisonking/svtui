<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	export type RowSpaceBetweenProps = HTMLAttributes<HTMLElement> & {
		ref?: HTMLElement | null;
	};
</script>

<script lang="ts">
	let {
		class: className,
		ref = $bindable(null),
		children,
		...restProps
	}: RowSpaceBetweenProps = $props();
</script>

<section class="row {className ?? ''}" bind:this={ref} {...restProps}>
	{@render children?.()}
</section>

<style>
	.row {
		display: flex;
		justify-content: space-between;
		outline: 0;
		border: 0;
	}
</style>
