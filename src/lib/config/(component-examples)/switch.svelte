<script lang="ts">
	import Switch from '$lib/components/switch.svelte';

	let opt1 = $state(true);
	let opt2 = $state(false);
	let opt3 = $state(true);
</script>

<div class="flex flex-col gap-3">
	<Switch variant="text" label="Vim keybindings" bind:checked={opt1} />
	<Switch variant="track" label="Hardware acceleration" bind:checked={opt2} />
	<Switch variant="box" label="Auto-save buffers" bind:checked={opt3} />
	<Switch variant="text" label="Disabled setting" checked={false} disabled />
</div>
