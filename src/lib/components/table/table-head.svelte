<script lang="ts" module>
	import type { HTMLThAttributes } from 'svelte/elements';

	export type TableHeadProps = HTMLThAttributes & {
		class?: string;
		ref?: HTMLTableCellElement | null;
	};
</script>

<script lang="ts">
	let {
		class: className = '',
		ref = $bindable(null),
		children,
		...restProps
	}: TableHeadProps = $props();
</script>

<th class="table-head {className}" bind:this={ref} {...restProps}>
	{@render children?.()}
</th>

<style lang="postcss">
	.table-head {
		padding: 0 1ch;
		font-weight: 500;
		white-space: nowrap;
	}
</style>
