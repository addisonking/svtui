<script lang="ts">
	import Badge from '$lib/components/badge.svelte';

	let version = $state(__SVTUI_VERSION__);
</script>

<svelte:head>
	<title>svtui</title>
	<meta
		name="description"
		content="Terminal-aesthetic Svelte components. Copy-paste, self-contained, minimal deps."
	/>
</svelte:head>

<div class="max-w-3xl space-y-4 p-4">
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
</div>
