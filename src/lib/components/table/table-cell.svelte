<script lang="ts" module>
	import type { HTMLTdAttributes } from 'svelte/elements';

	export type TableCellProps = HTMLTdAttributes & {
		class?: string;
		ref?: HTMLTableCellElement | null;
		/** Enable flash animation when value changes */
		reactive?: boolean;
		/** Value to track for changes (triggers flash when changed) */
		value?: unknown;
	};
</script>

<script lang="ts">
	import { untrack } from 'svelte';

	let {
		class: className = '',
		ref = $bindable(null),
		reactive = false,
		value,
		children,
		...restProps
	}: TableCellProps = $props();

	let cellRef: HTMLTableCellElement | null = $state(null);
	let prevValue: unknown = $state(value);
	let isFlashing = $state(false);

	$effect(() => {
		if (!reactive) return;

		const currentValue = value;
		const previous = untrack(() => prevValue);

		if (previous !== undefined && currentValue !== previous) {
			isFlashing = true;
			const timeout = setTimeout(() => {
				isFlashing = false;
			}, 400);

			return () => clearTimeout(timeout);
		}

		prevValue = currentValue;
	});
</script>

<td
	class="table-cell {className}"
	class:flash={isFlashing}
	bind:this={ref}
	{...restProps}
>
	{@render children?.()}
</td>

<style lang="postcss">
	.table-cell {
		padding: 0 1ch;
	}

	.table-cell.flash {
		animation: cell-flash 0.4s ease-out;
	}

	@keyframes cell-flash {
		0% {
			background-color: var(--focus-ring);
			color: var(--surface-base);
		}
		100% {
			background-color: transparent;
			color: inherit;
		}
	}
</style>
