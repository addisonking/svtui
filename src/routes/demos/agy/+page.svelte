<script lang="ts">
	import AgyDemo from '$lib/config/(demos)/agy.svelte';
	import CodeBlock from '$lib/components/code-block.svelte';
	import Badge from '$lib/components/badge.svelte';
	import agySource from '$lib/config/(demos)/agy.svelte?raw';

	let copiedSource = $state(false);

	async function copySource() {
		try {
			await navigator.clipboard.writeText(agySource);
			copiedSource = true;
			setTimeout(() => (copiedSource = false), 1500);
		} catch {
			copiedSource = false;
		}
	}
</script>

<svelte:head>
	<title>Antigravity CLI Demo — svtui</title>
	<meta
		name="description"
		content="An authentic terminal interface modeled after Antigravity CLI (agy), composed entirely of svtui primitives."
	/>
</svelte:head>

<div class="max-w-4xl space-y-8 p-4">
	<div>
		<div class="flex items-baseline gap-2">
			<h1 class="text-lg uppercase">Antigravity CLI</h1>
			<Badge>DEMO</Badge>
		</div>
		<p class="opacity-80">
			An authentic, character-grid-aligned terminal interface modeled after Antigravity CLI (<code
				>agy</code
			>), composed entirely of standard <code>svtui</code> primitives (<code>Input</code>,
			<code>Divider</code>, <code>Accordion</code>, <code>Card</code>,
			<code>RadioButtonGroup</code>,
			<code>Dialog</code>, <code>CodeBlock</code>, <code>BlockLoader</code>).
		</p>
	</div>

	<!-- DEMO FRAME -->
	<section class="demo">
		<h2 class="section-title">Live Terminal Demo</h2>
		<div class="demo-frame">
			<AgyDemo />
		</div>
	</section>

	<!-- SOURCE CODE -->
	<section class="component">
		<div class="code-section">
			<div class="flex items-center justify-between">
				<span class="sub-label">agy.svelte</span>
				<button class="copy" onclick={copySource}>{copiedSource ? 'COPIED' : 'COPY'}</button>
			</div>
			<CodeBlock code={agySource} />
		</div>
	</section>
</div>

<style>
	.section-title {
		text-transform: uppercase;
		font-size: var(--font-size);
		line-height: var(--line);
		letter-spacing: 0.1em;
		opacity: 0.7;
		margin-bottom: var(--line);
	}

	.sub-label {
		text-transform: uppercase;
		font-size: var(--font-size);
		line-height: var(--line);
		opacity: 0.7;
	}

	.demo-frame {
		background: var(--surface-base);
		padding: var(--line) 2ch;
		box-shadow:
			inset 0 0 0 1px var(--border-default),
			0.5ch 0.5ch 0 0 var(--border-muted);
	}

	.component {
		box-shadow: inset 0 1px 0 0 var(--border-default);
		padding-top: var(--line);
	}

	.code-section {
		display: flex;
		flex-direction: column;
	}

	.copy {
		font-family: inherit;
		font-size: inherit;
		background: var(--button-secondary-fg);
		border: 0;
		padding: 0 0.5ch;
		cursor: pointer;
		color: inherit;
	}
	.copy:hover {
		background: var(--focus-ring);
	}
</style>
