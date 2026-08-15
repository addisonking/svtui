<script lang="ts">
	import ActionList from '$lib/components/action-list.svelte';
	import { settings, setTint, setFont, setTheme, toggleGrid, tints, fonts } from '$lib/settings';

	let themeOpen = $state(false);
	let fontOpen = $state(false);

	const tintLabels: Record<string, string> = {
		none: 'NONE',
		green: 'GREEN',
		blue: 'BLUE',
		red: 'RED',
		yellow: 'YELLOW',
		purple: 'PURPLE',
		orange: 'ORANGE',
		pink: 'PINK'
	};

	const fontLabels: Record<string, string> = {
		geist: 'GEIST MONO',
		fixedsys: 'FIXEDSYS EXCELSIOR',
		vt220: 'GLASSTTY VT220',
		phoenix: 'PHOENIX EGA 8X8',
		jetbrains: 'JETBRAINS MONO'
	};
</script>

<div class="flex flex-col picker">
	<!-- THEME: light/dark toggle + tint submenu -->
	<button
		class="trigger"
		class:open={themeOpen}
		onclick={() => (themeOpen = !themeOpen)}
		aria-expanded={themeOpen}
	>
		<span class="caret">{themeOpen ? 'v' : '>'}</span>
		THEME: {$settings.theme === 'light' ? 'LIGHT' : 'DARK'}
	</button>

	{#if themeOpen}
		<div class="flex flex-col">
			<ActionList icon={$settings.theme === 'light' ? '*' : ' '} onclick={() => setTheme('light')}
				>LIGHT</ActionList
			>
			<ActionList icon={$settings.theme === 'dark' ? '*' : ' '} onclick={() => setTheme('dark')}
				>DARK</ActionList
			>

			<div class="sublabel">TINT</div>
			{#each tints as tint (tint)}
				<ActionList icon={$settings.tint === tint ? '*' : ' '} onclick={() => setTint(tint)}
					>{tintLabels[tint]}</ActionList
				>
			{/each}
		</div>
	{/if}

	<!-- FONT: dropdown of available fonts -->
	<button
		class="trigger"
		class:open={fontOpen}
		onclick={() => (fontOpen = !fontOpen)}
		aria-expanded={fontOpen}
	>
		<span class="caret">{fontOpen ? 'v' : '>'}</span>
		FONT: {fontLabels[$settings.font] ?? $settings.font.toUpperCase()}
	</button>

	{#if fontOpen}
		<div class="flex flex-col">
			{#each fonts as font (font)}
				<ActionList icon={$settings.font === font ? '*' : ' '} onclick={() => setFont(font)}
					>{fontLabels[font]}</ActionList
				>
			{/each}
		</div>
	{/if}

	<!-- GRID: debug overlay proving components snap to the character grid -->
	<button class="trigger" onclick={toggleGrid} aria-pressed={$settings.grid}>
		<span class="caret">{$settings.grid ? '*' : ' '}</span>
		GRID: {$settings.grid ? 'ON' : 'OFF'}
	</button>
</div>

<style>
	.picker {
		/* Tighter than the docs' default one-line gap: the THEME/FONT/GRID
		   controls read as one contiguous menu. 0 stays on the grid. */
		row-gap: 0;
	}

	.trigger {
		font-family: inherit;
		font-size: inherit;
		text-align: left;
		border: 0;
		background: var(--surface-base);
		color: var(--text-primary);
		padding: 0 1ch;
		cursor: pointer;
		text-transform: uppercase;
	}
	.trigger:hover {
		background: var(--focus-ring);
	}
	.caret {
		display: inline-block;
		width: 3ch;
		text-align: center;
		color: var(--border-muted);
		user-select: none;
	}
	.sublabel {
		padding: 0 1ch 0 4ch;
		text-transform: uppercase;
		opacity: 0.5;
		font-size: var(--font-size);
		line-height: var(--line);
		letter-spacing: 0.1em;
	}
</style>
