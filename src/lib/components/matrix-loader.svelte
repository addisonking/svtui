<script lang="ts" module>
	/** A matrix-rain loader streaming random glyphs (greek/katakana) that fade. */
	export type MatrixLoaderProps = {
		rows?: number;
		direction?: 'top-to-bottom' | 'left-to-right';
		mode?: 'greek' | 'katakana';
	};
</script>

<script lang="ts">
	let { rows = 25, direction = 'top-to-bottom', mode = 'greek' }: MatrixLoaderProps = $props();

	let preEl = $state<HTMLPreElement>(null!);

	$effect(() => {
		const el = preEl;
		if (!el) return;
		let cancelled = false;

		const measure = document.createElement('span');
		measure.style.visibility = 'hidden';
		measure.style.position = 'absolute';
		measure.style.whiteSpace = 'pre';
		measure.textContent = 'X';
		el.appendChild(measure);

		const textColor = getComputedStyle(document.body).getPropertyValue('--text-primary').trim();

		let cols = 40;
		let prevCols = -1;
		let grid: HTMLSpanElement[] = [];
		let prevChars: string[] = [];
		let prevColors: string[] = [];
		let brightness = new Float64Array(0);
		let heads: number[] = [];

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
			brightness = new Float64Array(n * rows);
			heads = direction === 'top-to-bottom' ? new Array(n).fill(0) : new Array(rows).fill(0);
		};

		const updateCols = () => {
			const chW = measure.getBoundingClientRect().width;
			if (chW > 0) {
				cols = Math.floor(el.clientWidth / chW);
				buildGrid(cols);
			}
		};
		updateCols();

		const resizeObs = new ResizeObserver(updateCols);
		resizeObs.observe(el);

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

		const randChar = () => {
			if (mode === 'greek') {
				const upper = Math.random() < 0.5;
				return String.fromCharCode(
					upper
						? 0x0391 + Math.floor(Math.random() * (0x03a9 - 0x0391 + 1))
						: 0x03b1 + Math.floor(Math.random() * (0x03c9 - 0x03b1 + 1))
				);
			}
			// katakana
			return String.fromCharCode(0x30a0 + Math.floor(Math.random() * (0x30ff - 0x30a0 + 1)));
		};

		const loop = () => {
			if (!visible || cancelled) return;
			const total = cols * rows;
			for (let i = 0; i < total; i++) brightness[i] *= 0.92;

			if (direction === 'top-to-bottom') {
				for (let c = 0; c < cols; c++) {
					const y = heads[c];
					if (y < rows) brightness[y * cols + c] = 1;
					heads[c]++;
					if (heads[c] > rows + Math.random() * 40) heads[c] = 0;
				}
			} else {
				for (let r = 0; r < rows; r++) {
					const x = heads[r];
					if (x < cols) brightness[r * cols + x] = 1;
					heads[r]++;
					if (heads[r] > cols + Math.random() * 40) heads[r] = 0;
				}
			}

			for (let idx = 0; idx < total && idx < grid.length; idx++) {
				const b = brightness[idx];
				const s = grid[idx];
				if (b < 0.02) {
					if (prevChars[idx] !== ' ') {
						s.textContent = ' ';
						prevChars[idx] = ' ';
					}
					if (prevColors[idx] !== '') {
						s.style.color = '';
						prevColors[idx] = '';
					}
					continue;
				}
				if (b > 0.9 || Math.random() < 0.03) {
					const ch = randChar();
					if (ch !== prevChars[idx]) {
						s.textContent = ch;
						prevChars[idx] = ch;
					}
				}
				const key = (Math.round(b * 100) / 100).toFixed(2);
				if (key !== prevColors[idx]) {
					s.style.color = textColor;
					s.style.opacity = String(b);
					prevColors[idx] = key;
				}
			}
			frame = requestAnimationFrame(loop);
		};
		frame = requestAnimationFrame(loop);

		return () => {
			cancelled = true;
			cancelAnimationFrame(frame);
			resizeObs.disconnect();
			interObs.disconnect();
			measure.remove();
		};
	});
</script>

<div class="container">
	<pre
		bind:this={preEl}
		class="root"
		style={`height: calc(var(--font-size) * var(--base-line-height) * ${rows})`}></pre>
</div>

<style>
	.container {
		width: 100%;
		height: auto;
		position: relative;
	}

	.root {
		display: block;
		width: 100%;
		line-height: calc(var(--font-size) * var(--base-line-height) * 1);
		overflow: hidden;
		margin: 0;
		padding: 0;
		background: transparent;
	}
</style>
