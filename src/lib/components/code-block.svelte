<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	export type CodeBlockProps = HTMLAttributes<HTMLDivElement> & {
		ref?: HTMLDivElement | null;
		code?: string;
	};
</script>

<script lang="ts">
	let { class: className, ref = $bindable(null), code, ...restProps }: CodeBlockProps = $props();
</script>

<div class={`code-block ${className ?? ''}`} bind:this={ref} {...restProps}>
	{#if code}
		{#each code.split('\n') as line, index (index)}
			<div class="code-line">
				<span class="line-number">{String(index + 1).padStart(3, '0')}</span>
				<span class="line-content">{line}</span>
			</div>
		{/each}
	{/if}
</div>

<style>
	.code-block {
		font-family: inherit;
		display: block;
		overflow: auto;
		background-color: var(--border-muted);
		font-weight: 400;
	}

	.code-line {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}

	.line-number {
		display: inline-flex;
		width: 3ch;
		background-color: var(--surface-base);
		padding-right: 1ch;
		text-align: right;
		opacity: 0.5;
		user-select: none;
	}

	.line-content {
		width: 100%;
		min-width: 10%;
		background-color: var(--border-muted);
		padding-left: 2ch;
		white-space: pre;
	}
</style>
