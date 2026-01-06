<script lang="ts" module>
	export type TableCaptionProps = {
		class?: string;
		ref?: HTMLTableCaptionElement | null;
		children?: import('svelte').Snippet;
	};
</script>

<script lang="ts">
	let { class: className = '', ref = $bindable(null), children }: TableCaptionProps = $props();
</script>

<caption class="table-caption {className}" bind:this={ref}>
	{@render children?.()}
</caption>

<style lang="postcss">
	.table-caption {
		padding: 0 1ch;
		color: var(--border-default);
		caption-side: bottom;
		text-align: left;
	}
</style>
