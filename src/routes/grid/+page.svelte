<script lang="ts">
	import Badge from '$lib/components/badge.svelte';
	import Card from '$lib/components/card.svelte';
	import CodeBlock from '$lib/components/code-block.svelte';
</script>

<svelte:head>
	<title>svtui — the grid</title>
	<meta
		name="description"
		content="How svtui components stay aligned to a character grid, and the rules for composing them."
	/>
</svelte:head>

<div class="max-w-3xl space-y-8 p-4">
	<header class="space-y-2">
		<div class="flex items-center gap-2">
			<h1 class="text-lg">GRID</h1>
			<Badge>guide</Badge>
		</div>
		<p>
			Every svtui component sits on a character grid, like a real terminal. Follow three rules when
			you compose them and the whole page stays aligned. Flip the <strong>GRID</strong> toggle in the
			sidebar to see it.
		</p>
	</header>

	<section class="flex flex-col gap-2">
		<h2 class="uppercase">The cell</h2>
		<p>
			Everything derives from two tokens. A terminal cell is taller than it is wide, and this pair
			encodes that:
		</p>
		<Card title="tokens">
			<CodeBlock
				code={`--cell: 1ch;                                   /* one character wide */
--line: calc(var(--font-size) * var(--base-line-height)); /* one line tall */`}
			/>
		</Card>
		<p>
			Horizontal spacing is in <code>ch</code> (multiples of <code>--cell</code>), vertical spacing
			and heights in multiples of <code>--line</code>. Never re-derive line height inline.
		</p>
	</section>

	<section class="flex flex-col gap-2">
		<h2 class="uppercase">1 · Integer lines only</h2>
		<p>
			Vertical offsets are whole lines. A half-line seam puts content mid-row and breaks alignment.
			If you need room inside a box, step up to a full line.
		</p>
		<Card title="do">
			<CodeBlock
				code={`padding: var(--line) 2ch;
height: calc(var(--line) * 3);`}
			/>
		</Card>
		<Card title="don't">
			<CodeBlock
				code={`padding-top: calc(var(--line) * 0.5); /* half-line: off grid */
margin-top: 12px;                              /* px: off grid */`}
			/>
		</Card>
	</section>

	<section class="flex flex-col gap-2">
		<h2 class="uppercase">2 · Strokes are box-shadows</h2>
		<p>
			A <code>border: 1px</code> shifts the content box below it off the grid by a pixel, and the
			shift cascades to every child. Draw strokes with <code>box-shadow</code> instead — inset to
			paint inside, outset to paint beside. <code>Card</code>'s frame and <code>Table</code>'s row
			dividers both work this way.
		</p>
		<Card title="do">
			<CodeBlock
				code={`box-shadow: inset 0 0 0 1px var(--border-default); /* frame */
box-shadow: 0 1px 0 0 var(--border-muted);        /* divider below */`}
			/>
		</Card>
		<Card title="don't">
			<CodeBlock code="border-bottom: 1px solid var(--border-muted); /* shifts content 1px */" />
		</Card>
	</section>

	<section class="flex flex-col gap-2">
		<h2 class="uppercase">3 · One text cell</h2>
		<p>
			Text is one cell: <code>font-size: var(--font-size)</code>,
			<code>line-height: var(--line)</code>. A larger font-size has a taller line-box, which puts
			that element off the grid. Build hierarchy with uppercase, weight, and spacing — not size.
		</p>
	</section>

	<section class="flex flex-col gap-2">
		<h2 class="uppercase">Composing</h2>
		<p>
			Stack components with a <code>var(--line)</code> gap (or a multiple). Keep horizontal spacing
			in <code>ch</code>. Reach for the structural primitives —
			<code>Row</code>, <code>RowSpaceBetween</code>, <code>Block</code>, <code>Indent</code> — before
			writing new layout CSS.
		</p>
	</section>

	<section class="flex flex-col gap-2">
		<h2 class="uppercase">Verify</h2>
		<p>
			The <strong>GRID</strong> toggle paints the <code>--cell</code> × <code>--line</code> grid
			over the page. A component that snaps stays aligned as you switch theme, tint, and font; one
			that doesn't needs its offset fixed. Two sub-pixel caveats are measurement artifacts, not
			bugs: inline elements report bounding rects a few px taller than their line (font ascender /
			descender overshoot), and a fractional <code>ch</code> drifts ~1px across very wide rows.
		</p>
	</section>

	<section class="flex flex-col gap-2">
		<h2 class="uppercase">Migrating an older preset</h2>
		<p>
			Components reference <code>--line</code> and <code>--cell</code>. If your
			<code>app.css</code> predates them, re-run <code>npx svtui init</code> (or add the two lines above)
			or new components will collapse to auto height.
		</p>
	</section>
</div>
