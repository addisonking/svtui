<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	export type TableRowProps = HTMLAttributes<HTMLTableRowElement> & {
		class?: string;
		ref?: HTMLTableRowElement | null;
	};
</script>

<script lang="ts">
	let {
		class: className = '',
		ref = $bindable(null),
		children,
		...restProps
	}: TableRowProps = $props();
</script>

<tr class="table-row {className}" bind:this={ref} {...restProps}>
	{@render children?.()}
</tr>

<style lang="postcss">
	.table-row {
		transition: background-color 0.15s ease-in-out;

		&:hover {
			background-color: var(--border-muted);
		}
	}
</style>
