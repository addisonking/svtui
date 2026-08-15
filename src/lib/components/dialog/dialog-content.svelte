<script lang="ts" module>
	import type { DialogContentProps as BitsDialogContentProps } from 'bits-ui';

	export type DialogContentProps = BitsDialogContentProps & { class?: string };
</script>

<script lang="ts">
	import { Dialog } from 'bits-ui';

	let { class: className = '', children, ...restProps }: DialogContentProps = $props();

	let contentEl = $state<HTMLDivElement | null>(null);

	function snapToGrid() {
		if (!contentEl) return;
		const style = getComputedStyle(contentEl);
		const line = parseFloat(style.lineHeight) || 16;

		const span = document.createElement('span');
		span.style.font = style.font;
		span.style.fontFamily = style.fontFamily;
		span.style.fontSize = style.fontSize;
		span.style.position = 'absolute';
		span.style.visibility = 'hidden';
		span.textContent = '0000000000';
		document.body.appendChild(span);
		const ch = span.getBoundingClientRect().width / 10 || 9.6;
		document.body.removeChild(span);

		const targetLeft = Math.round((window.innerWidth - contentEl.offsetWidth) / 2 / ch) * ch;
		const targetTop = Math.round((window.innerHeight - contentEl.offsetHeight) / 2 / line) * line;

		contentEl.style.left = `${Math.max(0, targetLeft)}px`;
		contentEl.style.top = `${Math.max(0, targetTop)}px`;
	}

	$effect(() => {
		if (!contentEl) return;
		snapToGrid();
		window.addEventListener('resize', snapToGrid);
		return () => {
			window.removeEventListener('resize', snapToGrid);
		};
	});
</script>

<Dialog.Content {...restProps}>
	{#snippet child({ props })}
		<div {...props} bind:this={contentEl} class={`dialog-content ${className}`}>
			{@render children?.()}
		</div>
	{/snippet}
</Dialog.Content>

<style>
	.dialog-content {
		position: fixed;
		z-index: 101;
		box-sizing: border-box;
		background: var(--surface-base);
		color: var(--text-primary);
		font-family: var(--font-family-mono);
		font-size: var(--font-size);
		line-height: var(--line);
		width: 54ch;
		max-width: calc(100vw - 4ch);
		box-shadow:
			inset 0 0 0 2px var(--text-primary),
			0 0 0 1px var(--text-primary);
		padding: var(--line) 2ch;
	}
</style>
