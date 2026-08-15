<script lang="ts">
	import NeovimDemo from '$lib/config/(demos)/neovim.svelte';
	import CodeBlock from '$lib/components/code-block.svelte';
	import Badge from '$lib/components/badge.svelte';
	import neovimSource from '$lib/config/(demos)/neovim.svelte?raw';

	let copiedSource = $state(false);

	async function copySource() {
		try {
			await navigator.clipboard.writeText(neovimSource);
			copiedSource = true;
			setTimeout(() => (copiedSource = false), 1500);
		} catch {
			copiedSource = false;
		}
	}
</script>

<svelte:head>
	<title>Neovim Editor Demo — svtui</title>
	<meta
		name="description"
		content="A character-grid-aligned terminal code editor mock modeled after Neovim with modal editing and bufferline."
	/>
</svelte:head>

<div class="max-w-4xl space-y-8 p-4">
	<div>
		<div class="flex items-baseline gap-2">
			<h1 class="text-lg uppercase">Neovim</h1>
			<Badge>DEMO</Badge>
		</div>
		<p class="opacity-80">
			A character-grid-aligned terminal code editor mock modeled after Neovim (<code>nvim</code>),
			complete with bufferline tab navigation, line number gutter, modal editing (<code>NORMAL</code
			>, <code>INSERT</code>, <code>VISUAL</code>, <code>COMMAND</code>), dynamic statusline, and
			command-line execution (<code>:w</code>, <code>:e &lt;file&gt;</code>, <code>:help</code>).
		</p>
	</div>

	<!-- DEMO FRAME -->
	<section class="demo">
		<h2 class="section-title">Live Editor Demo (Click inside to interact)</h2>
		<div class="demo-frame">
			<NeovimDemo />
		</div>
	</section>

	<!-- SOURCE CODE -->
	<section class="component">
		<div class="code-section">
			<div class="flex items-center justify-between">
				<span class="sub-label">neovim.svelte</span>
				<button class="copy" onclick={copySource}>{copiedSource ? 'COPIED' : 'COPY'}</button>
			</div>
			<CodeBlock code={neovimSource} />
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
