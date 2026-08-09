<script lang="ts">
	import ActionList from '$lib/components/action-list.svelte';
	let { data } = $props();
	const demo = $derived(data.demo);
	const Demo = $derived(demo.component);
</script>

<svelte:head>
	<title>{demo.name} — svtui</title>
	<meta name="description" content={demo.description} />
</svelte:head>

<div class="demo-page">
	<div class="demo-header">
		<ActionList icon="<" href="/demos">DEMOS</ActionList>
		<h1 class="title">{demo.name}</h1>
		<p class="desc">{demo.description}</p>
	</div>
	<div class="demo-frame">
		<svelte:boundary>
			<Demo />
			{#snippet failed()}
				<p class="err">This demo failed to render.</p>
			{/snippet}
		</svelte:boundary>
	</div>
</div>

<style>
	.demo-page {
		display: flex;
		flex-direction: column;
		height: 100vh;
		min-height: 0;
	}
	.demo-header {
		padding: 0.5rem 1rem;
		border-bottom: 1px solid var(--border-default);
		flex-shrink: 0;
	}
	.title {
		text-transform: uppercase;
		font-size: 0.875rem;
		margin: 0.25rem 0 0;
	}
	.desc {
		font-size: 0.75rem;
		color: var(--button-muted);
		margin: 0;
	}
	.demo-frame {
		flex: 1;
		min-height: 0;
		overflow: hidden;
	}
	.err {
		padding: 1rem;
		color: red;
	}
</style>
