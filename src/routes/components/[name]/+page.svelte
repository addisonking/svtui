<script lang="ts">
	import CodeBlock from '$lib/components/code-block.svelte';
	import Badge from '$lib/components/badge.svelte';

	let { data } = $props();
	const doc = $derived(data.doc);
	const Example = $derived(doc.componentExample);

	let copiedSource = $state(false);
	let copiedProps = $state(false);

	async function copySource() {
		try {
			await navigator.clipboard.writeText(doc.source);
			copiedSource = true;
			setTimeout(() => (copiedSource = false), 1500);
		} catch {
			copiedSource = false;
		}
	}

	async function copyProps() {
		if (!doc.propsType) return;
		try {
			await navigator.clipboard.writeText(doc.propsType);
			copiedProps = true;
			setTimeout(() => (copiedProps = false), 1500);
		} catch {
			copiedProps = false;
		}
	}
</script>

<svelte:head>
	<title>{doc.name} — svtui</title>
	<meta name="description" content={doc.description} />
</svelte:head>

<div class="max-w-3xl space-y-8 p-4">
	<div>
		<div class="flex items-baseline gap-2">
			<h1 class="text-lg uppercase">{doc.name}</h1>
			<Badge>{doc.sourceName}</Badge>
		</div>
		<p>{doc.description}</p>
	</div>

	<!-- DEMO: the live, rendered example. This is NOT the component itself —
	     it's a small wrapper showing the component in use. -->
	<section class="demo">
		<h2 class="section-title">Demo</h2>
		<svelte:boundary>
			<div class="demo-frame">
				<Example />
			</div>
			{#snippet failed()}
				<div class="demo-frame">
					<p class="text-red-500">This example failed to render.</p>
				</div>
			{/snippet}
		</svelte:boundary>
	</section>

	<!-- COMPONENT: the raw, copy-pasteable source plus its props type. -->
	<section class="component">
		{#if doc.propsType}
			<div class="code-section">
				<div class="flex items-center justify-between">
					<span class="sub-label">Props</span>
					<button class="copy" onclick={copyProps}>{copiedProps ? 'COPIED' : 'COPY'}</button>
				</div>
				<CodeBlock code={doc.propsType} />
			</div>
		{/if}

		<div class="code-section" class:mt-line={doc.propsType}>
			<div class="flex items-center justify-between">
				<span class="sub-label">{doc.sourceName}</span>
				<button class="copy" onclick={copySource}>{copiedSource ? 'COPIED' : 'COPY'}</button>
			</div>
			<CodeBlock code={doc.source} />
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

	.mt-line {
		margin-top: var(--line);
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
