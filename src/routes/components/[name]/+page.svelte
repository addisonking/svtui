<script lang="ts">
	import Card from '$lib/components/card.svelte';
	import CodeBlock from '$lib/components/code-block.svelte';
	import Badge from '$lib/components/badge.svelte';

	let { data } = $props();
	const doc = $derived(data.doc);
	const Example = $derived(doc.componentExample);

	let copied = $state(false);

	async function copySource() {
		try {
			await navigator.clipboard.writeText(doc.source);
			copied = true;
			setTimeout(() => (copied = false), 1500);
		} catch {
			copied = false;
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

	<svelte:boundary>
		<Card title="EXAMPLE">
			<Example />
		</Card>
		{#snippet failed()}
			<Card title="EXAMPLE">
				<p class="text-red-500">This example failed to render.</p>
			</Card>
		{/snippet}
	</svelte:boundary>

	{#if doc.propsType}
		<div class="flex flex-col gap-2">
			<span class="uppercase">Props</span>
			<Card title="PROPS">
				<CodeBlock code={doc.propsType} />
			</Card>
		</div>
	{/if}

	<div class="flex flex-col gap-2">
		<div class="flex items-center justify-between">
			<span class="uppercase">Source</span>
			<button class="copy" onclick={copySource}>{copied ? 'COPIED' : 'COPY'}</button>
		</div>
		<Card title={doc.sourceName}>
			<CodeBlock code={doc.source} />
		</Card>
	</div>
</div>

<style>
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
