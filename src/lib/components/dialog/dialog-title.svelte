<script lang="ts" module>
	import type { DialogTitleProps as BitsDialogTitleProps } from 'bits-ui';

	export type DialogTitleProps = BitsDialogTitleProps & { class?: string };
</script>

<script lang="ts">
	import { Dialog } from 'bits-ui';

	let { class: className = '', children, ...restProps }: DialogTitleProps = $props();
</script>

<Dialog.Title {...restProps}>
	{#snippet child({ props })}
		<h2 {...props} class={`dialog-title ${className}`}>
			{@render children?.()}
		</h2>
	{/snippet}
</Dialog.Title>

<style>
	.dialog-title {
		font-family: var(--font-family-mono);
		font-size: var(--font-size);
		line-height: var(--line);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-weight: 700;
		margin: 0 0 var(--line) 0;
	}
</style>
