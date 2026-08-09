<script lang="ts">
	import { settings, setTint, setFont, tints, fonts } from '$lib/settings';

	let { onNavigate }: { onNavigate?: () => void } = $props();

	// Treat the ActionList rows as radio-like toggles: clicking a tint sets it.
	// active highlight reuses the sidebar's `.active .text` rule via class.
</script>

<div class="flex flex-col gap-4">
	<section class="flex flex-col gap-2">
		<span class="label">THEME</span>
		<div class="grid grid-cols-4 gap-2">
			{#each tints as tint (tint)}
				<button
					class="swatch tint-{tint}"
					class:active={$settings.tint === tint}
					onclick={() => setTint(tint)}
					aria-label="tint {tint}"
					title={tint}
				></button>
			{/each}
		</div>
	</section>

	<section class="flex flex-col gap-2">
		<span class="label">FONT</span>
		<div class="flex flex-col">
			{#each fonts as font (font)}
				<button
					class="font-row"
					class:active={$settings.font === font}
					onclick={() => {
						setFont(font);
						onNavigate?.();
					}}>{font}</button
				>
			{/each}
		</div>
	</section>
</div>

<style>
	.label {
		text-transform: uppercase;
		opacity: 0.6;
	}
	.swatch {
		height: 1.5rem;
		border: 0;
		cursor: pointer;
		background: var(--surface-base);
		box-shadow: inset 0 0 0 2px var(--border-default);
	}
	.swatch.active {
		box-shadow: inset 0 0 0 2px var(--text-primary);
	}
	.tint-none {
		background: var(--surface-base);
	}
	.tint-green {
		background: #39ff44;
	}
	.tint-blue {
		background: #0047ff;
	}
	.tint-red {
		background: #ff0000;
	}
	.tint-yellow {
		background: #e4f221;
	}
	.tint-purple {
		background: #8000ff;
	}
	.tint-orange {
		background: #ffac1c;
	}
	.tint-pink {
		background: #ff00ff;
	}
	.font-row {
		font-family: inherit;
		font-size: inherit;
		text-align: left;
		border: 0;
		background: var(--surface-base);
		color: inherit;
		padding: 0 1ch;
		cursor: pointer;
	}
	.font-row:hover {
		background: var(--focus-ring);
	}
	.font-row.active {
		box-shadow: inset 2px 0 0 0 var(--text-primary);
	}
</style>
