<script lang="ts">
	import Spinner from '$lib/components/spinner.svelte';
</script>

<div class="flex flex-wrap items-center gap-6">
	<Spinner variant="dots" label="Scanning modules..." />
	<Spinner variant="line" label="Connecting..." />
	<Spinner variant="arc" label="Syncing..." />
	<Spinner variant="pulse" label="Processing..." />
	<Spinner variant="bar" label="Building..." />
</div>
