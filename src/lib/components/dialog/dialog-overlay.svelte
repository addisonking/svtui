<script lang="ts" module>
	import type { DialogOverlayProps as BitsDialogOverlayProps } from 'bits-ui';

	export type DialogOverlayProps = BitsDialogOverlayProps & { class?: string };
</script>

<script lang="ts">
	import { Dialog } from 'bits-ui';

	let { class: className = '', children, ...restProps }: DialogOverlayProps = $props();
</script>

<Dialog.Overlay {...restProps}>
	{#snippet child({ props, ...snippetProps })}
		<div {...props} class={`dialog-overlay ${className}`}>
			{@render children?.(snippetProps)}
		</div>
	{/snippet}
</Dialog.Overlay>

<style>
	.dialog-overlay {
		position: fixed;
		inset: 0;
		z-index: 100;
		background: rgba(0, 0, 0, 0.6);
	}
</style>
