<script lang="ts" module>
	import type { DialogCloseProps as BitsDialogCloseProps } from 'bits-ui';

	export type DialogCloseProps = BitsDialogCloseProps & { class?: string };
</script>

<script lang="ts">
	import { Dialog } from 'bits-ui';

	let { class: className = '', children, ...restProps }: DialogCloseProps = $props();
</script>

<Dialog.Close {...restProps}>
	{#snippet child({ props })}
		<button {...props} class={`dialog-close ${className}`}>
			{@render children?.()}
		</button>
	{/snippet}
</Dialog.Close>

<style>
	.dialog-close {
		display: inline-block;
		box-sizing: border-box;
		border: none;
		border-radius: 0;
		margin: 0;
		padding: 0 1ch;
		background-color: var(--button-secondary-bg);
		color: var(--text-primary);
		font-family: var(--font-family-mono);
		font-size: var(--font-size);
		line-height: var(--line);
		text-transform: uppercase;
		cursor: pointer;
		transition: all 0.2s ease-in-out;
	}

	.dialog-close:hover,
	.dialog-close:focus-visible {
		background-color: var(--focus-ring);
		color: var(--button-primary-fg);
	}

	.dialog-close:focus-visible {
		outline: none;
	}

	.dialog-close:disabled {
		cursor: not-allowed;
		pointer-events: none;
		opacity: 0.5;
	}
</style>
