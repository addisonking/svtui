<script lang="ts">
	import favicon from '$lib/assets/favicon.png';
	import '../docs.css';
	// Initializing the settings store (side-effects apply theme/tint/font classes
	// to <body> on first client render) is enough — no component to mount.
	import '$lib/settings';
	import '$lib/terminal-scroll';
	import Shell from './_shell.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>svtui</title>
</svelte:head>

<Shell>
	{@render children()}
</Shell>
