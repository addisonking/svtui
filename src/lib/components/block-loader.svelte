<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	const SEQUENCES = [
		['⠁', '⠂', '⠄', '⡀', '⢀', '⠠', '⠐', '⠈'],
		['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷'],
		['▖', '▘', '▝', '▗'],
		['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█', '▇', '▆', '▅', '▄', '▃', '▁'],
		['▉', '▊', '▋', '▌', '▍', '▎', '▏', '▎', '▍', '▌', '▋', '▊', '▉'],
		['←', '↖', '↑', '↗', '→', '↘', '↓', '↙'],
		['┤', '┘', '┴', '└', '├', '┌', '┬', '┐'],
		['◢', '◣', '◤', '◥'],
		['◰', '◳', '◲', '◱'],
		['◴', '◷', '◶', '◵'],
		['◐', '◓', '◑', '◒']
	] as const;

	/** A spinning braille/block glyph loader. `mode` selects the glyph sequence. */
	export type BlockLoaderProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
		ref?: HTMLSpanElement | null;
		mode?: number;
	};
</script>

<script lang="ts">
	let {
		class: className = '',
		ref = $bindable(null),
		mode = 0,
		...restProps
	}: BlockLoaderProps = $props();

	const sequence = $derived(SEQUENCES[mode] ?? null);
	let index = $state(0);

	$effect(() => {
		if (!sequence) return;
		const id = setInterval(() => {
			index = (index + 1) % sequence.length;
		}, 100);
		return () => clearInterval(id);
	});
</script>

<span bind:this={ref} class={`block-loader ${className}`} {...restProps}>
	{sequence ? sequence[index] : '�'}
</span>

<style>
	.block-loader {
		display: inline-block;
		width: 1ch;
		color: inherit;
		height: calc(var(--font-size) * var(--base-line-height));
		vertical-align: bottom;
	}
</style>
