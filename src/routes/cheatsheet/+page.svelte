<script lang="ts">
	import Card from '$lib/components/card.svelte';
	import CodeBlock from '$lib/components/code-block.svelte';
	import Badge from '$lib/components/badge.svelte';
	import type { Component } from 'svelte';
	import { resolve } from '$app/paths';

	let { data } = $props();
	const docs = $derived(data.docs);

	let copiedSlug = $state('');

	async function copySource(slug: string, source: string) {
		try {
			await navigator.clipboard.writeText(source);
			copiedSlug = slug;
			setTimeout(() => (copiedSlug = ''), 1500);
		} catch {
			copiedSlug = '';
		}
	}
</script>

<svelte:head>
	<title>svtui — cheatsheet</title>
	<meta
		name="description"
		content="Every svtui component: example, props, and source on one page."
	/>
</svelte:head>

<div class="max-w-3xl space-y-12 p-4">
	<header>
		<h1 class="text-lg uppercase">Cheatsheet</h1>
		<p>Every component, its live example, props, and source.</p>
	</header>

	{#snippet example(Example: Component)}
		<Example />
	{/snippet}

	{#each docs as doc (doc.slug)}
		<section class="flex flex-col gap-4">
			<div>
				<div class="flex items-baseline gap-2">
					<h2 class="uppercase">
						<a href={resolve('/components/[name]', { name: doc.slug })}>{doc.name}</a>
					</h2>
					<Badge>{doc.sourceName}</Badge>
				</div>
				<p>{doc.description}</p>
			</div>

			<svelte:boundary>
				<Card title="EXAMPLE">
					{@render example(doc.componentExample)}
				</Card>
				{#snippet failed()}
					<Card title="EXAMPLE">
						<p class="text-red-500">This example failed to render.</p>
					</Card>
				{/snippet}
			</svelte:boundary>

			{#if doc.propsType}
				<Card title="PROPS">
					<CodeBlock code={doc.propsType} />
				</Card>
			{/if}

			<div class="flex items-center justify-between">
				<span class="uppercase">{doc.sourceName}</span>
				<button class="copy" onclick={() => copySource(doc.slug, doc.source)}>
					{copiedSlug === doc.slug ? 'COPIED' : 'COPY'}
				</button>
			</div>
			<Card title={doc.sourceName}>
				<CodeBlock code={doc.source} />
			</Card>
		</section>
	{/each}
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
