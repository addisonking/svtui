<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	export type KbdProps = HTMLAttributes<HTMLElement> & {
		ref?: HTMLElement | null;
		variant?: 'default' | 'bracket' | 'subtle';
	};
</script>

<script lang="ts">
	let {
		ref = $bindable(null),
		variant = 'default',
		class: className = '',
		children,
		...restProps
	}: KbdProps = $props();
</script>

<kbd bind:this={ref} class="kbd {variant} {className}" {...restProps}>
	{#if variant === 'bracket'}[{/if}{@render children?.()}{#if variant === 'bracket'}]{/if}
</kbd>

<style>
	.kbd {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-family-mono);
		font-size: var(--font-size);
		line-height: var(--line);
		height: var(--line);
		padding: 0 0.5ch;
		color: var(--text-primary);
		vertical-align: baseline;
		user-select: none;
		box-sizing: border-box;
	}

	.kbd.default {
		background: color-mix(in srgb, var(--surface-base) 80%, var(--border-default) 20%);
		box-shadow:
			inset 0 0 0 1px var(--border-default),
			0 1px 0 0 var(--border-muted);
	}

	.kbd.bracket {
		background: transparent;
		box-shadow: none;
		padding: 0 0.25ch;
		color: var(--button-muted);
	}

	.kbd.subtle {
		background: transparent;
		box-shadow: inset 0 0 0 1px var(--border-muted);
		opacity: 0.8;
	}
</style>
