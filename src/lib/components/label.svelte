<script lang="ts" module>
	import type { HTMLLabelAttributes } from 'svelte/elements';

	export type LabelProps = HTMLLabelAttributes & {
		ref?: HTMLLabelElement | null;
	};
</script>

<script lang="ts">
	let { class: className, ref = $bindable(null), children, ...restProps }: LabelProps = $props();
</script>

<label class={`label ${className ?? ''}`} {...restProps} bind:this={ref}>
	{@render children?.()}
</label>

<style>
	.label {
		display: block;
		background-color: var(--border-default);
		max-width: 100%;
		word-wrap: break-word;
		overflow-wrap: anywhere;
		box-sizing: border-box;
	}
</style>
