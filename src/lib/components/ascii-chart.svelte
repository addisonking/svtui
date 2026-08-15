<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	export type AsciiChartProps = HTMLAttributes<HTMLElement> & {
		ref?: HTMLElement | null;
		data?: number[];
		height?: number; // in integer --line units (default: 1)
		min?: number;
		max?: number;
		label?: string;
		showValues?: boolean;
	};

	const BLOCKS = [' ', ' ', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
</script>

<script lang="ts">
	let {
		ref = $bindable(null),
		data = [],
		height = 1,
		min: minProp,
		max: maxProp,
		label,
		showValues = false,
		class: className = '',
		...restProps
	}: AsciiChartProps = $props();

	const validHeight = $derived(Math.max(1, Math.floor(height)));

	const minVal = $derived(
		minProp !== undefined ? minProp : data.length > 0 ? Math.min(...data) : 0
	);
	const maxVal = $derived(
		maxProp !== undefined ? maxProp : data.length > 0 ? Math.max(...data) : 100
	);
	const currentVal = $derived(data.length > 0 ? data[data.length - 1] : 0);

	// Generate multi-line ascii grid
	const chartRows = $derived.by(() => {
		if (data.length === 0) return [];
		const rows: string[] = [];
		const range = maxVal === minVal ? 1 : maxVal - minVal;

		for (let r = validHeight - 1; r >= 0; r--) {
			let lineStr = '';
			const rowMin = minVal + (r / validHeight) * range;
			const rowMax = minVal + ((r + 1) / validHeight) * range;
			const rowHeight = rowMax - rowMin;

			for (const val of data) {
				if (val <= rowMin) {
					lineStr += ' ';
				} else if (val >= rowMax) {
					lineStr += '█';
				} else {
					const fraction = (val - rowMin) / rowHeight;
					const idx = Math.min(BLOCKS.length - 1, Math.floor(fraction * (BLOCKS.length - 1)) + 1);
					lineStr += BLOCKS[idx] || ' ';
				}
			}
			rows.push(lineStr);
		}
		return rows;
	});
</script>

<figure
	bind:this={ref}
	class="chart-wrap {className}"
	style:--chart-rows={validHeight}
	role="img"
	aria-label={label ?? 'ASCII data chart'}
	{...restProps}
>
	{#if label || showValues}
		<div class="chart-header">
			{#if label}<span class="chart-label">{label}</span>{/if}
			{#if showValues}
				<span class="chart-stats">
					<span class="stat-cur">{currentVal}</span>
					<span class="stat-minmax">[{minVal}..{maxVal}]</span>
				</span>
			{/if}
		</div>
	{/if}

	<div class="chart-body">
		{#each chartRows as row, i (i)}
			<div class="chart-row">{row}</div>
		{/each}
	</div>
</figure>

<style>
	.chart-wrap {
		margin: 0;
		display: flex;
		flex-direction: column;
		font-family: var(--font-family-mono);
		font-size: var(--font-size);
		line-height: var(--line);
		color: var(--text-primary);
		box-sizing: border-box;
	}

	.chart-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: var(--line);
		line-height: var(--line);
		user-select: none;
	}

	.chart-label {
		font-weight: bold;
		opacity: 0.85;
	}

	.chart-stats {
		display: flex;
		gap: 1ch;
	}

	.stat-cur {
		color: var(--focus-ring);
		font-weight: bold;
	}

	.stat-minmax {
		opacity: 0.5;
	}

	.chart-body {
		display: flex;
		flex-direction: column;
		height: calc(var(--line) * var(--chart-rows, 1));
		user-select: none;
		color: var(--focus-ring);
	}

	.chart-row {
		height: var(--line);
		line-height: var(--line);
		white-space: pre;
		overflow: hidden;
	}
</style>
