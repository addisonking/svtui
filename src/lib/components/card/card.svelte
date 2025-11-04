<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	export type CardProps = HTMLAttributes<HTMLElement> & {
		class?: string;
		ref?: HTMLElement | null;
		title?: string;
		alignTitle?: 'left' | 'right';
	};
</script>

<script lang="ts">
	let {
		class: className = '',
		ref = $bindable(null),
		title = '',
		alignTitle = 'left',
		children,
		...restProps
	}: CardProps = $props();
</script>

{#snippet titleElement()}
	<header class="action">
		{#if alignTitle === 'left'}
			<div class="leftCorner" aria-hidden="true"></div>
		{:else}
			<div class="left" aria-hidden="true"></div>
		{/if}
		{#if title}<h2 class="title">{title}</h2>{/if}
		{#if alignTitle === 'right'}
			<div class="rightCorner" aria-hidden="true"></div>
		{:else}
			<div class="right" aria-hidden="true"></div>
		{/if}
	</header>
{/snippet}

<article class="card {className}" bind:this={ref} {...restProps}>
	{@render titleElement()}
	<section class="children">{@render children?.()}</section>
</article>

<style lang="postcss">
	.card {
		position: relative;
		display: block;
		padding: 0;
		white-space: prewrap;
	}

	.children {
		border: 2px solid;
		border-top: 0px;
		display: block;
		padding-top: calc(var(--base-line-height) * 0.5rem);
		padding-left: 2ch;
		padding-right: 2ch;
		padding-bottom: calc(var(--base-line-height) * 1rem);
		overflow-x: auto;
		overflow-y: hidden;
		margin: 0 !important;

		&::-webkit-scrollbar {
			display: none;
		}

		scrollbar-width: none;
	}

	.action {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}

	.left {
		min-width: 10%;
		width: 100%;
		box-shadow:
			inset 2px 0 0 0,
			inset 0 2px 0 0;
		padding: calc((var(--font-size) * 0.5) * var(--base-line-height)) 2ch 0px 1ch;
	}

	.leftCorner {
		flex-shrink: 0;
		box-shadow:
			inset 2px 0 0 0,
			inset 0 2px 0 0;
		padding: calc((var(--font-size) * 0.5) * var(--base-line-height)) 1ch 0px 1ch;
	}

	.right {
		min-width: 10%;
		width: 100%;
		box-shadow:
			inset -2px 0 0 0,
			inset 0 2px 0 0;
		padding: calc((var(--font-size) * 0.5) * var(--base-line-height)) 2ch 0px 1ch;
	}

	.rightCorner {
		flex-shrink: 0;
		box-shadow:
			inset -2px 0 0 0,
			inset 0 2px 0 0;
		padding: calc((var(--font-size) * 0.5) * var(--base-line-height)) 1ch 0px 1ch;
	}

	.title {
		font-size: inherit;
		font-weight: inherit;
		line-height: inherit;
		margin: 0;
		padding: 0 1ch;
		flex-shrink: 0;
	}
</style>
