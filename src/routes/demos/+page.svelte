<script lang="ts">
	import { demos } from '$lib/config/demos';
	import ActionList from '$lib/components/action-list.svelte';
</script>

<svelte:head>
	<title>svtui — demos</title>
	<meta name="description" content="Live demos built with svtui components." />
</svelte:head>

<div class="max-w-3xl space-y-6 p-4">
	<header class="space-y-1">
		<h1 class="text-lg uppercase">Demos</h1>
		<p class="text-sm">Full app mockups assembled from svtui components. Frontend only.</p>
	</header>
	<nav class="flex flex-col">
		{#each demos as demo (demo.slug)}
			<ActionList icon=">" href="/demos/{demo.slug}">{demo.name}</ActionList>
		{/each}
	</nav>
</div>
