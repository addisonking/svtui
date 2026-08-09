<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	export type TextProps = HTMLAttributes<HTMLParagraphElement> & {
		ref?: HTMLParagraphElement | null;
	};
</script>

<script lang="ts">
	let { class: className, ref = $bindable(null), children, ...restProps }: TextProps = $props();
</script>

<p class="text {className ?? ''}" bind:this={ref} {...restProps}>
	{@render children?.()}
</p>

<style>
	.text {
		white-space: pre-wrap;
		overflow-wrap: break-word;
	}
</style>
