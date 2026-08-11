<script lang="ts">
	import ASCIICanvas from '$lib/components/ascii-canvas.svelte';
	import ActionButton from '$lib/components/action-button.svelte';

	type Pos = { x: number; y: number };
	type Dir = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

	const ROWS = 25;
	const MOVE_INTERVAL = 150;

	let focused = $state(false);
	let score = $state(0);

	// Ref so the stable render closure reads live `focused` (via the movement
	// rAF below) without being recreated.
	const ref = { focused: false };
	$effect(() => {
		ref.focused = focused;
	});

	// Plain mutable game game, read by the stable render closure passed to the
	// canvas. Kept out of $state so mutating it doesn't tear down the canvas's
	// rAF effect (the closure just reads the current values each frame).
	const game = {
		cols: 0,
		direction: 'RIGHT' as Dir,
		snake: [] as Pos[],
		fruit: { x: 0, y: 0 } as Pos,
		lastMove: 0
	};

	const reset = (c: number, r: number) => {
		game.cols = c;
		const startX = Math.floor(c / 2);
		const startY = Math.floor(r / 2);
		const s: Pos[] = [];
		for (let i = 13; i >= 0; i--) s.push({ x: startX - i, y: startY });
		game.snake = s;
		game.direction = 'RIGHT';
		game.fruit = { x: Math.floor(Math.random() * c), y: Math.floor(Math.random() * r) };
		game.lastMove = performance.now();
		score = 0;
	};

	const moveSnake = () => {
		const snake = game.snake;
		const head = snake[snake.length - 1];
		const next: Pos = { x: head.x, y: head.y };
		const d = game.direction;
		if (d === 'LEFT') next.x -= 1;
		if (d === 'RIGHT') next.x += 1;
		if (d === 'UP') next.y -= 1;
		if (d === 'DOWN') next.y += 1;

		if (next.x < 0 || next.x >= game.cols || next.y < 0 || next.y >= ROWS) {
			reset(game.cols, ROWS);
			return;
		}
		for (const seg of snake) {
			if (seg.x === next.x && seg.y === next.y) {
				reset(game.cols, ROWS);
				return;
			}
		}
		snake.push(next);
		if (next.x === game.fruit.x && next.y === game.fruit.y) {
			score += 1;
			let p: Pos;
			while (true) {
				p = { x: Math.floor(Math.random() * game.cols), y: Math.floor(Math.random() * ROWS) };
				if (!snake.some((s) => s.x === p.x && s.y === p.y)) break;
			}
			game.fruit = p;
		} else {
			snake.shift();
		}
	};

	// The canvas paints `game` each frame via the stable `render` closure.
	// Movement runs on this component's own rAF so it doesn't couple to the
	// canvas's effect lifecycle (which would tear down its grid on every
	// score change).
	$effect(() => {
		let raf = 0;
		const loop = (now: number) => {
			if (ref.focused && now - game.lastMove > MOVE_INTERVAL) {
				moveSnake();
				game.lastMove = now;
			}
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	});

	const textColor =
		typeof document !== 'undefined'
			? getComputedStyle(document.body).getPropertyValue('--text-primary').trim()
			: '#fff';
	const focusColor =
		typeof document !== 'undefined'
			? getComputedStyle(document.body).getPropertyValue('--focus-ring').trim()
			: '#f60';

	// Memoized so it's created once (the canvas's paint effect captures this
	// identity; recreating it would tear down the grid). Reads only the stable
	// `game` object, so the derived never re-evaluates.
	const render = $derived.by(() => (x: number, y: number): { char: string; color: string } => {
		const idx = y * game.cols + x;
		for (const seg of game.snake) {
			if (seg.y * game.cols + seg.x === idx) return { char: '█', color: textColor };
		}
		if (game.fruit.y * game.cols + game.fruit.x === idx) return { char: '█', color: focusColor };
		return { char: ' ', color: '' };
	});

	const onlayout = (c: number) => reset(c, ROWS);

	const handleKeydown = (e: KeyboardEvent) => {
		if (!focused) return;
		const k = e.key;
		if (k === 'ArrowLeft' || k === 'ArrowRight' || k === 'ArrowUp' || k === 'ArrowDown') {
			e.preventDefault();
			e.stopPropagation();
		}
		const d = game.direction;
		if (k === 'ArrowLeft' && d !== 'RIGHT') game.direction = 'LEFT';
		if (k === 'ArrowRight' && d !== 'LEFT') game.direction = 'RIGHT';
		if (k === 'ArrowUp' && d !== 'DOWN') game.direction = 'UP';
		if (k === 'ArrowDown' && d !== 'UP') game.direction = 'DOWN';
	};

	const press = (dir: Dir) => {
		const opp: Record<Dir, Dir> = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' };
		if (game.direction !== opp[dir]) game.direction = dir;
	};
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- svelte-ignore a11y_click_events_have_key_events,a11y_no_noninteractive_tabindex,a11y_no_noninteractive_element_interactions -->
<div
	class="snake"
	tabindex="0"
	role="application"
	aria-label="snake game — arrow keys to move"
	onfocus={() => (focused = true)}
	onblur={() => (focused = false)}
	onclick={(e) => (e.currentTarget as HTMLElement).focus()}
>
	<div class="hud">
		<span class="score">SCORE: {score}</span>
		{#if !focused}<span class="hint">click the grid, then use arrow keys</span>{/if}
	</div>

	<ASCIICanvas rows={ROWS} {render} {onlayout} />

	<div class="controls">
		<ActionButton onclick={() => press('UP')}>Up</ActionButton>
		<ActionButton onclick={() => press('DOWN')}>Down</ActionButton>
		<ActionButton onclick={() => press('LEFT')}>Left</ActionButton>
		<ActionButton onclick={() => press('RIGHT')}>Right</ActionButton>
	</div>
</div>

<style>
	.snake {
		display: flex;
		flex-direction: column;
		gap: var(--line);
		padding: 1ch;
		outline: 0;
	}
	.snake:focus-visible :global(.ascii-canvas) {
		box-shadow: inset 0 0 0 1px var(--focus-ring);
	}
	.hud {
		display: flex;
		gap: 2ch;
		align-items: baseline;
		font-size: 0.75rem;
		text-transform: uppercase;
	}
	.hint {
		opacity: 0.6;
	}
	.controls {
		display: flex;
		gap: 0.5ch;
		flex-wrap: wrap;
	}
</style>
