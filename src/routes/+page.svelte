<script lang="ts">
	import Badge from '$lib/components/badge.svelte';
	import Card from '$lib/components/card.svelte';
	import CodeBlock from '$lib/components/code-block.svelte';

	let version = $state(__SVTUI_VERSION__);
</script>

<svelte:head>
	<title>svtui</title>
	<meta
		name="description"
		content="Terminal-aesthetic Svelte components. Copy-paste, self-contained, minimal deps."
	/>
</svelte:head>

<div class="max-w-3xl space-y-8 p-4">
	<header class="space-y-2">
		<div class="flex items-center gap-2">
			<h1 class="text-lg">svtui</h1>
			<Badge>v{version}</Badge>
		</div>
		<p>
			An open-source, minimal
			<Badge style="background-color: #ff3e00; color: white;">Svelte</Badge>
			component repository for building web applications and static sites with terminal aesthetic. Inspired
			by <a href="https://sacred.computer">srcl</a>.
		</p>
		<p class="text-sm">
			Components are self-contained source files you copy into your own project. Use the CLI
			<code>npx svtui add &lt;name&gt;</code> or browse from the sidebar.
		</p>
	</header>

	<section class="flex flex-col gap-2">
		<h2 class="uppercase">Install</h2>
		<p>Run the CLI from your project root. It writes a token preset and a font into your app.</p>
		<Card title="init">
			<CodeBlock code="npx svtui init" />
		</Card>
		<p>
			That drops <code>src/app.css</code> and a woff2 font file under <code>static/fonts/</code>.
			Import the css in your layout so the tokens load. The css file is the only shared bit; no
			runtime package to add to your dependencies.
		</p>
	</section>

	<section class="flex flex-col gap-2">
		<h2 class="uppercase">Add a component</h2>
		<Card title="add">
			<CodeBlock code="npx svtui add button" />
		</Card>
		<p>
			A <code>button.svelte</code> file lands in <code>src/lib/components/</code>. Import it like
			any other Svelte file. Multi-file components (the table, for instance) go into their own
			folder.
		</p>
		<p>
			Each file stands alone. It reads the tokens from app.css and imports nothing from outside
			svelte. You can read one and understand the whole thing. Edit it however you like.
		</p>
	</section>

	<section class="flex flex-col gap-2">
		<h2 class="uppercase">Theme</h2>
		<p>
			All colors are css custom properties in app.css. Override them at the root, or on a wrapper,
			to re-skin everything at once.
		</p>
		<Card title="app.css">
			<CodeBlock
				code={`:root {
  --surface-base: rgb(0, 0, 0);
  --text-primary: rgb(235, 235, 235);
  --focus-ring: rgb(239, 99, 0);
}`}
			/>
		</Card>
		<p>
			Put a <code>.dark</code> block next to <code>:root</code> for a dark variant, then toggle the
			class on <code>&lt;html&gt;</code> or <code>&lt;body&gt;</code>. That is the whole theme
			system. There is no javascript in it.
		</p>
	</section>

	<section class="flex flex-col gap-2">
		<h2 class="uppercase">The grid</h2>
		<p>
			Every svtui component sits on a character grid. Two tokens define it — a cell is 1ch wide and
			one line tall (a real terminal cell is taller than it is wide):
		</p>
		<Card title="tokens">
			<CodeBlock
				code={`--cell: 1ch;                                   /* one character wide */
--line: calc(var(--font-size) * var(--base-line-height)); /* one line tall */`}
			/>
		</Card>
		<p>
			Three rules keep composed UIs aligned. Flip the <strong>GRID</strong> toggle in the sidebar to see
			them hold.
		</p>
	</section>

	<section class="flex flex-col gap-2">
		<h2 class="uppercase">1 · Integer lines only</h2>
		<p>
			Vertical spacing and heights are whole lines. A half-line seam lands mid-row and breaks
			alignment — step up to a full line instead.
		</p>
		<Card title="do">
			<CodeBlock
				code={`padding: var(--line) 2ch;
height: calc(var(--line) * 3);`}
			/>
		</Card>
		<Card title="don't">
			<CodeBlock
				code={`padding-top: calc(var(--line) * 0.5); /* half-line */
margin-top: 12px;                              /* px */`}
			/>
		</Card>
	</section>

	<section class="flex flex-col gap-2">
		<h2 class="uppercase">2 · Strokes are box-shadows</h2>
		<p>
			A <code>border: 1px</code> shifts the content below it off the grid and cascades to every
			child. Draw strokes with <code>box-shadow</code> — inset to paint inside, outset to paint
			beside. <code>Card</code> and <code>Table</code> both do this.
		</p>
		<Card title="do">
			<CodeBlock
				code={`box-shadow: inset 0 0 0 1px var(--border-default); /* frame */
box-shadow: 0 1px 0 0 var(--border-muted);        /* divider */`}
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
			<code>line-height: var(--line)</code>. A larger font-size has a taller line-box, putting that
			element off the grid. Build hierarchy with uppercase, weight, and spacing — not size.
		</p>
	</section>

	<section class="flex flex-col gap-2">
		<h2 class="uppercase">Composing</h2>
		<p>
			Stack with a <code>var(--line)</code> gap (or a multiple); keep horizontal spacing in
			<code>ch</code>. Reach for the structural primitives — <code>Row</code>,
			<code>RowSpaceBetween</code>, <code>Block</code>, <code>Indent</code> — before writing new layout
			CSS.
		</p>
	</section>
</div>
