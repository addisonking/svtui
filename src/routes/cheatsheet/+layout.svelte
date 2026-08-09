<script lang="ts">
	import Shell from '../_shell.svelte';

	let { children } = $props();
</script>

<Shell>
	{@render children()}
</Shell>
