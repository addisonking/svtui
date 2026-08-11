<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	export type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement> & {
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
	}: TableHeaderProps = $props();
</script>

<thead class="table-header {className}" bind:this={ref} {...restProps}>
	{@render children?.()}
</thead>

<style lang="postcss">
	.table-header {
		box-shadow: 0 2px 0 0 var(--border-default);
	}
</style>
