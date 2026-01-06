<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	export type TableFooterProps = HTMLAttributes<HTMLTableSectionElement> & {
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
	}: TableFooterProps = $props();
</script>

<tfoot class="table-footer {className}" bind:this={ref} {...restProps}>
	{@render children?.()}
</tfoot>

<style lang="postcss">
	.table-footer {
		border-top: 2px solid var(--border-default);
		font-weight: 500;
	}
</style>
