<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	/** A per-cell-painted ASCII canvas. A render function maps each (x,y,t) cell
	 *  to a glyph + color; the component builds a span grid sized to the element,
	 *  runs a requestAnimationFrame loop (only while visible), and writes only
	 *  the cells that changed each frame. */
	export type ASCIICanvasCell = { char: string; color: string };

	export type ASCIICanvasRender = (
		x: number,
		y: number,
		t: number,
		cols: number,
		rows: number
	) => ASCIICanvasCell;

	export type ASCIICanvasProps = Omit<HTMLAttributes<HTMLPreElement>, 'children' | 'style'> & {
		ref?: HTMLPreElement | null;
		rows?: number;
		render?: ASCIICanvasRender;
		/** Fired whenever the measured column count changes (after layout). */
		onlayout?: (cols: number) => void;
		/** Fired at the top of each animation frame, before painting. */
		onframe?: (t: number, cols: number) => void;
	};
</script>

<script lang="ts">
	let {
		class: className,
		ref = $bindable(null),
		rows = 10,
		render,
		onframe,
		onlayout,
		...restProps
	}: ASCIICanvasProps = $props();

	let preEl = $state<HTMLPreElement>(null!);

	// Default render: a simple shimmer of '0'/'1' digits in shifting greyscale.
	const defaultRender = (x: number, y: number, t: number): ASCIICanvasCell => {
		const speed = t * 8;
		const wave1 = Math.sin(x * 0.15 + speed) * Math.cos(y * 0.1 + speed * 0.7);
		const wave2 = Math.sin((x + y) * 0.08 + speed * 1.3);
		const v = wave1 + wave2;
		const density = '10';
		const digit = density[Math.floor(x * 0.5 + y * 0.3 + speed * 2) % density.length];
		const brightness = Math.floor(((Math.sin(v * 2) + 1) / 2) * 180 + 50);
		const hex = brightness.toString(16).padStart(2, '0');
		return { char: digit, color: `#${hex}${hex}${hex}` };
	};

	const draw = $derived(render ?? defaultRender);

	$effect(() => {
		const el = preEl;
		if (!el || !draw) return;
		let cancelled = false;

		const measure = document.createElement('span');
		measure.style.visibility = 'hidden';
		measure.style.position = 'absolute';
		measure.style.whiteSpace = 'pre';
		measure.textContent = 'X';
		el.appendChild(measure);

		let cols = 40;
		let prevCols = -1;
		let grid: HTMLSpanElement[] = [];
		let prevChars: string[] = [];
		let prevColors: string[] = [];

		const buildGrid = (n: number) => {
			if (n === prevCols) return;
			prevCols = n;
			while (el.firstChild && el.firstChild !== measure) el.removeChild(el.firstChild);
			const frag = document.createDocumentFragment();
			const spans: HTMLSpanElement[] = [];
			for (let y = 0; y < rows; y++) {
				for (let x = 0; x < n; x++) {
					const s = document.createElement('span');
					s.textContent = ' ';
					spans.push(s);
					frag.appendChild(s);
				}
				if (y < rows - 1) frag.appendChild(document.createTextNode('\n'));
			}
			el.insertBefore(frag, measure);
			grid = spans;
			prevChars = new Array(n * rows).fill('');
			prevColors = new Array(n * rows).fill('');
		};

		const updateCols = () => {
			const chW = measure.getBoundingClientRect().width;
			if (chW > 0) {
				cols = Math.floor(el.clientWidth / chW);
				buildGrid(cols);
				onlayout?.(cols);
			}
		};
		updateCols();

		const resizeObs = new ResizeObserver(updateCols);
		resizeObs.observe(el);

		// Font class changes on <body> alter --font-family-mono / char width, so
		// rebuild the grid when body's class/style mutates.
		const fontObs = new MutationObserver(() => {
			prevCols = 0;
			updateCols();
		});
		fontObs.observe(document.body, { attributes: true, attributeFilter: ['class', 'style'] });

		let visible = false;
		let frame = 0;
		const interObs = new IntersectionObserver(
			([entry]) => {
				const was = visible;
				visible = entry.isIntersecting;
				if (entry.isIntersecting && !was) frame = requestAnimationFrame(loop);
			},
			{ threshold: 0 }
		);
		interObs.observe(el);

		const loop = () => {
			if (!visible || cancelled) return;
			const total = cols * rows;
			const time = performance.now() * 0.0001;
			onframe?.(time, cols);
			for (let idx = 0; idx < total && idx < grid.length; idx++) {
				const column = idx % cols;
				const row = (idx - column) / cols;
				const cell = draw(column, row, time, cols, rows);
				const span = grid[idx];
				if (cell.char !== prevChars[idx]) {
					span.textContent = cell.char;
					prevChars[idx] = cell.char;
				}
				if (cell.color !== prevColors[idx]) {
					span.style.color = cell.color;
					prevColors[idx] = cell.color;
				}
			}
			frame = requestAnimationFrame(loop);
		};
		frame = requestAnimationFrame(loop);

		return () => {
			cancelled = true;
			cancelAnimationFrame(frame);
			resizeObs.disconnect();
			fontObs.disconnect();
			interObs.disconnect();
			measure.remove();
		};
	});

	$effect(() => {
		ref = preEl;
	});
</script>

<pre
	bind:this={preEl}
	class={`ascii-canvas ${className ?? ''}`}
	style={`height: calc(var(--line) * ${rows})`}
	{...restProps}></pre>

<style>
	.ascii-canvas {
		display: block;
		width: 100%;
		font-family: var(--font-family-mono);
		font-size: var(--font-size);
		line-height: var(--line);
		overflow: hidden;
		margin: 0;
		padding: 0;
	}
</style>
