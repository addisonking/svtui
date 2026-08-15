<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	export type SpinnerVariant = 'dots' | 'line' | 'arc' | 'pulse' | 'bar';

	export type SpinnerProps = HTMLAttributes<HTMLSpanElement> & {
		ref?: HTMLSpanElement | null;
		variant?: SpinnerVariant;
		frames?: string[];
		interval?: number;
		label?: string;
	};

	const SPINNER_PRESETS: Record<SpinnerVariant, string[]> = {
		dots: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
		line: ['|', '/', '-', '\\'],
		arc: ['◜', '◠', '◝', '◞', '◡', '◟'],
		pulse: ['█', '▓', '▒', '░', '▒', '▓'],
		bar: ['[=   ]', '[==  ]', '[=== ]', '[ ===]', '[  ==]', '[   =]', '[    ]']
	};
</script>

<script lang="ts">
	let {
		ref = $bindable(null),
		variant = 'dots',
		frames,
		interval = 80,
		label,
		class: className = '',
		...restProps
	}: SpinnerProps = $props();

	const activeFrames = $derived(frames ?? SPINNER_PRESETS[variant] ?? SPINNER_PRESETS.dots);
	let frameIndex = $state(0);

	$effect(() => {
		const total = activeFrames.length;
		if (total <= 1) return;

		const timer = setInterval(() => {
			frameIndex = (frameIndex + 1) % total;
		}, interval);

		return () => clearInterval(timer);
	});
</script>

<span bind:this={ref} class="spinner-wrap {className}" {...restProps} role="status">
	<span class="spinner-glyph">{activeFrames[frameIndex] ?? activeFrames[0]}</span>
	{#if label}
		<span class="spinner-label">{label}</span>
	{/if}
</span>

<style>
	.spinner-wrap {
		display: inline-flex;
		align-items: center;
		gap: 1ch;
		font-family: var(--font-family-mono);
		font-size: var(--font-size);
		line-height: var(--line);
		height: var(--line);
		color: var(--text-primary);
		vertical-align: baseline;
		user-select: none;
	}

	.spinner-glyph {
		display: inline-block;
		color: var(--focus-ring);
		font-family: inherit;
		text-align: center;
		min-width: 1ch;
	}

	.spinner-label {
		color: inherit;
	}
</style>
