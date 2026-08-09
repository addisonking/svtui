<script lang="ts">
	import BarLoader from '$lib/components/bar-loader.svelte';
</script>

<div class="flex flex-col gap-2 w-full">
	<BarLoader progress={40} />
	<BarLoader intervalRate={120} />
</div>
