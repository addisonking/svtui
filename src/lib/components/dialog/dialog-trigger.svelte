<script lang="ts" module>
	import type { DialogTriggerProps as BitsDialogTriggerProps } from 'bits-ui';

	export type DialogTriggerProps = BitsDialogTriggerProps & { class?: string };
</script>

<script lang="ts">
	import { Dialog } from 'bits-ui';

	let { class: className = '', children, ...restProps }: DialogTriggerProps = $props();
</script>

<Dialog.Trigger {...restProps}>
	{#snippet child({ props })}
		<button {...props} class={`dialog-trigger ${className}`}>
			{@render children?.()}
		</button>
	{/snippet}
</Dialog.Trigger>

<style>
	.dialog-trigger {
		display: inline-block;
		box-sizing: border-box;
		border: none;
		border-radius: 0;
		margin: 0;
		padding: var(--line) 2ch;
		background-color: var(--button-primary-bg);
		color: var(--button-primary-fg);
		font-family: var(--font-family-mono);
		font-size: var(--font-size);
		line-height: var(--line);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		text-align: center;
		cursor: pointer;
		transition: all 0.2s ease-in-out;
	}

	.dialog-trigger:hover,
	.dialog-trigger:focus-visible {
		background-color: var(--focus-ring);
		box-shadow: none;
	}

	.dialog-trigger:focus-visible {
		outline: none;
	}

	.dialog-trigger:disabled {
		cursor: not-allowed;
		pointer-events: none;
		opacity: 0.5;
	}
</style>
