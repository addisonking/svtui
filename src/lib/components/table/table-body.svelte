<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement> & {
		class?: string;
		ref?: HTMLTableSectionElement | null;
	};
</script>

<script lang="ts">
	let {
		class: className = '',
		ref = $bindable(null),
		children,
		...restProps
	}: TableBodyProps = $props();
</script>

<tbody class="table-body {className}" bind:this={ref} {...restProps}>
	{@render children?.()}
</tbody>

<style lang="postcss">
	.table-body :global(.table-row:not(:last-child)) {
		box-shadow: 0 1px 0 0 var(--border-muted);
	}
</style>
