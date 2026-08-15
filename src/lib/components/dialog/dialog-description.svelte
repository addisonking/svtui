<script lang="ts" module>
	import type { DialogDescriptionProps as BitsDialogDescriptionProps } from 'bits-ui';

	export type DialogDescriptionProps = BitsDialogDescriptionProps & { class?: string };
</script>

<script lang="ts">
	import { Dialog } from 'bits-ui';

	let { class: className = '', children, ...restProps }: DialogDescriptionProps = $props();
</script>

<Dialog.Description {...restProps}>
	{#snippet child({ props })}
		<p {...props} class={`dialog-description ${className}`}>
			{@render children?.()}
		</p>
	{/snippet}
</Dialog.Description>

<style>
	.dialog-description {
		font-family: var(--font-family-mono);
		font-size: var(--font-size);
		line-height: var(--line);
		margin: 0 0 var(--line) 0;
		opacity: 0.8;
	}
</style>
