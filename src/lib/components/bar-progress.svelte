<script lang="ts" module>
	/** A character-based progress bar that fills with `fillChar` across its width. */
	export type BarProgressProps = {
		/** When omitted, the bar advances itself by 10% every `intervalRate` ms. */
		intervalRate?: number;
		/** Set to drive the bar externally (0–100). Disables the auto interval. */
		progress?: number;
		/** The character used to fill the bar. Defaults to `░`. */
		fillChar?: string;
	};
</script>

<script lang="ts">
	let { intervalRate, progress, fillChar = '░' }: BarProgressProps = $props();

	// svelte-ignore state_referenced_locally
	let current = $state(progress ?? 0);
	let containerWidth = $state(0);
	let charWidth = $state(0);

	let containerEl = $state<HTMLDivElement>(null!);
	let measureEl = $state<HTMLSpanElement>(null!);

	// Measure one char so we can compute how many fit across the container.
	$effect(() => {
		if (!measureEl) return;
		const rect = measureEl.getBoundingClientRect();
		if (rect.width > 0) {
			charWidth = rect.width;
			return;
		}
		// Font may not be laid out yet — retry next frame.
		const id = requestAnimationFrame(() => {
			const r = measureEl?.getBoundingClientRect();
			if (r && r.width > 0) charWidth = r.width;
		});
		return () => cancelAnimationFrame(id);
	});

	// Track container width via ResizeObserver.
	$effect(() => {
		if (!containerEl) return;
		const obs = new ResizeObserver((entries) => {
			for (const entry of entries) containerWidth = entry.contentRect.width;
		});
		obs.observe(containerEl);
		return () => obs.disconnect();
	});

	$effect(() => {
		if (progress !== undefined) {
			current = progress;
			return;
		}
		if (!intervalRate) return;
		const id = setInterval(() => {
			current = (current + 10) % 110;
		}, intervalRate);
		return () => clearInterval(id);
	});

	const capped = $derived(Math.min(current, 100));
	const maxChars = $derived(
		charWidth > 0 && containerWidth > 0 ? Math.max(1, Math.floor(containerWidth / charWidth)) : 10
	);
	const bar = $derived(fillChar.repeat(Math.round((capped / 100) * maxChars)));
</script>

<div
	bind:this={containerEl}
	class="root"
	role="progressbar"
	aria-valuenow={capped}
	aria-valuemin={0}
	aria-valuemax={100}
>
	<span bind:this={measureEl} class="measure" aria-hidden="true">{fillChar}</span>
	{bar}
</div>

<style>
	.root {
		display: block;
		background: var(--border-muted);
		white-space: nowrap;
		text-align: left;
		overflow: hidden;
		position: relative;
	}

	.measure {
		visibility: hidden;
		position: absolute;
		pointer-events: none;
	}
</style>
