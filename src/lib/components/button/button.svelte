<script lang="ts" module>
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	export type ButtonVariant = 'primary' | 'secondary';
	export type ButtonProps = HTMLButtonAttributes &
		HTMLAnchorAttributes & {
			ref?: HTMLElement | null;
			variant?: ButtonVariant;
		};
</script>

<script lang="ts">
	let {
		class: className,
		variant = 'primary',
		ref = $bindable(null),
		children,
		...restProps
	}: ButtonProps = $props();
</script>

{#if restProps.href}
	<a class={`button ${variant} ${className ?? ''}`} bind:this={ref} {...restProps}>
		{@render children?.()}
	</a>
{:else}
	<button class={`button ${variant} ${className ?? ''}`} bind:this={ref} {...restProps}>
		{@render children?.()}
	</button>
{/if}

<style>
	.button {
		box-sizing: border-box;
		border: none;
		border-radius: 0;
		margin: 0;
		padding: 10px 20px;
		text-align: center;
		font-size: 16px;
		text-transform: uppercase;
		text-decoration: none;
		background-clip: padding-box;
		display: inline-block;
		width: 100%;
		text-align: center;
		font-family: monospace;
		font-weight: 400;
		letter-spacing: 0.05em;
		transition: all 0.2s ease-in-out;
		cursor: pointer;
	}

	.button:disabled,
	.button[aria-disabled='true'] {
		cursor: not-allowed;
		pointer-events: none;
		opacity: 0.5;
	}

	.button.primary {
		background-color: var(--button-primary-bg);
		color: var(--button-primary-fg);
	}

	.button.secondary {
		background-color: var(--surface-base);
		color: var(--text-primary);
		box-shadow: inset 0 0 0 1px var(--border-default);
	}

	.button:hover {
		color: var(--button-primary-fg);
		background-color: var(--focus-ring);
		box-shadow: none;
	}

	.button:focus {
		outline: none;
		color: var(--button-primary-fg);
		background-color: var(--focus-ring);
		box-shadow: none;
	}
</style>
