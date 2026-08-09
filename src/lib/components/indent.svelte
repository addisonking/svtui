<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	export type IndentProps = HTMLAttributes<HTMLDivElement> & {
		ref?: HTMLDivElement | null;
	};
</script>

<script lang="ts">
	let { class: className, ref = $bindable(null), children, ...restProps }: IndentProps = $props();
</script>

<div class="indent {className ?? ''}" bind:this={ref} {...restProps}>
	{@render children?.()}
</div>

<style>
	.indent {
		display: block;
		padding: 0 0 0 1ch;
	}
</style>
