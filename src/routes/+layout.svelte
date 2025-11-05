<script lang="ts">
	import favicon from '$lib/assets/favicon.png';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>svtui</title>
</svelte:head>

<ModeWatcher />
{@render children()}
