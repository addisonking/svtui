<script lang="ts" module>
	/** A determinate/indeterminate bar loader. */
	export type BarLoaderProps = {
		/** When omitted, the bar advances itself by 10% every `intervalRate` ms. */
		intervalRate?: number;
		/** Set to drive the bar externally (0–100). Disables the auto interval. */
		progress?: number;
	};
</script>

<script lang="ts">
	let { intervalRate, progress }: BarLoaderProps = $props();

	// svelte-ignore state_referenced_locally
	let current = $state(progress ?? 0);

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
</script>

<div class="root">
	<div class="bar" style={`width: ${Math.min(current, 100)}%`}></div>
</div>

<style>
	.root {
		background: var(--border-default);
		height: var(--line);
		white-space: nowrap;
		text-align: left;
		display: block;
	}

	.bar {
		background: linear-gradient(to right, transparent, var(--text-primary));
		height: 100%;
		width: 0%;
		transition: width 0.1s linear;
	}
</style>
