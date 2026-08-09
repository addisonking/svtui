<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	/** A top nav bar with a logo slot and left/center/right sections. */
	export type NavigationProps = HTMLAttributes<HTMLElement> & {
		ref?: HTMLElement | null;
		logoHref?: string;
		logoTarget?: string;
		onclicklogo?: (e: MouseEvent) => void;
		logo?: Snippet;
		left?: Snippet;
		right?: Snippet;
	};
</script>

<script lang="ts">
	let {
		class: className,
		ref = $bindable(null),
		logoHref,
		logoTarget,
		onclicklogo,
		logo,
		left,
		right,
		children,
		...restProps
	}: NavigationProps = $props();
</script>

<nav class={`nav ${className ?? ''}`} bind:this={ref} {...restProps}>
	{#if logoHref}
		<a class="logo" href={logoHref} target={logoTarget}>
			{@render logo?.()}
		</a>
	{:else}
		<button class="logo" type="button" onclick={onclicklogo}>
			{@render logo?.()}
		</button>
	{/if}
	<section class="left">
		{@render left?.()}
	</section>
	<section class="children">
		{@render children?.()}
	</section>
	<section class="right">
		{@render right?.()}
	</section>
</nav>

<style>
	.nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: var(--border-default);
	}

	.logo {
		flex-shrink: 0;
		padding: 0 1ch;
		display: inline-flex;
		color: var(--text-primary);
		background: var(--border-default);
		text-decoration: none;
		border: 0;
		outline: 0;
		border-radius: 0;
		margin: 0;
		font-size: var(--font-size);
		cursor: pointer;
	}

	.logo:hover,
	.logo:focus-visible {
		background: var(--focus-ring);
	}

	.logo:focus-visible {
		outline: none;
	}

	.left {
		flex-shrink: 0;
	}

	.children {
		min-width: 10%;
		width: 100%;
	}

	.right {
		flex-shrink: 0;
	}
</style>
