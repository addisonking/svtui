<script lang="ts" module>
	import type { HTMLTableAttributes } from 'svelte/elements';

	export type TableProps = HTMLTableAttributes & {
		class?: string;
		ref?: HTMLTableElement | null;
	};
</script>

<script lang="ts">
	let {
		class: className = '',
		ref = $bindable(null),
		children,
		...restProps
	}: TableProps = $props();
</script>

<div class="table-wrapper">
	<table class="table {className}" bind:this={ref} {...restProps}>
		{@render children?.()}
	</table>
</div>

<style lang="postcss">
	.table-wrapper {
		width: 100%;
		overflow-x: auto;

		&::-webkit-scrollbar {
			display: none;
		}
		scrollbar-width: none;
	}

	.table {
		width: 100%;
		border-collapse: collapse;
		text-align: left;
	}
</style>
