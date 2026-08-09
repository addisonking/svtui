<script lang="ts">
	import Card from '$lib/components/card.svelte';
	import Text from '$lib/components/text.svelte';
	import CodeBlock from '$lib/components/code-block.svelte';
</script>

<svelte:head>
	<title>svtui — getting started</title>
	<meta name="description" content="How to install and use svtui." />
</svelte:head>

<div class="max-w-3xl space-y-8 p-4">
	<header>
		<h1 class="text-lg uppercase">Getting started</h1>
		<p>
			svtui is a set of Svelte 5 components with a terminal look. You add them to your project by
			copying the source files in. You own the files afterwards.
		</p>
	</header>

	<section class="flex flex-col gap-2">
		<h2 class="uppercase">Install</h2>
		<p>Run the CLI from your project root. It writes a token preset and a font into your app.</p>
		<Card title="init">
			<CodeBlock code="npx svtui init" />
		</Card>
		<Text>
			That drops <code>src/app.css</code> and a woff2 font file under <code>static/fonts/</code>.
			Import the css in your layout so the tokens load. The css file is the only shared bit; no
			runtime package to add to your dependencies.
		</Text>
	</section>

	<section class="flex flex-col gap-2">
		<h2 class="uppercase">Add a component</h2>
		<Card title="add">
			<CodeBlock code="npx svtui add button" />
		</Card>
		<Text>
			A <code>button.svelte</code> file lands in <code>src/lib/components/</code>. Import it like
			any other Svelte file. Multi-file components (the table, for instance) go into their own
			folder.
		</Text>
		<Text>
			Each file stands alone. It reads the tokens from app.css and imports nothing from outside
			svelte. You can read one and understand the whole thing. Edit it however you like.
		</Text>
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
		<Text>
			Put a <code>.dark</code> block next to <code>:root</code> for a dark variant, then toggle the
			class on
			<code>&lt;html&gt;</code> or <code>&lt;body&gt;</code>. That is the whole theme system. There
			is no javascript in it.
		</Text>
	</section>

	<section class="flex flex-col gap-2">
		<h2 class="uppercase">What you get</h2>
		<p>
			Button, ActionButton, ActionList, Badge, Card, CodeBlock, Input, Label, Checkbox, Table, and a
			few layout pieces (Row, RowSpaceBetween, Indent, Block, Text, Divider). Run <code
				>npx svtui list</code
			> to see the current set.
		</p>
	</section>
</div>
