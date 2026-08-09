<script lang="ts">
	import favicon from '$lib/assets/favicon.png';
	import '../app.css';
	// Initializing the settings store (side-effects apply theme/tint/font classes
	// to <body> on first client render) is enough — no component to mount.
	import '$lib/settings';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>svtui</title>
</svelte:head>

{@render children()}
